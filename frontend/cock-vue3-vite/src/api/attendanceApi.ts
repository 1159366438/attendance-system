/**
 * 打卡相关API接口封装
 * 提供与打卡功能相关的所有后端接口调用方法
 */

import service from './axios'
import { APP_CONSTANTS } from '../constants'

// 打卡相关接口封装
export const attendanceApi = {
  /**
   * 获取打卡记录
   * @param params - 查询参数，包括用户ID、页码和每页大小
   * @returns Promise - 包含打卡记录的响应
   */
  getAttendanceRecords: (params: { userId: string | number; page?: number; size?: number } = { userId: 1 }) => {
    return service.get(APP_CONSTANTS.ROUTE.PATHS.API.ATTENDANCE.RECORDS, { params })
  },
  
  /**
   * 考勤打卡接口
   * @param data - 考勤打卡数据，包括用户名、打卡时间和用户ID
   * @returns Promise - 考勤打卡结果响应
   */
  attendanceIn: (data: { username: string; attendanceTime: string; userId: string | number }) => {
    return service.post(APP_CONSTANTS.ROUTE.PATHS.API.ATTENDANCE.RECORDS, data)
  }
}