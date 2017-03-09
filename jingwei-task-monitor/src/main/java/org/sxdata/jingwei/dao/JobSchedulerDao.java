package org.sxdata.jingwei.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.sxdata.jingwei.entity.JobTimeScheduler;

import java.util.List;

/**
 * Created by cRAZY on 2017/3/6.
 */
@Repository
public interface JobSchedulerDao {
    public List<JobTimeScheduler> getAllTimerJob();

    public void addTimerJob(JobTimeScheduler job);
}
