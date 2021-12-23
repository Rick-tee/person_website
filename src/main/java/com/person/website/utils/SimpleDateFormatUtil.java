package com.person.website.utils;

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
}
