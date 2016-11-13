package org.flhy.scheduler.dao.impl;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.flhy.scheduler.beans.ExecutionTrace;
import org.flhy.scheduler.dao.ExecutionTraceDao;
import org.mybatis.spring.support.SqlSessionDaoSupport;

public class ExecutionTraceDaoImpl extends SqlSessionDaoSupport implements ExecutionTraceDao {

	@Override
	public List<ExecutionTrace> executionsByName(String jobName) {
		return getSqlSession().selectList("scheduler.findExecutionTrances", jobName);
	}

	@Override
	public String findLastestStatus(String jobName) {
		List<String> list = getSqlSession().selectList("scheduler.findLastestStatus", jobName);
		if(list != null && list.size() > 0)
			return list.get(0);
		return null;
	}
	
	@Override
	public ExecutionTrace findById(String fireId) {
		return getSqlSession().selectOne("scheduler.loadExecutionTrace", fireId);
	}

	@Override
	public List<ExecutionTrace> findExecutionTrancesPage(String jobName, int start, int limit) {
		HashMap params = new HashMap();
		params.put("jobName", jobName);
		params.put("start", start);
		params.put("limit", limit);
		return getSqlSession().selectList("scheduler.findExecutionTrancesPage", params);
	}

	@Override
	public int findExecutionTrancesPageTotal(String jobName) {
		return getSqlSession().selectOne("scheduler.findExecutionTrancesPageTotal", jobName);
	}
	
}
