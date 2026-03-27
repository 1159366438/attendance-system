/**
 * 考勤状态管理模块
 * 管理考勤状态、考勤记录、考勤操作等
 * @author Attendance System Team
 * @since 2026-03-18
 * @version v1.1.0-alpha.1
 */
import { defineStore } from 'pinia'
import { attendanceApi } from '../../api/attendanceApi'
import type { AttendanceRecord } from '../../types'


import { STATUS_CODES, MESSAGE_CONSTANTS, STORE_NAMES, APP_CONSTANTS } from '../../constants'


export const useAttendanceStore = defineStore(STORE_NAMES.ATTENDANCE, {
  state: () => ({
    isAttended: APP_CONSTANTS.ATTENDANCE_STORE.INITIAL_STATE.IS_ATTENDED,
    attendedTime: APP_CONSTANTS.ATTENDANCE_STORE.INITIAL_STATE.ATTENDED_TIME,
    pagination: {
      records: [] as AttendanceRecord[],
      total: APP_CONSTANTS.ATTENDANCE_STORE.PAGINATION.TOTAL,
      page: APP_CONSTANTS.ATTENDANCE_STORE.PAGINATION.PAGE,
      size: APP_CONSTANTS.TABLE.PAGINATION.DEFAULT_SIZE,
      pages: APP_CONSTANTS.ATTENDANCE_STORE.PAGINATION.PAGES
    },
    loading: APP_CONSTANTS.ATTENDANCE_STORE.INITIAL_STATE.LOADING,
    error: APP_CONSTANTS.ATTENDANCE_STORE.INITIAL_STATE.ERROR
  }),
  
  getters: {
    attendanceRecords: (state) => state.pagination.records,
    hasAttendanceRecords: (state) => state.pagination.records.length > 0,
    isLoading: (state) => state.loading,
    hasError: (state) => !!state.error,
    paginatedRecords: (state) => state.pagination.records,
    totalPages: (state) => state.pagination.pages,
    currentPage: (state) => state.pagination.page,
    totalRecords: (state) => state.pagination.total,
    pageSize: (state) => state.pagination.size
  },
  
  actions: {
    async attendanceIn(username: string, userId: string | number) {
      this.loading = APP_CONSTANTS.BOOLEAN.TRUE
      this.error = ''
      try {
        // 准备考勤数据
        const attendanceTime = new Date().toISOString()
        console.log('准备考勤数据:', { username, attendanceTime, userId }) // 开发调试日志
        // 调用考勤接口
        const res = await attendanceApi.attendanceIn({ username, attendanceTime, userId: userId || 1 })
        // 开发调试时可以启用日志
        console.log('考勤接口响应:', res)
        
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
               throw new Error(APP_CONSTANTS.ATTENDANCE.MESSAGES.FAILED())
               
             case STATUS_CODES.BUSINESS.RESOURCE_NOT_FOUND:
             case 404:
               // 用户不存在
               throw new Error(APP_CONSTANTS.ATTENDANCE.MESSAGES.INVALID_USER())
               
             case STATUS_CODES.BUSINESS.SERVER_ERROR:
             case 500:
               // 服务器错误
               throw new Error(MESSAGE_CONSTANTS.COMMON.SERVER_ERROR())
               
             default:
               // 其他业务错误
               throw new Error(res.data.msg || res.data.message || APP_CONSTANTS.ATTENDANCE.MESSAGES.ERROR())
           }
         }
        
        // 考勤成功后更新本地状态
        this.isAttended = APP_CONSTANTS.BOOLEAN.TRUE
        const now = new Date()
        this.attendedTime = now.toLocaleTimeString('zh-CN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
        return APP_CONSTANTS.BOOLEAN.TRUE
      } catch (error: any) {
        this.error = error.message || APP_CONSTANTS.ATTENDANCE.MESSAGES.ERROR()
        // 错误已在axios拦截器中统一处理
        return APP_CONSTANTS.BOOLEAN.FALSE
      } finally {
        this.loading = APP_CONSTANTS.BOOLEAN.FALSE
      }
    },
    
    async fetchAttendanceRecords(userId: string | number = APP_CONSTANTS.ATTENDANCE_STORE.DEFAULT_PARAMS.USER_ID, page: number = APP_CONSTANTS.ATTENDANCE_STORE.DEFAULT_PARAMS.PAGE, size: number = APP_CONSTANTS.TABLE.PAGINATION.DEFAULT_SIZE) {
      this.loading = APP_CONSTANTS.BOOLEAN.TRUE
      this.error = ''
      try {
        const res = await attendanceApi.getAttendanceRecords({ userId, page, size })
        console.log('获取考勤记录响应:', res)
        
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
               throw new Error(APP_CONSTANTS.ATTENDANCE.MESSAGES.FETCH_RECORDS_ERROR())
               
             case STATUS_CODES.BUSINESS.RESOURCE_NOT_FOUND:
             case 404:
               // 用户不存在
               throw new Error(APP_CONSTANTS.ATTENDANCE.MESSAGES.INVALID_USER())
               
             case STATUS_CODES.BUSINESS.SERVER_ERROR:
             case 500:
               // 服务器错误
               throw new Error(MESSAGE_CONSTANTS.COMMON.SERVER_ERROR())
               
             default:
               // 其他业务错误
               throw new Error(res.data.msg || res.data.message || APP_CONSTANTS.ATTENDANCE.MESSAGES.FETCH_RECORDS_ERROR())
           }
         }
        
        // 更新分页数据 - 后端返回的数据结构在res.data.data中
        if (res.data && res.data.data) {
          const responseData = res.data.data;
          this.pagination = {
            records: responseData.records || [],
            total: responseData.total || APP_CONSTANTS.ATTENDANCE_STORE.FALLBACK_VALUES.TOTAL,
            page: responseData.page || APP_CONSTANTS.ATTENDANCE_STORE.FALLBACK_VALUES.PAGE,
            size: responseData.size || APP_CONSTANTS.TABLE.PAGINATION.DEFAULT_SIZE,
            pages: responseData.pages || APP_CONSTANTS.ATTENDANCE_STORE.FALLBACK_VALUES.PAGES
          };
        } else {
          // 如果没有返回数据，使用默认值
          this.pagination = {
            records: [],
            total: APP_CONSTANTS.ATTENDANCE_STORE.FALLBACK_VALUES.TOTAL,
            page: APP_CONSTANTS.ATTENDANCE_STORE.FALLBACK_VALUES.PAGE,
            size: APP_CONSTANTS.TABLE.PAGINATION.DEFAULT_SIZE,
            pages: APP_CONSTANTS.ATTENDANCE_STORE.FALLBACK_VALUES.PAGES
          };
        }
        return APP_CONSTANTS.BOOLEAN.TRUE; // 成功返回 true
      } catch (error: any) {
        this.error = error.message || APP_CONSTANTS.ATTENDANCE.MESSAGES.FETCH_RECORDS_ERROR()
        // 错误已在axios拦截器中统一处理
        return APP_CONSTANTS.BOOLEAN.FALSE; // 异常返回 false
      } finally {
        this.loading = APP_CONSTANTS.BOOLEAN.FALSE
      }
    }
  }
})