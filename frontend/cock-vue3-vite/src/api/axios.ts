/**
 * Axios 实例配置
 * 配置API请求实例、拦截器和错误处理
 * @author Attendance System Team
 * @since 2026-03-15
 * @version v1.1.0-alpha.1
 */
import axios from 'axios'
import { APP_CONFIG } from '../config/appConfig'
import { STATUS_CODES, API_ERROR_MESSAGES, MESSAGE_CONSTANTS } from '../constants'
import { ElMessage } from 'element-plus'

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
      // 业务错误处理 - 仅显示错误消息，具体业务逻辑由调用方处理
      console.error('业务错误:', res.msg || res.message || MESSAGE_CONSTANTS.COMMON.UNKNOWN_ERROR())
      
      // 显示错误消息
      ElMessage.error(res.msg || res.message || MESSAGE_CONSTANTS.COMMON.REQUEST_FAILED())
      
      // 返回拒绝的Promise，让调用方可以捕获错误并进行相应处理
      return Promise.reject(new Error(res.msg || res.message || MESSAGE_CONSTANTS.COMMON.UNKNOWN_ERROR()))
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

// 定义错误处理函数
const handleErrorMessage = (error: any) => {
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
  } else if (error.message.includes('Network Error') || error.code === 'ERR_NETWORK') {
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
  } else {
    // 其他网络错误
    console.error('网络错误:', error.message || error)
  }
  
  return errorInfo
}

export { service, handleErrorMessage }

export default service