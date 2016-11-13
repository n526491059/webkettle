package org.flhy.scheduler.runner;

import org.flhy.ext.TransExecutor;
import org.flhy.ext.trans.TransExecutionConfigurationCodec;
import org.flhy.ext.utils.JSONObject;
import org.flhy.ext.utils.RepositoryUtils;
import org.pentaho.di.trans.TransExecutionConfiguration;
import org.pentaho.di.trans.TransMeta;
import org.quartz.DisallowConcurrentExecution;
import org.quartz.Job;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.PersistJobDataAfterExecution;

@PersistJobDataAfterExecution
@DisallowConcurrentExecution
public class TransRunner implements Job {

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		try {
			String path = context.getJobDetail().getKey().getName();
			TransMeta transMeta = RepositoryUtils.loadTransByPath(path);
			
			JSONObject jsonObject = JSONObject.fromObject(context.getMergedJobDataMap().getString("executionConfiguration"));
			TransExecutionConfiguration transExecutionConfiguration = TransExecutionConfigurationCodec.decode(jsonObject, transMeta);
		    
		    TransExecutor transExecutor = TransExecutor.initExecutor(transExecutionConfiguration, transMeta);
		    Thread tr = new Thread(transExecutor, "TransExecutor_" + transExecutor.getExecutionId());
		    tr.start();
		    
		    while(!transExecutor.isFinished()) {
		    	Thread.sleep(1000);
		    }
		    
		    JSONObject result = new JSONObject();
		    result.put("finished", transExecutor.isFinished());
			if(transExecutor.isFinished()) {
				result.put("stepMeasure", transExecutor.getStepMeasure());
				result.put("log", transExecutor.getExecutionLog());
				result.put("stepStatus", transExecutor.getStepStatus());
			} else {
				result.put("stepMeasure", transExecutor.getStepMeasure());
				result.put("log", transExecutor.getExecutionLog());
				result.put("stepStatus", transExecutor.getStepStatus());
			}
			String execMethod = "本地";
			if(transExecutionConfiguration.isExecutingRemotely())
				execMethod = "远程:" + transExecutionConfiguration.getRemoteServer().getName();
			else if(transExecutionConfiguration.isExecutingClustered())
				execMethod = "集群";
			
			JobDataMap dataMap = context.getJobDetail().getJobDataMap();
			
			dataMap.put("execMethod",  execMethod );
			dataMap.put("error", Long.valueOf(transExecutor.getErrCount()));
//			dataMap.put("executionConfiguration", jsonObject.toString());
			dataMap.put("executionLog", result.toString());
		    
		} catch(Exception e) {
			e.printStackTrace();
			throw new JobExecutionException(e);
		}
		
	}

}
