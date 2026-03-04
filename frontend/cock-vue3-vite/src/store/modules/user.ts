/**
 * 用户状态管理
 */
import { defineStore } from 'pinia'
import { userApi } from '../../api/userApi'
import type { UserInfo } from '../../types'

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
        console.log('获取用户信息接口响应:', res)
        if (res.status === 200) {
          this.userInfo.name = res.data.username
        } else {
          this.error = '获取用户信息失败111111'
        }
      } catch (error) {
        this.error = '获取用户信息时发生错误111'
        console.error('获取用户信息失败111:', error)
      } finally {
        this.loading = false
      }
    }
  }
})