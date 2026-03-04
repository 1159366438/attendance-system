/**
 * Axios 实例配置
 */
import axios from 'axios'
import { APP_CONFIG } from '../config/appConfig'

// 创建 axios 实例
const service = axios.create({
  baseURL: '/api', // 基础URL
  timeout: APP_CONFIG.API.TIMEOUT, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 可以在这里添加token等认证信息
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  error => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 直接返回响应数据
    return response
  },
  error => {
    console.error('响应错误:', error)
    // 可以在这里统一处理错误，如401未授权等
    return Promise.reject(error)
  }
)

export default service