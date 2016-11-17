package org.flhy.scheduler.service;

import java.util.List;

import org.flhy.scheduler.beans.ExecutionTrace;

/**
 * 执行日志服务层
 * 
 * @author Liuhy
 *
 */
public interface ExecutionTraceService {

	/**
	 * 根据任务名称查找执行日志
	 * 
	 * @param jobName
	 * @return
	 */
	public List<ExecutionTrace> list(String jobName);
	
	/**
	 * 分页查询该任务的执行日志
	 * 
	 * @param jobName - 任务名
	 * @param start - 起始页
	 * @param limit - 页大小
	 * @return
	 */
	public List<ExecutionTrace> listPage(String jobName, int start, int limit);
	
	/**
	 * 查询该任务的日志总数
	 * 
	 * @param jobName - 任务名
	 * @return
	 */
	public int total(String jobName);
	
	/**
	 * 根据日志ID查找日志
	 * 
	 * @param fireId - 任务ID
	 * @return
	 */
	public ExecutionTrace findById(String fireId);
	
}
