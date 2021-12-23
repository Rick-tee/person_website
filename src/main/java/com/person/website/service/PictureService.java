package com.person.website.service;

import com.person.website.pojo.Picture;

import java.util.List;

/**
 * 视频接口
 * @author 赵李
 */
public interface PictureService {
    int add(Picture picture);

    int findPictureCountByUserId(String userId);

    int renewPictureByPictureId(Picture picture);

    List<Picture> findPictureByUserId(String userId);
}
