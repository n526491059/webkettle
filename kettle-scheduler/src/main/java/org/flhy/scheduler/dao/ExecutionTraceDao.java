package org.flhy.scheduler.dao;

import java.util.List;

import org.flhy.scheduler.beans.ExecutionTrace;

public interface ExecutionTraceDao {
	public List<ExecutionTrace> executionsByName(String jobName);
	public String findLastestStatus(String jobName);
	public ExecutionTrace findById(String fireId);
}
