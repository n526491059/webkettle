package org.sxdata.jingwei.service;

import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.sxdata.jingwei.dao.JobDao;
import org.sxdata.jingwei.entity.Job;
import org.sxdata.jingwei.entity.PageforBean;
import org.sxdata.jingwei.util.Util;

import java.text.SimpleDateFormat;
import java.util.List;

/**
 * Created by cRAZY on 2017/2/22.
 */
@Service
public class JobServiceImpl implements JobService{
    @Autowired
    protected JobDao jobDao;

    protected SimpleDateFormat format =  new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @Override
    public JSONObject findJobs(int start, int limit, String name, String createDate) throws Exception{
        PageforBean pages=new PageforBean();
        net.sf.json.JSONObject result=null;
        if (name.isEmpty() && createDate.isEmpty()){
            List<Job> jobs=jobDao.getThisPageJob(start,limit);
            //对日期进行处理转换成指定的格式
            for (Job job:jobs){
                job.setCreateDate(format.parse(format.format(job.getCreateDate())));
                job.setModifiedDate(format.parse(format.format(job.getModifiedDate())));
            }
            pages.setRoot(jobs);
            pages.setTotalProperty(jobDao.getTotalCount());

        }else{
            createDate+=" 00:00:00";
            List<Job> jobs=jobDao.conditionFindJobs(start, limit, name, createDate);
            for (Job job:jobs){
                job.setCreateDate(format.parse(format.format(job.getCreateDate())));
                job.setModifiedDate(format.parse(format.format(job.getModifiedDate())));
            }
            pages.setRoot(jobs);
            pages.setTotalProperty(jobDao.conditionFindJobCount(name,createDate));
        }
        //把分页对象(包含该页的数据以及所有页的总条数)转换成json对象
        result=net.sf.json.JSONObject.fromObject(pages, Util.configJson("yyyy-MM-dd HH:mm:ss"));
        return result;
    }
}
