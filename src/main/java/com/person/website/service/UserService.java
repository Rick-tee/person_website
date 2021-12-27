package com.person.website.service;

import com.person.website.pojo.User;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

public interface UserService {
    User findUserById(Integer id);
    int addUser(User user);

    User findUserByPhone(String phone);

    User findUserByEmail(String email);

    User findUserByEmailAndPwd(@Param("email") String userInfo,@Param("password") String password);

    User findUserByPhoneAndPwd(@Param("phone") String userInfo,@Param("password") String password);

    int renewUserByUserId(String userId,String fileName);

    User findUserByUserId(@Param("userId") String userId);

    int renewUserInfoByUserId(@Param("userId") String userId,@Param("userName") String userName,@Param("userSex") String sex,@Param("phone") String phone,@Param("email") String email,@Param("province") String province,@Param("city") String city,@Param("county") String county,@Param("address") String address,@Param("leftWish") String leftWish,@Param("rightWhisper") String rightWhisper,@Param("upTime") Date upTime,@Param("ip") String ip);

    int renewUserByUserId(User user);

    int renewPasswordByUserId(String userId, String password);

    List<User> findUserAll();

    int removeByUserId(String userId);
}
