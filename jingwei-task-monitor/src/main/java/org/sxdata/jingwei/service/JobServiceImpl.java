package org.sxdata.jingwei.service;

import net.sf.json.JSONObject;
import org.flhy.ext.App;
import org.pentaho.di.repository.ObjectId;
import org.pentaho.di.repository.Repository;
import org.pentaho.di.repository.RepositoryDirectoryInterface;
import org.pentaho.di.repository.RepositoryElementMetaInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.sxdata.jingwei.bean.RepositoryNode;
import org.sxdata.jingwei.dao.DirectoryDao;
import org.sxdata.jingwei.dao.JobDao;
import org.sxdata.jingwei.entity.Directory;
import org.sxdata.jingwei.entity.Job;
import org.sxdata.jingwei.entity.PageforBean;
import org.sxdata.jingwei.util.Util;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by cRAZY on 2017/2/22.
 */
@Service
public class JobServiceImpl implements JobService{
    @Autowired
    protected JobDao jobDao;

    @Autowired
    protected DirectoryDao directoryDao;

    protected SimpleDateFormat format =  new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    private final Integer loadElement =3;   //表示只加载转换和作业,根据业务需求会作不同修改
    private final String path="";           //表示查询资源库下根目录的所有作业  根据业务需求会作不同修改

    @Override
    public JSONObject findJobs(int start, int limit, String name, String createDate) throws Exception{
        PageforBean pages=new PageforBean();
        net.sf.json.JSONObject result=null;
        //该页的作业信息以及整个表(可能是条件查询)的总记录条数
        List<Job> jobs=null;
        Integer totalCount=0;
        if (Util.isEmpty(name)  && Util.isEmpty(createDate)){
          jobs=jobDao.getThisPageJob(start,limit);
            //对日期进行处理转换成指定的格式
            for (Job job:jobs){
                job.setCreateDate(format.parse(format.format(job.getCreateDate())));
                job.setModifiedDate(format.parse(format.format(job.getModifiedDate())));
            }
            totalCount=jobDao.getTotalCount();
        }else{
            createDate+=" 00:00:00";
            jobs=jobDao.conditionFindJobs(start, limit, name, createDate);
            for (Job job:jobs){
                job.setCreateDate(format.parse(format.format(job.getCreateDate())));
                job.setModifiedDate(format.parse(format.format(job.getModifiedDate())));
            }
            totalCount=jobDao.conditionFindJobCount(name,createDate);
        }



        //根据作业的id来查找该作业在资源库的绝对目录
        for (Job job:jobs){
            String directoryName="";
            Integer directoryId=job.getDirectoryId();
            //判断该作业是否是在根目录下 如果对应的目录id为0代表在根目录/下面
            if(directoryId==0){
                directoryName="/"+job.getName();
            }else{
                //不是在根目录下获取作业所在当前目录的目录名  并且拼接上作业名
                Directory directory=directoryDao.getDirectoryById(directoryId);
                directoryName=directory.getDirectoryName()+"/"+job.getName();
                Integer parentId=directory.getParentDirectoryId();
                //继续判断该文件上一级的目录是否是根目录
                if (parentId==0){
                    directoryName="/"+directoryName;
                }else{
                    //循环判断该目录的父级目录是否是根目录 直到根部为止
                    while(parentId!=0){
                        Directory parentDirectory=directoryDao.getDirectoryById(parentId);
                        directoryName=parentDirectory.getDirectoryName()+"/"+directoryName;
                        parentId=parentDirectory.getParentDirectoryId();
                    }
                    directoryName="/"+directoryName;
                }

            }
            job.setDirectoryName(directoryName);
        }

        pages.setRoot(jobs);
        pages.setTotalProperty(totalCount);
        //把分页对象(包含该页的数据以及所有页的总条数)转换成json对象
        result=net.sf.json.JSONObject.fromObject(pages, Util.configJson("yyyy-MM-dd HH:mm:ss"));
        return result;
    }



    @Override
    public void deleteJobs(String[] pathArray,String flag) throws Exception {
        Repository repository = App.getInstance().getRepository();
        //遍历进行删除
        for (String path:pathArray){
            String dir = path.substring(0, path.lastIndexOf("/"));
            String name = path.substring(path.lastIndexOf("/") + 1);
            RepositoryDirectoryInterface directory = repository.findDirectory(dir);
            if(directory == null)
                directory = repository.getUserHomeDirectory();
            ObjectId id = repository.getJobId(name, directory);
            System.out.println(id);
            repository.deleteJob(id);
        }
    }
}
