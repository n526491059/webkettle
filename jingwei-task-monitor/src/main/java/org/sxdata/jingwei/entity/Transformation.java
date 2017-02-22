package org.sxdata.jingwei.entity;

/**
 * Created by cRAZY on 2017/2/22.
 * 转换
 */
public class Transformation {
    private String createDate;//创建时间
    private String modifiedUser;//修改用户
    private String modifiedDate;//修改时间
    private String name;
    private String createUser; //创建用户

    public String getCreateDate() {
        return createDate;
    }

    public String getModifiedUser() {
        return modifiedUser;
    }

    public String getModifiedDate() {
        return modifiedDate;
    }

    public String getName() {
        return name;
    }

    public String getCreateUser() {
        return createUser;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public void setModifiedUser(String modifiedUser) {
        this.modifiedUser = modifiedUser;
    }

    public void setModifiedDate(String modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }
}
