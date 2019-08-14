package com.heijia.base.common.service.impl;

import com.heijia.base.common.mapper.UserMapper;
import com.heijia.base.common.model.User;
import com.heijia.base.common.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * Created by lihaopeng on 2017/12/22.
 */
@Service("loginService")
public class LoginServiceImpl implements LoginService {

    @Autowired
    private UserMapper userMapper;

    public int checkUser(Map<String, Object> params) {
        return userMapper.checkUser(params);
    }

    public int addUser(User user) {
        return userMapper.insertSelective(user);
    }

    public void testA(){
        System.out.println("AAAAA");
    }

}
