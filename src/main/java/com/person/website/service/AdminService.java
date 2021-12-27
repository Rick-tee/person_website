package com.person.website.service;

import com.person.website.pojo.Admin;
import org.apache.ibatis.annotations.Param;

/**
 * 管理员登录
 * @author 赵李
 */
public interface AdminService {

    /**
     * 管理员登录
     * @param admin_name 用户名
     * @param password 密码
     * @return 返回影响的记录数
     */
    Admin login(@Param("admin_name") String admin_name, @Param("password") String password);
}
