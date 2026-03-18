/**
 * 打卡相关类型定义
 * 定义考勤打卡相关的类型接口
 * @author Attendance System Team
 * @since 2026-03-15
 */

// 打卡记录类型
export interface AttendanceRecord {
  id?: number        // 主键ID
  userId?: number    // 打卡用户ID
  date?: string      // 打卡日期 (对应后端checkInTime字段)
  time?: string      // 打卡时间 (对应后端checkInTime字段)
  checkInTime?: Date // 打卡时间
  checkInType?: number // 打卡类型：1-上班打卡 2-下班打卡 3-加班打卡
  checkInStatus?: number // 打卡状态：1-正常 2-迟到 3-早退 4-旷工
  checkInLocation?: string // 打卡地点
  createTime?: Date  // 记录创建时间
  updateTime?: Date  // 记录更新时间
}

// 分页响应类型
export interface PageResponse<T> {
  records: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}