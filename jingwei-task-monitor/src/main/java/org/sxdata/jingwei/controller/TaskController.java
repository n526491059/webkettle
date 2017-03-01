package org.sxdata.jingwei.controller;

import net.sf.json.JSONObject;
import org.flhy.ext.App;
import org.pentaho.di.repository.Repository;
import org.pentaho.di.repository.RepositoryDirectoryInterface;
import org.pentaho.di.repository.RepositoryObjectType;
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
import java.io.IOException;
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


    //查询作业;包括条件查询
    @RequestMapping(value="/getJobs.do")
    @ResponseBody
    protected void getJobs(HttpServletResponse response,HttpServletRequest request) {
        try{
            //获取前台传递的分页参数
            int start=Integer.parseInt(request.getParameter("start"));
            int limit=Integer.parseInt(request.getParameter("limit"));
            //获取前台传递的查询参数 作业名以及创建时间 如果为空则代表是全部查询
            String name=request.getParameter("name");
            String createDate=request.getParameter("date");

            JSONObject result=jobService.findJobs(start, limit, name, createDate);

            response.setContentType("text/html;charset=utf-8");
            PrintWriter out=response.getWriter();
            out.write(result.toString());
            out.flush();
            out.close();
        }catch (Exception e){
            String errorMessage=e.getMessage();
            e.printStackTrace();
        }
    }

    //删除作业OR转换
    @RequestMapping(value="/delete")
    @ResponseBody
    protected void deleteJobs(HttpServletResponse response,HttpServletRequest request) {
        try{
            String[] pathArray=request.getParameterValues("path");
            String flag=request.getParameter("flag");
            //判断是需要删除转换还是需要删除作业
            if (flag.equals("transformation")){
                transService.deleteTransformation(pathArray,flag);
            }else if(flag.equals("job")){
                jobService.deleteJobs(pathArray,flag);
            }

        }catch (Exception e){
            String errorMessage=e.getMessage();
            e.printStackTrace();
        }
    }


    //查询转换;包括条件查询
    @ResponseBody
    @RequestMapping(method=RequestMethod.POST, value="/getTrans")
    protected void getTrans(HttpServletResponse response,HttpServletRequest request) {
        try{
            //获取前台传递的分页参数
            int start=Integer.parseInt(request.getParameter("start"));
            int limit=Integer.parseInt(request.getParameter("limit"));
            //获取前台传递的查询参数转换名以及创建时间 如果两个参数为空则代表是查询全部
            String transName=request.getParameter("name");
            String createDate=request.getParameter("date");

            JSONObject result=transService.findTrans(start, limit, transName, createDate);
            //输出结果返回给客户端
            response.setContentType("text/html;charset=utf-8");
            PrintWriter out=response.getWriter();
            out.write(result.toString());
            out.flush();
            out.close();
        }catch (Exception e){
            String errorMessage=e.getMessage();
            e.printStackTrace();
        }
    }

    //在节点上执行转换OR作业
    @ResponseBody
    @RequestMapping(value="/execute")
    protected void execute(HttpServletResponse response,HttpServletRequest request) {
        try{
            String path=request.getParameter("path");
            String hostName=request.getParameter("hostName");
            Integer slaveId=Integer.valueOf(request.getParameter("slaveId"));
            String flag=request.getParameter("flag");
            if(flag.equals("job")){
                jobService.executeJob(path,hostName,slaveId);
            }else if(flag.equals("transformation")){
                transService.executeTransformation(path,hostName,slaveId);
            }
            //输出结果返回给客户端
            response.setContentType("text/html;charset=utf-8");
            PrintWriter out=response.getWriter();
            out.write("......");
            out.flush();
            out.close();
        }catch (Exception e){
            String errorMessage=e.getMessage();
            e.printStackTrace();
        }
    }

}
