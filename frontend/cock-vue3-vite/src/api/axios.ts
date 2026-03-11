/**
 * Axios 实例配置
 */
import axios from 'axios'
import { APP_CONFIG } from '../config/appConfig'
import { STATUS_CODES } from '../constants/statusCodes'
import { USER_CONSTANTS } from '../constants/userConstants'
import { ElMessage } from 'element-plus'
import { API_ERROR_MESSAGES } from '../constants/apiErrorMessages'

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
    const res = response.data

    if (res.code ===  STATUS_CODES.BUSINESS.SUCCESS) {
      // 成功响应，直接返回
      return response
    } else {
      // 业务错误处理 - 包括401未授权等业务错误
      console.error('业务错误:', res.msg || res.message || '未知错误')
      
      // 根据业务错误码进行特殊处理
      if (res.code === STATUS_CODES.BUSINESS.AUTH_FAILED || res.code === 401) {
        // 处理认证失败
        console.error('认证失败，跳转到登录页')
        localStorage.removeItem(USER_CONSTANTS.STORAGE_KEYS.IS_LOGGED_IN)
        localStorage.removeItem(USER_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN)
        // 可以在这里添加跳转到登录页的逻辑
        // router.push('/login')
      }
      
      // 显示错误消息
      ElMessage.error(res.msg || res.message || '请求失败')
      
      // 返回拒绝的Promise，让调用方可以捕获错误
      return Promise.reject(new Error(res.msg || res.message || 'Error'))
    }
  },
  error => {
    console.error('响应错误:', error)
    // 初始化错误信息
    let errorInfo = {
      type: 'network',
      code: -1,
      msg: API_ERROR_MESSAGES.NETWORK.CONNECTION_FAILED(),
      originalError: error
    }
      
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      // 请求超时
      errorInfo.msg = API_ERROR_MESSAGES.NETWORK.TIMEOUT()
      errorInfo.code = -2
    } else if (error.message.includes('Network Error')) {
      // 网络断开、后端服务没启动
      errorInfo.msg = API_ERROR_MESSAGES.NETWORK.SERVER_UNAVAILABLE()
      errorInfo.code = -3
    } else if (error.response) {
      // 服务器返回了HTTP错误状态码（4xx、5xx）
      const status = error.response.status
      errorInfo.code = status

      console.error('服务器返回错误状态码:', status)
      switch (status) {
        case 400:
          errorInfo.msg = API_ERROR_MESSAGES.HTTP.BAD_REQUEST()
          break
        case 401:
          errorInfo.msg = API_ERROR_MESSAGES.HTTP.UNAUTHORIZED()
          // HTTP 401也需要清理认证信息
          localStorage.removeItem(USER_CONSTANTS.STORAGE_KEYS.IS_LOGGED_IN)
          localStorage.removeItem(USER_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN)
          break
        case 403:
          errorInfo.msg = API_ERROR_MESSAGES.HTTP.FORBIDDEN()
          break
        case 404:
          errorInfo.msg = API_ERROR_MESSAGES.HTTP.NOT_FOUND()
          break
        case 500:
          errorInfo.msg = API_ERROR_MESSAGES.HTTP.SERVER_ERROR()
          break
        default:
          errorInfo.msg = API_ERROR_MESSAGES.HTTP.DEFAULT_ERROR(status)
      }
    // 引入Element Plus的Message组件
    ElMessage.error(errorInfo.msg)
    
    // 将标准化的错误对象传递下去
    return Promise.reject(errorInfo)
    }
  }  
)

export default service