package com.example.service.impl;

/**
 * 考勤记录业务逻辑实现类
 * 实现考勤记录管理相关的业务逻辑
 * 
 * @author Attendance System Team
 * @since 2026-03-27
 * @version v1.1.0-alpha.1
 */

import com.example.common.ResponseResult;
import com.example.constants.AppConstants;
import com.example.dao.AttendanceRecordDao;
import com.example.entity.AttendanceRecord;
import com.example.service.AttendanceRecordService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 考勤记录服务实现类
 */
@Service
public class AttendanceRecordServiceImpl implements AttendanceRecordService {

    private static final Logger logger = LoggerFactory.getLogger(AttendanceRecordServiceImpl.class);

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
    public int attendanceIn(AttendanceRecord attendanceRecord) {
        // 执行考勤操作，实际上就是插入一条考勤记录
        return insert(attendanceRecord);
    }

    @Override
    public List<AttendanceRecord> queryByPage(int page, int size) {
        int offset = (page - AppConstants.Page.DEFAULT_PAGE_NUM) * size;
        return attendanceRecordDao.queryByPage(offset, size);
    }

    @Override
    public int countAll() {
        return attendanceRecordDao.countAll();
    }

    @Override
    public int countByUserId(Integer userId) {
        return attendanceRecordDao.countByUserId(userId);
    }

    @Override
    public List<AttendanceRecord> queryByUserIdAndPage(Integer userId, int page, int size) {
        int offset = (page - AppConstants.Page.DEFAULT_PAGE_NUM) * size;
        return attendanceRecordDao.queryByUserIdAndPage(userId, offset, size);
    }

    @Override
     public ResponseResult<String> performAttendanceIn(Integer userId) {
         logger.info("执行考勤操作，用户ID: {}", userId);
         
         // 验证用户ID
         if (userId == null) {
             logger.warn("考勤打卡失败：用户ID不能为空");
             return ResponseResult.error(AppConstants.Error.USER_ID_EMPTY_CODE, AppConstants.Error.USER_ID_EMPTY_MSG);
         }

         // 设置为北京时间
         java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
         sdf.setTimeZone(java.util.TimeZone.getTimeZone("Asia/Shanghai"));

         // 获取当前时间
         java.util.Date now = new java.util.Date();

         // 创建考勤记录
         AttendanceRecord attendanceRecord = new AttendanceRecord();
         attendanceRecord.setUserId(userId);
         attendanceRecord.setCheckInTime(now);
         attendanceRecord.setCheckInType(AppConstants.Attendance.CHECK_IN_TYPE_ON_WORK); // 上班考勤
         attendanceRecord.setCheckInStatus(AppConstants.Attendance.CHECK_IN_STATUS_NORMAL); // 正常状态
         attendanceRecord.setCheckInLocation("公司"); // 假设考勤地点为公司

         // 保存考勤记录
         int result = attendanceIn(attendanceRecord);

         if (result > 0) {
             logger.info("考勤打卡成功，用户ID: {}", userId);
             return ResponseResult.success(AppConstants.Success.ATTENDANCE_SUCCESS_MSG);
         } else {
             logger.error("考勤打卡失败，用户ID: {}", userId);
             return ResponseResult.error(AppConstants.Error.ATTENDANCE_FAILED_CODE, AppConstants.Error.ATTENDANCE_FAILED_MSG);
         }
     }

     @Override
     public ResponseResult<Map<String, Object>> getAttendanceRecords(Integer userId, int page, int size) {
         try {
             logger.info("获取考勤记录请求，用户ID: {}, 页码: {}, 每页大小: {}", userId, page, size);
             
             // 计算总数
             int total = countByUserId(userId);
             
             // 获取分页数据
             List<AttendanceRecord> records = queryByUserIdAndPage(userId, page, size);
             
             // 构造响应数据
             Map<String, Object> responseData = new HashMap<>();
             responseData.put("records", records);
             responseData.put("total", total);
             responseData.put("page", page);
             responseData.put("size", size);
             responseData.put("pages", (int) Math.ceil((double) total / size));
             
             logger.info("获取考勤记录成功，用户ID: {}，总数: {}", userId, total);
             return ResponseResult.success(responseData);
         } catch (Exception e) {
             logger.error("获取考勤记录失败，用户ID: {}", userId, e);
             return ResponseResult.error(AppConstants.Error.GET_ATTENDANCE_RECORDS_FAILED_CODE, AppConstants.Error.GET_ATTENDANCE_RECORDS_FAILED_MSG);
         }
     }
}