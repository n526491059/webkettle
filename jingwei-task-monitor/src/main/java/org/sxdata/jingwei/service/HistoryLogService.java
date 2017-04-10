package org.sxdata.jingwei.service;

/**
 * Created by cRAZY on 2017/4/5.
 */
public interface HistoryLogService {
    public String getAllHistoryLog(int start,int limit);

    public String getExecutionTraceById(Integer id);

}
