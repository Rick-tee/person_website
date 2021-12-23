package com.person.website.web;

import com.person.website.pojo.Picture;
import com.person.website.pojo.Video;
import com.person.website.service.PictureService;
import com.person.website.utils.UserIdUtil;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;

/**
 * @author 赵李
 * 首页所有图片信息的加载
 */
@Controller
@CrossOrigin
@RequestMapping("/picture")
public class PictureController {
    //路径名
    @Value(value = "${path}")
    private String path;

    //项目名
    @Value("${project.name}")
    private String projectName;

    //相册id
    private static String pictureId;

    @Autowired
    private PictureService pictureService;

    /**
     * 图片接口
     * @param count 获取图片的数量,默认图片数量为24
     * @return 返回图片集合
     */
    @GetMapping(value = "/picture.action" ,produces = {"application/json; charset=utf-8"})
    @ResponseBody
    public List<String> video(Integer count) {
        if (null == count){
            count = 24;
        }

        List<String> list = new ArrayList<>();

        try {
            //创建默认连接
            CloseableHttpClient httpClient = HttpClients.createDefault();
            //创建HttpGet对象,处理get请求,转发到A站点
            String uri = "http://shibe.online/api/shibes?count=" + count + "&urls=true&httpsUrls=true";
            HttpGet httpGet = new HttpGet(uri);

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
     * 判断用户是否存在相册
     * @param userId 用户id
     * @return 返回相册数量
     */
    @PostMapping("/selectPictureCountByUserId.action")
    @ResponseBody
    public int findPictureCountByUserId(String userId){
        return pictureService.findPictureCountByUserId(userId);
    }

    /**
     * 相册文件上传
     * @param file 上传文件组件对象
     * @return 返回集合
     */
    @RequestMapping("/pictureFileUpload.action")
    public @ResponseBody List<Picture> pictureFile(MultipartFile file){
        //userId
        String userId = (String) UserController.session.getAttribute("user");

        //设置上传相册或相册封面的路径
        String filePath = path + projectName + "/" + userId + "/" + "picture/";

        //获得文件的扩展名，包含文件名
        String extensionName = file.getOriginalFilename();

        //封装上传文件
        File targetFile = new File(filePath,extensionName);

        //获得相册随机id
        pictureId = UserIdUtil.musicUUID();

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

        //数据查询
        List<Picture> pictureList = pictureService.findPictureByUserId(userId);

        //创建picture集合
        Picture picture = new Picture();

        if (pictureList.size() == 0){
            picture.setId(0);
        }else {
            //获得第一个数据
            picture = pictureList.get(0);
            picture.setId(picture.getId() + 1);
        }

        //添加属性
        picture.setUserId(userId);
        picture.setPicUrl(fileName);
        picture.setPicId(pictureId);
        picture.setPicState(Byte.valueOf("1"));
        picture.setUploadTime(new Date());

        try{
            //向数据库中添加数据
            //数据库数据更新不成功，删除上传的视频文件
            if (pictureService.add(picture) == 0 && targetFile.exists()){
                targetFile.delete();
            }
        }catch (Exception e){
            if (targetFile.exists()){
                targetFile.delete();
            }
            e.printStackTrace();
        }

        return pictureService.findPictureByUserId(userId);
    }

    /**
     * 更新相册文本信息
     * @param pictureName 相册名
     * @param pictureClassification 相册分类
     * @param type 相册类型 公开 or 私有
     * @return true 成功，false失败
     */
    @RequestMapping("/pictureDescriptionInfo.action")
    public @ResponseBody boolean pictureDescriptionInfo(String pictureName,String pictureClassification,String type){
        //默认更新结果失败
        int result = 0;

        //创建相册对象
        Picture picture = new Picture();

        //添加更新信息
        picture.setPicClassification(Byte.valueOf(pictureClassification));
        picture.setPicName(pictureName);
        picture.setType(Byte.valueOf(type));
        picture.setPicId(pictureId);

        result = pictureService.renewPictureByPictureId(picture);

        return result > 0;
    }

    /**
     * 根据用户id，返回相册集合
     * @return 返回map集合类型数据
     */
    @RequestMapping("/getPictureList.action")
    public @ResponseBody
    Map<String,Object> getPictureList(){
        //获得用户id
        String userId = (String) UserController.session.getAttribute("user");

        //获得相册数据
        List<Picture> pictureList = pictureService.findPictureByUserId(userId);

        //创建map集合
        Map<String,Object> map = new HashMap<>();

        //添加数据
        map.put("code",0);
        map.put("data",pictureList);

        return map;
    }
}