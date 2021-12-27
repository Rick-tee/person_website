package com.person.website.service.impl;

import com.person.website.mapper.VideoMapper;
import com.person.website.pojo.Music;
import com.person.website.pojo.Video;
import com.person.website.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VideoServiceImpl implements VideoService {
    @Autowired
    private VideoMapper videoMapper;

    @Override
    public int add(Video video) {
        return videoMapper.insertSelective(video);
    }

    @Override
    public int findVideoCountByUserId(String userId) {
        return videoMapper.selectVideoCountByUserId(userId);
    }

    @Override
    public Video renewVideo(Video video) {
        return videoMapper.updateByPrimaryKeySelectiveByUserId(video);
    }

    @Override
    public int addSelectiveByUserId(Video video) {
        return videoMapper.insertSelectiveByUserId(video);
    }

    @Override
    public List<Video> findVideoByUserId(String userId) {
        return videoMapper.selectVideoByUserId(userId);
    }

    @Override
    public int renewVideoByVideoId(Video video) {
        return videoMapper.updateByPrimaryKeySelectiveByVideoId(video);
    }

    @Override
    public List<Video> findAll() {
        return videoMapper.selectAll();
    }

    @Override
    public List<Video> findVideoByVideoId(String arg) {
        return videoMapper.selectVideoByVideoId(arg);
    }

    @Override
    public int removeByVideoId(String videoId) {
        return videoMapper.deleteByVideoId(videoId);
    }
}
