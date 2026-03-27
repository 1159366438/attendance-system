/**
 * 用户状态管理模块
 * 管理用户登录状态、用户信息、权限等
 * @author Attendance System Team
 * @since 2026-03-18
 * @version v1.1.0-alpha.1
 */
import { defineStore } from 'pinia'
import { userApi } from '../../api/userApi'
import { authApi } from '../../api/authApi'
import type { UserInfo } from '../../types'
import { APP_CONSTANTS, STATUS_CODES, MESSAGE_CONSTANTS, STORE_NAMES } from '../../constants'
// import { t } from '../../locales'  // 移除未使用的导入

export const useUserStore = defineStore(STORE_NAMES.USER, {
  // 定义用户状态
  state: () => ({
    userInfo: {
      username: undefined,                         // 用户名
      avatar: undefined,                           // 用户头像
      userId: undefined,                           // 用户ID
      age: undefined,                              // 年龄
      gender: undefined                            // 性别
    } as UserInfo,
    loading: APP_CONSTANTS.BOOLEAN.FALSE,          // 加载状态
    error: ''                                      // 错误信息
  }),
  
  // 定义计算属性
  getters: {
    // 检查用户是否已登录
    isLoggedIn: (state) => !!state.userInfo.username
  },
  
  // 定义状态修改方法
  actions: {
    /**
     * 异步获取用户信息
     * 从后端API获取当前用户的信息并更新本地状态
     */
    async fetchUserInfo() {
      this.loading = APP_CONSTANTS.BOOLEAN.TRUE    // 设置加载状态为true
      this.error = ''                             // 清空之前的错误信息
      try {
        const res = await userApi.getUserInfo(this.userInfo.userId || 1)
        // 开发调试时可以启用日志
        console.log('获取用户信息接口响应:', res)
        
        // 检查响应状态
        if (res.data && res.data.code !== STATUS_CODES.BUSINESS.SUCCESS) {
          // 根据后端返回码进行精确错误处理
          switch (res.data.code) {
            case STATUS_CODES.BUSINESS.RESOURCE_NOT_FOUND:
            case 404:
              // 用户不存在
              throw new Error(MESSAGE_CONSTANTS.USER_INFO.FETCH_ERROR())
              
            case STATUS_CODES.BUSINESS.AUTH_FAILED:
            case 401:
              // 认证失败，可能token过期
              localStorage.removeItem(APP_CONSTANTS.USER.STORAGE_KEYS.IS_LOGGED_IN)
              localStorage.removeItem(APP_CONSTANTS.USER.STORAGE_KEYS.AUTH_TOKEN)
              throw new Error(MESSAGE_CONSTANTS.USER_INFO.AUTH_FAILED())
              
            case STATUS_CODES.BUSINESS.SERVER_ERROR:
            case 500:
              // 服务器错误
              throw new Error(MESSAGE_CONSTANTS.COMMON.SERVER_ERROR())
              
            default:
              // 其他业务错误
              throw new Error(res.data.msg || res.data.message || MESSAGE_CONSTANTS.USER_INFO.FETCH_FAILED())
          }
        }
        
        if (res.data && res.data.data) {
          // 后端返回的数据包装在data.data中
          const userData = res.data.data;
          this.userInfo.username = userData.username
          this.userInfo.userId = userData.id
          this.userInfo.avatar = userData.avatar || '' // 如果有头像字段
          this.userInfo.age = userData.age
          this.userInfo.gender = userData.gender
          this.userInfo.email = userData.email || ''
          this.userInfo.phone = userData.phone || ''
        }
      } catch (error: any) {
        // 错误已在axios拦截器中统一处理
        this.error = error.message || MESSAGE_CONSTANTS.USER_INFO.FETCH_FAILED()
      } finally {
        this.loading = APP_CONSTANTS.BOOLEAN.FALSE
      }
    },
    
    async login(username: string, password: string) {
      this.loading = APP_CONSTANTS.BOOLEAN.TRUE
      this.error = ''
      try {
        // 调用真实的登录API
        const res = await authApi.login(username, password)
        
        // 检查响应状态
        if (res.data && res.data.code !== STATUS_CODES.BUSINESS.SUCCESS) {
          // 根据后端返回码进行精确错误处理
          switch (res.data.code) {
            case STATUS_CODES.BUSINESS.AUTH_FAILED:
            case 401:
              // 认证失败，用户名或密码错误
              throw new Error(MESSAGE_CONSTANTS.USER_INFO.INVALID_CREDENTIALS())
              
            case STATUS_CODES.BUSINESS.PARAM_ERROR:
            case 400:
              // 参数错误
              throw new Error(MESSAGE_CONSTANTS.USER_INFO.PARAM_ERROR())
              
            case STATUS_CODES.BUSINESS.SERVER_ERROR:
            case 500:
              // 服务器错误
              throw new Error(MESSAGE_CONSTANTS.COMMON.SERVER_ERROR())
              
            default:
              // 其他业务错误
              throw new Error(res.data.msg || res.data.message || MESSAGE_CONSTANTS.USER_INFO.LOGIN_FAILED())
          }
        }
        
        // 如果登录成功，更新用户信息
        if (res.data && res.data.data) {
          const userData = res.data.data.user || res.data.data
            this.userInfo.username = userData.username
            this.userInfo.userId = userData.id
            this.userInfo.avatar = userData.avatar || ''
            this.userInfo.age = userData.age
            this.userInfo.gender = userData.gender
            this.userInfo.email = userData.email || ''
            this.userInfo.phone = userData.phone || ''
        } else {
          this.userInfo.username = username
          this.userInfo.userId = undefined
        }
        
        return {
          success: APP_CONSTANTS.BOOLEAN.TRUE,
          message: MESSAGE_CONSTANTS.USER_INFO.LOGIN_SUCCESS(),
          data: { username, userId: this.userInfo.userId }
        }
      } catch (error: any) {
        // 检查是否是认证失败错误
        if (error.message && (error.message.includes(MESSAGE_CONSTANTS.USER_INFO.INVALID_CREDENTIALS()) || error.message.includes(MESSAGE_CONSTANTS.USER_INFO.AUTH_FAILED()))) {
          // 清除可能存在的无效认证信息
          localStorage.removeItem(APP_CONSTANTS.USER.STORAGE_KEYS.IS_LOGGED_IN)
          localStorage.removeItem(APP_CONSTANTS.USER.STORAGE_KEYS.AUTH_TOKEN)
        }
        
        return {
          success: APP_CONSTANTS.BOOLEAN.FALSE,
          message: error.message || MESSAGE_CONSTANTS.USER_INFO.LOGIN_FAILED(),
          error
        }
      } finally {
        this.loading = APP_CONSTANTS.BOOLEAN.FALSE
      }
    },
    
    async register(username: string, password: string, confirmPassword: string, age?: number, avatar?: string, gender?: number) {
      this.loading = APP_CONSTANTS.BOOLEAN.TRUE
      this.error = ''
      try {
        // 调用真实的注册API
        const res = await userApi.register(username, password, confirmPassword, age, avatar, gender)
        
        // 检查响应状态
        if (res.data && res.data.code !== STATUS_CODES.BUSINESS.SUCCESS) {
          // 根据后端返回码进行精确错误处理
          switch (res.data.code) {
            case STATUS_CODES.BUSINESS.PARAM_ERROR:
            case 400:
              // 参数错误
              throw new Error(MESSAGE_CONSTANTS.USER_INFO.PARAM_ERROR())
              
            case STATUS_CODES.BUSINESS.VALIDATION_ERROR:
            case 422:
              // 验证错误
              throw new Error(MESSAGE_CONSTANTS.USER_INFO.VALIDATION_ERROR())
              
            case STATUS_CODES.BUSINESS.SERVER_ERROR:
            case 500:
              // 服务器错误
              throw new Error(MESSAGE_CONSTANTS.COMMON.SERVER_ERROR())
              
            default:
              // 其他业务错误
              throw new Error(res.data.msg || res.data.message || MESSAGE_CONSTANTS.USER_INFO.REGISTER_FAILED())
          }
        }
        
        // 如果注册成功，可以自动登录用户
        if (res.data && res.data.data) {
          const userData = res.data.data
          this.userInfo.username = userData.username
          this.userInfo.userId = userData.id
          this.userInfo.avatar = userData.avatar || ''
          this.userInfo.age = userData.age
          this.userInfo.gender = userData.gender
          this.userInfo.email = userData.email || ''
          this.userInfo.phone = userData.phone || ''
        }
        
        return {
          success: APP_CONSTANTS.BOOLEAN.TRUE,
          message: MESSAGE_CONSTANTS.USER_INFO.REGISTER_SUCCESS(),
          data: { username, userId: this.userInfo.userId }
        }
      } catch (error: any) {
        return {
          success: APP_CONSTANTS.BOOLEAN.FALSE,
          message: error.message || MESSAGE_CONSTANTS.USER_INFO.REGISTER_FAILED(),
          error
        }
      } finally {
        this.loading = APP_CONSTANTS.BOOLEAN.FALSE
      }
    },
    
    async logout() {
      try {
        // 调用真实的登出API
        const res = await authApi.logout()
        
        // 检查响应状态
        if (res.data && res.data.code !== STATUS_CODES.BUSINESS.SUCCESS) {
          // 根据后端返回码进行精确错误处理
          switch (res.data.code) {
            case STATUS_CODES.BUSINESS.SERVER_ERROR:
            case 500:
              // 服务器错误
              throw new Error(MESSAGE_CONSTANTS.COMMON.SERVER_ERROR())
              
            default:
              // 其他业务错误
              throw new Error(res.data.msg || res.data.message || MESSAGE_CONSTANTS.USER_INFO.LOGOUT_FAILED())
          }
        }
        
        // 清空本地用户信息
        this.userInfo = {
          username: undefined,
          avatar: undefined,
          userId: undefined,
          age: undefined,
          gender: undefined,
          email: undefined,
          phone: undefined
        }
        
        // 清除认证状态
        localStorage.removeItem(APP_CONSTANTS.USER.STORAGE_KEYS.IS_LOGGED_IN)
        /* // 暂时注释掉token相关功能
        localStorage.removeItem(APP_CONSTANTS.USER.STORAGE_KEYS.AUTH_TOKEN)
        */
        localStorage.removeItem(APP_CONSTANTS.USER.STORAGE_KEYS.REMEMBERED_USERNAME)
        
        return {
          success: true,
          message: MESSAGE_CONSTANTS.USER_INFO.LOGOUT_SUCCESS()
        }
      } catch (error: any) {
        // 错误已在axios拦截器中统一处理
        return {
          success: false,
          message: error.message || MESSAGE_CONSTANTS.USER_INFO.LOGOUT_FAILED(),
          error
        }
      }
    },
    
    /**
     * 更新用户信息
     * 通过API更新用户信息并同步到本地状态
     */
    async updateUserInfo(userData: { username?: string; age?: number; gender?: number; avatar?: string; email?: string; phone?: string }) {
      this.loading = APP_CONSTANTS.BOOLEAN.TRUE
      this.error = ''
      try {
        // 调用更新用户信息API
        const res = await userApi.updateUserInfo(this.userInfo.userId as number, userData)
        
        // 检查响应状态
        if (res.data && res.data.code !== STATUS_CODES.BUSINESS.SUCCESS) {
          // 根据后端返回码进行精确错误处理
          switch (res.data.code) {
            case STATUS_CODES.BUSINESS.PARAM_ERROR:
            case 400:
              // 参数错误
              throw new Error(MESSAGE_CONSTANTS.USER_INFO.PARAM_ERROR())
              
            case STATUS_CODES.BUSINESS.VALIDATION_ERROR:
            case 422:
              // 验证错误
              throw new Error(MESSAGE_CONSTANTS.USER_INFO.VALIDATION_ERROR())
              
            case STATUS_CODES.BUSINESS.SERVER_ERROR:
            case 500:
              // 服务器错误
              throw new Error(MESSAGE_CONSTANTS.COMMON.SERVER_ERROR())
              
            default:
              // 其他业务错误
              throw new Error(res.data.msg || res.data.message || MESSAGE_CONSTANTS.USER_INFO.UPDATE_FAILED())
          }
        }
        
        // 如果更新成功，同步到本地状态
        if (res.data && res.data.data) {
          const updatedUserData = res.data.data
          this.userInfo.username = updatedUserData.username
          this.userInfo.avatar = updatedUserData.avatar || ''
          this.userInfo.age = updatedUserData.age
          this.userInfo.gender = updatedUserData.gender
          this.userInfo.email = updatedUserData.email || ''
          this.userInfo.phone = updatedUserData.phone || ''
        }
        
        return {
          success: APP_CONSTANTS.BOOLEAN.TRUE,
          message: MESSAGE_CONSTANTS.USER_INFO.UPDATE_SUCCESS(),
          data: res.data?.data || userData
        }
      } catch (error: any) {
        this.error = error.message || MESSAGE_CONSTANTS.USER_INFO.UPDATE_FAILED()
        return {
          success: APP_CONSTANTS.BOOLEAN.FALSE,
          message: error.message || MESSAGE_CONSTANTS.USER_INFO.UPDATE_FAILED(),
          error
        }
      } finally {
        this.loading = APP_CONSTANTS.BOOLEAN.FALSE
      }
    }
  }
})