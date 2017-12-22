package com.heijia.controller.common;

import com.heijia.base.common.model.User;
import com.heijia.framework.model.AuditEntity;
import com.heijia.framework.util.user.UserContextUtil;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by lihaopeng on 2017/12/20.
 */
@Controller
public abstract class commonController extends MultiActionController {

    @Autowired
    HttpSession session;

    protected final Log log = LogFactory.getLog(getClass());

    /**
     * 生成视图，用于继承
     * @param view
     */
    protected ModelAndView innerCreateModelAndView (String view, Object... objects) {
        assert (objects.length % 2) == 0;
        Map<String, Object> modelMap = new HashMap<String, Object>();
        for (int i = 0; i < objects.length; i++) {
            String name = (String) objects[i++];
            modelMap.put(name, objects[i]);
        }
        return new ModelAndView(view, modelMap);
    }

    protected User getUserInfo() {
        return UserContextUtil.getUserInfo();
    }

    protected Long getUserId() {
        return UserContextUtil.getUserInfo().getId();
    }

    protected String getUsername() {
        return UserContextUtil.getUserInfo().getUsername();
    }

    protected String getRealname() {
        return UserContextUtil.getUserInfo().getRealname();
    }

//    protected Set<String> getUserRoles() {
//        return UserContextUtil.getUserInfo().getRoles();
//    }

    protected void setInsertInfo(AuditEntity entity) {
        entity.setCreateBy(getUserId());
        entity.setUpdateBy(getUserId());
        entity.setCreateDate(Calendar.getInstance().getTime());
        entity.setUpdateDate(Calendar.getInstance().getTime());
    }

    protected void setUpdateInfo(AuditEntity entity) {
        entity.setUpdateBy(getUserId());
        entity.setUpdateDate(Calendar.getInstance().getTime());
    }

    protected void printJson(HttpServletResponse response, String json)throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write(json);
        response.getWriter().flush();
        response.getWriter().close();
    }
}
