/**
 * 用户相关类型定义
 * 定义用户相关的类型接口
 * @author Attendance System Team
 * @since 2026-03-15
 */

// 用户信息类型
export interface UserInfo {
  id?: number // 用户ID
  name: string // 用户名
  avatar: string // 用户头像URL
  userId: string | number // 用户ID（兼容旧代码）
  age?: number // 年龄
  gender?: number // 性别
  email?: string // 邮箱
  phone?: string // 电话
}