package com.person.website.service.impl;

import com.person.website.mapper.MusicMapper;
import com.person.website.pojo.Music;
import com.person.website.pojo.Video;
import com.person.website.service.MusicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 音乐接口的实现类
 * @author 赵李
 */
@Service
public class MusicServiceImpl implements MusicService {
    @Autowired
    private MusicMapper musicMapper;

    @Override
    public int add(Music music) {
        return musicMapper.insert(music);
    }

    @Override
    public int findMusicCountByUserId(String userId) {
        return musicMapper.selectMusicCountByUserId(userId);
    }

    @Override
    public int addSelectiveByUserId(Music music) {
        return musicMapper.insertSelectiveByUserId(music);
    }

    @Override
    public List<Music> findMusicByUserId(String userId) {
        return musicMapper.selectMusicByUserId(userId);
    }

    @Override
    public int renewMusicByMusicId(Music music) {
        return musicMapper.updateByPrimaryKeySelectiveByMusicId(music);
    }
}
