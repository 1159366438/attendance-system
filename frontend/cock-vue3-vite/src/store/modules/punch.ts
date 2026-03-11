/**
 * 打卡状态管理
 */
import { defineStore } from 'pinia'
import { punchApi } from '../../api/punchApi'
import type { PunchRecord } from '../../types'
import { PUNCH_STORE_CONSTANTS, PUNCH_CONSTANTS } from '../../constants/punchConstants'
import { TABLE_CONSTANTS } from '../../constants/table'
import { BOOLEAN_CONSTANTS } from '../../constants/booleans'
import { STORE_NAMES } from '../../constants/appArchitectureConstants'
import { STATUS_CODES } from '../../constants/statusCodes'
import { USER_CONSTANTS } from '../../constants/userConstants'
import { MESSAGE_CONSTANTS } from '../../constants/messages'


export const usePunchStore = defineStore(STORE_NAMES.PUNCH, {
  state: () => ({
    isPunched: PUNCH_STORE_CONSTANTS.INITIAL_STATE.IS_PUNCHED,
    punchedTime: PUNCH_STORE_CONSTANTS.INITIAL_STATE.PUNCHED_TIME,
    pagination: {
      records: [] as PunchRecord[],
      total: PUNCH_STORE_CONSTANTS.PAGINATION.TOTAL,
      page: PUNCH_STORE_CONSTANTS.PAGINATION.PAGE,
      size: TABLE_CONSTANTS.PAGINATION.DEFAULT_SIZE,
      pages: PUNCH_STORE_CONSTANTS.PAGINATION.PAGES
    },
    loading: PUNCH_STORE_CONSTANTS.INITIAL_STATE.LOADING,
    error: PUNCH_STORE_CONSTANTS.INITIAL_STATE.ERROR
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
      this.loading = BOOLEAN_CONSTANTS.TRUE
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
               localStorage.removeItem(USER_CONSTANTS.STORAGE_KEYS.IS_LOGGED_IN)
               localStorage.removeItem(USER_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN)
               throw new Error(MESSAGE_CONSTANTS.USER_INFO.AUTH_FAILED())
               
             case STATUS_CODES.BUSINESS.PERMISSION_DENIED:
             case 403:
               // 权限不足
               throw new Error(PUNCH_CONSTANTS.MESSAGES.FAILED())
               
             case STATUS_CODES.BUSINESS.RESOURCE_NOT_FOUND:
             case 404:
               // 用户不存在
               throw new Error(PUNCH_CONSTANTS.MESSAGES.INVALID_USER())
               
             case STATUS_CODES.BUSINESS.SERVER_ERROR:
             case 500:
               // 服务器错误
               throw new Error(MESSAGE_CONSTANTS.COMMON.SERVER_ERROR())
               
             default:
               // 其他业务错误
               throw new Error(res.data.msg || res.data.message || PUNCH_CONSTANTS.MESSAGES.ERROR())
           }
         }
        
        // 打卡成功后更新本地状态
        this.isPunched = BOOLEAN_CONSTANTS.TRUE
        const now = new Date()
        this.punchedTime = now.toLocaleTimeString('zh-CN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
        return BOOLEAN_CONSTANTS.TRUE
      } catch (error: any) {
        this.error = error.message || PUNCH_CONSTANTS.MESSAGES.ERROR()
        // 错误已在axios拦截器中统一处理
        return BOOLEAN_CONSTANTS.FALSE
      } finally {
        this.loading = BOOLEAN_CONSTANTS.FALSE
      }
    },
    
    async fetchPunchRecords(userId: string | number = PUNCH_STORE_CONSTANTS.DEFAULT_PARAMS.USER_ID, page: number = PUNCH_STORE_CONSTANTS.DEFAULT_PARAMS.PAGE, size: number = TABLE_CONSTANTS.PAGINATION.DEFAULT_SIZE) {
      this.loading = BOOLEAN_CONSTANTS.TRUE
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
               localStorage.removeItem(USER_CONSTANTS.STORAGE_KEYS.IS_LOGGED_IN)
               localStorage.removeItem(USER_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN)
               throw new Error(MESSAGE_CONSTANTS.USER_INFO.AUTH_FAILED())
               
             case STATUS_CODES.BUSINESS.PERMISSION_DENIED:
             case 403:
               // 权限不足
               throw new Error(PUNCH_CONSTANTS.MESSAGES.FETCH_RECORDS_ERROR())
               
             case STATUS_CODES.BUSINESS.RESOURCE_NOT_FOUND:
             case 404:
               // 用户不存在
               throw new Error(PUNCH_CONSTANTS.MESSAGES.INVALID_USER())
               
             case STATUS_CODES.BUSINESS.SERVER_ERROR:
             case 500:
               // 服务器错误
               throw new Error(MESSAGE_CONSTANTS.COMMON.SERVER_ERROR())
               
             default:
               // 其他业务错误
               throw new Error(res.data.msg || res.data.message || PUNCH_CONSTANTS.MESSAGES.FETCH_RECORDS_ERROR())
           }
         }
        
        // 更新分页数据 - 后端返回的数据结构在res.data.data中
        if (res.data && res.data.data) {
          const responseData = res.data.data;
          this.pagination = {
            records: responseData.records || [],
            total: responseData.total || PUNCH_STORE_CONSTANTS.FALLBACK_VALUES.TOTAL,
            page: responseData.page || PUNCH_STORE_CONSTANTS.FALLBACK_VALUES.PAGE,
            size: responseData.size || TABLE_CONSTANTS.PAGINATION.DEFAULT_SIZE,
            pages: responseData.pages || PUNCH_STORE_CONSTANTS.FALLBACK_VALUES.PAGES
          };
        } else {
          // 如果没有返回数据，使用默认值
          this.pagination = {
            records: [],
            total: PUNCH_STORE_CONSTANTS.FALLBACK_VALUES.TOTAL,
            page: PUNCH_STORE_CONSTANTS.FALLBACK_VALUES.PAGE,
            size: TABLE_CONSTANTS.PAGINATION.DEFAULT_SIZE,
            pages: PUNCH_STORE_CONSTANTS.FALLBACK_VALUES.PAGES
          };
        }
        return BOOLEAN_CONSTANTS.TRUE; // 成功返回 true
      } catch (error: any) {
        this.error = error.message || PUNCH_CONSTANTS.MESSAGES.FETCH_RECORDS_ERROR()
        // 错误已在axios拦截器中统一处理
        return BOOLEAN_CONSTANTS.FALSE; // 异常返回 false
      } finally {
        this.loading = BOOLEAN_CONSTANTS.FALSE
      }
    }
  }
})