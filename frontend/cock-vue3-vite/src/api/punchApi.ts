import service from './axios'

// 打卡相关接口封装
export const punchApi = {
  // 获取打卡记录
  getPunchRecords: () => {
    return service.get('/punch/record')
  },
  
  // 打卡接口
  punchIn: (data: { username: string; punchTime: string }) => {
    return service.post('/punch/in', data)
  }
}