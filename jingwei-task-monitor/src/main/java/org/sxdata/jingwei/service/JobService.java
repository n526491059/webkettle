package org.sxdata.jingwei.service;

import net.sf.json.JSONObject;
import org.sxdata.jingwei.entity.Job;
import org.sxdata.jingwei.entity.JobTimeScheduler;

import java.util.List;
import java.util.Map;

/**
 * Created by cRAZY on 2017/2/22.
 */
public interface JobService {
    public JSONObject findJobs(int start,int limit,String name,String createDate) throws Exception;

    public void deleteJobs(String[] arrgs,String flag) throws Exception;

    public void executeJob(String path,Integer slaveId) throws Exception;

    public boolean timeExecuteJob(Map<String,Object> params) throws Exception;

    public List<JobTimeScheduler> getAllTimerJob();

    public Job getJobById(Integer jobId);
}
