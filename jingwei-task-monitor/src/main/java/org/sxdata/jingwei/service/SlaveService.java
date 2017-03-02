package org.sxdata.jingwei.service;

import org.sxdata.jingwei.entity.PageforBean;
import org.sxdata.jingwei.entity.Slave;

import java.util.List;

/**
 * Created by cRAZY on 2017/2/28.
 */
public interface SlaveService {
    public PageforBean getThisPageSlave(int start,int limit) throws Exception;

    public List<Slave> getAllSlave() throws Exception;

    public Slave getSlaveByLoadAvg(List<Slave> slaves) throws Exception;
}
