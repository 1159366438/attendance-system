/**
 * API相关类型定义
 */

// API响应类型
export interface ApiResponse<T = any> {
  code: number
  data: T
  message?: string
}