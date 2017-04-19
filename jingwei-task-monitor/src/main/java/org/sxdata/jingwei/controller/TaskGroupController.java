package org.sxdata.jingwei.controller;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.sxdata.jingwei.entity.TaskGroupAttributeEntity;
import org.sxdata.jingwei.entity.TaskGroupEntity;
import org.sxdata.jingwei.entity.UserGroupAttributeEntity;
import org.sxdata.jingwei.service.TaskGroupService;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by cRAZY on 2017/3/22.
 */
@Controller
@RequestMapping(value="/taskGroup")
public class TaskGroupController {
    @Autowired
    protected TaskGroupService taskGroupService;

    //分配任务组前    查询任务组下是否包含了用户选择的任务
    @RequestMapping(value = "/isContainsTaskBeforeAssigned")
    @ResponseBody
    protected void isContainsTaskBeforeAssigned(HttpServletRequest request,HttpServletResponse response){
        try{
            String taskName=request.getParameter("name");
            String type=request.getParameter("type");
            //获取当前用户所在的用户组
            UserGroupAttributeEntity attr=(UserGroupAttributeEntity)request.getSession().getAttribute("userInfo");
            String userGroupName=attr.getUserGroupName();
            List<TaskGroupEntity> items=taskGroupService.isContainsTask(taskName,type,userGroupName);
            response.setContentType("text/html;charset=utf-8");
            PrintWriter out=response.getWriter();
            out.write(JSONArray.fromObject(items).toString());
            out.flush();
            out.close();
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    //分配任务组
    @RequestMapping(value = "/assignedTaskGroup")
    @ResponseBody
    protected void assignedTaskGroup(HttpServletRequest request,HttpServletResponse response){
        Integer taskId=Integer.valueOf(request.getParameter("taskId"));
        String taskPath=request.getParameter("taskPath");
        String taskName=request.getParameter("taskName");
        String type=request.getParameter("type");
        try{
            String[] taskGroupArray=request.getParameterValues("taskGroupNameArray");
            List<TaskGroupAttributeEntity> items=new ArrayList<TaskGroupAttributeEntity>();
            if(taskGroupArray.length>0 && taskGroupArray[0]!=null && !taskGroupArray[0].trim().equals("")){
                for(String taskGroupName:taskGroupArray){
                    TaskGroupAttributeEntity item=new TaskGroupAttributeEntity();
                    item.setTaskGroupName(taskGroupName);
                    item.setTaskName(taskName);
                    item.setTaskPath(taskPath);
                    item.setTaskId(taskId);
                    item.setType(type);
                    items.add(item);
                }
            }
            taskGroupService.assignedTaskGroup(items,taskName,type);
            response.setContentType("text/html;charset=utf-8");
            PrintWriter out=response.getWriter();
            out.write("success");
            out.flush();
            out.close();
        }catch (IOException e){
            e.printStackTrace();
        }
    }

    //删除任务组
    @RequestMapping(value = "/deleteTaskGroup")
    @ResponseBody
    protected void deleteTaskGroup(HttpServletRequest request,HttpServletResponse response){
        try{
            String[] names=request.getParameterValues("name");
            taskGroupService.deleteTaskGroupAndAttributes(names);
            response.setContentType("text/html;charset=utf-8");
            PrintWriter out=response.getWriter();
            out.write("success");
            out.flush();
            out.close();
        }catch (IOException e){
            e.printStackTrace();
        }
    }

    //获取任务组列表
    @RequestMapping(value="/AlltaskGroup")
    @ResponseBody
    protected void getAllTaskGroup(HttpServletResponse response,HttpServletRequest request){
        try{
            Integer start=Integer.valueOf(request.getParameter("start"));
            Integer limit=Integer.valueOf(request.getParameter("limit"));
            //获取当前用户所在的用户组
            UserGroupAttributeEntity attr=(UserGroupAttributeEntity)request.getSession().getAttribute("userInfo");
            String userGroupName=attr.getUserGroupName();
            String result=taskGroupService.getAllTaskGroupByLogin(start, limit, userGroupName);
            response.setContentType("text/html;charset=utf-8");
            PrintWriter out=response.getWriter();
            out.write(result);
            out.flush();
            out.close();
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    //添加新的任务组
    @RequestMapping(value="/addTaskGroup")
    @ResponseBody
    protected void addTaskGroup(HttpServletResponse response,HttpServletRequest request){
        try{
            List<TaskGroupAttributeEntity> attributes=new ArrayList<TaskGroupAttributeEntity>();
            String taskGroupDesc=request.getParameter("taskGroupDesc");
            String taskGroupName=request.getParameter("taskGroupName").trim();
            String flag=request.getParameter("flag");
            //获取当前用户所在的用户组
            UserGroupAttributeEntity attr=(UserGroupAttributeEntity)request.getSession().getAttribute("userInfo");
            String userGroupName=attr.getUserGroupName();

            TaskGroupEntity taskGroup=new TaskGroupEntity();
            taskGroup.setTaskGroupName(taskGroupName);
            taskGroup.setTaskGroupDesc(taskGroupDesc);
            if(flag.equals("Y")){
                String taskArray=request.getParameter("taskArray");
                //获取前台传递的json数组 每一个json存放 任务ID 任务类型
                JSONArray jsons=JSONArray.fromObject(taskArray);
                for(int i=0;i<jsons.size();i++){
                    JSONObject json=jsons.getJSONObject(i);
                    TaskGroupAttributeEntity item=new TaskGroupAttributeEntity();
                    item.setType((String) json.get("type"));
                    item.setTaskId(Integer.valueOf((String) json.get("taskId")));
                    item.setTaskPath((String) json.get("taskPath"));
                    item.setTaskName((String) json.get("taskName"));
                    item.setTaskGroupName(taskGroupName);
                    attributes.add(item);
                }
            }
            taskGroupService.addTaskGroup(taskGroup,attributes,userGroupName);
            response.setContentType("text/html;charset=utf-8");
            PrintWriter out=response.getWriter();
            out.write("");
            out.flush();
            out.close();
        }catch (IOException e){
            e.printStackTrace();
        }
    }

    //添加新的任务组前先获取该用户下所有的作业以及转换
    @RequestMapping(value="/getAllTaskBeforeAdd")
    @ResponseBody
    protected void getAllTaskBeforeAdd(HttpServletResponse response,HttpServletRequest request){
        try{
            //获取当前用户所在的用户组
            UserGroupAttributeEntity attr=(UserGroupAttributeEntity)request.getSession().getAttribute("userInfo");
            String userGroupName=attr.getUserGroupName();
            String taskList=taskGroupService.getAllTaskBeforeAdd(userGroupName);
            response.setContentType("text/html;charset=utf-8");
            PrintWriter out=response.getWriter();
            out.write(taskList);
            out.flush();
            out.close();
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    //添加/修改任务组前先判断该任务组名是否存在
    @RequestMapping(value="/decideGroupNameExist")
    @ResponseBody
    protected void decideGroupNameExist(HttpServletResponse response,HttpServletRequest request){
        try{
            String name=request.getParameter("name");
            String result="";
            if(taskGroupService.decideGroupNameExist(name)){
                result="Y";
            }else{
                result="N";
            }
            response.setContentType("text/html;charset=utf-8");
            PrintWriter out=response.getWriter();
            out.write(result);
            out.flush();
            out.close();
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    //修改任务组
    @RequestMapping(value="/updateTaskGroup")
    @ResponseBody
    protected void updateTaskGroup(HttpServletResponse response,HttpServletRequest request){
        try{
            TaskGroupEntity taskGroup=new TaskGroupEntity();
            taskGroup.setTaskGroupDesc(request.getParameter("desc"));
            taskGroup.setTaskGroupName(request.getParameter("name"));
            taskGroup.setTaskGroupId(Integer.valueOf(request.getParameter("id")));
            taskGroupService.updateTaskGroup(taskGroup);
            response.setContentType("text/html;charset=utf-8");
            PrintWriter out=response.getWriter();
            out.write("success");
            out.flush();
            out.close();
        }catch (IOException e){
            e.printStackTrace();
        }
    }

    //查看任务组中的所有任务
    @RequestMapping(value="/selectTaskGroup")
    @ResponseBody
    protected void selectTaskGroup(HttpServletResponse response,HttpServletRequest request){
        try{
            String name=request.getParameter("taskGroupName");
            String result=taskGroupService.selectTaskGroupAttributesByName(name);
            response.setContentType("text/html;charset=utf-8");
            PrintWriter out=response.getWriter();
            out.write(result);
            out.flush();
            out.close();
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    //创建作业or转换前获取所有的任务组
    @RequestMapping(value = "/getAllTaskGroupBeforeCreate")
    @ResponseBody
    protected void getAllTaskGroupBeforeCreate(HttpServletRequest request,HttpServletResponse response){
        try{
            //获取当前用户所在的用户组
            UserGroupAttributeEntity attr=(UserGroupAttributeEntity)request.getSession().getAttribute("userInfo");
            String userGroupName=attr.getUserGroupName();
            List<TaskGroupEntity> items=taskGroupService.AllTaskGroupBeforeAdd(userGroupName);
            response.setContentType("text/html;charset=utf-8");
            PrintWriter out=response.getWriter();
            out.write(JSONArray.fromObject(items).toString());
            out.flush();
            out.close();
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
