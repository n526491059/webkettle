package org.sxdata.jingwei.service;

/**
 * Created by cRAZY on 2017/4/5.
 */
public interface HistoryLogService {
    public String getAllHistoryLog(int start,int limit,String statu,String type,String startDate,String taskName,String userGroupName);

    public String getExecutionTraceById(Integer id);

}
