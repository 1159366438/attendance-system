/**
 * 认证控制器
 * @author Attendance System Team
 * @since 2026-03-18
 * @version v1.1.0-alpha.1
 */

import service from './axios'
import { APP_CONSTANTS } from '../constants'

// 认证相关接口封装
export const authApi = {
  /**
   * 用户登录
   * @param username - 用户名
   * @param password - 密码
   * @returns Promise - 登录结果响应
   */
  login: (username: string, password: string) => {
    return service.post(APP_CONSTANTS.ROUTE.PATHS.API.USER.LOGIN, {
      username,  // 用户名
      password   // 密码
    })
  },
  
  /**
   * 用户登出
   * @returns Promise - 登出结果响应
   */
  logout: () => {
    return service.post(APP_CONSTANTS.ROUTE.PATHS.API.USER.LOGOUT)
  }
}