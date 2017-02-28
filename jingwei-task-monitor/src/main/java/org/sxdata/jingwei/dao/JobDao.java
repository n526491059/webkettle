package org.sxdata.jingwei.dao;

import org.springframework.stereotype.Repository;
import org.sxdata.jingwei.entity.Job;
import org.sxdata.jingwei.entity.Transformation;
import org.sxdata.jingwei.entity.User;

import java.util.List;

/**
 * Created by cRAZY on 2017/2/15.
 */
@Repository
public interface JobDao {

    public List<Job> getThisPageJob(int start,int limit);

    public Integer getTotalCount(); //获得总记录数

    public List<Job> conditionFindJobs(int start,int limit,String namme,String date);//带条件的查询

    public Integer conditionFindJobCount(String name,String date);//带条件查询总记录数u

}
