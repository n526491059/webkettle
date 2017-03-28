package org.sxdata.jingwei.dao;

import org.springframework.stereotype.Repository;
import org.sxdata.jingwei.entity.JobEntity;

import java.util.List;

/**
 * Created by cRAZY on 2017/2/15.
 */
@Repository
public interface JobDao {

    public List<JobEntity> getThisPageJob(int start,int limit);

    public Integer getTotalCount(); //获得总记录数

    public List<JobEntity> conditionFindJobs(int start,int limit,String namme,String date);//带条件的查询

    public Integer conditionFindJobCount(String name,String date);//带条件查询总记录数

    public JobEntity getJobById(Integer jobId);

    public JobEntity getJobByName(String jobName);

}
