package com.person.website.web;

import com.person.website.pojo.Order;
import com.person.website.service.OrderService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 订单页面
 * @author 赵李
 */
@Controller
@RequestMapping("/order")
public class OrderController {
    private OrderService orderService;

    /**
     * 查询用户订单信息
     * @param userId 用户id
     * @return 返回订单对象
     */
    @PostMapping("/select.action")
    public @ResponseBody
    Order select(String userId){
        return orderService.findOrderByUserId(userId);
    }
}
