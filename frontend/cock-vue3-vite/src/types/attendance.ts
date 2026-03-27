/**
 * 打卡相关类型定义
 * 定义考勤打卡相关的类型接口
 * @author Attendance System Team
 * @since 2026-03-15
 * @version v1.1.0-alpha.1
 */

// 打卡记录类型
export interface AttendanceRecord {
  id?: number        // 主键ID
  userId?: number    // 用户ID
  username?: string  // 用户名
  checkInTime?: string // 打卡时间
  checkOutTime?: string // 签退时间
  date?: string      // 日期
  status?: string    // 状态
  remarks?: string   // 备注
}

// 打卡请求参数类型
export interface PunchCardParams {
  userId?: number     // 用户ID
  username?: string   // 用户名
  checkInTime?: string // 打卡时间
}