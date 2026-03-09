/**
 * 打卡状态管理
 */
import { defineStore } from 'pinia'
import { punchApi } from '../../api/punchApi'
import type { PunchRecord } from '../../types'
import { PUNCH_CONSTANTS } from '../../constants/punch'
import { BUSINESS_STATUS } from '../../constants/api'
import { t } from '../../locales'

export const usePunchStore = defineStore('punch', {
  state: () => ({
    isPunched: false,
    punchedTime: '',
    pagination: {
      records: [] as PunchRecord[],
      total: 0,
      page: 1,
      size: 15,
      pages: 0
    },
    loading: false,
    error: ''
  }),
  
  getters: {
    punchRecords: (state) => state.pagination.records,  // 通过 getter 提供向后兼容
    hasPunchRecords: (state) => state.pagination.records.length > 0,
    paginatedRecords: (state) => state.pagination.records,
    totalPages: (state) => state.pagination.pages,
    currentPage: (state) => state.pagination.page,
    totalRecords: (state) => state.pagination.total,
    pageSize: (state) => state.pagination.size
  },
  
  actions: {
    async punchIn(username: string, userId: string | number) {
      this.loading = true
      this.error = ''
      try {
        // 准备打卡数据
        const punchTime = new Date().toISOString()
        console.log('准备打卡数据:', { username, punchTime, userId }) // 开发调试日志
        // 调用打卡接口
        const res = await punchApi.punchIn({ username, punchTime, userId })
        // 开发调试时可以启用日志
        console.log('打卡接口响应:', res)
        if (res.data.code === BUSINESS_STATUS.SUCCESS) {
          // 打卡成功后更新本地状态
          this.isPunched = true
          const now = new Date()
          this.punchedTime = now.toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })
          return true
        } else {
            this.error = PUNCH_CONSTANTS.MESSAGES.FAILED()
          return false
        }
      } catch (error) {
        this.error = PUNCH_CONSTANTS.MESSAGES.ERROR()
        // 开发调试时可以启用日志
        // console.error('打卡异常:', error)
        return false
      } finally {
        this.loading = false
      }
    },
    
    async fetchPunchRecords(userId: string | number = 1, page: number = 1, size: number = 15) {
      this.loading = true
      this.error = ''
      try {
        const res = await punchApi.getPunchRecords({ userId, page, size })
        console.log('获取打卡记录响应:', res)
        if (res.status === BUSINESS_STATUS.SUCCESS) {
          // 更新分页数据
          this.pagination = {
            records: res.data.records || [],
            total: res.data.total || 0,
            page: res.data.page || 1,
            size: res.data.size || 15,
            pages: res.data.pages || 0
          };
        } else {
          this.error = t('messages.getUserInfoFailed', '获取打卡记录失败')
        }
      } catch (error) {
        this.error = t('messages.getUserInfoError', '获取打卡记录时发生错误')
        // 开发调试时可以启用日志
        // console.error('获取打卡记录失败:', error)
      } finally {
        this.loading = false
      }
    }
  }
})