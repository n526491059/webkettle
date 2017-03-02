package org.sxdata.jingwei.service;

import net.sf.json.JSONObject;
import org.flhy.ext.App;
import org.pentaho.di.core.Const;
import org.pentaho.di.repository.ObjectId;
import org.pentaho.di.repository.Repository;
import org.pentaho.di.repository.RepositoryDirectoryInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.sxdata.jingwei.dao.DirectoryDao;
import org.sxdata.jingwei.dao.SlaveDao;
import org.sxdata.jingwei.dao.TransDao;
import org.sxdata.jingwei.dao.UserDao;
import org.sxdata.jingwei.entity.*;
import org.sxdata.jingwei.util.CarteTaskManager;
import org.sxdata.jingwei.util.KettleEncr;
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
    @Autowired
    protected SlaveDao slaveDao;
    @Autowired
    protected UserDao userDao;

    @Autowired
    private DirectoryDao directoryDao;

    protected SimpleDateFormat format =  new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @Override
    public JSONObject findTrans(int start, int limit, String transName, String createDate) throws Exception{

        //创建分页对象以及需要返回客户端的数据
        net.sf.json.JSONObject result=null;
        PageforBean pages=new PageforBean();
        Integer totalCount=0;
        List<Transformation> trans=null;

        //如果传递的日期以及转换名参数都为空则代表是无条件查询,否则根据条件查询
        if(Util.isEmpty(createDate) && Util.isEmpty(transName)){
           trans=transDao.getThisPageTrans(start, limit);
            //对日期进行处理转换成指定的格式
            for (Transformation transformation:trans){
                transformation.setCreateDate(format.parse(format.format(transformation.getCreateDate())));
                transformation.setModifiedDate(format.parse(format.format(transformation.getModifiedDate())));
            }
            //获取总记录数、该页的记录,并且封装成分页对象
            totalCount=transDao.getTotalSize();
        }else{
            createDate+=" 00:00:00";
            trans=transDao.conditionFindTrans(start,limit,transName,createDate);
            for (Transformation transformation:trans){
                transformation.setCreateDate(format.parse(format.format(transformation.getCreateDate())));
                transformation.setModifiedDate(format.parse(format.format(transformation.getModifiedDate())));
            }
           totalCount=transDao.conditionFindTransCount(transName,createDate);

        }
        //根据转换的id来查找该作业在资源库的绝对目录
        for (Transformation tran:trans){
            String directoryName="";
            Integer directoryId=tran.getDirectoryId();
            //判断该作业是否是在根目录下 如果对应的目录id为0代表在根目录/下面
            if(directoryId==0){
                directoryName="/"+tran.getName();
            }else{
                //不是在根目录下获取作业所在当前目录的目录名  并且拼接上作业名
                Directory directory=directoryDao.getDirectoryById(directoryId);
                directoryName=directory.getDirectoryName()+"/"+tran.getName();
                Integer parentId=directory.getParentDirectoryId();
                //继续判断该文件上一级的目录是否是根目录
                if (parentId==0){
                    directoryName="/"+directoryName;
                }else{
                    //循环判断该目录的父级目录是否是根目录 直到根部为止
                    while(parentId!=0){
                        Directory parentDirectory=directoryDao.getDirectoryById(parentId);
                        directoryName=parentDirectory.getDirectoryName()+"/"+directoryName;
                        parentId=parentDirectory.getParentDirectoryId();
                    }
                    directoryName="/"+directoryName;
                }

            }
            tran.setDirectoryName(directoryName);
        }


        pages.setRoot(trans);
        pages.setTotalProperty(totalCount);
        result=net.sf.json.JSONObject.fromObject(pages,Util.configJson("yyyy-MM-dd HH:mm:ss"));
        return result;
    }

    @Override
    public void deleteTransformation(String[] pathArray,String flag) throws Exception {
        Repository repository = App.getInstance().getRepository();
        for (String path:pathArray){
            String dir = path.substring(0, path.lastIndexOf("/"));
            String name = path.substring(path.lastIndexOf("/") + 1);
            RepositoryDirectoryInterface directory = repository.findDirectory(dir);
            if(directory == null)
                directory = repository.getUserHomeDirectory();
            ObjectId id = repository.getTransformationID(name, directory);
            repository.deleteTransformation(id);
        }
    }

    @Override
    public void executeTransformation(String path, String hostname,Integer slaveId) throws Exception {
        //获取用户信息
        User loginUser=userDao.getUserbyName("admin");
        loginUser.setPassword(KettleEncr.decryptPasswd("Encrypted " + loginUser.getPassword()));
        //构造Carte对象
        Slave slave=slaveDao.getSlaveById(slaveId);
        slave.setPassword(KettleEncr.decryptPasswd(slave.getPassword()));
        CarteClient carteClient=new CarteClient(slave);
        //拼接资源库名
        String repoId=hostname+"_"+CarteClient.databaseName;
        //拼接http请求字符串
        String urlString="/?rep="+repoId+"&user="+loginUser.getLogin()+"&pass="+loginUser.getPassword()+"&trans="+path+"&level=Basic";
        urlString = Const.replace(urlString, "/", "%2F");
        urlString = carteClient.getHttpUrl() + CarteClient.EXECREMOTE_TRANS +urlString;
        System.out.println("请求远程节点的url字符串为"+urlString);
        CarteTaskManager.addTask(carteClient, "trans_exec", urlString);
    }

}
