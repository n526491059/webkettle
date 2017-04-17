package org.sxdata.jingwei.service;

import org.sxdata.jingwei.entity.TaskGroupAttributeEntity;
import org.sxdata.jingwei.entity.TaskGroupEntity;

import java.util.List;

/**
 * Created by cRAZY on 2017/3/22.
 */
public interface TaskGroupService {
    //TODO 获取当前登录用户的所有任务组信息 分页形式    用户模块暂无
    public String getAllTaskGroupByLogin(int start,int limit) throws Exception;

    public void addTaskGroup(TaskGroupEntity taskGroupEntity,List<TaskGroupAttributeEntity> attributes);

    public String getAllTaskBeforeAdd() throws Exception;

    public void addTaskGroupAttribute(TaskGroupAttributeEntity item);

    public boolean decideGroupNameExist(String name) throws Exception;

    public void updateTaskGroup(TaskGroupEntity taskGroup);

    public String selectTaskGroupAttributesByName(String name) throws Exception;

    public void deleteTaskGroupAndAttributes(String[] names);

    public List<TaskGroupEntity> isContainsTask(String taskName,String type);

    public void assignedTaskGroup(List<TaskGroupAttributeEntity> items,String taskName,String type);

    public String getAllTaskGroupNoPage();
}
