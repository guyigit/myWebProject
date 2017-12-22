package com.heijia.framework.service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.heijia.framework.model.AuditEntity;
import com.heijia.framework.util.page.model.PageParam;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.util.Calendar;
import java.util.Map;

/**
 * Created by lihaopeng on 2017/12/22.
 */
public abstract class BaseService<T> {


    protected final Log log = LogFactory.getLog(getClass());

    protected void setCreateDate(AuditEntity entity) {
        entity.setCreateDate(Calendar.getInstance().getTime());
        entity.setUpdateDate(Calendar.getInstance().getTime());
    }

    protected void setUpdateDate(AuditEntity entity) {
        entity.setUpdateDate(Calendar.getInstance().getTime());
    }

    protected Page<?> startPage(Map<String, Object> map) {
        Object pageSize = map.get("pageSize");
        Object pageIndex = map.get("pageIndex");
        return PageHelper.startPage(
                null == pageIndex ? 1 : Integer.valueOf(pageIndex.toString()),
                null == pageSize ? 10 : Integer.valueOf(pageSize.toString()));
    }

    protected Page<?> startPage(PageParam<T> params) {
        return PageHelper.startPage(params.getPageIndex(), params.getPageSize());
    }


}
