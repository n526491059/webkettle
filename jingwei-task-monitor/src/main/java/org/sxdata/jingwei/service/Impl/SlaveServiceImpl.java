package org.sxdata.jingwei.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.sxdata.jingwei.dao.SlaveDao;
import org.sxdata.jingwei.service.SlaveService;
import org.sxdata.jingwei.util.TaskUtil.CarteClient;
import org.sxdata.jingwei.util.TaskUtil.CarteStatusVo;
import org.sxdata.jingwei.entity.SlaveEntity;
import org.sxdata.jingwei.util.TaskUtil.KettleEncr;

import java.util.List;

/**
 * Created by cRAZY on 2017/2/28.
 */
@Service
public class SlaveServiceImpl implements SlaveService {
    @Autowired
    protected SlaveDao slaveDao;

    @Override
    //获取所有节点信息
    public List<SlaveEntity> getAllSlave() throws Exception {
        List<SlaveEntity> slaves=slaveDao.getAllSlave();
        for(SlaveEntity slave:slaves){
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
                    slave.setStatus("<font color='green'>节点正常</font>");
                } else {
                    slave.setLoadAvg(0);
                    slave.setStatus("<font color='red'>该节点连接资源数据库异常</font>");
                }
            } else {
                slave.setLoadAvg(0);
                slave.setStatus("<font color='red'>节点异常</font>");
            }
        }
        return slaves;
    }

    @Override
    //选择一个负载指数最低的节点
    public SlaveEntity getSlaveByLoadAvg(List<SlaveEntity> slaves) throws Exception {
        SlaveEntity minSlave=null;
        if(slaves!=null && slaves.size()>0){
            //把不正常的节点移除
            for(int i=0;i<slaves.size();i++){
                if (slaves.get(i).getLoadAvg()==0){
                    slaves.remove(i);
                }
            }
            if(slaves.size()==1){
                minSlave=slaves.get(0);
            }else if(slaves.size()>1){
                minSlave=slaves.get(0);
                for(int i=0;i<slaves.size();i++){
                    if (slaves.get(i).getLoadAvg()<minSlave.getLoadAvg()){
                        minSlave=slaves.get(i+1);
                    }
                }
            }
        }
        return minSlave;
    }
}
