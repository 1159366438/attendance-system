import service from './axios'

// 用户相关接口封装
export const userApi = {
  // 获取用户信息（模拟接口）
  getUserInfo: () => {
    return service.get('/user/info')
  }
}