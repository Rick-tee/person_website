package com.person.website.service.impl;

import com.person.website.mapper.UserMapper;
import com.person.website.pojo.User;
import com.person.website.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Resource
    private UserMapper userMapper;

    @Override
    public User findUserById(Integer id) {
        return userMapper.selectByPrimaryKey(id);
    }

    @Override
    public int addUser(User user) {
        return userMapper.insert(user);
    }

    @Override
    public User findUserByPhone(String phone) {
        return userMapper.selectUserByPhone(phone);
    }

    @Override
    public User findUserByEmail(String email) {
        return userMapper.selectUserByEmail(email);
    }

    @Override
    public User findUserByEmailAndPwd(String userInfo, String password) {
        return userMapper.selectUserByEmailAndPwd(userInfo,password);
    }

    @Override
    public User findUserByPhoneAndPwd(String userInfo, String password) {
        return userMapper.selectUserByPhoneAndPwd(userInfo,password);
    }

    @Override
    public int renewUserByUserId(String userId,String fileName) {
        return userMapper.insertAvatar(userId,fileName);
    }

    @Override
    public User findUserByUserId(String userId) {
        return userMapper.selectByUserId(userId);
    }

    @Override
    public int renewUserInfoByUserId(String userId, String userName, String sex, String phone, String email, String province, String city, String county, String address, String leftWish, String rightWhisper, Date upTime,String ip) {
        return userMapper.updateUserInfoByUserId(userId,userName,sex,phone,email,province,city,county,address,leftWish,rightWhisper,upTime,ip);
    }

    @Override
    public int renewUserByUserId(User user) {
        return userMapper.updateUserSelectiveByUserId(user);
    }

    @Override
    public int renewPasswordByUserId(String userId, String password) {
        return userMapper.updatePasswordByUserId(userId,password);
    }

    @Override
    public List<User> findUserAll() {
        return userMapper.selectUserAll();
    }

    @Override
    public int removeByUserId(String userId) {
        return userMapper.deleteByUserId(userId);
    }
}
