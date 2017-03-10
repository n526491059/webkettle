package org.sxdata.jingwei.dao;

import org.springframework.stereotype.Repository;
import org.sxdata.jingwei.entity.UserEntity;

/**
 * Created by cRAZY on 2017/3/1.
 */
@Repository
public interface UserDao {
    public UserEntity getUserbyName(String name);
}
