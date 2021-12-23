package com.person.website.service.impl;

import com.person.website.mapper.OrderMapper;
import com.person.website.pojo.Order;
import com.person.website.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderMapper orderMapper;

    @Override
    public int add(Order order) {
        return orderMapper.insert(order);
    }

    @Override
    public Order findOrderByUserId(String userId) {
        return orderMapper.selectByUserId(userId);
    }
}
