/**
 * 打卡状态管理
 */
import { defineStore } from 'pinia'
import { punchApi } from '../../api/punchApi'
import type { PunchRecord } from '../../types'
import { PUNCH_CONSTANTS } from '../../constants/punch'

export const usePunchStore = defineStore('punch', {
  state: () => ({
    isPunched: false,
    punchedTime: '',
    punchRecords: [] as PunchRecord[],
    loading: false,
    error: ''
  }),
  
  getters: {
    hasPunchRecords: (state) => state.punchRecords.length > 0
  },
  
  actions: {
    async punchIn(username: string) {
      this.loading = true
      this.error = ''
      try {
        // 准备打卡数据
        const punchTime = new Date().toISOString()
        
        // 调用打卡接口
        const res = await punchApi.punchIn({ username, punchTime })
        console.log('打卡接口响应:', res)
        if (res.data.code === 200) {
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
            this.error = PUNCH_CONSTANTS.MESSAGES.FAILED
          return false
        }
      } catch (error) {
        this.error = PUNCH_CONSTANTS.MESSAGES.ERROR
        console.error('打卡异常:', error)
        return false
      } finally {
        this.loading = false
      }
    },
    
    async fetchPunchRecords() {
      this.loading = true
      this.error = ''
      try {
        const res = await punchApi.getPunchRecords()
        if (res.status === 200) {
          this.punchRecords = res.data
        } else {
          this.error = '获取打卡记录失败'
        }
      } catch (error) {
        this.error = '获取打卡记录时发生错误'
        console.error('获取打卡记录失败:', error)
      } finally {
        this.loading = false
      }
    }
  }
})