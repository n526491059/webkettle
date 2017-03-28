package org.sxdata.jingwei.service;

import org.sxdata.jingwei.entity.UserEntity;

/**
 * Created by cRAZY on 2017/3/28.
 */
public interface UserService {
    public void deleteUserById(Integer id);

    public void updateUser(UserEntity user);

    public  boolean addUser(UserEntity user);

    public String getUsersLimit(int start,int limit);

    public void getUserByName(String login);
}
