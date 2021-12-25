package com.person.website.service;

import com.person.website.pojo.Order;

import java.util.List;

/**
 * 订单接口
 * @author 赵李
 */
public interface OrderService {

    int add(Order order);

    Order findOrderByUserId(String userId);

    List<Order> findAll();
}
