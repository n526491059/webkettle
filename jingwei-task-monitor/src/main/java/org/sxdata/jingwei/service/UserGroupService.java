package org.sxdata.jingwei.service;

/**
 * Created by cRAZY on 2017/4/13.
 */
public interface UserGroupService {
    public String getUserGroupByPage(int start,int limit,String userGroupName);

    public String decideGroupNameExist(String name);

    public void addUserGroup(String[] taskGroupNameArray,String[] slaveIdArray,String userGroupName,String userGroupDesc);

    public String[] beforeAssignedTaskGroup(String userGroupName);

    public String[] beforeAssignedSlave(String userGroupName);

    public void assignedSlave(String[] slaveIdArray,String userGroupName);

    public void assignedTaskGroup(String[] taskGroupNameArray,String userGroupName);

    public String updateUserGroup(Integer userGroupId,String userGroupName,String userGroupDesc);

    public void deleteUserGroup(String userGroupName);
}
