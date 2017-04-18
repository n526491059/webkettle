package org.sxdata.jingwei.service.Impl;

import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.sxdata.jingwei.bean.PageforBean;
import org.sxdata.jingwei.dao.UserDao;
import org.sxdata.jingwei.dao.UserGroupDao;
import org.sxdata.jingwei.entity.UserEntity;
import org.sxdata.jingwei.entity.UserGroupAttributeEntity;
import org.sxdata.jingwei.service.UserService;
import org.sxdata.jingwei.util.TaskUtil.KettleEncr;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by cRAZY on 2017/3/28.
 */
@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private   UserDao userDao;
    @Autowired
    private UserGroupDao userGroupDao;

    @Override
    public void deleteUserById(Integer id) {
        userDao.deleteUser(id);
    }

    @Override
    public void updateUser(UserEntity user,UserGroupAttributeEntity attr){
        //修改用户
        userDao.updateUser(user);
        //修改用户与用户组关系表中 节点任务组的权限
        if(null!=attr){
            userGroupDao.updateUserGroupAttrByName(attr);
        }
    }

    @Override
    public synchronized boolean addUser(UserEntity user,UserGroupAttributeEntity attribute) {
        List<UserEntity> allUser=userDao.getAllUsers();
        for(UserEntity item:allUser){
            if(item.getLogin().equals(user.getLogin()))
                return false;
        }
        user.setUserId(userDao.selectMaxId() + 1);
        userDao.addUser(user);
        userGroupDao.addUserGroupAttribute(attribute);
        return true;
    }

    @Override
    public String getUsersLimit(int start, int limit,HttpServletRequest request) {
        //获取当前用户所在的用户组
        UserGroupAttributeEntity userAttribute=(UserGroupAttributeEntity)request.getSession().getAttribute("userInfo");
        String userGroupName=userAttribute.getUserGroupName();
        List<UserEntity> users=new ArrayList<>();
        //如果不是是admin用户
        if(null!=userGroupName && !userGroupName.equals("")){
            users=userDao.getUsersByUserGroupName(userGroupName);
            //把管理员用户移除
            List<UserEntity> adminUserArray=new ArrayList<>();
            for(int i=0;i<users.size();i++){
                users.get(i).setPassword(KettleEncr.decryptPasswd(users.get(i).getPassword()));
                UserGroupAttributeEntity attr=userGroupDao.getInfoByUserName(users.get(i).getLogin());
                if(attr.getUserType()==1){
                    adminUserArray.add(users.get(i));
                }
            }
            for(UserEntity adminUser:adminUserArray){
                users.remove(adminUser);
            }
        }else{
            //如果是admin用户获取所有的用户列表
            users=userDao.getUsersLimit(start, limit);
            //移除admin用户本身
            for(UserEntity user:users){
                if(user.getLogin().equals("admin")){
                    users.remove(user);
                    break;
                }
            }
            for(UserEntity user:users){
                user.setPassword(KettleEncr.decryptPasswd(user.getPassword()));
            }
        }
        Integer count= userDao.getUserCount();
        PageforBean bean=new PageforBean();
        bean.setRoot(users);
        bean.setTotalProperty(count);
        return JSONObject.fromObject(bean).toString();
    }

    @Override
    public List<UserEntity> getUserByName(String login) {
        return userDao.getUserbyName(login);
    }

    public String login(String userName, String password,HttpServletRequest request) {
        String result="success";
        List<UserEntity> users=this.getUserByName(userName);
        if(users.size()==0){
            result="该用户名不存在,请再次确认";
        }else{
            UserEntity user=users.get(0);
            String realPassword=KettleEncr.decryptPasswd(user.getPassword());
            if(!realPassword.equals(password)){
                result="密码输入错误,请再次确认";
            }else{
                if(null==request.getSession().getAttribute("login")){
                    users.get(0).setPassword(KettleEncr.decryptPasswd(users.get(0).getPassword()));
                    request.getSession().setAttribute("login", user);
                    UserGroupAttributeEntity attribute=userGroupDao.getInfoByUserName(userName);
                    if(null==attribute){
                        attribute=new UserGroupAttributeEntity();
                    }
                    request.getSession().setAttribute("userInfo",attribute);
                }
            }
        }
        return result;
    }

    @Override
    public void allotUserGroup(UserGroupAttributeEntity attr) {
        userGroupDao.updateUserGroupAttrByName(attr);
    }
}
