package org.sxdata.jingwei.controller;

import org.apache.commons.collections.bag.SynchronizedSortedBag;
import org.flhy.ext.utils.JSONArray;
import org.flhy.ext.utils.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.sxdata.jingwei.dao.JobDao;
import org.sxdata.jingwei.dao.TransDao;
import org.sxdata.jingwei.entity.Job;
import org.sxdata.jingwei.entity.PageforBean;
import org.sxdata.jingwei.entity.Transformation;
import org.sxdata.jingwei.entity.User;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

/**
 * Created by pengpai on 2017/1/18 0018.
 */
@Controller
@RequestMapping(value="/task")
public class TaskController {

    @Autowired
    private JobDao jobdao;
    @Autowired
    private TransDao transDao;

    @RequestMapping(value="/getJobs.do")
    @ResponseBody
    protected void getJobs(HttpServletResponse response,HttpServletRequest request) throws IOException {
        //获取前台传递的分页参数
        int start=Integer.parseInt(request.getParameter("start"));
        int limit=Integer.parseInt(request.getParameter("limit"));
        List<Job> jobs=jobdao.getThisPageJob(start,limit);
        PageforBean pages=new PageforBean();
        pages.setRoot(jobs);
        pages.setTotalProperty(1);
        //把分页对象(包含该页的数据以及所有页的总条数)转换成json对象
        net.sf.json.JSONObject result=net.sf.json.JSONObject.fromObject(pages);
        System.out.print(result.toString());
        response.setContentType("text/html;charset=utf-8");
        PrintWriter out=response.getWriter();
        out.write(result.toString());
        out.flush();
        out.close();

        //JsonUtils.response();
    }
//    /**
//     * 获取资源库路径
//     *
//     * @throws KettleException
//     * @throws IOException
//     */
//    @ResponseBody
//    @RequestMapping(method=RequestMethod.POST, value="/getRepositoryDir")
//    protected  void getRepositoryDir(@RequestParam String path, @RequestParam int loadElement) throws KettleException, IOException {
//        System.out.println("111");
//        ArrayList list = new ArrayList();
//
//        Repository repository = App.getInstance().getRepository();
//        RepositoryDirectoryInterface dir = null;
//        if(StringUtils.hasText(path))
//            dir = repository.findDirectory(path);
//        else
//            dir = repository.getUserHomeDirectory();
//
//        List<RepositoryDirectoryInterface> directorys = dir.getChildren();
//        for(RepositoryDirectoryInterface child : directorys) {
//            list.add(RepositoryNode.initNode(child.getName(), child.getPath()));
//        }
//
//        if(RepositoryNodeType.includeTrans(loadElement)) {
//            List<RepositoryElementMetaInterface> elements = repository.getTransformationObjects(dir.getObjectId(), false);
//            if(elements != null) {
//                for(RepositoryElementMetaInterface e : elements) {
//                    String transPath = dir.getPath();
//                    if(!transPath.endsWith("/"))
//                        transPath = transPath + '/';
//                    transPath = transPath + e.getName();
//
//                    list.add(RepositoryNode.initNode(e.getName(),  transPath, e.getObjectType()));
//                }
//            }
//        }
//
//        if(RepositoryNodeType.includeJob(loadElement)) {
//            List<RepositoryElementMetaInterface> elements = repository.getJobObjects(dir.getObjectId(), false);
//            if(elements != null) {
//                for(RepositoryElementMetaInterface e : elements) {
//                    String transPath = dir.getPath();
//                    if(!transPath.endsWith("/"))
//                        transPath = transPath + '/';
//                    transPath = transPath + e.getName();
//
//                    list.add(RepositoryNode.initNode(e.getName(),  transPath, e.getObjectType()));
//                }
//            }
//        }
//        System.out.println(list);
//
//        JsonUtils.success("导入成功！");
//    }

    //转换
    @ResponseBody
    @RequestMapping(method=RequestMethod.POST, value="/getTrans")
    protected void getTrans(HttpServletResponse response,HttpServletRequest request) throws IOException {
        //获取前台传递的分页参数
        int start=Integer.parseInt(request.getParameter("start"));
        int limit=Integer.parseInt(request.getParameter("limit"));
        List<Transformation> trans=transDao.getThisPageTrans(start,limit);
        Integer totalCount=transDao.getTotalSize();
        PageforBean pages=new PageforBean();
        pages.setRoot(trans);
        pages.setTotalProperty(totalCount);
        //把分页对象(包含该页的数据以及所有页的总条数)转换成json对象
        net.sf.json.JSONObject result=net.sf.json.JSONObject.fromObject(pages);
        System.out.print(result.toString());
        response.setContentType("text/html;charset=utf-8");
        PrintWriter out=response.getWriter();
        out.write(result.toString());
        out.flush();
        out.close();
    }
}
