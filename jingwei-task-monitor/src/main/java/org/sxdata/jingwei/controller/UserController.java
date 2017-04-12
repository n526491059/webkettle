package org.sxdata.jingwei.controller;

import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.sxdata.jingwei.entity.UserEntity;
import org.sxdata.jingwei.service.UserService;
import org.sxdata.jingwei.util.TaskUtil.KettleEncr;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by cRAZY on 2017/3/28.
 */
@Controller
@RequestMapping(value="/user")
public class UserController {
    @Autowired
    UserService userService;

    //分页形式获取用户集合
    @RequestMapping(value="/getUsers")
    @ResponseBody
    protected void getUsers(HttpServletResponse response,HttpServletRequest request){
        try{
            Integer start=Integer.valueOf(request.getParameter("start"));
            Integer limit=Integer.valueOf(request.getParameter("limit"));
            String result=userService.getUsersLimit(start,limit);
            response.setContentType("text/html;charset=utf-8");
            PrintWriter out=response.getWriter();
            out.write(result);
            out.flush();
            out.close();
        }catch (IOException e){
            e.printStackTrace();
        }
    }

    //删除用户
    @RequestMapping(value="/deleteUser")
    @ResponseBody
    protected void deleteUser(HttpServletResponse response,HttpServletRequest request){
        String userId=request.getParameter("userId");
        userService.deleteUserById(Integer.valueOf(userId));
    }

    //修改用户
    @RequestMapping(value="/updateUser")
    @ResponseBody
    protected void updateUser(HttpServletResponse response,HttpServletRequest request){
        try{
            //组装参数
            String description=request.getParameter("userDescription");
            String password=request.getParameter("userPassword");
            Integer userId=Integer.valueOf(request.getParameter("userId"));
            UserEntity user=new UserEntity();
            user.setPassword(KettleEncr.encryptPassword(password));
            user.setDescription(description);
            user.setUserId(userId);
            //添加 - -返回结果
            userService.updateUser(user);
            JSONObject json=new JSONObject();
            json.put("success",true);
            response.setContentType("text/html;charset=utf-8");
            PrintWriter out=response.getWriter();
            out.write(json.toString());
            out.flush();
            out.close();
        }catch (IOException e){
            e.printStackTrace();
        }
    }

    //添加用户
    @RequestMapping(value="/addUser")
    @ResponseBody
    protected void addUser(HttpServletResponse response,HttpServletRequest request){
        try{
            //组装参数
            String description=request.getParameter("userDescription");
            String password=request.getParameter("userPassword");
            String login=request.getParameter("userLogin");
            UserEntity user=new UserEntity();
            user.setPassword(KettleEncr.encryptPassword(password));
            user.setDescription(description);
            user.setEnabled('Y');
            user.setLogin(login);
            user.setName(login);
            //添加 - -返回结果
            boolean isSuccess=userService.addUser(user);
            JSONObject json=new JSONObject();
            json.put("success",true);
            json.put("isSuccess",isSuccess);
            response.setContentType("text/html;charset=utf-8");
            PrintWriter out=response.getWriter();
            out.write(json.toString());
            out.flush();
            out.close();
        }catch (IOException e){
            e.printStackTrace();
        }
    }


    //登陆
    @RequestMapping(value="/doLogin")
    @ResponseBody
    protected void doLogin(HttpServletResponse response,HttpServletRequest request,@RequestParam String username,@RequestParam String password){
        try{
            UserEntity loginUser=(UserEntity)request.getSession().getAttribute("login");
            String result="success";
            if(null==loginUser){
                result=userService.login(username,password,request);
            }
            response.setContentType("text/html;charset=utf-8");
            PrintWriter out=response.getWriter();
            out.write(result);
            out.flush();
            out.close();
        }catch (IOException e){
            e.printStackTrace();
        }
    }

    //获取当前登录的用户
    //登陆
    @RequestMapping(value="/getLoginUser")
    @ResponseBody
    protected void getLoginUser(HttpServletResponse response,HttpServletRequest request){
        try{
            UserEntity loginUser=(UserEntity)request.getSession().getAttribute("login");
            PrintWriter out=response.getWriter();
            out.write(JSONObject.fromObject(loginUser).toString());
            out.flush();
            out.close();
        }catch (IOException e){
            e.printStackTrace();
        }
    }
}
