package org.sxdata.jingwei.service;

import org.sxdata.jingwei.entity.UserEntity;
import org.sxdata.jingwei.entity.UserGroupAttributeEntity;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by cRAZY on 2017/3/28.
 */
public interface UserService {
    public void deleteUserById(Integer id);

    public void updateUser(UserEntity user,UserGroupAttributeEntity attr);

    public  boolean addUser(UserEntity user,UserGroupAttributeEntity attribute);

    public String getUsersLimit(int start,int limit,HttpServletRequest request);

    public List<UserEntity> getUserByName(String login);

    public String login(String userName,String password,HttpServletRequest request);

    public void allotUserGroup(UserGroupAttributeEntity attr);
}
