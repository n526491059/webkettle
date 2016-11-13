package org.flhy.scheduler.dao.impl;

import java.util.List;

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
	
}
