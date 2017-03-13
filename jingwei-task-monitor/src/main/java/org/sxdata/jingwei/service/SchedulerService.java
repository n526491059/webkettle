package org.sxdata.jingwei.service;

import net.sf.json.JSONObject;
import org.sxdata.jingwei.bean.PageforBean;

import java.util.Map;

/**
 * Created by cRAZY on 2017/3/8.
 */
public interface SchedulerService {
    public PageforBean getAllSchedulerByPage(int start,int limit,Integer typeId,String slaves,String jobName) throws Exception;

    public void deleteScheduler(String[] taskIdArray) throws Exception;

    public JSONObject beforeUpdate(String taskId);

    public boolean updateSchedulerJob(Map<String,Object> params) throws Exception;
}
