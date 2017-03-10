package org.sxdata.jingwei.controller;

import org.flhy.ext.utils.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.sxdata.jingwei.entity.SlaveEntity;
import org.sxdata.jingwei.service.SlaveService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.util.List;


/**
 * Created by cRAZY on 2017/2/28.
 */
@Controller
@RequestMapping(value="/slave")
public class SlaveController {

    @Autowired
    protected SlaveService slaveService;

    //获得节点信息 以panel形式显示
    @RequestMapping(value="/getSlave")
    @ResponseBody
    protected void getJobs(HttpServletResponse response,HttpServletRequest request) {
        try{

            List<SlaveEntity> result=slaveService.getAllSlave();
            response.setContentType("text/html;charset=utf-8");
            PrintWriter out=response.getWriter();
            out.write(JSONArray.fromObject(result).toString());
            out.flush();
            out.close();
        }catch(Exception e){

        }
    }

    //获取节点信息 以下拉列表形式展现
    @RequestMapping(value="/getSlaveSelect")
    @ResponseBody
    protected void getSlaveSelect(HttpServletResponse response,HttpServletRequest request){
        try{
            StringBuffer sbf=new StringBuffer("[");
            List<SlaveEntity> slaves=slaveService.getAllSlave();
            for(int i=0;i<slaves.size();i++){
                String thisSlaveJson="";
                String host="\""+slaves.get(i).getHostName()+"\"";
                String hostId="\""+"hostId"+"\"";
                String hostName="\""+"hostName"+"\"";
                if(i!=slaves.size()-1){
                    thisSlaveJson="{"+hostId+":"+host+","+hostName+":"+host+"},";
                }else{
                    thisSlaveJson="{"+hostId+":"+host+","+hostName+":"+host+"}";
                }
                sbf.append(thisSlaveJson);
            }
            sbf.append("]");
            System.out.println(sbf.toString());
            response.setContentType("text/html;charset=utf-8");
            PrintWriter out=response.getWriter();
            out.write(sbf.toString());
            out.flush();
            out.close();
        }catch(Exception e){

        }
    }
}
