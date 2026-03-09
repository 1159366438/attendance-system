/**
 * 用户状态管理
 */
import { defineStore } from 'pinia'
import { userApi } from '../../api/userApi'
import type { UserInfo } from '../../types'
import { t } from '../../locales'
import { normalizeResponse } from '../../api/responseUtils'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {
      name: '',
      avatar: '',
      userId: 1 // 默认用户ID
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
        const res = await userApi.getUserInfo();
        console.log('获取用户信息接口响应:', res);
        const { success, data } = normalizeResponse(res);
        if (success) {
          // 对于直接返回User对象的接口，data就是User
          const user = data as any;
          this.userInfo.name = user.username || '';
          this.userInfo.userId = user.id || 1; // 使用后端返回的用户ID，默认1
        } else {
          this.error = t('messages.getUserInfoFailed', '获取用户信息失败');
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