package org.flhy.scheduler.listener;

import java.util.Date;

import org.flhy.ext.utils.ExceptionUtils;
import org.flhy.scheduler.beans.ExecutionTrace;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.JobListener;

public class GlobalJobListener extends SqlSessionDaoSupport implements JobListener {

	public String getName() {
		return getClass().getName();
	}
	
	public void jobExecutionVetoed(JobExecutionContext context) {
		System.out.println("123");
	}

	@Override
	public void jobToBeExecuted(JobExecutionContext context) {
		ExecutionTrace trace = new ExecutionTrace();
		trace.setFireId(context.getFireInstanceId());
		trace.setJobName(context.getJobDetail().getKey().getName());
		trace.setStartTime(context.getFireTime());
		
		getSqlSession().insert("scheduler.createExecutionTrace", trace);
	}

	@Override
	public void jobWasExecuted(JobExecutionContext context, JobExecutionException jee) {
		try {
			String status = "成功", executionLog = context.getMergedJobDataMap().getString("executionLog");
			if(jee != null) {
				status = "程序错误";
				executionLog = ExceptionUtils.toString(jee);
			} else if( context.getMergedJobDataMap().getLong("error") > 0) 
				status = "失败";
			
			ExecutionTrace trace = getSqlSession().selectOne("scheduler.loadExecutionTrace", context.getFireInstanceId());
			trace.setEndTime(new Date());
			trace.setExecutionConfiguration(context.getMergedJobDataMap().getString("executionConfiguration"));
			trace.setExecMethod(context.getMergedJobDataMap().getString("execMethod"));
			trace.setStatus(status);
			trace.setExecutionLog(executionLog);
			getSqlSession().update("scheduler.finishExecutionTrace", trace);
		} catch(Exception e) {
			e.printStackTrace();
		}
	}

}
