package com.heijia.base.common.service;

import com.heijia.base.common.model.User;

import java.util.Map;

/**
 * Created by lihaopeng on 2017/12/22.
 */
public interface LoginService {
    /**
     * 检查是否已存在该用户
     * 参数可添加：用户名、密码
     * @param params
     * @return
     */
    int checkUser(Map<String,Object> params);

    /**
     * 新增用户
     * @param user
     * @return
     */
    int addUser(User user);
}
