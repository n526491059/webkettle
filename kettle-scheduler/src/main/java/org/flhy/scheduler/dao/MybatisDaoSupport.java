package org.flhy.scheduler.dao;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class MybatisDaoSupport extends SqlSessionDaoSupport implements ApplicationContextAware {

	@Override
	public void setApplicationContext(ApplicationContext context) throws BeansException {
		 setSqlSessionFactory(context.getBean(SqlSessionFactory.class));
	}

}
