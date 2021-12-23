package com.person.website.service;

import com.person.website.pojo.Video;

import java.util.List;

/**
 * 视频接口
 * @author 赵李
 */
public interface VideoService {
    int add(Video video);

    int findVideoCountByUserId(String userId);

    Video renewVideo(Video video);

    int addSelectiveByUserId(Video video);

    List<Video> findVideoByUserId(String userId);

    int renewVideoByVideoId(Video video);
}
