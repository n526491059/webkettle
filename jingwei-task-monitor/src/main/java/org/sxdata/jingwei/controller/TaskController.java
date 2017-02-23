package org.sxdata.jingwei.controller;

import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.sxdata.jingwei.service.JobService;
import org.sxdata.jingwei.service.TransService;
import org.sxdata.jingwei.util.Util;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;


/**
 * Created by pengpai on 2017/1/18 0018.
 */
@Controller
@RequestMapping(value="/task")
public class TaskController {
    @Autowired
    protected TransService transService;
    @Autowired
    protected JobService jobService;


    //作业管理
    @RequestMapping(value="/getJobs.do")
    @ResponseBody
    protected void getJobs(HttpServletResponse response,HttpServletRequest request) throws Exception {

        int start=Integer.parseInt(request.getParameter("start"));
        int limit=Integer.parseInt(request.getParameter("limit"));
        String name=request.getParameter("name");
        String createDate=request.getParameter("date");

        JSONObject result=jobService.findJobs(start,limit,name,createDate);
        response.setContentType("text/html;charset=utf-8");
        PrintWriter out=response.getWriter();
        out.write(result.toString());
        out.flush();
        out.close();

    }

    //转换管理
    @ResponseBody
    @RequestMapping(method=RequestMethod.POST, value="/getTrans")
    protected void getTrans(HttpServletResponse response,HttpServletRequest request) throws Exception {
        //获取前台传递的分页参数
        String transName=request.getParameter("name");
        int start=Integer.parseInt(request.getParameter("start"));
        int limit=Integer.parseInt(request.getParameter("limit"));
        String createDate=request.getParameter("date");
        JSONObject result=transService.findTrans(start,limit,transName,createDate);
        //输出结果返回给客户端
        response.setContentType("text/html;charset=utf-8");
        PrintWriter out=response.getWriter();
        out.write(result.toString());
        out.flush();
        out.close();
    }

}
