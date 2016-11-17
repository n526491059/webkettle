package org.flhy.scheduler.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.flhy.scheduler.beans.ExecutionTrace;
import org.flhy.scheduler.dao.ExecutionTraceDao;
import org.flhy.scheduler.service.ExecutionTraceService;
import org.springframework.stereotype.Service;

@Service
public class ExecutionTraceServiceImpl implements ExecutionTraceService {

	@Resource
	private ExecutionTraceDao executionTraceDao;
	
	@Override
	public List<ExecutionTrace> list(String jobName) {
		return executionTraceDao.listByName(jobName);
	}

	@Override
	public List<ExecutionTrace> listPage(String jobName, int start, int limit) {
		return executionTraceDao.findExecutionTrancesPage(jobName, start, limit);
	}

	@Override
	public int total(String jobName) {
		return executionTraceDao.findExecutionTrancesPageTotal(jobName);
	}

	@Override
	public ExecutionTrace findById(String fireId) {
		return executionTraceDao.findById(fireId);
	}

}
