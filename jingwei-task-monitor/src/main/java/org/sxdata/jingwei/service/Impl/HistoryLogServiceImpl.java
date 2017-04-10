package org.sxdata.jingwei.service.Impl;

import net.sf.json.JSONObject;
import org.flhy.ext.Task.ExecutionTraceEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.sxdata.jingwei.bean.PageforBean;
import org.sxdata.jingwei.dao.ExecutionTraceDao;
import org.sxdata.jingwei.service.HistoryLogService;
import org.sxdata.jingwei.util.CommonUtil.StringDateUtil;

import java.util.List;

/**
 * Created by cRAZY on 2017/4/5.
 */
@Service
public class HistoryLogServiceImpl implements HistoryLogService{
    @Autowired
    @Qualifier("taskExecutionTraceDao")
    private ExecutionTraceDao executionTraceDao;

    @Override
    public String getAllHistoryLog(int start, int limit) {
        List<ExecutionTraceEntity> traces=executionTraceDao.getAllLogByPage(start,limit);

        PageforBean json=new PageforBean();
        json.setTotalProperty(executionTraceDao.getAllLogCount());
        json.setRoot(traces);

        return JSONObject.fromObject(json, StringDateUtil.configJson("yyyy-MM-dd HH:mm:ss")).toString();
    }

    @Override
    public String getExecutionTraceById(Integer id) {
        ExecutionTraceEntity trace=executionTraceDao.getTraceById(id);
        return JSONObject.fromObject(trace).toString();
    }
}
