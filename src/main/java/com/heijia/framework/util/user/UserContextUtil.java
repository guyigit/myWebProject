package com.heijia.framework.util.user;

import com.heijia.base.common.model.User;

/**
 * Created by lihaopeng on 2017/12/22.
 */
public class UserContextUtil {

    /**
     * 当前线程中的用户信息
     */
    private final static ThreadLocal<User> currentUser = new ThreadLocal<User>();

    /**
     * 设置用户信息
     *
     * @param userInfo
     *            用户信息
     */
    public static void setUserInfo(User userInfo) {
        currentUser.set(userInfo);
    }

    /**
     * 返回当前用户信息
     *
     * @return
     */
    public static User getUserInfo() {
        if(currentUser.get() == null) {
            currentUser.set(new User());
        }
        return currentUser.get();
    }

    public static void cleanUser() {
        currentUser.set(null);
    }

}
