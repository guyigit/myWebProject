package com.heijia.framework.util.page.model;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by lihaopeng on 2017/12/22.
 */
public class PageParam<T> {

    public Map<String, Object> externalParam = new HashMap<String, Object>();

    private  T t;

    public T getT() {
        return t;
    }

    public void setT(T t) {
        this.t = t;
    }

    public Map<String, Object> getExternalParam() {
        return externalParam;
    }

    public void setExternalParam(Map<String, Object> externalParam) {
        this.externalParam = externalParam;
    }

    public int getPageIndex() {
        return pageIndex;
    }

    public void setPageIndex(int pageIndex) {
        this.pageIndex = pageIndex;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    private int  pageIndex;

    private int  pageSize;

    public PageParam(T t, int pageIndex, int pageSize) {
        this.t = t;
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
    }

    public PageParam() {  }


}
