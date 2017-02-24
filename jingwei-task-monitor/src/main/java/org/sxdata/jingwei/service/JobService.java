package org.sxdata.jingwei.service;

import net.sf.json.JSONObject;

/**
 * Created by cRAZY on 2017/2/22.
 */
public interface JobService {
    public JSONObject findJobs(int start,int limit,String name,String createDate) throws Exception;

    public void deleteJobs(String[] arrgs) throws Exception;
}
