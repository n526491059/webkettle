package org.sxdata.jingwei.service;

import net.sf.json.JSONObject;

/**
 * Created by cRAZY on 2017/2/22.
 */
public interface TransService {
    public JSONObject findTrans(int start,int limit,String namme,String date) throws Exception;

    public void deleteTransformation(String[] args,String flag) throws Exception;

    public void executeTransformation(String path,Integer slaveId) throws Exception;


}
