package com.person.website.mapper;

import com.person.website.pojo.Video;

import java.util.List;

public interface VideoMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_video
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_video
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    int insert(Video record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_video
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    int insertSelective(Video record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_video
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    Video selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_video
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    int updateByPrimaryKeySelective(Video record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_video
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    int updateByPrimaryKey(Video record);

    /**
     * 查询用户视频数量
     * @return 返回用户视频数量
     */
    int selectVideoCountByUserId(String userId);

    /**
     * 根据用户的userId选择性更新
     * @param video 视频实体属性
     * @return 返回视频对象
     */
    Video updateByPrimaryKeySelectiveByUserId(Video video);

    /**
     * 根据用户的userId选择性更新
     * @param video 视频实体属性
     * @return 返回视频对象
     */
    int insertSelectiveByUserId(Video video);

    /**
     * 根据userid查询视频属性
     * @param userId 用户id
     * @return 返回视频属性
     */
    List<Video> selectVideoByUserId(String userId);

    /**
     * 根据视频id进行数据更新
     * @param video 视频属性
     * @return 返回影响数据记录行
     */
    int updateByPrimaryKeySelectiveByVideoId(Video video);

    /**
     * 查询所有的视频信息
     * @return list集合
     */
    List<Video> selectAll();

    /**
     * 根据视频id查询数据
     * @param videoId 视频id
     * @return 返回对象
     */
    List<Video> selectVideoByVideoId(String videoId);

    /**
     * 根据vidoeId删除数据
     * @param videoId 视频id
     * @return 返回影响结果集合
     */
    int deleteByVideoId(String videoId);
}