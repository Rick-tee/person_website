import com.person.website.pojo.Video;
import com.person.website.service.VideoService;
import com.person.website.utils.FileFormatUtil;
import com.person.website.utils.MD5Util;
import com.person.website.utils.SimpleDateFormatUtil;
import com.person.website.utils.UserIdUtil;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.text.SimpleDateFormat;
import java.util.Date;

public class MyTest {
    @Autowired
    private VideoService videoService;

    @Test
    public void Md5(){
        System.out.println(MD5Util.stringToMD5("admin"));
    }

    @Test
    public void date(){
        Date date = new Date();
        //定义日期时间格式
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSSS");

        String timeStr = sdf.format(date);

        System.out.println(timeStr + ",长度：" + timeStr.length());

    }

    @Test
    public void testFileFormat(){
        String fileName = "123.jpg.mp4";
        System.out.println(FileFormatUtil.isVideo(fileName));
    }

    @Test
    public void testVideoAdd(){
        Video video = new Video();
        video.setUserId("1111111111111111111111111111111111111111");
        int result = videoService.addSelectiveByUserId(video);
        System.out.println(result);
    }

    @Test
    public void testTime(){
        System.out.println(SimpleDateFormatUtil.getTime("1111111111111111"));
    }

    @Test
    public void testId(){
        System.out.println(UserIdUtil.musicUUID());
    }
}
