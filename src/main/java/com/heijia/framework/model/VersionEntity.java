package com.heijia.framework.model;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * Created by lihaopeng on 2017/12/20.
 */
public abstract class VersionEntity extends AuditEntity {


    private static final long serialVersionUID = 1L;

    @JSONField(serialize = false)
    private Long optCounter = 0L;

    @JSONField(serialize = false)
    private Boolean isDeleted = false;

    private String memo = null;

    @JSONField(serialize = false)
    private Long userId;

    private String channelName;

    public Long getOptCounter() {
        return optCounter;
    }

    public void setOptCounter(Long optCounter) {
        this.optCounter = optCounter;
    }

    public Boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getChannelName() {
        return channelName;
    }

    public void setChannelName(String channelName) {
        this.channelName = channelName;
    }


}
