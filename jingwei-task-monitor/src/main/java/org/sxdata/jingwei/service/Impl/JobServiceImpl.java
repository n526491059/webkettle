package org.sxdata.jingwei.service.Impl;

import net.sf.json.JSONObject;
import org.flhy.ext.App;
import org.pentaho.di.core.Const;
import org.pentaho.di.repository.ObjectId;
import org.pentaho.di.repository.Repository;
import org.pentaho.di.repository.RepositoryDirectoryInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.sxdata.jingwei.bean.PageforBean;
import org.sxdata.jingwei.dao.*;
import org.sxdata.jingwei.entity.*;
import org.sxdata.jingwei.service.JobService;
import org.sxdata.jingwei.util.TaskUtil.CarteClient;
import org.sxdata.jingwei.util.TaskUtil.CarteTaskManager;
import org.sxdata.jingwei.util.TaskUtil.KettleEncr;
import org.sxdata.jingwei.util.CommonUtil.StringDateUtil;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by cRAZY on 2017/2/22.
 */
@Service
public class JobServiceImpl implements JobService {
    @Autowired
    protected JobDao jobDao;
    @Autowired
    protected UserDao userDao;
    @Autowired
    protected SlaveDao slaveDao;
    @Autowired
    protected DirectoryDao directoryDao;
    @Autowired
    protected JobSchedulerDao jobSchedulerDao;
    @Autowired
    protected TaskGroupDao taskGroupDao;

    protected SimpleDateFormat format =  new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    private final Integer loadElement =3;   //表示只加载转换和作业,根据业务需求会作不同修改
    private final String path="";           //表示查询资源库下根目录的所有作业  根据业务需求会作不同修改


    @Override
    public JobEntity getJobById(Integer jobId) {
        return jobDao.getJobById(jobId);
    }

    @Override
    public List<JobTimeSchedulerEntity> getAllTimerJob() {
        return jobSchedulerDao.getAllTimerJob();
    }

    @Override
    public List<JobEntity> getJobPath(List<JobEntity> jobs){
        List<JobEntity> resultJobs=new ArrayList<JobEntity>();
        //根据作业的id来查找该作业在资源库的绝对目录
        for (JobEntity job:jobs){
            String directoryName="";
            Integer directoryId=job.getDirectoryId();
            //判断该作业是否是在根目录下 如果对应的目录id为0代表在根目录/下面
            if(directoryId==0){
                directoryName="/"+job.getName();
            }else{
                //不是在根目录下获取作业所在当前目录的目录名  并且拼接上作业名
                DirectoryEntity directory=directoryDao.getDirectoryById(directoryId);
                directoryName=directory.getDirectoryName()+"/"+job.getName();
                Integer parentId=directory.getParentDirectoryId();
                //继续判断该文件上一级的目录是否是根目录
                if (parentId==0){
                    directoryName="/"+directoryName;
                }else{
                    //循环判断该目录的父级目录是否是根目录 直到根部为止
                    while(parentId!=0){
                        DirectoryEntity parentDirectory=directoryDao.getDirectoryById(parentId);
                        directoryName=parentDirectory.getDirectoryName()+"/"+directoryName;
                        parentId=parentDirectory.getParentDirectoryId();
                    }
                    directoryName="/"+directoryName;
                }

            }
            job.setDirectoryName(directoryName);
            resultJobs.add(job);
        }
        return resultJobs;
    }

    @Override
    public JSONObject findJobs(int start, int limit, String name, String createDate) throws Exception{
        PageforBean pages=new PageforBean();
        net.sf.json.JSONObject result=null;
        //该页的作业信息以及整个表(可能是条件查询)的总记录条数
        List<JobEntity> jobs=null;
        Integer totalCount=0;
        if (StringDateUtil.isEmpty(name)  && StringDateUtil.isEmpty(createDate)){
          jobs=jobDao.getThisPageJob(start,limit);
            //对日期进行处理转换成指定的格式
            for (JobEntity job:jobs){
                job.setCreateDate(format.parse(format.format(job.getCreateDate())));
                job.setModifiedDate(format.parse(format.format(job.getModifiedDate())));
            }
            totalCount=jobDao.getTotalCount();
        }else{
            createDate+=" 00:00:00";
            jobs=jobDao.conditionFindJobs(start, limit, name, createDate);
            for (JobEntity job:jobs){
                job.setCreateDate(format.parse(format.format(job.getCreateDate())));
                job.setModifiedDate(format.parse(format.format(job.getModifiedDate())));
            }
            totalCount=jobDao.conditionFindJobCount(name,createDate);
        }

        //设置作业的全目录名
       jobs=this.getJobPath(jobs);
        //设置作业所在的任务组名
        for(JobEntity job:jobs){
            List<TaskGroupAttributeEntity> items=taskGroupDao.getTaskGroupByTaskName(job.getName(), "job");
            if(null!=items && items.size()>0){
                if(items.size()==1){
                    job.setBelongToTaskGroup(items.get(0).getTaskGroupName());
                }else{
                    String belongToTaskGroup="";
                    for(int i=0;i<items.size();i++){
                        if(i==items.size()-1){
                            belongToTaskGroup+=items.get(i).getTaskGroupName();
                            continue;
                        }
                        belongToTaskGroup+=items.get(i).getTaskGroupName()+",";
                    }
                    job.setBelongToTaskGroup(belongToTaskGroup);
                }
            }
        }

        pages.setRoot(jobs);
        pages.setTotalProperty(totalCount);
        //把分页对象(包含该页的数据以及所有页的总条数)转换成json对象
        result=net.sf.json.JSONObject.fromObject(pages, StringDateUtil.configJson("yyyy-MM-dd HH:mm:ss"));
        return result;
    }

    @Override
    public void deleteJobs(String jobPath,String flag) throws Exception {
        Repository repository = App.getInstance().getRepository();
        String dir = jobPath.substring(0, jobPath.lastIndexOf("/"));
        String name = jobPath.substring(jobPath.lastIndexOf("/") + 1);
        //删除作业在任务组明细表中的记录
        taskGroupDao.deleteTaskGroupAttributesByTaskName(name,"job");
        //删除作业
        RepositoryDirectoryInterface directory = repository.findDirectory(dir);
        if(directory == null)
            directory = repository.getUserHomeDirectory();
        ObjectId id = repository.getJobId(name, directory);
        repository.deleteJob(id);
    }

    @Override
    public void executeJob(String path,Integer slaveId) throws Exception {
        //获取用户信息
        UserEntity loginUser=userDao.getUserbyName("admin");
        loginUser.setPassword(KettleEncr.decryptPasswd("Encrypted " + loginUser.getPassword()));
        //构造Carte对象
        SlaveEntity slave=slaveDao.getSlaveById(slaveId);
        slave.setPassword(KettleEncr.decryptPasswd(slave.getPassword()));
        CarteClient carteClient=new CarteClient(slave);
        //拼接资源库名
        String repoId=CarteClient.hostName+"_"+CarteClient.databaseName;
        //拼接http请求字符串
        String urlString="/?rep="+repoId+"&user="+loginUser.getLogin()+"&pass="+loginUser.getPassword()+"&job="+path+"&level=Basic";
        urlString = Const.replace(urlString, "/", "%2F");
        urlString = carteClient.getHttpUrl() + CarteClient.EXECREMOTE_JOB +urlString;
        System.out.println("请求远程执行作业的url字符串为" + urlString);
        CarteTaskManager.addTask(carteClient, "job_exec", urlString);
    }

    //判断是否在数据库中已经存在相同类型 相同执行周期的同一个作业
    public boolean judgeJobIsAlike(JobTimeSchedulerEntity willAddJobTimer){
        boolean flag=false;
        List<JobTimeSchedulerEntity> jobs=jobSchedulerDao.getAllTimerJob();

        if(jobs!=null && jobs.size()>=1){
            //遍历查找是否有作业名与用户选择的作业名相同的作业
            List<JobTimeSchedulerEntity> jobNameEqual=new ArrayList<>(); //存放作业名与用户选择的相同的作业
            for(JobTimeSchedulerEntity nameEqual:jobs){
                if(nameEqual.getJobName().equals(willAddJobTimer.getJobName())){
                    jobNameEqual.add(nameEqual);
                }
            }

            //遍历查找相同作业名的情况下 是否有作业定时类型也相同的作业
            if(jobNameEqual.size()>=1){
                List<JobTimeSchedulerEntity> typeEqualJobs=new ArrayList<>(); //存放定时类型与用户传递的定时运行相同的作业
                for(JobTimeSchedulerEntity jobTimer:jobs){
                    if(jobTimer.getSchedulertype()==willAddJobTimer.getSchedulertype()){
                        typeEqualJobs.add(jobTimer);
                    }
                }
                //进一步判断定时的具体时间是否相同
                if(typeEqualJobs.size()>=1){
                    Integer timerType=willAddJobTimer.getSchedulertype();
                    switch(timerType) {
                        //类型为1也就是间隔执行 判断间隔执行的分钟间隔是否相同
                        case 1:
                            for(JobTimeSchedulerEntity jobTime:typeEqualJobs){
                                if(willAddJobTimer.getIntervalminutes()==jobTime.getIntervalminutes()){
                                    flag=true;
                                }
                            }
                            break;

                        //类型为2也就每天执行类型  进一步判断每天执行的小时 分钟是否一样
                        case 2:
                            List<JobTimeSchedulerEntity> hourLikeByTypeTwo=new ArrayList<>(); //存放每天执行 小时与用户设置值一样的定时作业
                            for(JobTimeSchedulerEntity jobTime:typeEqualJobs){
                                if(willAddJobTimer.getHour()==jobTime.getHour()){
                                    hourLikeByTypeTwo.add(jobTime);
                                }
                            }
                            //如果有小时相同的记录 进一步判断是否分钟相同
                            if(hourLikeByTypeTwo.size()>=1){
                                for(JobTimeSchedulerEntity jobTime:hourLikeByTypeTwo){
                                    if(willAddJobTimer.getMinutes()==jobTime.getMinutes()){
                                        flag=true;
                                    }
                                }
                            }
                            break;

                        //类型为3 每周执行
                        case 3:
                            //首先判断每周执行的星期值week是否相同
                            List<JobTimeSchedulerEntity> weekLikeByTypeThree=new ArrayList<>();//存放星期数值与用户传递值相同的记录
                            for(JobTimeSchedulerEntity jobTime:typeEqualJobs){
                                if(jobTime.getWeekday()==willAddJobTimer.getWeekday()){
                                    weekLikeByTypeThree.add(jobTime);
                                }
                            }
                            List<JobTimeSchedulerEntity> weekAndHourLikeByTypeThree=new ArrayList<>();//存放星期数值和小时与用户传递值相同的记录
                            //如果星期值相同判断小时是是否也相同
                            if(weekLikeByTypeThree.size()>=1){
                                for(JobTimeSchedulerEntity weekLikeJob:weekAndHourLikeByTypeThree){
                                    if(weekLikeJob.getHour()==willAddJobTimer.getHour()){
                                        weekAndHourLikeByTypeThree.add(weekLikeJob);
                                    }
                                }
                            }
                            //如果星期值和小时值都相同则最终判断分钟是否相同
                            if(weekAndHourLikeByTypeThree.size()>=1){
                                for(JobTimeSchedulerEntity weekAndHourLikeJob:weekAndHourLikeByTypeThree){
                                    if(weekAndHourLikeJob.getMinutes()==willAddJobTimer.getMinutes()){
                                        flag=true;
                                    }
                                }
                            }
                            break;

                        //类型4 每月执行
                        case 4:
                            //首先判断每月执行的日期xx号是否相同
                            List<JobTimeSchedulerEntity> dayLikeByTypeFour=new ArrayList<>();
                            for(JobTimeSchedulerEntity jobTime:typeEqualJobs){
                                if(jobTime.getDayofmonth()==willAddJobTimer.getDayofmonth()){
                                    dayLikeByTypeFour.add(jobTime);
                                }
                            }
                            //如果日期xx号相同则继续判断时间hour是否相同
                            List<JobTimeSchedulerEntity> dayAndHourLikeByTypeFour=new ArrayList<>();
                            if(dayLikeByTypeFour.size()>=1){
                                for(JobTimeSchedulerEntity dayLike:dayLikeByTypeFour){
                                    if(dayLike.getHour()==willAddJobTimer.getHour()){
                                        dayAndHourLikeByTypeFour.add(dayLike);
                                    }
                                }
                            }
                            //如果日期和时间值都相同则最终判断minute是否相同
                            if(dayAndHourLikeByTypeFour.size()>=1){
                                for(JobTimeSchedulerEntity dayAndHourLike:dayAndHourLikeByTypeFour){
                                    if(dayAndHourLike.getMinutes()==willAddJobTimer.getMinutes()){
                                        flag=true;
                                    }
                                }
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
        }
        return flag;
    }

    @Override
    //定时作业
    public boolean timeExecuteJob(Map<String, Object> params) throws Exception {
        boolean isSuccess=false;
        SlaveEntity slave=slaveDao.getSlaveById(Integer.parseInt(params.get("slaveId").toString()));
        JobTimeSchedulerEntity jobTimeScheduler=new JobTimeSchedulerEntity();
        jobTimeScheduler.setIdJobtask(System.nanoTime());   //定时的ID 唯一标识
        jobTimeScheduler.setIdJob(Integer.parseInt(params.get("jobId").toString()));    //所需定时的作业ID
        jobTimeScheduler.setJobName(params.get("jobName").toString());                  //作业名
        jobTimeScheduler.setSlaves(slave.getSlaveId() + "_" + slave.getHostName());         //节点信息
        jobTimeScheduler.setIsrepeat("Y");                                       //是否重复执行 暂时默认重复执行Y
        jobTimeScheduler.setRepoId(slave.getHostName()+"_"+CarteClient.databaseName);
        //设置定时类型
        String typeInfo=params.get("typeChoose").toString();
        int schedulerType=0;
        //如果是间隔执行则设置执行的时间间隔
        if(typeInfo.trim().equals("")){
            schedulerType=1;
            jobTimeScheduler.setIntervalminutes(Integer.parseInt(params.get("intervalminute").toString()));
        }else if(typeInfo.trim().equals("每天执行")){
            schedulerType=2;
        }else if(typeInfo.trim().equals("每周执行")){
            //每周执行则设置每周的时间week
            schedulerType=3;
            jobTimeScheduler.setWeekday(StringDateUtil.getIntWeek(params.get("weekChoose").toString()));
        }else if(typeInfo.trim().equals("每月执行")){
            //每月执行设置每月多少号执行 monthDay
            schedulerType=4;
            jobTimeScheduler.setDayofmonth(StringDateUtil.getdayInt(params.get("monthChoose").toString()));
        }
        jobTimeScheduler.setSchedulertype(schedulerType);
        //只要不是间隔执行 其它三种都需要设置hour minute 执行的具体时间
        if(schedulerType!=1){
            jobTimeScheduler.setHour(Integer.parseInt(params.get("hour").toString()));
            jobTimeScheduler.setMinutes(Integer.parseInt(params.get("minute").toString()));
        }
        //如果库中不存在该作业的相同定时 则加入定时操作
        if(!this.judgeJobIsAlike(jobTimeScheduler)){
            isSuccess=true;
            //封装定时任务需要的参数 作业全路径名 所有节点组成的map集合(暂时不支持集群,集合只有一个元素) 日志等级
            String jobPath=params.get("jobPath").toString();
            HashMap<String,String> thisIdIpMap=new HashMap<String,String>();
            thisIdIpMap.put(slave.getSlaveId().toString(),slave.getHostName());
            //TODO 登录功能暂未实现 暂时使用默认用户admin
            UserEntity loginUser=userDao.getUserbyName("admin");
            loginUser.setPassword(KettleEncr.decryptPasswd("Encrypted " + loginUser.getPassword()));
            //执行定时任务
            CarteTaskManager.addTimerTask(thisIdIpMap.keySet(),jobPath,null,jobTimeScheduler,slave,loginUser);
            //把该定时信息更新到数据库
            jobSchedulerDao.addTimerJob(jobTimeScheduler);
        }
        return isSuccess;
    }

    @Override
    public JobEntity getJobByName(String jobName) {
        JobEntity job=jobDao.getJobByName(jobName);
        List<JobEntity> jobs=new ArrayList<JobEntity>();
        jobs.add(job);
        return this.getJobPath(jobs).get(0);
    }
}
