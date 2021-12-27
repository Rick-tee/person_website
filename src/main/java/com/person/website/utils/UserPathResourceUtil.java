package com.person.website.utils;

import java.io.File;
import java.io.IOException;

/**
 * 用户资源路径工具类
 * @author 赵李
 */
public class UserPathResourceUtil {
    /**
     * 获得项目中 用户路径地址
     * @return 返回用户的绝对路径
     */
    public static String getProjectAbsolutePath(){
        StringBuffer buffer = new StringBuffer();

        //获得项目路径  E:\Project\java\idea\person_website
        File directory = new File("");
        String courseFile = null;
        try {
            courseFile = directory.getCanonicalPath();
        } catch (IOException e) {
            e.printStackTrace();
        }

        //替换斜杠
        String path = courseFile.replaceAll("\\\\","/");

        //获得项目名
        String proName = courseFile.substring(path.lastIndexOf("/") + 1) + "Resources";

        //项目的上层目录
        String upperLevelDirectory = path.substring(0,path.lastIndexOf("/") + 1);

        //字符转换
        String userPath = String.valueOf(buffer.append(upperLevelDirectory).append(proName));

        //判断最后字符是否是 / 如果有直接返回，如果没有，则添加
        if (!userPath.endsWith("/")){
            userPath = userPath + "/";
        }

        //返回应该创建的路径地址
        return userPath;

    }

    /**
     * 创建用户相关目录，已自带 /
     * @param path 给定路径地址
     * @return ture:代表路径创建成功；false：路径已存在创建失败
     */
    public static boolean mkdirs(String path){
        File file = new File(path);
        if (!file.exists()){
            file.mkdirs();
            return true;
        }
        return false;
    }

    /**
     * 获取当前项目名
     * @return 返回项目名
     */
    public static String getProjectName(){
        File directory = new File("");
        String courseFile = null;
        try {
            courseFile = directory.getCanonicalPath();
        } catch (IOException e) {
            e.printStackTrace();
        }
        String path = courseFile.replaceAll("\\\\","/");

        return courseFile.substring(path.lastIndexOf("/") + 1);

    }
}
