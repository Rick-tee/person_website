package com.person.website.mapper;

import com.person.website.pojo.Order;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface OrderMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_order
     *
     * @mbggenerated Sun Dec 19 17:34:26 CST 2021
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_order
     *
     * @mbggenerated Sun Dec 19 17:34:26 CST 2021
     */
    int insert(Order record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_order
     *
     * @mbggenerated Sun Dec 19 17:34:26 CST 2021
     */
    int insertSelective(Order record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_order
     *
     * @mbggenerated Sun Dec 19 17:34:26 CST 2021
     */
    Order selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_order
     *
     * @mbggenerated Sun Dec 19 17:34:26 CST 2021
     */
    int updateByPrimaryKeySelective(Order record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_order
     *
     * @mbggenerated Sun Dec 19 17:34:26 CST 2021
     */
    int updateByPrimaryKey(Order record);

    /**
     * 根据用户id查询订单信息
     * @param userId 用户id
     * @return 返回订单信息
     */
    Order selectByUserId(String userId);

    /**
     * 获得所有订单数据
     * @return 返回list集合
     */
    List<Order> selectAll();

    /**
     * 根据订单编号查询数据
     * @param arg 订单编号
     * @return 返回订单对象
     */
    Order selectByPayId(@Param("payId") String arg);

    /**
     * 根据订单编号删除订单信息
     * @param payId 订单编号
     * @return 返回影响记录数
     */
    int deleteByPayId(String payId);
}