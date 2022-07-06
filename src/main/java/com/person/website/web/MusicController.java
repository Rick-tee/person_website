package com.person.website.web;

import com.person.website.pojo.Music;
import com.person.website.pojo.Video;
import com.person.website.service.MusicService;
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
 * 音乐接口
 * @author 赵李
 */
@Controller
@CrossOrigin
@RequestMapping("/music")
public class MusicController {
    //路径名
    @Value(value = "${path}")
    private String path;

    //项目名
    @Value("${project.name}")
    private String projectName;

    //歌单id
    private static String musicId;

    @Autowired
    private MusicService musicService;

    /**
     * 热门歌单列表
     * @return 返回list集合 json格式
     */
    @GetMapping(value = "/music.action",produces = {"application/json; charset=utf-8"})
    @ResponseBody
    public String music(){
        try {
            //创建默认连接
            CloseableHttpClient httpClient = HttpClients.createDefault();
            //创建HttpGet对象,处理get请求,转发到A站点
            HttpGet httpGet = new HttpGet("http://mobilecdnbj.kugou.com/api/v5/special/recommend?recommend_expire=0&sign=52186982747e1404d426fa3f2a1e8ee4&plat=0&uid=0&version=9108&page=1&area_code=1&appid=1005&mid=286974383886022203545511837994020015101&_t=1545746286");
            //执行
            CloseableHttpResponse res = httpClient.execute(httpGet);
            int code = res.getStatusLine().getStatusCode();

            if (code == 200) {
                //获取A站点返回的结果
                String result = EntityUtils.toString(res.getEntity());
                //把结果返回给B站点
                return result;
            }
            res.close();
            httpClient.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 歌单详细信息
     * @param cmd 歌单 cmd值
     * @param hash 歌曲哈希值
     * @return 返回歌单中对应的歌曲信息
     */
    @GetMapping(value = "/musicInfo.action" ,produces = {"application/json; charset=utf-8"})
    public @ResponseBody String getMusicInfo(String cmd,String hash){
        try {
            //创建默认连接
            CloseableHttpClient httpClient = HttpClients.createDefault();
            //创建HttpGet对象,处理get请求,转发到A站点
            HttpGet httpGet = new HttpGet("http://m.kugou.com/app/i/getSongInfo.php?cmd=" + cmd + "&hash=" + hash);
            //执行
            CloseableHttpResponse res = httpClient.execute(httpGet);
            int code = res.getStatusLine().getStatusCode();

            if (code == 200) {
                //获取A站点返回的结果
                String result = EntityUtils.toString(res.getEntity());
                //把结果返回给B站点
                return result;
            }
            res.close();
            httpClient.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 判断用户是否存在歌单
     * @param userId 用户id
     * @return 返回歌单数量
     */
    @PostMapping("/selectMusicCountByUserId.action")
    @ResponseBody
    public int findMusicCountByUserId(String userId){
        return musicService.findMusicCountByUserId(userId);
    }

    /**
     * 个人歌单上传，图片封面
     * @param file 文件上传组件
     */
    @RequestMapping("/musicPic.action")
    public @ResponseBody
    Music musicPicUpload(MultipartFile file){
        //userId
        String userId = (String) UserController.session.getAttribute("user");

        //设置上传歌单或歌单封面的路径
        String filePath = path + projectName + "/" + userId + "/" + "music/";

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

        //歌单封面
        //文件名称，全限定名称
        String fileName = filePath + extensionName;

        //获得随机视频id
        musicId = UserIdUtil.musicUUID();

        Music music = new Music();
        music.setUserId(userId);
        music.setMusicId(musicId);
        music.setMusicPic(fileName);
        music.setMusicState(Byte.valueOf("1"));

        //文件写入数据库
        musicService.addSelectiveByUserId(music);

        return music;
    }

    /**
     * 个人歌单歌曲上传，
     * @param file 文件上传组件
     */
    @Transactional
    @RequestMapping("/musicList.action")
    public @ResponseBody
    List<Music> musicList(MultipartFile file){
        //创建集合
        List<Music> musicList = new ArrayList<>();

        //userId
        String userId = (String) UserController.session.getAttribute("user");

        //设置上传歌单或路径地址
        String filePath = path + projectName + "/" + userId + "/" + "music/";

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

        //文件名称，全限定名称
        String fileName = filePath + extensionName;

        //向数据库中查询数据
        List<Music> musics = musicService.findMusicByUserId(userId);

        //遍历集合
        for(Music music:musics){
            if (music.getMusicUrl() == "" || music.getMusicUrl() == null){
                //数据信息
                music.setUserId(userId);
                music.setMusicUrl(fileName);
                music.setMusicId(musicId);
                music.setMusicState(Byte.valueOf("1"));
                music.setUploadTime(new Date());

                //数据库数据更新
                int result = musicService.renewMusicByMusicId(music);
                if (result == 0 && targetFile.exists()){
                    targetFile.delete();
                }
            }else {
                //数据信息
                music.setId(music.getId() + 1);
                music.setUserId(userId);
                music.setMusicUrl(fileName);
                music.setMusicId(musicId);
                music.setMusicState(Byte.valueOf("1"));
                music.setUploadTime(new Date());
                //向数据库中添加数据
                musicService.add(music);
            }
            //添加数据
            musicList.add(music);
        }

        //数据库数据更新不成功，删除上传的歌曲文件
        if (musicList.size() == 0 && targetFile.exists()){
            targetFile.delete();
        }
        return musicService.findMusicByUserId(userId);
    }

    /**
     * 更新用户的个人歌单文字信息
     * @param musicClassification 视频分类
     * @param musicName 歌单名
     * @param type 公开 or 私有
     * @return 返回更新信息，0失败，否则成功
     */
    @RequestMapping("/musicDescriptionInfo.action")
    @ResponseBody
    public boolean musicDescriptionInfo(String musicClassification,String musicName,String type){
        //默认更新结果失败
        int result = 0;

        //创建歌单对象
        Music music = new Music();

        //添加更新信息
        music.setMusicClassification(Byte.valueOf(musicClassification));
        music.setMusicName(musicName);
        music.setType(Byte.valueOf(type));
        music.setMusicId(musicId);

        result = musicService.renewMusicByMusicId(music);

        return result > 0;
    }

    /**
     * 根据用户id，返回map集合数据
     * @return 返回map集合数据
     */
    @RequestMapping("/getMusicList.action")
    public @ResponseBody
    Map<String,Object> getMusicList(){
        //获得userId
        String userId = (String) UserController.session.getAttribute("user");

        //获得数据
        List<Music> musicList = musicService.findMusicByUserId(userId);

        //创建map对象
        Map<String,Object> map = new HashMap<>();

        //添加数据
        map.put("code",0);
        map.put("data",musicList);

        return map;
    }
}
