package com.heijia.framework.util.page;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.heijia.framework.util.date.DateUtil;
import com.heijia.framework.util.page.model.PageParam;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.ServletRequestDataBinder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by lihaopeng on 2017/12/22.
 */
public class CtrlUtils {

    private static Log log = LogFactory.getLog(CtrlUtils.class);

    private static final Integer  DEFAULT_SUCCESS_CODE = 100;

    private static final Integer  DEFAULT_ERROR_CODE = 505;

    public static <T> PageParam<T> getPageParam(T t, HttpServletRequest request){
        convertObj(request, t);
        String pageIndexStr = request.getParameter("pageIndex");
        String pageSizeStr= request.getParameter("pageSize");
        int pageIndex = (StringUtils.hasText(pageIndexStr)||null!=pageIndexStr) ? Integer.parseInt(pageIndexStr) : 0;
        int pageSize = (StringUtils.hasText(pageIndexStr)||null!=pageSizeStr) ? Integer.parseInt(pageSizeStr) : 10;
        return new   PageParam<T>(t, pageIndex, pageSize);
    }

    public static <K> K convertObj(HttpServletRequest req, K k) {
        getBinder(k).bind(req); return k;
    }

    private static ServletRequestDataBinder getBinder(Object obj) {
        ServletRequestDataBinder binder = new ServletRequestDataBinder(obj);
        DateFormat df = new SimpleDateFormat(DateUtil.YYYY_MM_DD);
        CustomDateEditor dateEditor = new CustomDateEditor(df, true);
        //表示如果命令对象有Date类型的属性，将使用该属性编辑器进行类型转换
        binder.registerCustomEditor(Date.class, dateEditor);
        return binder;
    }

    public static Map<String,Object> getPageParam(HttpServletRequest request){
        String pageIndexStr = request.getParameter("pageIndex");
        String pageSizeStr= request.getParameter("pageSize");
        int pageIndex = (StringUtils.hasText(pageIndexStr)||null!=pageIndexStr) ? Integer.parseInt(pageIndexStr) : 1;
        int pageSize = (StringUtils.hasText(pageIndexStr)||null!=pageSizeStr) ? Integer.parseInt(pageSizeStr) : 10;
        int start = 0;
        if(pageIndex>1){
            //start = (pageIndex-1)*pageSize+1;
            start = (pageIndex-1)*pageSize;
        }
        Map<String,Object> param = new HashMap<String,Object>();
        param.put("start", start);
        param.put("pageIndex", pageIndex);
        param.put("pageSize", pageSize);
        param.put("pageNum", pageIndex);
        return param;
    }

    public static void putJsonResult(String jsonStr,HttpServletResponse response) throws IOException{
        log.debug(jsonStr);
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write(jsonStr);
        response.getWriter().flush();
        response.getWriter().close();
    }

    public static void putJsonResult(JSONObject json, HttpServletResponse response) throws IOException {
        putJsonResult(json.toJSONString(),response);
    }

    public static void putJsonResult(JSONObject json,String parttern,HttpServletResponse response) throws IOException{
        putJsonResult(JSON.toJSONStringWithDateFormat(json, parttern , SerializerFeature.DisableCircularReferenceDetect),response);
    }

    public static void putJsonResult(Object object,boolean success,HttpServletResponse response) throws IOException {
        JSONObject json = new JSONObject();
        json.put("success", success);
        json.put("msg", "操作成功");
        json.put("data", object);
        putJsonResult(json , response);
    }
    /**
     *
     * @param object 转json返回的数据
     * @param code  是否成功标识符号
     * @param msg   提示消息
     * @param response
     * @throws IOException
     */
    public static void putJsonResult(Object object,boolean success, Object msg,HttpServletResponse response) throws IOException {
        JSONObject json = new JSONObject();
        json.put("success", success);
        json.put("msg", msg);
        json.put("data", object);
        putJsonResult(json , response);
    }

    /**
     *
     * @param object 转json返回的数据
     * @param code  是否成功标识符号
     * @param msg   提示消息
     * @param response
     * @throws IOException
     */
    public static void putJsonResult(Object object,boolean success, Object msg,Map<String,Object> otherData,HttpServletResponse response) throws IOException {
        JSONObject json = new JSONObject();
        json.put("success", success);
        json.put("msg", msg);
        json.put("data", object);
        for(Map.Entry<String, Object> e:otherData.entrySet()){
            json.put(e.getKey(),e.getValue());
        }
        putJsonResult(json , response);
    }

    /**
     * @param object 转json返回的数据
     * @param code  是否成功标识符号
     * @param msg   提示消息
     * @param response
     * @throws IOException
     */
    public static void putJsonResultFormatDate(Object object,boolean success, Object msg,HttpServletResponse response) throws IOException {
        putJsonResultFormatDate(object, success, msg, DateUtil.YYYY_MM_DD, response);
    }

    /**
     * @param object
     * @param success
     * @param msg
     * @param parttern  日期格式
     * @param response
     * @throws IOException
     */
    public static void putJsonResultFormatDate(Object object,boolean success, Object msg,String parttern,HttpServletResponse response) throws IOException {
        JSONObject json = new JSONObject();
        json.put("success", success);
        json.put("msg", msg);
        json.put("data", object);
        putJsonResult(json,parttern,response);
    }

    /**
     * @param object 转json返回的数据
     * @param code  是否成功标识符号
     * @param msg   提示消息
     * @param response
     * @throws IOException
     */
    public static void putJsonResultFormatDate(Object object,boolean success, Object msg,Map<String,Object> otherData,HttpServletResponse response) throws IOException {
        putJsonResultFormatDate(object, success, msg, otherData, DateUtil.YYYY_MM_DD, response);
    }

    /**
     * @param object
     * @param success
     * @param msg
     * @param otherData
     * @param parttern
     * @param response
     * @throws IOException
     */
    public static void putJsonResultFormatDate(Object object,boolean success, Object msg,Map<String,Object> otherData,String parttern,HttpServletResponse response) throws IOException {
        JSONObject json = new JSONObject();
        json.put("success", success);
        json.put("msg", msg);
        json.put("data", object);
        for(Map.Entry<String, Object> e:otherData.entrySet()){
            json.put(e.getKey(),e.getValue());
        }
        putJsonResult(json,parttern,response);
    }

    /**
     * @param object 转json返回的数据
     * @param code  是否成功标识符号
     * @param msg   提示消息
     * @param response
     * @throws IOException
     */
    public static void putJsonResult(Object object,boolean success,Map<String,Object> otherData,HttpServletResponse response) throws IOException {
        JSONObject json = new JSONObject();
        json.put("success", success);
        json.put("data", object);
        for(Map.Entry<String, Object> e:otherData.entrySet()){
            json.put(e.getKey(),e.getValue());
        }
        putJsonResult(json , response);
    }

    /**
     * @param object 转json返回的数据
     * @param code  是否成功标识符号
     * @param msg   提示消息
     * @param response
     * @throws IOException
     */
    public static void putJsonResult(boolean success,Object msg,HttpServletResponse response) throws IOException {
        JSONObject json = new JSONObject();
        json.put("success", success);
        json.put("msg", msg);
        putJsonResult(json , response);
    }

    public static void writeJsonResult(boolean success,int code,Object msg,Object object,HttpServletResponse response) throws IOException {
        JSONObject json = new JSONObject();
        json.put("success", success);
        json.put("code", code);
        json.put("data", object);
        json.put("msg", msg);
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write(JSONObject.toJSONString(json,SerializerFeature.WriteMapNullValue));
        response.getWriter().flush();
        response.getWriter().close();
    }

    public static void writeJsonResult(boolean success,Object data,HttpServletResponse response) throws IOException {
        writeJsonResult(success,success?DEFAULT_SUCCESS_CODE:DEFAULT_ERROR_CODE,"",data,response);
    }

    public static void writeDefultErrorMsg(String msg,HttpServletResponse response) throws IOException {
        writeJsonResult(false,DEFAULT_ERROR_CODE,msg,response);
    }

    public static void writeDefultErrorMsg(HttpServletResponse response) throws IOException {
        writeJsonResult(false,DEFAULT_ERROR_CODE,"操作失败",response);
    }

    public static void writeJsonResult(boolean success,int code,Object msg,HttpServletResponse response) throws IOException {
        JSONObject json = new JSONObject();
        json.put("success", success);
        json.put("code", code);
        json.put("msg", msg);
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write(json.toJSONString());
        response.getWriter().flush();
        response.getWriter().close();
    }

    public static void writeDefaultSuccessResult(Object msg,HttpServletResponse response) throws IOException {
        writeJsonResult(true,DEFAULT_SUCCESS_CODE,msg,response);
    }

    public static Map<String,Object> getParameterMap(HttpServletRequest request,String paramNames[]){
        Map<String,Object>  paramMap = new HashMap<String,Object>();
        if(null!=paramNames){
            for(String name:paramNames){
                paramMap.put(name,request.getParameter(name));
            }
        }else{
            // 参数Map
            Map  <String,String[]> properties = request.getParameterMap();
            for(Map.Entry<String,String[]> ery:properties.entrySet()){
                paramMap.put(ery.getKey(), ery.getValue());
            }
        }
        return paramMap;
    }

}
