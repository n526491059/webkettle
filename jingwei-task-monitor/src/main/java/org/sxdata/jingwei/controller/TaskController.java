package org.sxdata.jingwei.controller;

import org.flhy.ext.App;
import org.flhy.ext.utils.JSONArray;
import org.flhy.ext.utils.JsonUtils;
import org.pentaho.di.core.exception.KettleException;
import org.pentaho.di.repository.Repository;
import org.pentaho.di.repository.RepositoryDirectoryInterface;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.sxdata.jingwei.bean.RepositoryNode;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by pengpai on 2017/1/18 0018.
 */
@Controller
@RequestMapping(value="/task")
public class TaskController {
    @ResponseBody
    @RequestMapping(method= RequestMethod.POST, value="/getJobs")
    protected void getJobs() throws IOException {
        JSONArray jsonArray = new JSONArray();
        System.out.println("xxx");

        JsonUtils.response(jsonArray);
    }
    /**
     * 获取资源库路径
     *
     * @throws KettleException
     * @throws IOException
     */
    @ResponseBody
    @RequestMapping(method=RequestMethod.POST, value="/getRepositoryDir")
    protected  void getRepositoryDir(@RequestParam String path, @RequestParam int loadElement) throws KettleException, IOException {
        System.out.println("111");
        ArrayList list = new ArrayList();

        Repository repository = App.getInstance().getRepository();
        RepositoryDirectoryInterface dir = null;
        if(StringUtils.hasText(path))
            dir = repository.findDirectory(path);
        else
            dir = repository.getUserHomeDirectory();

        List<RepositoryDirectoryInterface> directorys = dir.getChildren();
        for(RepositoryDirectoryInterface child : directorys) {
            list.add(RepositoryNode.initNode(child.getName(), child.getPath()));
        }

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
        System.out.println(list);

        JsonUtils.success("导入成功！");
    }

    @ResponseBody
    @RequestMapping(method=RequestMethod.POST, value="/getTrans")
    protected void getTrans() throws IOException {
        JSONArray jsonArray = new JSONArray();



        JsonUtils.response(jsonArray);
    }
}
