package com.person.website.utils;

import java.util.UUID;

/**
 * 用户id生成
 * @author 赵李
 */

public class UserIdUtil {
    /**
     * 返回随机生成的用户编号
     */
    public static String getUUID(){
        return UUID.randomUUID().toString().replaceAll("-","");
    }

    /**
     * 随机生成6位数字验证码
     * @return 返回数字验证码
     */
    public static int getRandomNumber(){
        return (int)((Math.random()*9+1)*100000);
    }

    /**
     * 生成11位的视频id
     * @return 返回11位的视频id
     */
    public static String videoUUID(){
        return UUID.randomUUID().toString().replaceAll("-","").substring(0,11);
    }

    /**
     * 生成13位的歌单id
     * @return 返回13位的歌单id
     */
    public static String musicUUID(){
        return UUID.randomUUID().toString().replaceAll("-","").substring(0,12);
    }
}
