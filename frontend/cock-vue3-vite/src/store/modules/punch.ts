/**
 * 打卡状态管理
 */
import { defineStore } from 'pinia'
import { punchApi } from '../../api/punchApi'
import type { PunchRecord } from '../../types'


import { STATUS_CODES, MESSAGE_CONSTANTS, STORE_NAMES, APP_CONSTANTS } from '../../constants'


export const usePunchStore = defineStore(STORE_NAMES.PUNCH, {
  state: () => ({
    isPunched: APP_CONSTANTS.PUNCH_STORE.INITIAL_STATE.IS_PUNCHED,
    punchedTime: APP_CONSTANTS.PUNCH_STORE.INITIAL_STATE.PUNCHED_TIME,
    pagination: {
      records: [] as PunchRecord[],
      total: APP_CONSTANTS.PUNCH_STORE.PAGINATION.TOTAL,
      page: APP_CONSTANTS.PUNCH_STORE.PAGINATION.PAGE,
      size: APP_CONSTANTS.TABLE.PAGINATION.DEFAULT_SIZE,
      pages: APP_CONSTANTS.PUNCH_STORE.PAGINATION.PAGES
    },
    loading: APP_CONSTANTS.PUNCH_STORE.INITIAL_STATE.LOADING,
    error: APP_CONSTANTS.PUNCH_STORE.INITIAL_STATE.ERROR
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
      this.loading = APP_CONSTANTS.BOOLEAN.TRUE
      this.error = ''
      try {
        // 准备打卡数据
        const punchTime = new Date().toISOString()
        console.log('准备打卡数据:', { username, punchTime, userId }) // 开发调试日志
        // 调用打卡接口
        const res = await punchApi.punchIn({ username, punchTime, userId: Number(userId) })
        // 开发调试时可以启用日志
        console.log('打卡接口响应:', res)
        
        // 检查响应状态
         if (res.data && res.data.code !== STATUS_CODES.BUSINESS.SUCCESS) {
           // 根据后端返回码进行精确错误处理
           switch (res.data.code) {
             case STATUS_CODES.BUSINESS.PARAM_ERROR:
             case 400:
               // 参数错误
               throw new Error(MESSAGE_CONSTANTS.USER_INFO.PARAM_ERROR())
               
             case STATUS_CODES.BUSINESS.AUTH_FAILED:
             case 401:
               // 认证失败
               localStorage.removeItem(APP_CONSTANTS.USER.STORAGE_KEYS.IS_LOGGED_IN)
               localStorage.removeItem(APP_CONSTANTS.USER.STORAGE_KEYS.AUTH_TOKEN)
               throw new Error(MESSAGE_CONSTANTS.USER_INFO.AUTH_FAILED())
               
             case STATUS_CODES.BUSINESS.PERMISSION_DENIED:
             case 403:
               // 权限不足
               throw new Error(APP_CONSTANTS.PUNCH.MESSAGES.FAILED())
               
             case STATUS_CODES.BUSINESS.RESOURCE_NOT_FOUND:
             case 404:
               // 用户不存在
               throw new Error(APP_CONSTANTS.PUNCH.MESSAGES.INVALID_USER())
               
             case STATUS_CODES.BUSINESS.SERVER_ERROR:
             case 500:
               // 服务器错误
               throw new Error(MESSAGE_CONSTANTS.COMMON.SERVER_ERROR())
               
             default:
               // 其他业务错误
               throw new Error(res.data.msg || res.data.message || APP_CONSTANTS.PUNCH.MESSAGES.ERROR())
           }
         }
        
        // 打卡成功后更新本地状态
        this.isPunched = APP_CONSTANTS.BOOLEAN.TRUE
        const now = new Date()
        this.punchedTime = now.toLocaleTimeString('zh-CN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
        return APP_CONSTANTS.BOOLEAN.TRUE
      } catch (error: any) {
        this.error = error.message || APP_CONSTANTS.PUNCH.MESSAGES.ERROR()
        // 错误已在axios拦截器中统一处理
        return APP_CONSTANTS.BOOLEAN.FALSE
      } finally {
        this.loading = APP_CONSTANTS.BOOLEAN.FALSE
      }
    },
    
    async fetchPunchRecords(userId: string | number = APP_CONSTANTS.PUNCH_STORE.DEFAULT_PARAMS.USER_ID, page: number = APP_CONSTANTS.PUNCH_STORE.DEFAULT_PARAMS.PAGE, size: number = APP_CONSTANTS.TABLE.PAGINATION.DEFAULT_SIZE) {
      this.loading = APP_CONSTANTS.BOOLEAN.TRUE
      this.error = ''
      try {
        const res = await punchApi.getPunchRecords({ userId, page, size })
        console.log('获取打卡记录响应:', res)
        
        // 检查响应状态
         if (res.data && res.data.code !== STATUS_CODES.BUSINESS.SUCCESS) {
           // 根据后端返回码进行精确错误处理
           switch (res.data.code) {
             case STATUS_CODES.BUSINESS.PARAM_ERROR:
             case 400:
               // 参数错误
               throw new Error(MESSAGE_CONSTANTS.USER_INFO.PARAM_ERROR())
               
             case STATUS_CODES.BUSINESS.AUTH_FAILED:
             case 401:
               // 认证失败
               localStorage.removeItem(APP_CONSTANTS.USER.STORAGE_KEYS.IS_LOGGED_IN)
               localStorage.removeItem(APP_CONSTANTS.USER.STORAGE_KEYS.AUTH_TOKEN)
               throw new Error(MESSAGE_CONSTANTS.USER_INFO.AUTH_FAILED())
               
             case STATUS_CODES.BUSINESS.PERMISSION_DENIED:
             case 403:
               // 权限不足
               throw new Error(APP_CONSTANTS.PUNCH.MESSAGES.FETCH_RECORDS_ERROR())
               
             case STATUS_CODES.BUSINESS.RESOURCE_NOT_FOUND:
             case 404:
               // 用户不存在
               throw new Error(APP_CONSTANTS.PUNCH.MESSAGES.INVALID_USER())
               
             case STATUS_CODES.BUSINESS.SERVER_ERROR:
             case 500:
               // 服务器错误
               throw new Error(MESSAGE_CONSTANTS.COMMON.SERVER_ERROR())
               
             default:
               // 其他业务错误
               throw new Error(res.data.msg || res.data.message || APP_CONSTANTS.PUNCH.MESSAGES.FETCH_RECORDS_ERROR())
           }
         }
        
        // 更新分页数据 - 后端返回的数据结构在res.data.data中
        if (res.data && res.data.data) {
          const responseData = res.data.data;
          this.pagination = {
            records: responseData.records || [],
            total: responseData.total || APP_CONSTANTS.PUNCH_STORE.FALLBACK_VALUES.TOTAL,
            page: responseData.page || APP_CONSTANTS.PUNCH_STORE.FALLBACK_VALUES.PAGE,
            size: responseData.size || APP_CONSTANTS.TABLE.PAGINATION.DEFAULT_SIZE,
            pages: responseData.pages || APP_CONSTANTS.PUNCH_STORE.FALLBACK_VALUES.PAGES
          };
        } else {
          // 如果没有返回数据，使用默认值
          this.pagination = {
            records: [],
            total: APP_CONSTANTS.PUNCH_STORE.FALLBACK_VALUES.TOTAL,
            page: APP_CONSTANTS.PUNCH_STORE.FALLBACK_VALUES.PAGE,
            size: APP_CONSTANTS.TABLE.PAGINATION.DEFAULT_SIZE,
            pages: APP_CONSTANTS.PUNCH_STORE.FALLBACK_VALUES.PAGES
          };
        }
        return APP_CONSTANTS.BOOLEAN.TRUE; // 成功返回 true
      } catch (error: any) {
        this.error = error.message || APP_CONSTANTS.PUNCH.MESSAGES.FETCH_RECORDS_ERROR()
        // 错误已在axios拦截器中统一处理
        return APP_CONSTANTS.BOOLEAN.FALSE; // 异常返回 false
      } finally {
        this.loading = APP_CONSTANTS.BOOLEAN.FALSE
      }
    }
  }
})