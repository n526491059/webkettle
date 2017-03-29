package org.sxdata.jingwei.service.Impl;

import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.sxdata.jingwei.bean.PageforBean;
import org.sxdata.jingwei.dao.UserDao;
import org.sxdata.jingwei.entity.UserEntity;
import org.sxdata.jingwei.service.UserService;
import org.sxdata.jingwei.util.TaskUtil.KettleEncr;

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
    public void getUserByName(String login) {

    }
}
