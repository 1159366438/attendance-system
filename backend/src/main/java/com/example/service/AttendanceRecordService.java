package com.example.service;

import com.example.common.ResponseResult;
import com.example.entity.AttendanceRecord;
import java.util.List;
import java.util.Map;

/**
 * 考勤记录业务逻辑接口
 * 定义考勤记录管理相关的业务逻辑方法
 * 
 * @author Attendance System Team
 * @since 2026-03-27
 * @version v1.1.0-alpha.1
 */
public interface AttendanceRecordService {

    /**
     * 通过ID查询单条考勤记录
     *
     * @param id 主键
     * @return 实例对象
     */
    AttendanceRecord queryById(Integer id);

    /**
     * 查询所有考勤记录
     *
     * @return 考勤记录列表
     */
    List<AttendanceRecord> queryAll();

    /**
     * 通过用户ID查询考勤记录
     *
     * @param userId 用户ID
     * @return 考勤记录列表
     */
    List<AttendanceRecord> queryByUserId(Integer userId);

    /**
     * 新增考勤记录
     *
     * @param attendanceRecord 实例对象
     * @return 影响行数
     */
    int insert(AttendanceRecord attendanceRecord);

    /**
     * 修改考勤记录
     *
     * @param attendanceRecord 实例对象
     * @return 影响行数
     */
    int update(AttendanceRecord attendanceRecord);

    /**
     * 分页查询考勤记录
     *
     * @param page 页码 (从1开始)
     * @param size 每页数量
     * @return 考勤记录列表
     */
    List<AttendanceRecord> queryByPage(int page, int size);

    /**
     * 查询总记录数
     *
     * @return 总记录数
     */
    int countAll();

    /**
     * 通过主键删除数据
     *
     * @param id 主键
     * @return 影响行数
     */
    int deleteById(Integer id);

    /**
     * 执行考勤操作
     *
     * @param attendanceRecord 考勤记录信息
     * @return 影响行数
     */
    int attendanceIn(AttendanceRecord attendanceRecord);

    /**
     * 根据用户ID查询考勤记录总数
     *
     * @param userId 用户ID
     * @return 考勤记录总数
     */
    int countByUserId(Integer userId);

    /**
     * 根据用户ID分页查询考勤记录
     *
     * @param userId 用户ID
     * @param page 页码 (从1开始)
     * @param size 每页数量
     * @return 考勤记录列表
     */
    List<AttendanceRecord> queryByUserIdAndPage(Integer userId, int page, int size);

    /**
     * 执行用户考勤操作
     *
     * @param userId 用户ID
     * @return 考勤结果响应
     */
    ResponseResult<String> performAttendanceIn(Integer userId);

    /**
     * 获取用户考勤记录（分页）
     *
     * @param userId 用户ID
     * @param page 页码
     * @param size 每页数量
     * @return 考勤记录分页结果
     */
    ResponseResult<Map<String, Object>> getAttendanceRecords(Integer userId, int page, int size);
}