package org.sxdata.jingwei.controller;

import net.sf.json.JSONObject;
import org.flhy.ext.utils.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.sxdata.jingwei.entity.PageforBean;
import org.sxdata.jingwei.entity.Slave;
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

    //获得节点信息
    @RequestMapping(value="/getSlave")
    @ResponseBody
    protected void getJobs(HttpServletResponse response,HttpServletRequest request) {
        try{

            List<Slave> result=slaveService.getAllSlave();
            response.setContentType("text/html;charset=utf-8");
            PrintWriter out=response.getWriter();
            out.write(JSONArray.fromObject(result).toString());
            out.flush();
            out.close();
        }catch(Exception e){

        }
    }
}
