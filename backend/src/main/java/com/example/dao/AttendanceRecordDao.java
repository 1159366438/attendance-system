package com.example.dao;

import com.example.entity.AttendanceRecord;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

/**
 * 考勤记录数据访问接口
 * 定义对考勤记录表进行数据库操作的方法
 * 
 * @author Attendance System Team
 * @since 2026-03-27
 * @version v1.1.0-alpha.1
 */
//@Mapper
public interface AttendanceRecordDao {

    /**
     * 通过ID查询单条数据
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
     * @param offset 偏移量
     * @param limit 每页数量
     * @return 考勤记录列表
     */
    List<AttendanceRecord> queryByPage(int offset, int limit);

    /**
     * 查询总记录数
     *
     * @return 总记录数
     */
    int countAll();

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
     * @param offset 偏移量
     * @param limit 每页数量
     * @return 考勤记录列表
     */
    List<AttendanceRecord> queryByUserIdAndPage(Integer userId, int offset, int limit);

    /**
     * 通过主键删除数据
     *
     * @param id 主键
     * @return 影响行数
     */
    int deleteById(Integer id);
}