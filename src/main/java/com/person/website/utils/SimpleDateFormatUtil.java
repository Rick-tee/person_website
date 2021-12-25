package com.person.website.utils;

import javax.xml.crypto.Data;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 日期格式转换类
 * @author 赵李
 */
public class SimpleDateFormatUtil {

    /**
     * 随机产生商家订单号
     * @return 返回字符串类型的订单号字符串
     */
    public static String getOutTradeNo(){
        //创建日期对象
        Date date = new Date();

        //创建日期格式对象
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSSS");

        return sdf.format(date);
    }

    /**
     * 时间戳处理，返回指定时间格式
     * @param timestamp 时间戳字符串
     * @return 返回处理后的时间字符串
     */
    public static String getTime(Object timestamp){
        //获得简短类名
        timestamp = new Date();
        String classSimpleName = timestamp.getClass().getName().substring(timestamp.getClass().getName().lastIndexOf('.') + 1).toUpperCase();

        //判断
        if ("STRING".equals(classSimpleName)){
            //如果是String类型字符串，强转为Long类型
            timestamp = Long.parseLong(timestamp.toString());
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.format(timestamp);
    }
}
