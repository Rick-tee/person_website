package com.person.website.web;

import com.person.website.pojo.*;
import com.person.website.service.*;
import com.person.website.utils.EmailUtil;
import com.person.website.utils.MD5Util;
import com.person.website.utils.UserIdUtil;
import com.person.website.utils.UserPathResourceUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 前端用户登录、注册、忘记密码一块
 *
 * @author 赵李
 * @date 2021-10-1
 */
@Controller
@RequestMapping("/font")
@CrossOrigin
public class UserController {
    //创建一个键值对,用户存储用户的邮箱/手机号码 和验证码的
    private static Map<String, Object> map = new HashMap<>();

    //存储用户session信息
    public static HttpSession session = null;

    //路径名
    @Value(value = "${path}")
    private String path;
    //项目名
    @Value("${project.name}")
    private String projectName;

    //邮箱SMTP服务器(默认163.com)
    @Value("${email.hostName}")
    private String hostName;

    //邮箱字符编码
    @Value("${email.charset}")
    private String charset;

    //发送者邮箱地址
    @Value("${email.fromEmail}")
    private String fromEmail;

    //发送者用户名
    @Value("${email.fromName}")
    private String fromName;

    //发送者邮箱授权码
    @Value("${email.password}")
    private String password;

    @Autowired
    private UserService userService;

    @Autowired
    private DistrictService districtService;

    @Autowired
    private ResumeService resumeService;

    @Autowired
    private PictureService pictureService;

    @Autowired
    private MusicService musicService;

    @Autowired
    private VideoService videoService;

    /**
     * 通过用户id获得对应用户信息
     * @param userId userId
     * @return 返回用户信息
     */
    @PostMapping("/getUserInfoByUserId.action")
    @ResponseBody
    public User getUserInfoByUserId(String userId){
        return userService.findUserByUserId(userId);
    }

    /**
     * 用户注册
     *
     * @param registerUser 用户注册对象
     * @return 返回注册结果：1成功；0失败
     */
    @PostMapping("/register.action")
    @ResponseBody
    @Transactional(rollbackFor = Exception.class)
    public String register(RegisterUser registerUser, HttpServletRequest request) {
        //创建User对象
        User user = new User();

        user.setUserName(registerUser.getUserName());
        user.setUserId(UserIdUtil.getUUID());
        user.setPhone(registerUser.getPhone());
        user.setEmail(registerUser.getEmail());
        user.setPassword(MD5Util.stringToMD5(registerUser.getPassword()));
        user.setIp(request.getRemoteAddr());
        user.setSpaceState((byte) 0);
        user.setFreeSpace((byte) 20);
        user.setAccountState((byte) 1);
        user.setRegTime(new Date());

        int result = userService.addUser(user);
        //判断是否注册成功
        if (1 == result) {
            //获得 session 赋值
            session = request.getSession();

            //简历信息注册
            resumeService.add(user.getUserId());

            session.setAttribute("user",user.getUserId());
            //创建用户目录
            UserPathResourceUtil.mkdirs(path + projectName + "/" + user.getUserId());
        }
        return String.valueOf(result);
    }

    /**
     * 注册时手机号码注册查询
     *
     * @param phone 手机号码
     * @return 返回User对象
     */
    @PostMapping("/phoneTest.action")
    @ResponseBody
    public User PhoneInfo(String phone) {
        return userService.findUserByPhone(phone);
    }

    /**
     * 注册时邮箱注册查询
     *
     * @param email 邮箱地址
     * @return 返回User对象
     */
    @PostMapping("/emailTest.action")
    @ResponseBody
    public User EmailInfo(String email) {
        return userService.findUserByEmail(email);
    }

    /**
     * 用户登录查询
     *
     * @param userInfo 手机号码/邮箱
     * @param password 账户密码
     * @return 返回用户对象
     */
    @PostMapping("/userLogin.action")
    @ResponseBody
    public User login(String userInfo, String password,HttpServletRequest request) {
        //密码需要经过加密再查询
        password = MD5Util.stringToMD5(password);

        //获得session
        session = request.getSession();

        //创建User对象
        User user = new User();

        if (userInfo.length() != 11) {
            user = userService.findUserByEmailAndPwd(userInfo, password);
            //设置session
            session.setAttribute("user",user.getUserId());
        } else {
            user = userService.findUserByPhoneAndPwd(userInfo, password);
            session.setAttribute("user",user.getUserId());
        }
        return user;
    }

    /**
     * 用户请求验证码
     *
     * @param email   用户邮箱地址
     * @param subject 邮件主题
     * @return 返回字符串
     */
    @PostMapping("/sendCode.action")
    @ResponseBody
    public String sendCode(@RequestParam("info") String email, String subject) {

        //判断用户传递的信息参数
        if (!email.contains("@")) {
            //代表这里是手机号码短信验证
            //后续添加
        }

        //获得随机验证码
        int number = UserIdUtil.getRandomNumber();

        //调用邮件工具类
        String result = EmailUtil.sendEmail(hostName, charset, email, fromEmail, "小木子网站", fromEmail, password,
                subject, EmailUtil.getMsg("小木子网站", "小木子个人博客网站", number));

        //判断返回的邮件内容
        if (null != result) {
            map.put(email, String.valueOf(number));
        }
        return result;
    }

    /**
     * 用户忘记密码验证 验证码
     *
     * @param info 用户信息 手机号码或邮箱
     * @param code 验证码
     * @return 返回用户对象或空
     */
    @PostMapping("/verificationEmailAndCode.action")
    @ResponseBody
    public User verificationEmailAndCode(String info, String code) {
        //首先验证用户输入的验证码和存储的验证码是否一致
        //判断用户传递的信息参数
        //不存在,直接返回失败
        if (!code.equals(map.get(info))) {
            return null;
        }

        //查询用户是否注册
        //判断是手机号还是邮箱地址
        if (info.contains("@")) {
            //邮箱查询
            return userService.findUserByEmail(info);
        } else {
            //手机查询
            return userService.findUserByPhone(info);
        }
    }

    /**
     * 查询所有城市 信息
     * @return 返回区域对象
     */
    @RequestMapping("/getProvince.action")
    @ResponseBody
    public List<District> getProvince(){
        return districtService.findAllProvince();
    }

    /**
     * 用户进行头像上传
     * @param file 用户上传的图片
     * @return 返回用户信息
     */
    @Transactional
    @RequestMapping("/avatarUpload.action")
    @ResponseBody
    public User avatarUpload(MultipartFile file,HttpServletRequest request){
        //设置上传图片的路径
        String imgPath = path + projectName + "/" + session.getAttribute("user") + "/";

        //获得文件的扩展名，包含文件名
        String extensionName = file.getOriginalFilename();

        //封装上传文件
        File targetFile = new File(imgPath,extensionName);
        try {
            file.transferTo(targetFile);
        } catch (IOException e) {
            e.printStackTrace();
        }

        //文件名称，全限定名称
        String fileName = imgPath + extensionName;

        //更新用户信息
        userService.renewUserByUserId(String.valueOf(session.getAttribute("user")),fileName);

        //查询用户信息，返回
        return userService.findUserByUserId(String.valueOf(session.getAttribute("user")));
    }

    /**
     * 用户信息更新
     * @param userId 用户id，条件
     * @param userName 用户名
     * @param sex 性别
     * @param phone 手机号码
     * @param email 邮箱
     * @param province 省份
     * @param city 城市
     * @param county 乡镇
     * @param address 详细地址
     * @param leftWish 左边心愿
     * @param rightWhisper 右边悄悄话
     * @param request 请求
     * @return 返回用户对象
     */
    @Transactional
    @PostMapping("/userUpdate.action")
    @ResponseBody
    public User updateUser(String userId,String userName,String sex,
                           String phone,String email,String province,String city,String county,
                           String address,String leftWish,String rightWhisper,HttpServletRequest request){

        //更新用户信息
        int result = userService.renewUserInfoByUserId(userId,userName,sex,phone,email,province,city,
                county,address,leftWish,rightWhisper,new Date(),request.getRemoteAddr());

        //查询用户信息，返回浏览器
        return userService.findUserByUserId(userId);
    }


    /**
     * 获得用户头像
     * @param userId 用户id
     * @param response
     */
    @RequestMapping("/getUserAvatar.action")
    public void outUserAvatar(String userId,HttpServletResponse response){
        //查询用户信息
        User user = userService.findUserByUserId(userId);

        //获得图片信息
        String imgPath = user.getUserAvatar();

        //用户头像是空，则不返回
        if (null == imgPath){
            return;
        }

        //设置返回的contentType
        response.setContentType("image/jpg");

        //用户头像存在，进行
        try {
            //读取图片地址，返回图片
            FileCopyUtils.copy(new FileInputStream(imgPath), response.getOutputStream());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 根据用户id 更新用户的密码
     * @param userId 用户id
     * @param password 待更新的密码
     * @return 返回user 对象的 json数据
     */
    @PostMapping("/updatePasswordByUserId.action")
    public @ResponseBody User updatePasswordByUserId(String userId,String password){
        //密码加密
        password = MD5Util.stringToMD5(password);

        //用户更新影响的记录数
        int result = userService.renewPasswordByUserId(userId,password);

        //成功更新后，查询数据
        if (result == 1){
            //发起查询
            return userService.findUserByUserId(userId);
        }
        return null;
    }
}
