package org.sxdata.jingwei.service;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.sxdata.jingwei.dao.SlaveDao;
import org.sxdata.jingwei.entity.CarteClient;
import org.sxdata.jingwei.entity.CarteStatusVo;
import org.sxdata.jingwei.entity.PageforBean;
import org.sxdata.jingwei.entity.Slave;
import org.sxdata.jingwei.util.KettleEncr;

import java.util.List;

/**
 * Created by cRAZY on 2017/2/28.
 */
@Service
public class SlaveServiceImpl implements SlaveService{
    @Autowired
    protected SlaveDao slaveDao;

    @Override
    public PageforBean getThisPageSlave(int start, int limit) throws Exception{
        List<Slave> items=slaveDao.getSlaveByPage(start, limit);
        for(Slave slave:items){
            //对取出的节点密码进行解码重新赋值
            slave.setPassword(KettleEncr.decryptPasswd(slave.getPassword()));
            //获取节点状态的相关信息
            CarteClient carteClient=new CarteClient(slave);
            String status=null;
            status=carteClient.getStatusOrNull();
            boolean dbActive=!carteClient.isDBActive();
            CarteStatusVo carteStatusVo = null;
            if (status != null) {
                if (dbActive) {
                    carteStatusVo = CarteStatusVo.parseXml(status);
                    //设置负载以及节点是否正常
                    slave.setLoadAvg(carteStatusVo.getLoadAvg());
                    slave.setStatus("节点正常");
                } else {
                    slave.setLoadAvg(0);
                    slave.setStatus("该节点连接资源数据库异常");
                }

            } else {
                slave.setLoadAvg(0);
                slave.setStatus("节点异常");
            }
        }
        Integer totalCount=slaveDao.getSlaveTotalCount();
        PageforBean pageBean=new PageforBean();
        pageBean.setTotalProperty(totalCount);
        pageBean.setRoot(items);
        //....
        return pageBean;
    }
}
