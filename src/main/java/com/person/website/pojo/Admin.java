package com.person.website.pojo;

import java.io.Serializable;

public class Admin implements Serializable {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_admin.id
     *
     * @mbggenerated Fri Oct 22 09:06:08 CST 2021
     */
    private Integer id;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_admin.admin_name
     *
     * @mbggenerated Fri Oct 22 09:06:08 CST 2021
     */
    private String adminName;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_admin.password
     *
     * @mbggenerated Fri Oct 22 09:06:08 CST 2021
     */
    private String password;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table t_admin
     *
     * @mbggenerated Fri Oct 22 09:06:08 CST 2021
     */
    private static final long serialVersionUID = 1L;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_admin.id
     *
     * @return the value of t_admin.id
     *
     * @mbggenerated Fri Oct 22 09:06:08 CST 2021
     */
    public Integer getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_admin.id
     *
     * @param id the value for t_admin.id
     *
     * @mbggenerated Fri Oct 22 09:06:08 CST 2021
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_admin.admin_name
     *
     * @return the value of t_admin.admin_name
     *
     * @mbggenerated Fri Oct 22 09:06:08 CST 2021
     */
    public String getAdminName() {
        return adminName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_admin.admin_name
     *
     * @param adminName the value for t_admin.admin_name
     *
     * @mbggenerated Fri Oct 22 09:06:08 CST 2021
     */
    public void setAdminName(String adminName) {
        this.adminName = adminName == null ? null : adminName.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_admin.password
     *
     * @return the value of t_admin.password
     *
     * @mbggenerated Fri Oct 22 09:06:08 CST 2021
     */
    public String getPassword() {
        return password;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_admin.password
     *
     * @param password the value for t_admin.password
     *
     * @mbggenerated Fri Oct 22 09:06:08 CST 2021
     */
    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }
}