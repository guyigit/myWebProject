package com.heijia.controller.common;

import com.heijia.base.common.service.LoginService;
import com.heijia.framework.util.date.DateUtil;
import com.heijia.framework.util.page.CtrlUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by lihaopeng on 2017/12/21.
 */
@Controller
@RequestMapping("/login")
public class loginController extends commonController {

    @Autowired
    private LoginService loginService;

    /**
     * 登陆
     * @param request
     * @param response
     * @throws IOException
     */
    @RequestMapping(value = "/surelogin")
    public void surelogin(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            String username = request.getParameter("username");
            String password = request.getParameter("password");
            if(StringUtils.isNotBlank(username)){
                params.put("username",username);
            }
            if(StringUtils.isNotBlank(password)){
                params.put("password",password);
            }
            //登陆：查询用户名和密码，匹配则通过
            int num = loginService.checkUser(params);
            if(num==1){
                CtrlUtils.putJsonResult(true,"" ,response);
            }else{
                CtrlUtils.putJsonResult(false,"用户名或密码不正确，请重新输入！" ,response);
            }
//                CtrlUtils.putJsonResultFormatDate("",true,"", DateUtil.YYYY_MM_DD,response);
        } catch (Exception e) {
            log.error(""+e.getMessage());
            e.printStackTrace();
            CtrlUtils.putJsonResult(false,"校验登陆信息失败！" ,response);
        }
    }
}
