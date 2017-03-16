package org.sxdata.jingwei.service.Impl;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.pentaho.di.core.Result;
import org.pentaho.di.trans.step.StepStatus;
import org.pentaho.di.www.Carte;
import org.pentaho.di.www.SlaveServerJobStatus;
import org.pentaho.di.www.SlaveServerStatus;
import org.pentaho.di.www.SlaveServerTransStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.sxdata.jingwei.dao.SlaveDao;
import org.sxdata.jingwei.entity.SlaveEntity;
import org.sxdata.jingwei.entity.TaskControlEntity;
import org.sxdata.jingwei.service.ControlService;
import org.sxdata.jingwei.util.TaskUtil.CarteClient;
import org.sxdata.jingwei.util.TaskUtil.KettleEncr;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by cRAZY on 2017/3/10.
 */
//任务监控
@Service
public class ControlServiceImpl implements ControlService {
    @Autowired
    SlaveDao slaveDao;

    @Override
    //获取转换的详情列表
    public List<StepStatus> getTransDetail(String id,String hostName) throws Exception {
        List<StepStatus> stepStatusList=null;
        SlaveEntity slave=slaveDao.getSlaveByHostName(hostName);
        slave.setPassword(KettleEncr.decryptPasswd(slave.getPassword()));
        CarteClient carte=new CarteClient(slave);
        //获取当前节点下所有正在运行的转换
        String status=carte.getStatusOrNull();
        SlaveServerStatus serverStatus = SlaveServerStatus.fromXML(status);
        //遍历这些转换,判断和所需要查询的ID是否相同
        for (SlaveServerTransStatus transStatus : serverStatus.getTransStatusList()) {
            //如果转换没有停止
            if(transStatus.isRunning() || transStatus.isPaused()){
                String transStatusXml = carte.getTransStatus(transStatus.getTransName(), transStatus.getId());
                SlaveServerTransStatus realTransStatus = SlaveServerTransStatus.fromXML(transStatusXml);
                //如果相同则获取当前正在运行的转换详情
                if(realTransStatus.getId().equals(id.trim())){
                    stepStatusList=realTransStatus.getStepStatusList();
                }
            }
        }
        return stepStatusList;
    }

    @Override
    //获取作业日志
    public String getLogDetailForJob(String id,String hostName) throws Exception {
        SlaveEntity slave=slaveDao.getSlaveByHostName(hostName);
        slave.setPassword(KettleEncr.decryptPasswd(slave.getPassword()));
        CarteClient cc=new CarteClient(slave);
        String jobLog=cc.getJobLogText(id);
        return jobLog;
    }

    @Override
    //获取转换日志
    public String getLogDetailForTrans(String id,String hostName) throws Exception {
        SlaveEntity slave=slaveDao.getSlaveByHostName(hostName);
        slave.setPassword(KettleEncr.decryptPasswd(slave.getPassword()));
        CarteClient cc=new CarteClient(slave);
        String transLog=cc.getTransLogText(id);
        return transLog;
    }

    public String transToStatusDesc(SlaveServerTransStatus realTransStatus) {
        String running_status = null;
        if(realTransStatus.isRunning()) {
            running_status = "运行中";
        }else if(realTransStatus.isPaused()){
            running_status = "暂停";
        }else {
            running_status = realTransStatus.getStatusDescription();
        }
        return running_status;
    }

    //暂停/开始转换
    @Override
    public void pauseOrStartTrans(String[] id,String[] hostName) throws Exception {
        for(int i=0;i<id.length;i++){
            SlaveEntity slave=slaveDao.getSlaveByHostName(hostName[i]);
            slave.setPassword(KettleEncr.decryptPasswd(slave.getPassword()));
            CarteClient cc=new CarteClient(slave);
            cc.pauseTrans(id[i]);
        }
    }

    //获取所有运行中的转换
    @Override
    public List<TaskControlEntity> getAllRunningTrans() throws Exception {
        List<TaskControlEntity> items=new ArrayList<TaskControlEntity>();
        //TODO 当前暂无用户模块 默认获取所有节点
        List<SlaveEntity> slaves=slaveDao.getAllSlave();
        for(SlaveEntity slave:slaves){
            //对数据库里取出的密码进行转码
            slave.setPassword(KettleEncr.decryptPasswd(slave.getPassword()));
            CarteClient carte=new CarteClient(slave);
            String status=carte.getStatusOrNull();
            if(status==null) continue;
            SlaveServerStatus serverStatus = SlaveServerStatus.fromXML(status);
            for (SlaveServerTransStatus transStatus : serverStatus.getTransStatusList()) {
                if(transStatus.isRunning() || transStatus.isPaused()){
                    TaskControlEntity item=new TaskControlEntity();
                    String transStatusXml = carte.getTransStatus(transStatus.getTransName(), transStatus.getId());
                    SlaveServerTransStatus realTransStatus = SlaveServerTransStatus.fromXML(transStatusXml);
                    item.setType("转换");
                    item.setHostName(slave.getHostName());
                    item.setName(realTransStatus.getTransName());
                    item.setId(transStatus.getId());
                    if(transStatus.isRunning()){
                        item.setIsStart("正在运行");
                    }else if(transStatus.isPaused()){
                        item.setIsStart("已暂停");
                    }
                    items.add(item);
                }
            }
        }
        return items;
    }

    @Override
    //获取所有运行中的作业
    public List<TaskControlEntity> getAllRunningJob() throws Exception{
        //返回前台的JSON数组 用于填充panel
        ;List<TaskControlEntity> items=new ArrayList<>();
        //TODO 当前暂无用户模块 默认获取所有节点
        List<SlaveEntity> slaves=slaveDao.getAllSlave();
        for(SlaveEntity slave:slaves){
            slave.setPassword(KettleEncr.decryptPasswd(slave.getPassword()));
            CarteClient carte=new CarteClient(slave);
            String status=carte.getStatusOrNull();
            if(status==null) continue;
            SlaveServerStatus serverStatus=SlaveServerStatus.fromXML(status);
            for(SlaveServerJobStatus jobStatus:serverStatus.getJobStatusList()){
                if(jobStatus.isRunning()){
                    TaskControlEntity item=new TaskControlEntity();
                    String jobStatusxml=carte.getJobStatus(jobStatus.getJobName(), jobStatus.getId());
                    SlaveServerJobStatus realJobStatus=SlaveServerJobStatus.fromXML(jobStatusxml);
                    Result result=realJobStatus.getResult();
                    String loggingString=realJobStatus.getLoggingString();
                    String startDate=loggingString.length()<20?loggingString:loggingString.substring(0,19);
                    int slaveId=slave.getSlaveId();
                    //根据前台展示需求来封装 暂时只展示作业名以及所运行节点
                    item.setHostName(slave.getHostName());
                    item.setId(realJobStatus.getId());
                    item.setName(jobStatus.getJobName());
                    item.setType("作业");
                    item.setIsStart("");
                    //组装数据
                    /*item.put("id",realJobStatus.getId());
                    item.put("statusDecription",realJobStatus.getStatusDescription());
                    item.put("slaveId",slaveId);
                    if(result!=null){
                        item.put("inputRead",result.getNrLinesInput()+result.getNrLinesRead());
                        item.put("outputWrite",result.getNrLinesOutput()+result.getNrLinesWritten());
                        item.put("NrErros",result.getNrErrors());
                    }else{
                        item.put("inputRead",0);
                        item.put("outputWrite",0);
                        item.put("NrErros",0);
                    }
                    item.put("startDate",startDate);*/
                    items.add(item);
                }
            }
        }
        return  items;
    }

    @Override
    public void stopTrans(String id,String hostName) throws Exception {
        SlaveEntity slave=slaveDao.getSlaveByHostName(hostName);
        slave.setPassword(KettleEncr.decryptPasswd(slave.getPassword()));
        CarteClient cc=new CarteClient(slave);
        cc.stopTrans(id);
    }

    @Override
    public void stopJob(String id,String hostName) throws Exception {
        SlaveEntity slave=slaveDao.getSlaveByHostName(hostName);
        slave.setPassword(KettleEncr.decryptPasswd(slave.getPassword()));
        CarteClient cc=new CarteClient(slave);
        cc.stopJob(id);
    }
}
