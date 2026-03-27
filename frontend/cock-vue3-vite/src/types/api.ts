/**
 * API相关类型定义
 * 定义API请求和响应相关的类型接口
 * @author Attendance System Team
 * @since 2026-03-15
 * @version v1.1.0-alpha.1
 */

// API响应类型
export interface ApiResponse<T = any> {
  code: number
  msg: string
  data: T
}

// 分页响应类型
export interface ApiPageResponse<T = any> {
  code: number
  msg: string
  data: {
    records: T[]
    total: number
    pageNum: number
    pageSize: number
    totalPages: number
  }
}

// API请求参数类型
export interface ApiRequestParam {
  [key: string]: any
}