package com.person.website.utils;

import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;

import java.util.ResourceBundle;

/**
 * @author 赵李
 * @version 1.0
 * @date 2021/10/2 10:56
 * 邮箱注册工具类
 **/
public class EmailUtil {
    /**
     * @param hostName 邮箱的SMTP服务器
     * @param charset 发送的字符类型
     * @param receiveEmail 收件人邮箱地址
     * @param fromEmail 发送人邮箱地址
     * @param fromName 发件人用户名
     * @param sendUserName 验证的发送人邮箱用户名，和发送人邮箱地址一致
     * @param password 发送人授权码
     * @param subject 邮件主题
     * @param msg 邮件内容
     * @return 返回发送相关信息，null:代表失败
     */
    public static String sendEmail(String hostName, String charset, String receiveEmail,
                                   String fromEmail, String fromName, String sendUserName,
                                   String password, String subject, String msg){
        //创建一个HtmlEmail实例对象
        HtmlEmail email=new HtmlEmail();
        //邮箱的SMTP服务器，一般123邮箱的是smtp.123.com,qq邮箱为smtp.qq.com
        email.setHostName(hostName);
        //设置发送的字符类型
        email.setCharset(charset);
        try {
            //设置收件人
            email.addTo(receiveEmail);

            //发送人的邮箱为自己的，用户名可以随便填
            email.setFrom(fromEmail,fromName);

            //设置发送人到的邮箱和用户名和授权码(授权码是自己设置的)
            email.setAuthentication(sendUserName,password);
            //设置发送主题
            email.setSubject(subject);
            //设置发送内容
            email.setMsg(msg);
            //进行发送
            return email.send();
        } catch (EmailException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 邮件模板内容
     * @param number 传入的验证码
     * @return 返回模板内容
     */
    public static String getMsg(String title,String fromName,int number){
        return "【" + title + "】" +
                "欢迎体验 " + fromName +
                ",您的验证码是：" + number + " 。验证码打死不告诉任何人!";
    }
}
