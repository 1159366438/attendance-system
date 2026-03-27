package com.example.dto;

/**
 * 考勤请求数据传输对象
 * 封装考勤打卡时提交的相关信息
 * 
 * @author Attendance System Team
 * @since 2026-03-27
 * @version v1.1.0-alpha.1
 */
public class AttendanceRequest {
    /**
     * 用户名
     */
    private String username;

    /**
     * 用户ID
     */
    private Integer userId;

    /**
     * 考勤时间（ISO格式）
     */
    private String attendanceTime;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getAttendanceTime() {
        return attendanceTime;
    }

    public void setAttendanceTime(String attendanceTime) {
        this.attendanceTime = attendanceTime;
    }
}