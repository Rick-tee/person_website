package com.person.website.web;

import com.person.website.base.Result;
import com.person.website.pojo.*;
import com.person.website.service.*;
import com.person.website.utils.MD5Util;
import com.person.website.utils.SimpleDateFormatUtil;
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
    //定义状态都为1
    private static final Integer STATUS_CODE = 0;

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
    @Autowired
    private OrderService orderService;

    /**
     * 管理员登录
     * @param admin_name 用户名
     * @param password 密码
     * @return 返回管理员用户对象
     */
    @PostMapping("/login.action")
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
    @PostMapping("user/getAllUserList.action")
    public Result getAllUserList(){

        //获得所有用户数据
        List<User> userList = userService.findUserAll();

        //判断数据
        if (userList.size() != 0){
            return new Result(STATUS_CODE,userList,"数据成功响应");
        }

        return new Result(STATUS_CODE,null,"无任何用户数据");
    }

    /**
     * 删除用户数据
     * @param userId 用户id
     * @return 返回Result结果集
     */
    @DeleteMapping("user/delete.action")
    public Result deleteUserByUserId(@RequestParam("arg") String userId){

        int result = userService.removeByUserId(userId);

        if (result != 0){
            return new Result(STATUS_CODE,userService.findUserByUserId(userId),"数据成功响应");
        }
        return new Result(STATUS_CODE,null,"数据不存在");
    }

    /**
     * 根据手机号码或用户id查询数据
     * @param arg 手机号码或用户id
     * @return 返回结果对象
     */
    @PostMapping("user/query.action")
    public Result queryByUserIdOrTel(String arg){
        if (arg.length() == 11){
            //根据手机号码查询数据
            User user = userService.findUserByPhone(arg);
            if (user != null){
                return new Result(STATUS_CODE,user,"数据查询成功");
            }
            return new Result(STATUS_CODE,null,"数据不存在");
        }

        //根据userId查询
        User user = userService.findUserByUserId(arg);
        if (user != null){
            return new Result(STATUS_CODE,user,"数据查询成功");
        }
        return new Result(STATUS_CODE,null,"数据不存在");
    }

    /**
     * 更新用户账户状态
     * @param userId userId
     * @param status 更新的状态
     * @return 返回结果集对象
     */
    @PostMapping("user/updateStatus.action")
    public Result updateStatus(String userId,String status){
        User user = new User();
        user.setUserId(userId);
        user.setAccountState(Byte.valueOf(status));
        int result = userService.renewUserByUserId(user);
        if (result == 1){
            return new Result(STATUS_CODE,user,"用户更新成功");
        }

        return new Result(STATUS_CODE,user,"用户更新失败");
    }

    /**
     * 获得所有视频信息
     * @return 返回result集合
     */
    @PostMapping("/video/query.action")
    public Result query(){
        List<Video> videoList = videoService.findAll();

        if (videoList == null){
            return new Result(STATUS_CODE,videoList,"无视频数据");
        }
        return new Result(STATUS_CODE,videoList,"查询数据成功");
    }

    /**
     * 根据用户id或视频id查询数据
     * @param arg 用户id或视频id
     * @return result集合
     */
    @PostMapping("/video/queryByVideoNoAndUserId.action")
    public Result queryByVideoIdAndUserId(String arg){
        //判断逻辑
        if (arg.length() != 11){
            //通过视频id查询
            List<Video> videoList = videoService.findVideoByVideoId(arg);

            if (videoList != null){
                return new Result(STATUS_CODE,videoList,"查询数据成功");
            }
            return new Result(STATUS_CODE,videoList,"查询数据不存在");
        }

        //用户id查询
        List<Video> videoList = videoService.findVideoByUserId(arg);
        if (videoList != null){
            return new Result(STATUS_CODE,videoList,"查询数据成功");
        }
        return new Result(STATUS_CODE,videoList,"查询数据不存在");
    }

    /**
     * 根据视频id删除数据
     * @param videoId 视频id
     * @return result集合
     */
    @PostMapping("/video/delete.action")
    public Result delete(String videoId){
        int result = videoService.removeByVideoId(videoId);

        if (result != 0){
            return new Result(STATUS_CODE,result,"视频成功删除");
        }
        return new Result(STATUS_CODE,result,"视频成功失败");
    }

    /**
     * 查询所有的歌单信息
     * @return 返回result集合
     */
    @PostMapping("/music/query.action")
    public Result queryMusic(){
        List<Music> musicList = musicService.findAll();

        if (musicList == null){
            return new Result(STATUS_CODE,musicList,"暂无歌单信息");
        }

        return new Result(STATUS_CODE,musicList,"暂无歌单信息");
    }

    /**
     * 根据歌单id或用户id查询数据
     * @param arg 用户id或歌单id
     * @return 返回result集合
     */
    @PostMapping("/music/queryBymusicIdAndUserId.action")
    public Result queryByMusicIdAndUserId(String arg){
        //判断逻辑
        if (arg.length() != 11){
            //通过歌单id查询
            List<Music> musicList = musicService.findMusicByMusicId(arg);

            if (musicList != null){
                return new Result(STATUS_CODE,musicList,"查询数据成功");
            }
            return new Result(STATUS_CODE,musicList,"查询数据不存在");
        }

        //用户id查询
        List<Music> musicList = musicService.findMusicByUserId(arg);
        if (musicList != null){
            return new Result(STATUS_CODE,musicList,"查询数据成功");
        }
        return new Result(STATUS_CODE,musicList,"查询数据不存在");
    }

    /**
     * 根据歌单id删除数据
     * @param musicId 歌单id
     * @return 返回result集合
     */
    @PostMapping("/music/delete.action")
    public Result deleteByMusic(String musicId){
        int result = musicService.removeByMusicId(musicId);

        if (result != 0){
            return new Result(STATUS_CODE,result,"歌单数据成功删除");
        }

        return new Result(STATUS_CODE,result,"歌单数据失败删除");
    }

    /**
     * 获得所有相册信息
     * @return 返回result集合
     */
    @PostMapping("/picture/query.action")
    public Result queryAll(){
        List<Picture> pictureList = pictureService.findAll();

        if (pictureList == null){
            return new Result(STATUS_CODE,pictureList,"暂无用户相册信息");
        }
        return new Result(STATUS_CODE,pictureList,"数据查询成功");
    }

    /**
     * 根据用户id或相册id查询数据
     * @param arg 用户id或相册id
     * @return 返回result集合
     */
    @PostMapping("/picture/queryByPictureIdOrUserId.action")
    public Result queryByPicture(String arg){
        if (arg.length() == 11){
            //用户查询
            List<Picture> pictureList = pictureService.findPictureByUserId(arg);
            if (null != pictureList){
                return new Result(STATUS_CODE,pictureList,"数据查询成功");
            }
            return new Result(STATUS_CODE,pictureList,"暂无该用户的相册信息");
        }

        List<Picture> pictureList = pictureService.findPictureByPictureId(arg);

        if (null != pictureList){
            return new Result(STATUS_CODE,pictureList,"数据查询成功");
        }
        return new Result(STATUS_CODE,pictureList,"暂无该用户的相册信息");
    }

    /**
     * 根据相册id删除数据
     * @param pictureId 相册id
     * @return 返回result结果集合
     */
    @PostMapping("/picture/delete.action")
    public Result deleteByPictureId(String pictureId){
        int result = pictureService.removeByPictureId(pictureId);
        if (result != 0){
            return new Result(STATUS_CODE,result,"删除相册数据成功");
        }
        return new Result(STATUS_CODE,result,"删除相册数据失败");
    }

    /**
     * 查询所有订单数据
     * @return 返回result集合
     */
    @PostMapping("/order/query.action")
    public Result queryOrderAll(){
        List<Order> orderList = orderService.findAll();
        if (orderList != null){
            return new Result(STATUS_CODE,orderList,"订单信息查询成功");
        }
        return new Result(STATUS_CODE,orderList,"暂无订单数据");
    }

    /**
     * 查询用户订单信息
     * @param userId 用户id
     * @return 返回result集合
     */
    @PostMapping("/order/queryByUserId.action")
    public Result queryByUserId(String userId){
        Order order = orderService.findOrderByUserId(userId);
        if (order == null){
            return new Result(STATUS_CODE,order,"无用户订单信息");
        }
        return new Result(STATUS_CODE,order,"成功查询用户订单信息");
    }
}

