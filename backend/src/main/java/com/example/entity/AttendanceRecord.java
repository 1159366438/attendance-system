package com.example.entity;

import java.io.Serializable;
import java.util.Date;

/**
 * 考勤记录实体类
 * 对应数据库中的考勤记录表，封装考勤记录相关信息
 * 
 * @author Attendance System Team
 * @since 2026-03-27
 * @version v1.1.0-alpha.1
 */
public class AttendanceRecord implements Serializable {
    private static final long serialVersionUID = -42311789699024229L;

    /**
     * 主键ID
     */
    private Integer id;

    /**
     * 用户ID
     */
    private Integer userId;

    /**
     * 打卡时间
     */
    private Date checkInTime;

    /**
     * 打卡类型 1-上班考勤 2-下班考勤 3-加班考勤
     */
    private Integer checkInType;

    /**
     * 打卡状态 1-正常 2-迟到 3-早退 4-旷工
     */
    private Integer checkInStatus;

    /**
     * 打卡地点
     */
    private String checkInLocation;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;

    public static final String COL_ID = "id";

    public static final String COL_USER_ID = "user_id";

    public static final String COL_CHECK_IN_TIME = "check_in_time";

    public static final String COL_CHECK_IN_TYPE = "check_in_type";

    public static final String COL_CHECK_IN_STATUS = "check_in_status";

    public static final String COL_CHECK_IN_LOCATION = "check_in_location";

    public static final String COL_CREATE_TIME = "create_time";

    public static final String COL_UPDATE_TIME = "update_time";

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Date getCheckInTime() {
        return checkInTime;
    }

    public void setCheckInTime(Date checkInTime) {
        this.checkInTime = checkInTime;
    }

    public Integer getCheckInType() {
        return checkInType;
    }

    public void setCheckInType(Integer checkInType) {
        this.checkInType = checkInType;
    }

    public Integer getCheckInStatus() {
        return checkInStatus;
    }

    public void setCheckInStatus(Integer checkInStatus) {
        this.checkInStatus = checkInStatus;
    }

    public String getCheckInLocation() {
        return checkInLocation;
    }

    public void setCheckInLocation(String checkInLocation) {
        this.checkInLocation = checkInLocation;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
}