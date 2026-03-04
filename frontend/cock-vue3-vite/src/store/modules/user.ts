/**
 * 用户状态管理
 */
import { defineStore } from 'pinia'
import { userApi } from '../../api/userApi'
import type { UserInfo } from '../../types'
import { t } from '../../locales'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {
      name: '',
      avatar: ''
    } as UserInfo,
    loading: false,
    error: ''
  }),
  
  getters: {
    isLoggedIn: (state) => !!state.userInfo.name
  },
  
  actions: {
    async fetchUserInfo() {
      this.loading = true
      this.error = ''
      try {
        const res = await userApi.getUserInfo()
        // 开发调试时可以启用日志
        console.log('获取用户信息接口响应:', res)
        if (res.status === 200) {
          this.userInfo.name = res.data.username
        } else {
          this.error = t('messages.getUserInfoFailed', '获取用户信息失败')
        }
      } catch (error) {
        this.error = t('messages.getUserInfoError', '获取用户信息时发生错误')
        console.error('获取用户信息失败:', error)
      } finally {
        this.loading = false
      }
    }
  }
})