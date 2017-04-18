package org.sxdata.jingwei.dao;

import org.springframework.stereotype.Repository;
import org.sxdata.jingwei.entity.UserEntity;

import java.util.List;

/**
 * Created by cRAZY on 2017/3/1.
 */
@Repository
public interface UserDao {
    public List<UserEntity> getUsersByUserGroupName(String userGroupName);

    public List<UserEntity> getUserbyName(String name);

    public List<UserEntity> getUsersLimit(int start,int limit);

    public void updateUser(UserEntity user);

    public void deleteUser(Integer userId);

    public void addUser(UserEntity user);

    public Integer getUserCount();

    public List<UserEntity> getAllUsers();

    public Integer selectMaxId();

}
