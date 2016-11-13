package org.flhy.scheduler.runner;

import org.flhy.ext.JobExecutor;
import org.flhy.ext.job.JobExecutionConfigurationCodec;
import org.flhy.ext.utils.JSONObject;
import org.flhy.ext.utils.RepositoryUtils;
import org.flhy.ext.utils.StringEscapeHelper;
import org.pentaho.di.job.JobExecutionConfiguration;
import org.pentaho.di.job.JobMeta;
import org.quartz.DisallowConcurrentExecution;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.PersistJobDataAfterExecution;

@PersistJobDataAfterExecution
@DisallowConcurrentExecution
public class JobRunner implements Job {

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		try {
			String path = context.getJobDetail().getKey().getName();
			JobMeta jobMeta = RepositoryUtils.loadJobbyPath(path);
			
			JSONObject jsonObject = JSONObject.fromObject(context.getMergedJobDataMap().getString("executionConfiguration"));
			JobExecutionConfiguration jobExecutionConfiguration = JobExecutionConfigurationCodec.decode(jsonObject, jobMeta);
		    
		    JobExecutor jobExecutor = JobExecutor.initExecutor(jobExecutionConfiguration, jobMeta);
		    Thread tr = new Thread(jobExecutor, "JobExecutor_" + jobExecutor.getExecutionId());
		    tr.start();
		    
		    while(!jobExecutor.isFinished()) {
		    	Thread.sleep(1000);
		    }
		    
		    JSONObject result = new JSONObject();
		    result.put("finished", jobExecutor.isFinished());
			if(jobExecutor.isFinished()) {
				result.put("jobMeasure", jobExecutor.getJobMeasure());
				result.put("log", StringEscapeHelper.encode(jobExecutor.getExecutionLog()));
			} else {
				result.put("jobMeasure", jobExecutor.getJobMeasure());
				result.put("log", StringEscapeHelper.encode(jobExecutor.getExecutionLog()));
			}
			context.getMergedJobDataMap().put("execMethod", jobExecutionConfiguration.isExecutingLocally() ? "本地" : "远程:" + jobExecutionConfiguration.getRemoteServer().getName());
			context.getMergedJobDataMap().put("error", jobExecutor.getErrCount());
			context.getMergedJobDataMap().put("executionLog", result.toString());
		    
		} catch(Exception e) {
			e.printStackTrace();
			throw new JobExecutionException(e);
		}
	}

}
