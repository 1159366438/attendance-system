/**
 * 用户状态管理
 */
import { defineStore } from 'pinia'
import { userApi } from '../../api/userApi'
import type { UserInfo } from '../../types'
import { USER_CONSTANTS } from '../../constants/userConstants'

import { BOOLEAN_CONSTANTS } from '../../constants/booleans'
import { MESSAGE_CONSTANTS } from '../../constants/messages'
import { STORE_NAMES } from '../../constants/appArchitectureConstants'
// import { t } from '../../locales'  // 移除未使用的导入

export const useUserStore = defineStore(STORE_NAMES.USER, {
  state: () => ({
    userInfo: {
      name: '',
      avatar: '',
      userId: USER_CONSTANTS.DEFAULT_VALUES.USER_ID // 默认用户ID
    } as UserInfo,
    loading: BOOLEAN_CONSTANTS.FALSE,
    error: ''
  }),
  
  getters: {
    isLoggedIn: (state) => !!state.userInfo.name
  },
  
  actions: {
    async fetchUserInfo() {
      this.loading = BOOLEAN_CONSTANTS.TRUE
      this.error = ''
      try {
        const res = await userApi.getUserInfo(Number(this.userInfo.userId))
        // 开发调试时可以启用日志
        console.log('获取用户信息接口响应:', res)
        if (res.data && res.data.data) {
          // 后端返回的数据包装在data.data中
          const userData = res.data.data;
          this.userInfo.name = userData.username
          this.userInfo.userId = userData.id || USER_CONSTANTS.DEFAULT_VALUES.USER_ID
          this.userInfo.avatar = userData.avatar || '' // 如果有头像字段
        }
      } catch (error: any) {
        // 错误已在axios拦截器中统一处理
      } finally {
        this.loading = BOOLEAN_CONSTANTS.FALSE
      }
    },
    
    async login(username: string, password: string) {
      this.loading = BOOLEAN_CONSTANTS.TRUE
      this.error = ''
      try {
        // 调用真实的登录API
        const res = await userApi.login(username, password)
        
        // 如果登录成功，更新用户信息
        if (res.data && res.data.data) {
          const userData = res.data.data.user || res.data.data
          this.userInfo.name = userData.username
          this.userInfo.userId = userData.id || USER_CONSTANTS.DEFAULT_VALUES.USER_ID
        } else {
          this.userInfo.name = username
          this.userInfo.userId = USER_CONSTANTS.DEFAULT_VALUES.USER_ID
        }
        
        return {
          success: BOOLEAN_CONSTANTS.TRUE,
          message: MESSAGE_CONSTANTS.USER_INFO.LOGIN_SUCCESS(),
          data: { username, userId: this.userInfo.userId }
        }
      } catch (error: any) {
        // 错误已在axios拦截器中统一处理
        return {
          success: BOOLEAN_CONSTANTS.FALSE,
          message: MESSAGE_CONSTANTS.USER_INFO.LOGIN_FAILED(),
          error
        }
      } finally {
        this.loading = BOOLEAN_CONSTANTS.FALSE
      }
    },
    
    async logout() {
      try {
        // 调用真实的登出API
        await userApi.logout()
        
        // 清空本地用户信息
        this.userInfo = {
          name: '',
          avatar: '',
          userId: USER_CONSTANTS.DEFAULT_VALUES.USER_ID
        }
        
        // 清除认证状态
        localStorage.removeItem(USER_CONSTANTS.STORAGE_KEYS.IS_LOGGED_IN)
        /* // 暂时注释掉token相关功能
        localStorage.removeItem(USER_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN)
        */
        localStorage.removeItem(USER_CONSTANTS.STORAGE_KEYS.REMEMBERED_USERNAME)
        
        return {
          success: true,
          message: MESSAGE_CONSTANTS.USER_INFO.LOGOUT_SUCCESS()
        }
      } catch (error: any) {
        // 错误已在axios拦截器中统一处理
        return {
          success: false,
          message: MESSAGE_CONSTANTS.USER_INFO.LOGOUT_FAILED(),
          error
        }
      }
    }
  }
})