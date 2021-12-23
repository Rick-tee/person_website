package com.person.website.mapper;

import com.person.website.pojo.District;

import java.util.List;

public interface DistrictMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_district
     *
     * @mbggenerated Tue Oct 12 11:05:38 CST 2021
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_district
     *
     * @mbggenerated Tue Oct 12 11:05:38 CST 2021
     */
    int insert(District record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_district
     *
     * @mbggenerated Tue Oct 12 11:05:38 CST 2021
     */
    int insertSelective(District record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_district
     *
     * @mbggenerated Tue Oct 12 11:05:38 CST 2021
     */
    District selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_district
     *
     * @mbggenerated Tue Oct 12 11:05:38 CST 2021
     */
    int updateByPrimaryKeySelective(District record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_district
     *
     * @mbggenerated Tue Oct 12 11:05:38 CST 2021
     */
    int updateByPrimaryKey(District record);

    /*查询所有区域的城市对象*/
    List<District> selectAllProvince();
}