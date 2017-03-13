package org.sxdata.jingwei.service;

import org.sxdata.jingwei.entity.SlaveEntity;

import java.util.List;

/**
 * Created by cRAZY on 2017/2/28.
 */
public interface SlaveService {

    public List<SlaveEntity> getAllSlave() throws Exception;

    public SlaveEntity getSlaveByLoadAvg(List<SlaveEntity> slaves) throws Exception;
}
