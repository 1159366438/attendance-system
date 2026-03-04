package com.example.service;

import com.example.entity.AttendanceRecord;
import java.util.List;

/**
 * 打卡记录服务接口
 */
public interface AttendanceRecordService {

    /**
     * 通过ID查询单条打卡记录
     *
     * @param id 主键
     * @return 实例对象
     */
    AttendanceRecord queryById(Integer id);

    /**
     * 查询所有打卡记录
     *
     * @return 打卡记录列表
     */
    List<AttendanceRecord> queryAll();

    /**
     * 通过用户ID查询打卡记录
     *
     * @param userId 用户ID
     * @return 打卡记录列表
     */
    List<AttendanceRecord> queryByUserId(Integer userId);

    /**
     * 新增打卡记录
     *
     * @param attendanceRecord 实例对象
     * @return 影响行数
     */
    int insert(AttendanceRecord attendanceRecord);

    /**
     * 修改打卡记录
     *
     * @param attendanceRecord 实例对象
     * @return 影响行数
     */
    int update(AttendanceRecord attendanceRecord);

    /**
     * 分页查询打卡记录
     *
     * @param page 页码 (从1开始)
     * @param size 每页数量
     * @return 打卡记录列表
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
     * 执行打卡操作
     *
     * @param attendanceRecord 打卡记录信息
     * @return 影响行数
     */
    int punchIn(AttendanceRecord attendanceRecord);
}