package org.sxdata.jingwei.service.Impl;

import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.sxdata.jingwei.bean.PageforBean;
import org.sxdata.jingwei.dao.UserDao;
import org.sxdata.jingwei.entity.UserEntity;
import org.sxdata.jingwei.service.UserService;
import org.sxdata.jingwei.util.TaskUtil.KettleEncr;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by cRAZY on 2017/3/28.
 */
@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private   UserDao userDao;

    @Override
    public void deleteUserById(Integer id) {
        userDao.deleteUser(id);
    }

    @Override
    public void updateUser(UserEntity user) {
        userDao.updateUser(user);
    }

    @Override
    public synchronized boolean addUser(UserEntity user) {
        List<UserEntity> allUser=userDao.getAllUsers();
        for(UserEntity item:allUser){
            if(item.getLogin().equals(user.getLogin()))
                return false;
        }
        user.setUserId(userDao.selectMaxId()+1);
        userDao.addUser(user);
        return true;
    }

    @Override
    public String getUsersLimit(int start, int limit) {
        List<UserEntity> users=userDao.getUsersLimit(start,limit);
        for(UserEntity user:users){
            user.setPassword(KettleEncr.decryptPasswd(user.getPassword()));
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
                    request.getSession().setAttribute("login",user);
                    request.getSession().setAttribute("username",user.getLogin());
                }
            }
        }
        return result;
    }
}
