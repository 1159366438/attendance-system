/**
 * 用户相关类型定义
 * 定义用户相关的类型接口
 * @author Attendance System Team
 * @since 2026-03-15
 * @version v1.1.0-alpha.1
 */

// 用户信息类型
export interface UserInfo {
  username?: string // 用户名
  password?: string // 密码
  age?: number // 年龄
  gender?: number // 性别 0-女 1-男
  avatar?: string // 头像
  email?: string // 邮箱
  phone?: string // 电话
  position?: string // 职位
  departmentId?: number // 部门ID
  userId?: number // 用户ID
  createTime?: string // 创建时间
  updateTime?: string // 更新时间
  isDeleted?: number // 删除标识
}

// 用户登录请求参数类型
export interface LoginParams {
  username?: string // 用户名
  password?: string // 密码
}

// 用户注册请求参数类型
export interface RegisterParams {
  username?: string // 用户名
  password?: string // 密码
  confirmPassword?: string // 确认密码
  age?: number // 年龄
  gender?: number // 性别 0-女 1-男
  avatar?: string // 头像
  email?: string // 邮箱
  phone?: string // 电话
  position?: string // 职位
  departmentId?: number // 部门ID
}

// 用户登录响应数据类型
export interface LoginResult {
  code: number // 状态码
  msg?: string // 消息
  data: {
    token: string // 认证令牌
    user: UserInfo // 用户信息
  }
}