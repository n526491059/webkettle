package org.sxdata.jingwei.entity;

/**
 * Created by cRAZY on 2017/3/6.
 * 作业定时调度类 包含了定时调度的时间信息以及被调度的作业、节点等信息
 */
public class JobTimeSchedulerEntity {
    private long idJobtask;
    private Integer idJob;
    private String jobName;
    private String slaves;
    private String isrepeat;
    private Integer schedulertype;
    private Integer intervalminutes;
    private Integer hour;
    private Integer minutes;
    private Integer weekday;
    private Integer dayofmonth;
    private String repoId;
    private String timerInfo;   //定时信息的详细描述
    private String hostName;    //节点ip

    public String getHostName() {
        return hostName;
    }

    public void setHostName(String hostName) {
        this.hostName = hostName;
    }

    public String getTimerInfo() {
        return timerInfo;
    }

    public void setTimerInfo(String timerInfo) {
        this.timerInfo = timerInfo;
    }

    public long getIdJobtask() {
        return idJobtask;
    }

    public Integer getIdJob() {
        return idJob;
    }

    public String getJobName() {
        return jobName;
    }

    public String getSlaves() {
        return slaves;
    }

    public String getIsrepeat() {
        return isrepeat;
    }

    public Integer getSchedulertype() {
        return schedulertype;
    }

    public Integer getIntervalminutes() {
        return intervalminutes;
    }

    public Integer getHour() {
        return hour;
    }

    public Integer getMinutes() {
        return minutes;
    }

    public Integer getWeekday() {
        return weekday;
    }

    public Integer getDayofmonth() {
        return dayofmonth;
    }

    public String getRepoId() {
        return repoId;
    }

    public void setIdJobtask(long idJobtask) {
        this.idJobtask = idJobtask;
    }

    public void setIdJob(Integer idJob) {
        this.idJob = idJob;
    }

    public void setJobName(String jobName) {
        this.jobName = jobName;
    }

    public void setSlaves(String slaves) {
        this.slaves = slaves;
    }

    public void setIsrepeat(String isrepeat) {
        this.isrepeat = isrepeat;
    }

    public void setSchedulertype(Integer schedulertype) {
        this.schedulertype = schedulertype;
    }

    public void setIntervalminutes(Integer intervalminutes) {
        this.intervalminutes = intervalminutes;
    }

    public void setHour(Integer hour) {
        this.hour = hour;
    }

    public void setMinutes(Integer minutes) {
        this.minutes = minutes;
    }

    public void setWeekday(Integer weekday) {
        this.weekday = weekday;
    }

    public void setDayofmonth(Integer dayofmonth) {
        this.dayofmonth = dayofmonth;
    }

    public void setRepoId(String repoId) {
        this.repoId = repoId;
    }
}
