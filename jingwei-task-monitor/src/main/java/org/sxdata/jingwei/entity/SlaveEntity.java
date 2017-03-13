package org.sxdata.jingwei.entity;

/**
 * Created by cRAZY on 2017/2/28.
 * 节点
 */
public class SlaveEntity {
    private Integer slaveId;    //节点id
    private String hostName;    //节点的ip地址
    private String slaveUsername;
    private String slavePassword;
    private String port;        //端口
    private double loadAvg;     //负载指数
    private String status;      //状态

    public String getUsername() {
        return slaveUsername;
    }

    public String getPassword() {
        return slavePassword;
    }

    public void setPassword(String password) {
        this.slavePassword = password;
    }

    public void setUsername(String username) {
        this.slaveUsername = username;
    }

    public void setLoadAvg(double loadAvg) {
        this.loadAvg = loadAvg;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public double getLoadAvg() {
        return loadAvg;
    }

    public String getStatus() {
        return status;
    }

    public Integer getSlaveId() {
        return slaveId;
    }

    public String getHostName() {
        return hostName;
    }

    public String getPort() {
        return port;
    }

    public void setSlaveId(Integer slaveId) {
        this.slaveId = slaveId;
    }

    public void setHostName(String hostName) {
        this.hostName = hostName;
    }

    public void setPort(String port) {
        this.port = port;
    }
}
