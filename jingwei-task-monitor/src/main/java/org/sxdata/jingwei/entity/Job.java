package org.sxdata.jingwei.entity;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by cRAZY on 2017/2/15.
 * 作业
 */
public class Job {
    private Integer jobId;//作业id
    private Date createDate;//创建时间
    private String modifiedUser;//修改用户
    private Date modifiedDate;//修改时间
    private String name;
    private String createUser; //创建用户

    public Integer getJobId() {
        return jobId;
    }

    public void setJobId(Integer jobId) {
        this.jobId = jobId;
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
