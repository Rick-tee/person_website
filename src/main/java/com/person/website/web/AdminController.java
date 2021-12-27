package com.person.website.web;

import com.person.website.pojo.*;
import com.person.website.base.*;
import com.person.website.utils.*;
import com.person.website.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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
    @PostMapping("/user/query.action")
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
    @PostMapping("/user/delete.action")
    public Result deleteUserByUserId(@RequestParam("arg") String userId){

        int result = userService.removeByUserId(userId);

        if (result != 0){
            return new Result(STATUS_CODE,result,"数据成功响应");
        }
        return new Result(STATUS_CODE,result,"数据不存在");
    }

    /**
     * 根据手机号码或用户id查询数据
     * @param arg 手机号码或用户id
     * @return 返回结果对象
     */
    @PostMapping("/user/queryUserByUserIdOrTel.action")
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
    @PostMapping("/user/updateUserStatus.action")
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

        if (videoList.size() == 0){
            return new Result(STATUS_CODE,videoList,"无视频数据");
        }
        return new Result(STATUS_CODE,videoList,"查询数据成功");
    }

    /**
     * 根据用户id或视频id查询数据
     * @param arg 用户id或视频id
     * @return result集合
     */
    @PostMapping("/video/queryVideoByVideoIdOrUserId.action")
    public Result queryVideoByVideoNoOrUserId(String arg){
        //判断逻辑
        if (arg.length() == 11){
            //通过视频id查询
            List<Video> videoList = videoService.findVideoByVideoId(arg);

            if (videoList.size() != 0){
                return new Result(STATUS_CODE,videoList,"查询数据成功");
            }
            return new Result(STATUS_CODE,videoList,"查询数据不存在");
        }

        //用户id查询
        List<Video> videoList = videoService.findVideoByUserId(arg);
        if (videoList.size() != 0){
            return new Result(STATUS_CODE,videoList,"查询数据成功");
        }
        return new Result(STATUS_CODE,videoList,"查询数据不存在");
    }

    /**
     * 根据视频id更新更新状态
     * @param arg 视频id
     * @param value 状态值
     * @return 返回result集合
     */
    @PostMapping("/video/update.action")
    public Result updateByVideoId(String arg,String value){
        Video video = new Video();
        video.setVideoId(arg);
        video.setVideoState(Byte.valueOf(value));
        int result  = videoService.renewVideoByVideoId(video);
        if (result == 0){
            return new Result(STATUS_CODE,result,"状态更新失败");
        }
        return new Result(STATUS_CODE,result,"状态更新成功");
    }

    /**
     * 根据视频id删除数据
     * @param videoId 视频id
     * @return result集合
     */
    @PostMapping("/video/delete.action")
    public Result delete(@RequestParam("arg") String videoId){
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

        if (musicList.size() == 0){
            return new Result(STATUS_CODE,musicList,"暂无歌单信息");
        }

        return new Result(STATUS_CODE,musicList,"暂无歌单信息");
    }

    /**
     * 根据歌单id或用户id查询数据
     * @param arg 用户id或歌单id
     * @return 返回result集合
     */
    @PostMapping("/music/queryMusicByMusicIdOrUserId.action")
    public Result queryMusicByMusicIdOrUserId(String arg){
        //判断逻辑
        if (arg.length() == 12){
            //通过歌单id查询
            List<Music> musicList = musicService.findMusicByMusicId(arg);

            if (musicList.size() != 0){
                return new Result(STATUS_CODE,musicList,"查询数据成功");
            }
            return new Result(STATUS_CODE,musicList,"查询数据不存在");
        }

        //用户id查询
        List<Music> musicList = musicService.findMusicByUserId(arg);
        if (musicList.size() != 0){
            return new Result(STATUS_CODE,musicList,"查询数据成功");
        }
        return new Result(STATUS_CODE,musicList,"查询数据不存在");
    }

    /**
     * 根据歌单id更新状态
     * @param arg 歌单id
     * @param value 状态值
     * @return 返回result集合
     */
    @PostMapping("/music/update.action")
    public Result updateByMusicId(String arg,String value){
        Music music = new Music();
        music.setMusicId(arg);
        music.setMusicState(Byte.valueOf(value));
        int result  = musicService.renewMusicByMusicId(music);
        if (result == 0){
            return new Result(STATUS_CODE,result,"状态更新失败");
        }
        return new Result(STATUS_CODE,result,"状态更新成功");
    }

    /**
     * 根据歌单id删除数据
     * @param musicId 歌单id
     * @return 返回result集合
     */
    @PostMapping("/music/delete.action")
    public Result deleteByMusicId(@RequestParam("arg") String musicId){
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

        if (pictureList.size() == 0){
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
            if (0 != pictureList.size()){
                return new Result(STATUS_CODE,pictureList,"数据查询成功");
            }
            return new Result(STATUS_CODE,pictureList,"暂无该用户的相册信息");
        }

        List<Picture> pictureList = pictureService.findPictureByPictureId(arg);

        if (0 != pictureList.size()){
            return new Result(STATUS_CODE,pictureList,"数据查询成功");
        }
        return new Result(STATUS_CODE,pictureList,"暂无该用户的相册信息");
    }

    /**
     * 根据相册id更新状态
     * @param arg 相册id
     * @param value 状态值
     * @return 返回result集合
     */
    @PostMapping("/picture/update.action")
    public Result updateByPictureId(String arg,String value){
        Picture picture = new Picture();
        picture.setPicId(arg);
        picture.setPicState(Byte.valueOf(value));
        int result  = pictureService.renewPictureByPictureId(picture);
        if (result == 0){
            return new Result(STATUS_CODE,result,"状态更新失败");
        }
        return new Result(STATUS_CODE,result,"状态更新成功");
    }

    /**
     * 根据相册id删除数据
     * @param pictureId 相册id
     * @return 返回result结果集合
     */
    @PostMapping("/picture/delete.action")
    public Result deleteByPictureId(@RequestParam("arg") String pictureId){
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
        if (orderList.size() != 0){
            return new Result(STATUS_CODE,orderList,"订单信息查询成功");
        }
        return new Result(STATUS_CODE,orderList,"暂无订单数据");
    }

    /**
     * 查询用户订单信息
     * @param arg 用户id或订单编号
     * @return 返回result集合
     */
    @PostMapping("/order/queryByUserIdOrPayId.action")
    public Result queryByUserId(String arg){
        if (arg.length() != 17){
            //用户id查询
            Order order = orderService.findOrderByUserId(arg);
            if (order == null){
                return new Result(STATUS_CODE,order,"无用户订单信息");
            }
            return new Result(STATUS_CODE,order,"成功查询用户订单信息");
        }

        //订单编号查询
        Order order = orderService.findOrderByPayId(arg);
        if (order == null){
            return new Result(STATUS_CODE,order,"无用户订单信息");
        }
        return new Result(STATUS_CODE,order,"成功查询用户订单信息");
    }

    /**
     * 根据订单编号删除数据
     * @param payId 订单编号
     * @return 返回影响记录数
     */
    @PostMapping("/order/delete.action")
    public Result deleteByPayId(@RequestParam("arg") String payId){
        int result = orderService.removeByPayId(payId);
        if (result != 0){
            return new Result(STATUS_CODE,result,"删除订单数据成功");
        }
        return new Result(STATUS_CODE,result,"删除订单数据失败");
    }
}

