package org.sxdata.jingwei.service;

import org.sxdata.jingwei.bean.PageforBean;
import org.sxdata.jingwei.entity.SlaveEntity;

import java.util.List;

/**
 * Created by cRAZY on 2017/2/28.
 */
public interface SlaveService {

    public List<SlaveEntity> getAllSlave() throws Exception;

    public SlaveEntity getSlaveByLoadAvg(List<SlaveEntity> slaves) throws Exception;

    public PageforBean findSlaveByPageInfo(Integer start,Integer limit) throws Exception;

    public void deleteSlave(String[] items) throws Exception;

    public String slaveTest(String hostName) throws Exception;

    public String allSlaveQuato() throws Exception;

    public String slaveQuatoByCondition(String quatoType,String viewType,String maxOrAvg,String chooseDate) throws Exception;

    public String slaveQuatoLineChart(String quatoType,String maxOrAvg,String chooseDate) throws Exception;

    public String slaveQuatoColumnDiagram(String quatoType,String maxOrAvg,String chooseDate) throws Exception;

    public String slaveQuatoHTMLText(String quatoType,String maxOrAvg,String chooseDate) throws Exception;

}
