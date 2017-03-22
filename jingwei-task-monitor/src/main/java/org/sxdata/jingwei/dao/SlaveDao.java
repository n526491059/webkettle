package org.sxdata.jingwei.dao;

import org.springframework.stereotype.Repository;
import org.sxdata.jingwei.entity.SlaveEntity;

import java.util.List;

/**
 * Created by cRAZY on 2017/2/28.
 */
@Repository
public interface SlaveDao {

    public Integer getSlaveTotalCount();

    public SlaveEntity getSlaveById(Integer id);

    public List<SlaveEntity> getAllSlave();

    public SlaveEntity getSlaveByHostName(String hostName);

    public List<SlaveEntity> findSlaveByPageInfo(Integer start,Integer limit);

}
