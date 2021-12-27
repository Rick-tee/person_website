package com.person.website.service.impl;

import com.person.website.mapper.PictureMapper;
import com.person.website.pojo.Picture;
import com.person.website.service.PictureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PictureServiceImpl implements PictureService {
    @Autowired
    private PictureMapper pictureMapper;

    @Override
    public int add(Picture picture) {
        return pictureMapper.insertSelective(picture);
    }

    @Override
    public int findPictureCountByUserId(String userId) {
        return pictureMapper.selectPictureCountByUserId(userId);
    }

    @Override
    public int renewPictureByPictureId(Picture picture) {
        return pictureMapper.updateByPrimaryKeySelectiveByPictureId(picture);
    }

    @Override
    public List<Picture> findPictureByUserId(String userId) {
        return pictureMapper.selectPictureByUserId(userId);
    }

    @Override
    public List<Picture> findAll() {
        return pictureMapper.selectAll();
    }

    @Override
    public List<Picture> findPictureByPictureId(String pictureId) {
        return pictureMapper.selectPictureByPictureId(pictureId);
    }

    @Override
    public int removeByPictureId(String pictureId) {
        return pictureMapper.deleteByPictureId(pictureId);
    }
}
