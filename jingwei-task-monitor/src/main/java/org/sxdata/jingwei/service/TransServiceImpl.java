package org.sxdata.jingwei.service;

import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.sxdata.jingwei.dao.TransDao;
import org.sxdata.jingwei.entity.PageforBean;
import org.sxdata.jingwei.entity.Transformation;
import org.sxdata.jingwei.util.Util;

import java.text.SimpleDateFormat;
import java.util.List;

/**
 * Created by cRAZY on 2017/2/22.
 */
@Service
public class TransServiceImpl implements TransService {
    @Autowired
    protected TransDao transDao;

    protected SimpleDateFormat format =  new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @Override
    public JSONObject findTrans(int start, int limit, String transName, String createDate) throws Exception{

        //创建分页对象以及需要返回客户端的数据
        net.sf.json.JSONObject result=null;
        PageforBean pages=new PageforBean();
        //如果传递的日期以及转换名参数都为空则代表是无条件查询,否则根据条件查询
        if(Util.isEmpty(createDate) && Util.isEmpty(transName)){
            List<Transformation> trans=transDao.getThisPageTrans(start, limit);
            //对日期进行处理转换成指定的格式
            for (Transformation transformation:trans){
                transformation.setCreateDate(format.parse(format.format(transformation.getCreateDate())));
                transformation.setModifiedDate(format.parse(format.format(transformation.getModifiedDate())));
            }
            //获取总记录数、该页的记录,并且封装成分页对象
            Integer totalCount=transDao.getTotalSize();
            pages.setRoot(trans);
            pages.setTotalProperty(totalCount);
        }else{
            createDate+=" 00:00:00";
            List<Transformation> trans=transDao.
                    conditionFindTrans(start,limit,transName,createDate);
            for (Transformation transformation:trans){
                transformation.setCreateDate(format.parse(format.format(transformation.getCreateDate())));
                transformation.setModifiedDate(format.parse(format.format(transformation.getModifiedDate())));
            }
            Integer totalCount=transDao.conditionFindTransCount(transName,createDate);
            pages.setRoot(trans);
            pages.setTotalProperty(totalCount);
        }
        result=net.sf.json.JSONObject.fromObject(pages,Util.configJson("yyyy-MM-dd HH:mm:ss"));
        return result;
    }

    @Override
    public void deleteTransformation(String[] args) throws Exception {
        for (String id:args){
            System.out.println(id);
        }
    }
}
