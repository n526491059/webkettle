package org.sxdata.jingwei.dao;

import org.sxdata.jingwei.entity.Transformation;

import java.util.List;

/**
 * Created by cRAZY on 2017/2/22.
 */
public interface TransDao {
    public List<Transformation> getThisPageTrans(int start,int limit ); //获取当页的记录

    public Integer getTotalSize();  //获取总记录数
}
