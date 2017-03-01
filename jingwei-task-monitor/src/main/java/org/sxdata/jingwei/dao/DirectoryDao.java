package org.sxdata.jingwei.dao;

import org.springframework.stereotype.Repository;
import org.sxdata.jingwei.entity.Directory;

/**
 * Created by cRAZY on 2017/2/27.
 */
@Repository
public interface DirectoryDao {
    public Directory getDirectoryById(Integer id);
}
