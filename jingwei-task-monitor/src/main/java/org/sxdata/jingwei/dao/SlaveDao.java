package org.sxdata.jingwei.dao;

import org.springframework.stereotype.Repository;
import org.sxdata.jingwei.entity.Slave;

import java.util.List;

/**
 * Created by cRAZY on 2017/2/28.
 */
@Repository
public interface SlaveDao {

    public Integer getSlaveTotalCount();

    public Slave getSlaveById(Integer id);

    public List<Slave> getAllSlave();
}
