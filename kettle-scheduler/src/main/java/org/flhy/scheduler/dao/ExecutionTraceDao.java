package org.flhy.scheduler.dao;

import java.util.List;

import org.flhy.scheduler.beans.ExecutionTrace;

public interface ExecutionTraceDao {
	/**
	 * 根据任务名称获取执行日志
	 * 
	 * @param jobName
	 * @return
	 */
	public List<ExecutionTrace> listByName(String jobName);
	/**
	 * 根据日志ID获取执行日志
	 * 
	 * @param fireId
	 * @return
	 */
	public ExecutionTrace findById(String fireId);
	
	/**
	 * 获取该任务的最新状态，不包括正在执行中的任务日志
	 * 
	 * @param jobName
	 * @return
	 */
	public String findLastestStatus(String jobName);
	
	public List<ExecutionTrace> findExecutionTrancesPage(String jobName, int start, int limit);
	public int findExecutionTrancesPageTotal(String jobName);
}
