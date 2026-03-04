package com.example.service.impl;

import com.example.dao.AttendanceRecordDao;
import com.example.entity.AttendanceRecord;
import com.example.service.AttendanceRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;

/**
 * 打卡记录服务实现类
 */
@Service
public class AttendanceRecordServiceImpl implements AttendanceRecordService {

    @Autowired
    private AttendanceRecordDao attendanceRecordDao;

    @Override
    public AttendanceRecord queryById(Integer id) {
        return attendanceRecordDao.queryById(id);
    }

    @Override
    public List<AttendanceRecord> queryAll() {
        return attendanceRecordDao.queryAll();
    }

    @Override
    public List<AttendanceRecord> queryByUserId(Integer userId) {
        return attendanceRecordDao.queryByUserId(userId);
    }

    @Override
    public int insert(AttendanceRecord attendanceRecord) {
        // 设置创建时间和更新时间（北京时间）
        Date now = new Date();
        attendanceRecord.setCreateTime(now);
        attendanceRecord.setUpdateTime(now);
        return attendanceRecordDao.insert(attendanceRecord);
    }

    @Override
    public int update(AttendanceRecord attendanceRecord) {
        // 更新修改时间（北京时间）
        Date now = new Date();
        attendanceRecord.setUpdateTime(now);
        return attendanceRecordDao.update(attendanceRecord);
    }

    @Override
    public int deleteById(Integer id) {
        return attendanceRecordDao.deleteById(id);
    }

    @Override
    public int punchIn(AttendanceRecord attendanceRecord) {
        // 执行打卡操作，实际上就是插入一条打卡记录
        return insert(attendanceRecord);
    }

    @Override
    public List<AttendanceRecord> queryByPage(int page, int size) {
        int offset = (page - 1) * size;
        return attendanceRecordDao.queryByPage(offset, size);
    }

    @Override
    public int countAll() {
        return attendanceRecordDao.countAll();
    }
}