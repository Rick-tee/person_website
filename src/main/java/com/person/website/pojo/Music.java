package com.person.website.pojo;

import java.io.Serializable;
import java.util.Date;

public class Music implements Serializable {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_music.id
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    private Integer id;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_music.music_id
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    private String musicId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_music.music_name
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    private String musicName;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_music.music_url
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    private String musicUrl;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_music.music_pic
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    private String musicPic;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_music.music_classification
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    private Byte musicClassification;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_music.type
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    private Byte type;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_music.music_state
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    private Byte musicState;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_music.user_id
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    private String userId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_music.upload_time
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    private Date uploadTime;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table t_music
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    private static final long serialVersionUID = 1L;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_music.id
     *
     * @return the value of t_music.id
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    public Integer getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_music.id
     *
     * @param id the value for t_music.id
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_music.music_id
     *
     * @return the value of t_music.music_id
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    public String getMusicId() {
        return musicId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_music.music_id
     *
     * @param musicId the value for t_music.music_id
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    public void setMusicId(String musicId) {
        this.musicId = musicId == null ? null : musicId.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_music.music_name
     *
     * @return the value of t_music.music_name
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    public String getMusicName() {
        return musicName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_music.music_name
     *
     * @param musicName the value for t_music.music_name
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    public void setMusicName(String musicName) {
        this.musicName = musicName == null ? null : musicName.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_music.music_url
     *
     * @return the value of t_music.music_url
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    public String getMusicUrl() {
        return musicUrl;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_music.music_url
     *
     * @param musicUrl the value for t_music.music_url
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    public void setMusicUrl(String musicUrl) {
        this.musicUrl = musicUrl == null ? null : musicUrl.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_music.music_pic
     *
     * @return the value of t_music.music_pic
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    public String getMusicPic() {
        return musicPic;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_music.music_pic
     *
     * @param musicPic the value for t_music.music_pic
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    public void setMusicPic(String musicPic) {
        this.musicPic = musicPic == null ? null : musicPic.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_music.music_classification
     *
     * @return the value of t_music.music_classification
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    public Byte getMusicClassification() {
        return musicClassification;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_music.music_classification
     *
     * @param musicClassification the value for t_music.music_classification
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    public void setMusicClassification(Byte musicClassification) {
        this.musicClassification = musicClassification;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_music.type
     *
     * @return the value of t_music.type
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    public Byte getType() {
        return type;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_music.type
     *
     * @param type the value for t_music.type
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    public void setType(Byte type) {
        this.type = type;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_music.music_state
     *
     * @return the value of t_music.music_state
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    public Byte getMusicState() {
        return musicState;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_music.music_state
     *
     * @param musicState the value for t_music.music_state
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    public void setMusicState(Byte musicState) {
        this.musicState = musicState;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_music.user_id
     *
     * @return the value of t_music.user_id
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    public String getUserId() {
        return userId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_music.user_id
     *
     * @param userId the value for t_music.user_id
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    public void setUserId(String userId) {
        this.userId = userId == null ? null : userId.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_music.upload_time
     *
     * @return the value of t_music.upload_time
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    public Date getUploadTime() {
        return uploadTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_music.upload_time
     *
     * @param uploadTime the value for t_music.upload_time
     *
     * @mbggenerated Sat Dec 04 14:51:37 CST 2021
     */
    public void setUploadTime(Date uploadTime) {
        this.uploadTime = uploadTime;
    }
}