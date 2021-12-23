package com.person.website.utils;

/**
 * 文件格式判断
 * @author 赵李
 */
public class FileFormatUtil {
    //图片格式
    private static final String[] PICTURE_FORMAT_LIST = {"BMP","JPEG","GIF","PNG","jpg","tiff"};
    //视频格式
    private static final String[] VIDEO_FORMAT_LIST = {"MPEG","AVI","nAVI","ASF","MOV","3GP","WMV","rmvb","mp4","flv"};
    //音频格式
    private static final String[] MUSIC_FORMAT_LIST = {"mp3","flac","ape","wav","m4a"};

    /**
     * 图片文件格式判断
     * @param fileName 传入的文件名
     * @return 返回ture：表示文件是图片，否则文件不是
     */
    public static boolean isPicture(String fileName){
        //默认false
        boolean flag = false;

        //文件名全部转成小写
        fileName = fileName.toLowerCase();

        String ext = fileName.substring(fileName.lastIndexOf(".") + 1);

        //循环遍历判断
        for(String str : PICTURE_FORMAT_LIST){
            flag = str.toLowerCase().equals(ext);
            if (flag){
                break;
            }
        }
        return flag;
    }

    /**
     * 视频文件格式判断
     * @param fileName 文件名
     * @return 返回ture：表示文件是图片，否则文件不是
     */
    public static boolean isVideo(String fileName){
        //默认false
        boolean flag = false;

        //文件名全部转成小写
        fileName = fileName.toLowerCase();

        String ext = fileName.substring(fileName.lastIndexOf(".") + 1);

        //循环遍历判断
        for(String str : VIDEO_FORMAT_LIST){
            flag = str.toLowerCase().equals(ext);
            if (flag){
                break;
            }
        }
        return flag;
    }

    /**
     * 歌曲文件格式判断
     * @param fileName 文件名
     * @return 返回ture：表示文件是图片，否则文件不是
     */
    public static boolean isMusic(String fileName){
        //默认false
        boolean flag = false;

        //文件名全部转成小写
        fileName = fileName.toLowerCase();

        String ext = fileName.substring(fileName.lastIndexOf(".") + 1);

        //循环遍历判断
        for(String str : MUSIC_FORMAT_LIST){
            flag = str.toLowerCase().equals(ext);
            if (flag){
                break;
            }
        }
        return flag;
    }
}
