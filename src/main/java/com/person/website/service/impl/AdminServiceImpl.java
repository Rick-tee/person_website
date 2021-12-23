package com.person.website.service.impl;

import com.person.website.mapper.AdminMapper;
import com.person.website.pojo.Admin;
import com.person.website.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService {

    //持久层
    @Autowired
    private AdminMapper adminMapper;

    /**
     * 管理员登录
     * @param admin_name 用户名
     * @param password 密码
     * @return 返回影响的记录数
     */
    @Override
    public Admin login(String admin_name, String password) {
        return adminMapper.login(admin_name,password);
    }
}
