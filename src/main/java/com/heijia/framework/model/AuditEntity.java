package com.heijia.framework.model;

import java.util.Date;

/**
 * Created by lihaopeng on 2017/12/20.
 */
public abstract class AuditEntity extends BaseEntity {

    private static final long serialVersionUID = 1L;

    private Long createBy = null;

    private Date createDate = null;

    private Long updateBy = null;

    private Date updateDate = null;

    public static long getSerialversionuid() {
        return serialVersionUID;
    }

    public Long getCreateBy() {
        return createBy;
    }

    public void setCreateBy(Long createBy) {
        this.createBy = createBy;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Long getUpdateBy() {
        return updateBy;
    }

    public void setUpdateBy(Long updateBy) {
        this.updateBy = updateBy;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

}
