package org.flhy.ext.Task;

import org.apache.ibatis.session.SqlSession;
import org.flhy.ext.Task.MybatisDaoSuppo;
import org.flhy.ext.Task.ExecutionTraceEntity;
import org.springframework.stereotype.Repository;

/**
 * Created by cRAZY on 2017/3/31.
 */
public class ExecutionTraceDaoImpl implements ExecutionTraceDao{

    @Override
    public void addExecutionTrace(ExecutionTraceEntity trace) {
        SqlSession session=MybatisDaoSuppo.sessionFactory.openSession();
        session.insert("ExecutionTraceDao.addExecutionTrace",trace);
        session.commit();
        session.close();
    }
}
