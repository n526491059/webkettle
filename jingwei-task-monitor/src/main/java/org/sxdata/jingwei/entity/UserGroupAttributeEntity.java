package org.sxdata.jingwei.entity;

/**
 * Created by cRAZY on 2017/4/13.
 */
public class UserGroupAttributeEntity {
    private Integer groupAttributeId;
    private String userGroupName;
    private String userName;
    private Integer slavePremissonType;
    private Integer taskPremissionType;

    public Integer getGroupAttributeId() {
        return groupAttributeId;
    }

    public void setGroupAttributeId(Integer groupAttributeId) {
        this.groupAttributeId = groupAttributeId;
    }

    public String getUserGroupName() {
        return userGroupName;
    }

    public void setUserGroupName(String userGroupName) {
        this.userGroupName = userGroupName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Integer getSlavePremissonType() {
        return slavePremissonType;
    }

    public void setSlavePremissonType(Integer slavePremissonType) {
        this.slavePremissonType = slavePremissonType;
    }

    public Integer getTaskPremissionType() {
        return taskPremissionType;
    }

    public void setTaskPremissionType(Integer taskPremissionType) {
        this.taskPremissionType = taskPremissionType;
    }
}


