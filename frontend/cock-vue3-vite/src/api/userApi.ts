/**
 * 用户相关API接口封装
 * 提供与用户管理相关的所有后端接口调用方法
 */

import service from './axios'
import { APP_CONSTANTS } from '../constants'

// 用户相关接口封装
export const userApi = {
  /**
   * 获取用户信息
   * @param userId - 可选的用户ID，如果不传则获取当前用户信息
   * @returns Promise - 包含用户信息的响应
   */
  getUserInfo: (userId?: number) => {
    const params = userId ? { userId } : {} // 如果提供了userId，则作为参数传递
    return service.get(APP_CONSTANTS.ROUTE.PATHS.API.USER.INFO, { params })
  },
  
  /**
   * 更新用户信息
   * @param userId - 用户ID
   * @param data - 用户信息更新数据
   * @returns Promise - 更新结果响应
   */
  updateUserInfo: (userId: number, data: { username?: string; age?: number; gender?: number; avatar?: string; email?: string; phone?: string }) => {
    return service.put(APP_CONSTANTS.ROUTE.PATHS.API.USER.INFO + '?userId=' + userId, data)
  },
  
  /**
   * 用户注册
   * @param username - 用户名
   * @param password - 密码
   * @param confirmPassword - 确认密码
   * @param age - 年龄（可选）
   * @param avatar - 头像（可选）
   * @param gender - 性别（可选）
   * @returns Promise - 注册结果响应
   */
  register: (username: string, password: string, confirmPassword: string, age?: number, avatar?: string, gender?: number) => {
    return service.post(APP_CONSTANTS.ROUTE.PATHS.API.USER.REGISTER, {
      username,        // 用户名
      password,        // 密码
      confirmPassword, // 确认密码
      age,             // 年龄
      avatar,          // 头像
      gender           // 性别
    })
  }
}