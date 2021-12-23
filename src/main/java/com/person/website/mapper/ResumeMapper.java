package com.person.website.mapper;

import com.person.website.pojo.Resume;

public interface ResumeMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_resume
     *
     * @mbggenerated Sun Dec 19 13:36:55 CST 2021
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_resume
     *
     * @mbggenerated Sun Dec 19 13:36:55 CST 2021
     */
    int insert(Resume record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_resume
     *
     * @mbggenerated Sun Dec 19 13:36:55 CST 2021
     */
    int insertSelective(Resume record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_resume
     *
     * @mbggenerated Sun Dec 19 13:36:55 CST 2021
     */
    Resume selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_resume
     *
     * @mbggenerated Sun Dec 19 13:36:55 CST 2021
     */
    int updateByPrimaryKeySelective(Resume record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_resume
     *
     * @mbggenerated Sun Dec 19 13:36:55 CST 2021
     */
    int updateByPrimaryKey(Resume record);

    /**
     * 根据用户id更新选择性更新数据
     * @param resume 简历属性
     * @return 返回影响的记录数
     */
    int updateByUserIdSelective(Resume resume);

    /**
     * 根据用户id查询用户个人简历信息
     * @param userId 用户id
     * @return 返回简历属性
     */
    Resume selectByUserId(String userId);

    /**
     * 用户注册时，简历注册
     * @param userId 用户id
     * @return 返回影响记录数
     */
    int insertUserId(String userId);
}