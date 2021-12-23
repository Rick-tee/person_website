package com.person.website.mapper;

import com.person.website.pojo.Music;
import com.person.website.pojo.Video;

import java.util.List;

public interface MusicMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_music
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_music
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    int insert(Music record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_music
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    int insertSelective(Music record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_music
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    Music selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_music
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    int updateByPrimaryKeySelective(Music record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_music
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    int updateByPrimaryKey(Music record);

    /**
     * 查询用户歌单数量
     * @param userId 用户id
     * @return 返回歌单数量
     */
    int selectMusicCountByUserId(String userId);

    /**
     * 根据 用户id，添加歌单
     * @param music 音乐信息
     * @return 返回影响记录数
     */
    int insertSelectiveByUserId(Music music);

    /**
     * 根据用户id查询 歌单列表信息
     * @param userId 用户id
     * @return list集合列表
     */
    List<Music> selectMusicByUserId(String userId);

    /**
     * 根据歌单id 更新歌单信息
     * @param music 歌曲属性
     * @return 返回影响的记录数
     */
    int updateByPrimaryKeySelectiveByMusicId(Music music);
}