package org.flhy.scheduler.controller;

import java.util.List;

import javax.annotation.Resource;

import org.flhy.ext.PluginFactory;
import org.flhy.ext.base.GraphCodec;
import org.flhy.ext.utils.JSONObject;
import org.flhy.ext.utils.JsonUtils;
import org.flhy.ext.utils.RepositoryUtils;
import org.flhy.ext.utils.StringEscapeHelper;
import org.flhy.scheduler.beans.ExecutionTrace;
import org.flhy.scheduler.service.ExecutionTraceService;
import org.pentaho.di.job.JobMeta;
import org.pentaho.di.trans.TransMeta;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value="/executiontrace")
public class ExecutionTraceController {

	@Resource
	private ExecutionTraceService executionTraceService;
	
	@ResponseBody
	@RequestMapping(method={RequestMethod.POST, RequestMethod.GET}, value="/list")
	protected List<ExecutionTrace> list(String jobName) throws Exception {
		return executionTraceService.list(jobName);
	}
	
	@ResponseBody
	@RequestMapping(method={RequestMethod.POST, RequestMethod.GET}, value="/pagelist")
	protected JSONObject pagelist(String jobName, int start, int limit) throws Exception {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("rows", executionTraceService.listPage(jobName, start, limit));
		jsonObject.put("totalCount", executionTraceService.total(jobName));
		return jsonObject;
	}
	
	@ResponseBody
	@RequestMapping(method=RequestMethod.POST, value="/detail")
	protected void detail(@RequestParam String fireId) throws Exception {
		ExecutionTrace executionTrace = executionTraceService.findById(fireId);
		String jobName = executionTrace.getJobName();
		
		JSONObject jsonObject = new JSONObject();
		TransMeta transMeta = RepositoryUtils.loadTransByPath(jobName);
		if(transMeta != null) {
			jsonObject.put("GraphType", "TransGraph");
			GraphCodec codec = (GraphCodec) PluginFactory.getBean(GraphCodec.TRANS_CODEC);
			String graphXml = codec.encode(transMeta);
			
			jsonObject.put("graphXml", StringEscapeHelper.encode(graphXml));
		} else {
			JobMeta jobMeta = RepositoryUtils.loadJobbyPath(jobName);
			jsonObject.put("GraphType", "JobGraph");
			
			GraphCodec codec = (GraphCodec) PluginFactory.getBean(GraphCodec.JOB_CODEC);
			String graphXml = codec.encode(jobMeta);
			
			jsonObject.put("graphXml", StringEscapeHelper.encode(graphXml));
		}
		jsonObject.put("executionLog", executionTrace.getExecutionLog());
		
		JsonUtils.response(jsonObject);
	}
}
