package com.person.website.service;

import com.person.website.pojo.Music;
import com.person.website.pojo.Video;

import java.util.List;

/**
 * 视频接口
 * @author 赵李
 */
public interface MusicService {
    int add(Music music);

    int findMusicCountByUserId(String userId);

    int addSelectiveByUserId(Music music);

    List<Music> findMusicByUserId(String userId);

    int renewMusicByMusicId(Music music);
}
