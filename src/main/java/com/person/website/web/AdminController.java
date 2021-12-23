package com.person.website.web;

import com.person.website.base.Result;
import com.person.website.pojo.Admin;
import com.person.website.pojo.User;
import com.person.website.service.*;
import com.person.website.utils.MD5Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 后台的信息
 * @author 赵李
 */
@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private UserService userService;
    @Autowired
    private VideoService videoService;
    @Autowired
    private MusicService musicService;
    @Autowired
    private PictureService pictureService;
    @Autowired
    private AdminService adminService;

    /**
     * 管理员登录
     * @param admin_name 用户名
     * @param password 密码
     * @return 返回管理员用户对象
     */
    @PostMapping("/login.action")
    @ResponseBody
    public Admin login(String admin_name, String password){
        //密码加密
        password = MD5Util.stringToMD5(password);

        Admin admin = adminService.login(admin_name,password);
        return admin;
    }

    /**
     * 获得所有用户信息
     * @return 返回map集合
     */
    @PostMapping("/getAllUserList.action")
    public Result getAllUserList(){

        //获得所有用户数据
        List<User> userList = userService.findUserAll();

        //判断数据
        if (userList.size() != 0){
            return new Result(1,userList,"数据成功响应");
        }

        return new Result(0,null,"数据不存在");
    }

    /**
     * 删除用户数据
     * @param userId 用户id
     * @return 返回Result结果集
     */
    @DeleteMapping("/delete.action")
    public Result deleteUserByUserId(@RequestParam("val") String userId){

        int result = userService.removeByUserId(userId);

        if (result != 0){
            return new Result(result,userService.findUserByUserId(userId),"数据成功响应");
        }
        return new Result(0,null,"数据不存在");
    }

    /**
     * 根据手机号码或用户id查询数据
     * @param val 手机号码或用户id
     * @return 返回结果对象
     */
    @PostMapping("/query.action")
    public Result queryByUserIdOrTel(String val){
        if (val.length() == 11){
            //根据手机号码查询数据
            User user = userService.findUserByPhone(val);
            if (user != null){
                return new Result(1,user,"数据查询成功");
            }
            return new Result(0,null,"数据不存在");
        }

        //根据userId查询
        User user = userService.findUserByUserId(val);
        if (user != null){
            return new Result(1,user,"数据查询成功");
        }
        return new Result(0,null,"数据不存在");
    }
}
