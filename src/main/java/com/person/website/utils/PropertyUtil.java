package com.person.website.utils;

import java.io.*;
import java.util.Properties;
import java.util.ResourceBundle;

/**
 * 读取properties配置文件数据
 *
 * @author 赵李
 */
public class PropertyUtil {

    /**
     * 查询properties配置文件中的对应kay 的 value 值，通过ClassLoader方式
     * @param fileName 传入的文件名 例如 /userPath.properties
     * @param key kay
     * @return f返回查询到的key对应的value值，kay不存在时，返回null
     */
    public static String getValueByClassLoader(String fileName,String key) {
        //创建Properties对象
        Properties properties = new Properties();

        try {
            //加载对应文件
            properties.load(new InputStreamReader(Object.class.getResourceAsStream(fileName)));
        } catch (IOException e) {
            System.out.println("这里执行失败了！");
            e.printStackTrace();
        }

        return properties.getProperty(key);
    }


    /**
     * 查询properties配置文件中的对应kay 的 value 值，通过InputStream方式
     * @param fileName 传入的文件名，需执行路径，如绝对路径等
     * @param key key
     * @return 返回查询到的value值，key不存在返回null
     */
    public static String getValueByInputStream(String fileName,String key) {
        Properties properties = new Properties();
        // 使用InPutStream流读取properties文件
        BufferedReader bufferedReader = null;
        try {
            bufferedReader = new BufferedReader(new FileReader(fileName));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        try {
            properties.load(bufferedReader);
        } catch (IOException e) {
            e.printStackTrace();
        }
        // 获取key对应的value值
        return properties.getProperty(key);
    }

    /**
     * 查询properties配置文件中的对应kay 的 value 值，通过ResourceBundle方式
     * @param fileName 传入的文件名 ,不需要文件后缀
     * @param key key
     * @return f返回查询到的value值，key不存在 返回null
     */
    public static String getValueByResourceBundle(String fileName,String key){
        ResourceBundle bundle = ResourceBundle.getBundle("userPath");
        return bundle.getString(fileName);
    }
}
