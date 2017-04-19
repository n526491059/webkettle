package org.sxdata.jingwei.service.Impl;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.sxdata.jingwei.bean.PageforBean;
import org.sxdata.jingwei.dao.TaskGroupDao;
import org.sxdata.jingwei.dao.UserGroupDao;
import org.sxdata.jingwei.entity.*;
import org.sxdata.jingwei.service.JobService;
import org.sxdata.jingwei.service.TaskGroupService;
import org.sxdata.jingwei.service.TransService;
import org.sxdata.jingwei.util.CommonUtil.StringDateUtil;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by cRAZY on 2017/3/22.
 */
@Service
public class TaskGroupServiceImpl implements TaskGroupService{
    @Autowired
    protected TaskGroupDao taskGroupDao;
    @Autowired
    protected JobService jobService;
    @Autowired
    protected TransService transService;
    @Autowired
    protected UserGroupDao userGroupDao;

    @Override
    public String getAllTaskGroupByLogin(int start, int limit,String userGroupName) throws Exception {
        List<TaskGroupEntity> taskGroups=taskGroupDao.getAllTaskGroup(start, limit,userGroupName);
        Integer totalCount=taskGroupDao.getTotalCountTaskGroup(userGroupName);
        PageforBean pageBean=new PageforBean();
        pageBean.setTotalProperty(totalCount);
        pageBean.setRoot(taskGroups);
        return JSONObject.fromObject(pageBean).toString();
    }

    @Override
    //添加任务组以及任务组下的明细
    public void addTaskGroup(TaskGroupEntity taskGroupEntity, List<TaskGroupAttributeEntity> attributes,String userGroupName){
        taskGroupDao.addTaskGroup(taskGroupEntity);
        //添加用户组-任务组关系表记录 如果用户组名不为空则代表不是admin用户 默认该用户组可见
        if(!StringDateUtil.isEmpty(userGroupName)){
            TaskUserRelationEntity ur=new TaskUserRelationEntity();
            ur.setUserGroupName(userGroupName);
            ur.setTaskGroupName(taskGroupEntity.getTaskGroupName());
            userGroupDao.addTaskUserRelation(ur);
        }
        //添加任务组下所有的任务记录
        for(TaskGroupAttributeEntity item:attributes){
            taskGroupDao.addTaskGroupAttribute(item);
        }
    }

    @Override
    //在添加任务组前获取该用户下所有的作业和转换供选择
    public String getAllTaskBeforeAdd(String userGroupName) throws Exception {
        List<TaskGroupAttributeEntity> tasks=new ArrayList<TaskGroupAttributeEntity>();
        //获取所有的作业以及转换
        List<JobEntity> jobList=taskGroupDao.getAllJob(userGroupName);
        List<TransformationEntity> transList=taskGroupDao.getAllTrans(userGroupName);
        //获得这些转换和作业的全目录名
        jobList=jobService.getJobPath(jobList);
        transList=transService.getTransPath(transList);
        for(JobEntity job:jobList){
            TaskGroupAttributeEntity item=new TaskGroupAttributeEntity();
            item.setTaskId(job.getJobId());
            item.setTaskName(job.getName());
            item.setType("job");
            item.setTaskPath(job.getDirectoryName());
            tasks.add(item);
        }
        for(TransformationEntity trans:transList){
            TaskGroupAttributeEntity item=new TaskGroupAttributeEntity();
            item.setTaskId(trans.getTransformationId());
            item.setTaskName(trans.getName());
            item.setType("trans");
            item.setTaskPath(trans.getDirectoryName());
            tasks.add(item);
        }
        return  JSONArray.fromObject(tasks).toString();
    }

    @Override
    //判断用户组名是否已存在
    public boolean decideGroupNameExist(String name) throws Exception {
        List<TaskGroupEntity> items=taskGroupDao.getAllTaskGroupNoLimit();
        for(TaskGroupEntity item:items){
            if(item.getTaskGroupName().equals(name.trim())){
                return true;
            }
        }
        return false;
    }

    @Override
    @Transactional
    public void updateTaskGroup(TaskGroupEntity taskGroup){
        TaskGroupEntity item=taskGroupDao.getTaskGroupById(taskGroup.getTaskGroupId());
        taskGroupDao.updateTaskGroup(taskGroup);
        if(!taskGroup.getTaskGroupName().equals(item.getTaskGroupName())){
            taskGroupDao.updateTaskGroupAttributes(item.getTaskGroupName(),taskGroup.getTaskGroupName());
            taskGroupDao.updateTaskGroupForTaskRelation(item.getTaskGroupName(),taskGroup.getTaskGroupName());
        }

    }

    @Override
    //根据用户组名查询用户组下的所有任务信息
    public String selectTaskGroupAttributesByName(String name) throws Exception {
        List<TaskGroupAttributeEntity> items= taskGroupDao.getTaskGroupAttributesByName(name);
        return JSONArray.fromObject(items).toString();
    }

    @Override
    @Transactional
    public void deleteTaskGroupAndAttributes(String[] names){
        for(String name:names){
            taskGroupDao.deleteTaskGroupAttributesByName(name.trim());
            taskGroupDao.deleteTaskGroupByName(name.trim());
            taskGroupDao.deleteUserTaskRelationByName(name);
        }
    }

    @Override
    //判断任务组是否包含某个任务 判断结果会存放在任务组的属性中
    public List<TaskGroupEntity> isContainsTask(String taskName, String type,String userGroupName) {
        //获取当前用户下的所有任务组
        List<TaskGroupEntity> items=taskGroupDao.getTaskGroupByThisUser(userGroupName);
        for(TaskGroupEntity item:items){
            Integer result=taskGroupDao.isContainsTask(taskName,type,item.getTaskGroupName());
            if(result==0){
                item.setIsContainsTask("NO");
            }else{
                item.setIsContainsTask("YES");
            }
        }
        return items;
    }

    @Override
    //分配任务组
    public void assignedTaskGroup(List<TaskGroupAttributeEntity> items,String taskName,String type){
        taskGroupDao.deleteTaskGroupAttributesByTaskName(taskName,type);
        if(items.size()>0){
            for(TaskGroupAttributeEntity item:items){
                taskGroupDao.addTaskGroupAttribute(item);
            }
        }
    }

    @Override
    public String getAllTaskGroupNoPage() {
        String result=JSONArray.fromObject(taskGroupDao.getAllTaskGroupNoLimit()).toString();
        return result;
    }

    @Override
    public List<TaskGroupEntity> AllTaskGroupBeforeAdd(String userGroupName) {
        return taskGroupDao.getTaskGroupByThisUser(userGroupName);
    }
}
