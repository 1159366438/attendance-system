import service from './axios'

// 打卡相关接口封装
export const punchApi = {
  // 获取打卡记录
  getPunchRecords: (params: { page?: number; size?: number } = {}) => {
    return service.get('/punch/record', { params })
  },
  
  // 打卡接口
  punchIn: (data: { username: string; punchTime: string }) => {
    return service.post('/punch/in', data)
  }
}