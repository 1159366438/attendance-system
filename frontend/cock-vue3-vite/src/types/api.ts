/**
 * API相关类型定义
 * 定义API请求和响应相关的类型接口
 * @author Attendance System Team
 * @since 2026-03-15
 */

// API响应类型
export interface ApiResponse<T = any> {
  code: number
  data: T
  message?: string
}