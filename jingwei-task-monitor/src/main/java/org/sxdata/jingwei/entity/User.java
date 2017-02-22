package org.sxdata.jingwei.entity;

/**
 * Created by cRAZY on 2017/2/17.
 */
public class User {
    private Integer userId;
    private String login;
    private String password;
    private String name;
    private String description;
    private char enabled;

    public String getPassword() {
        return password;
    }

    public Integer getUserId() {
        return userId;
    }

    public String getLogin() {
        return login;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public char getEnabled() {
        return enabled;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setEnabled(char enabled) {
        this.enabled = enabled;
    }
}
