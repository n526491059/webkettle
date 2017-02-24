package org.sxdata.jingwei.entity;

import java.sql.Timestamp;
import java.util.Date;

/**
 * Created by cRAZY on 2017/2/22.
 * 转换
 */
public class Transformation {
    private Date createDate;//创建时间
    private String modifiedUser;//修改用户
    private Date modifiedDate;//修改时间
    private String name;
    private String createUser; //创建用户
    private Integer transformationId;

    public void setTransformationId(Integer transformationId) {
        this.transformationId = transformationId;
    }

    public Integer getTransformationId() {
        return transformationId;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public String getModifiedUser() {
        return modifiedUser;
    }

    public Date getModifiedDate() {
        return modifiedDate;
    }

    public String getName() {
        return name;
    }

    public String getCreateUser() {
        return createUser;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public void setModifiedUser(String modifiedUser) {
        this.modifiedUser = modifiedUser;
    }

    public void setModifiedDate(Date modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }
}
