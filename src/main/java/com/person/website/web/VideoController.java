package com.person.website.web;

import com.person.website.pojo.Video;
import com.person.website.service.VideoService;
import com.person.website.utils.FileFormatUtil;
import com.person.website.utils.UserIdUtil;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;

/**
 * @author 赵李
 * 首页所有视频信息的加载
 */
@Controller
@CrossOrigin
@RequestMapping("/video")
public class VideoController {
    //路径名
    @Value(value = "${path}")
    private String path;

    //项目名
    @Value("${project.name}")
    private String projectName;

    //视频id
    private static String videoId;

    @Autowired
    private VideoService videoService;

    /**
     * 视频的接口
     * @param keyword 搜索的关键字
     * @return 返回视频集合
     */
    @GetMapping(value = "/video.action" ,produces = {"application/json; charset=utf-8"})
    @ResponseBody
    public List<String> video(String keyword) {
        List<String> list = new ArrayList<>();

        try {
            //创建默认连接
            CloseableHttpClient httpClient = HttpClients.createDefault();
            //创建HttpGet对象,处理get请求,转发到A站点
            HttpGet httpGet = new HttpGet("https://api.bilibili.com/x/web-interface/search/type?keyword=" + keyword + "&search_type=video");
            //执行
            CloseableHttpResponse res = httpClient.execute(httpGet);
            int code = res.getStatusLine().getStatusCode();

            if (code == 200) {
                //获取A站点返回的结果
                String result = EntityUtils.toString(res.getEntity());
                //把结果返回给B站点
                list.add(result);
            }
            res.close();
            httpClient.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    /**
     * 判断用户是否存在视频
     * @param userId 用户id
     * @return
     */
    @PostMapping("selectVideoCountByUserId.action")
    @ResponseBody
    public int selectVideoCountByUserId(String userId){
        return videoService.findVideoCountByUserId(userId);
    }

    /**
     * 个人视频上传，图片封面
     * @param file 文件上传组件
     */
    @RequestMapping("/videoPic.action")
    public @ResponseBody Video videoPicUpload(MultipartFile file){
        //userId
        String userId = (String) UserController.session.getAttribute("user");

        //设置上传视频或视频封面的路径
        String filePath = path + projectName + "/" + userId + "/" + "video/";

        //获得文件的扩展名，包含文件名
        String extensionName = file.getOriginalFilename();

        //封装上传文件
        File targetFile = new File(filePath,extensionName);

        //不存在地址，则创建地址
        if (!targetFile.exists()){
            targetFile.mkdirs();
        }
        try {
            file.transferTo(targetFile);
        } catch (IOException e) {
            e.printStackTrace();
        }

        //视频封面
        //文件名称，全限定名称
        String fileName = filePath + extensionName;

        //获得随机视频id
        videoId = UserIdUtil.videoUUID();

        Video video = new Video();
        video.setUserId(userId);
        video.setVideoId(videoId);
        video.setVideoPic(fileName);

        //文件写入数据库
        videoService.addSelectiveByUserId(video);

        return video;
    }

    /**
     * 个人视频上传，
     * @param file 文件上传组件
     */
    @Transactional
    @RequestMapping("/videoList.action")
    public @ResponseBody List<Video> videoList(MultipartFile file){
        //创建集合
        List<Video> videoList = new ArrayList<>();

        //userId
        String userId = (String) UserController.session.getAttribute("user");

        //设置上传视频或视频封面的路径
        String filePath = path + projectName + "/" + userId + "/" + "video/";

        //获得文件的扩展名，包含文件名
        String extensionName = file.getOriginalFilename();

        //封装上传文件
        File targetFile = new File(filePath,extensionName);

        //不存在地址，则创建地址
        if (!targetFile.exists()){
            targetFile.mkdirs();
        }
        try {
            file.transferTo(targetFile);
        } catch (IOException e) {
            e.printStackTrace();
        }

        //视频
        //文件名称，全限定名称
        String fileName = filePath + extensionName;

        //向数据库中查询数据
        List<Video> videos = videoService.findVideoByUserId(userId);

        //遍历集合
        for(Video video:videos){
            if (video.getVideoUrl() == "" || video.getVideoUrl() == null){
                //数据信息
                video.setUserId(userId);
                video.setVideoUrl(fileName);
                video.setVideoId(videoId);
                video.setVideoState(Byte.valueOf("1"));
                video.setUploadTime(new Date());

                //数据库数据更新
                int result = videoService.renewVideoByVideoId(video);
                if (result == 0 && targetFile.exists()){
                    targetFile.delete();
                }
            }else {
                //数据信息
                video.setId(video.getId() + 1);
                video.setUserId(userId);
                video.setVideoUrl(fileName);
                video.setVideoId(videoId);
                video.setVideoState(Byte.valueOf("1"));
                video.setUploadTime(new Date());
                //向数据库中添加数据
                videoService.add(video);
            }
            //添加数据
            videoList.add(video);
        }

        //数据库数据更新不成功，删除上传的视频文件
        if (videoList.size() == 0 && targetFile.exists()){
            targetFile.delete();
        }
        return videoList;
    }

    /**
     * 更新用户的个人视频文字信息
     * @param videoClassification 视频分类
     * @param videoName 视频册名
     * @param type 公开 or 私有
     * @return 返回更新信息，0失败，否则成功
     */
    @RequestMapping("/videoDescriptionInfo.action")
    @ResponseBody
    public boolean videoDescriptionInfo(String videoClassification,String videoName,String type){
        //默认更新结果失败
        int result = 0;

        //创建视频对象
        Video video = new Video();

        //添加更新信息
        video.setVideoClassification(Byte.valueOf(videoClassification));
        video.setVideoName(videoName);
        video.setType(Byte.valueOf(type));
        video.setVideoId(videoId);

        result = videoService.renewVideoByVideoId(video);

        return result > 0;
    }

    /**
     * 获得用户视频列表
     * @return 返回list集合
     */
    @RequestMapping("/getVideoList.action")
    public @ResponseBody
    Map<String,Object> getVideoList(){
        //获得userId
        String userId = (String) UserController.session.getAttribute("user");

        //返回数据集合
        List<Video> videoList = videoService.findVideoByUserId(userId);

        Map<String,Object> map = new HashMap<>();

        map.put("code",0);
        map.put("data",videoList);

        return map;
    }
}
