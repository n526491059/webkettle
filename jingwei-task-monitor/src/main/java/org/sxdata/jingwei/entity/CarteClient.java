package org.sxdata.jingwei.entity;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.dbcp.BasicDataSource;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.message.BasicHeader;
import org.pentaho.di.core.Const;
import org.pentaho.di.www.*;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.sxdata.jingwei.util.HttpClientUtil;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

/**
 * Created by cRAZY on 2017/2/28.
 */
public class CarteClient implements ApplicationContextAware {
    private String httpUrl;
    private Header authorization;
    private Slave slave;
    public static String databaseName;



    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        BasicDataSource dataSource=(BasicDataSource)applicationContext.getBean("dataSource");
        String url=dataSource.getUrl();
        int a=url.lastIndexOf("/");
        int b=url.indexOf("?");
        databaseName=url.substring(a+1,b);
    }


    public final static String URL_SUF = "?xml=Y";
    /**Kettle carte服务 servlet引用地址(统一收集于此处)*/
    public final static String CARTE_STATUS = GetStatusServlet.CONTEXT_PATH;
    //public final static String SLAVE_STATUS = GetSlaveMonitorServlet.CONTEXT_PATH;
    public final static String TRANS_STATUS = GetTransStatusServlet.CONTEXT_PATH;
    public final static String JOB_STATUS = GetJobStatusServlet.CONTEXT_PATH;
    public final static String RUN_JOB = RunJobServlet.CONTEXT_PATH;
    public final static String EXECREMOTE_JOB = ExecuteJobServlet.CONTEXT_PATH;
    public final static String EXECREMOTE_TRANS = ExecuteTransServlet.CONTEXT_PATH;
    public final static String STOP_TRANS = StopTransServlet.CONTEXT_PATH;
    public final static String STOP_JOB = StopJobServlet.CONTEXT_PATH;
    public final static String REMOVE_TRANS = RemoveTransServlet.CONTEXT_PATH;
    public final static String REMOVE_JOB = RemoveJobServlet.CONTEXT_PATH;
    public final static String PAUSE_TRANS = PauseTransServlet.CONTEXT_PATH;

    public CarteClient(Slave slave) {
        this.httpUrl = "http://" + slave.getHostName() + ":" + slave.getPort();
        this.authorization = new BasicHeader("Authorization", "Basic " +
                Base64.encodeBase64String((slave.getUsername() + ":" + slave.getPassword()).getBytes()));
        setSlave(slave);
    }

    public boolean isDBActive(){
        boolean dbflag = false;
        try {
            String dbStatus = getDBStatus();
            dbflag = dbStatus.contains("Unable to connect to repository:");
        } catch (Exception e) {
            e.printStackTrace();
            dbflag = true;
        }
        return dbflag;
    }

    public String getDBStatus() throws Exception {
        String urlString = httpUrl + CARTE_STATUS;
        return doGet(urlString);
    }

    public String getStatusOrNull(){
        boolean flag = false;
        String status = null;
        try {
            status = getStatus();
            flag = status.startsWith("<?xml version");
        } catch (Exception e) {
            System.err.println("[ERROR]===> 节点: " + this.getSlave().getHostName() + ":" + this.getSlave().getPort() + " 连接异常!");
            flag = false;
        }
        return flag ? status : null;
    }

    public synchronized String doGet(String urlString) throws IOException {
        urlString = Const.replace(urlString, " ", "%20");
        HttpGet httpGet = new HttpGet(urlString);
        if (this.authorization != null) {
            httpGet.addHeader(authorization);
        }
        HttpClient client = HttpClientUtil.getHttpClient();
        HttpResponse response = client.execute(httpGet);
        String result = "";
        if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
            HttpEntity entity = response.getEntity();
            InputStream content = entity.getContent();
            InputStreamReader in = new InputStreamReader(content);
            BufferedReader br = new BufferedReader(in);
            String line;
            while ((line = br.readLine()) != null) {
                result += line;
            }
            if (br != null) br.close();
            if (in != null) in.close();
            if (content != null) content.close();
        }

        return result;
    }

    public String getStatus() throws Exception {
        String urlString = httpUrl + CARTE_STATUS + URL_SUF;
        return doGet(urlString);
    }

    public CarteClient() {

    }

    public String getHttpUrl() {
        return httpUrl;
    }

    public Header getAuthorization() {
        return authorization;
    }

    public Slave getSlave() {
        return slave;
    }

    public void setHttpUrl(String httpUrl) {
        this.httpUrl = httpUrl;
    }

    public void setSlave(Slave slave) {
        this.slave = slave;
    }

    public void setAuthorization(Header authorization) {
        this.authorization = authorization;
    }
}
