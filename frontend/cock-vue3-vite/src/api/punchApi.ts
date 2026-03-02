import axios from 'axios'


// 用户相关接口封装
export const userApi = {
  // 获取用户信息（模拟接口）
  getUserInfo: () => {
    return axios.get('/api/user/info')
      .then(res => res.data)
      .catch(err => {
        console.error('获取用户信息失败：', err)
        // 模拟返回数据（实际项目替换为真实接口）
        return { code: 200, data: { name: '张三', avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' } }
      })
  }
}

// 打卡相关接口封装
export const punchApi = {
  // 获取打卡记录（模拟接口）
  getPunchRecords: () => {
    return axios.get('/api/punch/record')
  }
}