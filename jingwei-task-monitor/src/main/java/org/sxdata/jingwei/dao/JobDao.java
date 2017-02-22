package org.sxdata.jingwei.dao;

import org.sxdata.jingwei.entity.Job;
import org.sxdata.jingwei.entity.User;

import java.util.List;

/**
 * Created by cRAZY on 2017/2/15.
 */
public interface JobDao {
    public List<User> getAllUser();

    public List<User> getThisPageUser(int start,int limit);

    public List<Job> getThisPageJob(int start,int limit);
}
