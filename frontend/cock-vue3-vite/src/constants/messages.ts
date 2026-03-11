/**
 * 通用消息常量
 * 存放系统中常用的提示信息
 */
import { t } from '../locales'

export const MESSAGE_CONSTANTS = {
  // 用户信息相关消息
  USER_INFO: {
    FETCH_SUCCESS: () => t('messages.fetchUserInfoSuccess', '获取用户信息成功'),
    FETCH_FAILED: () => t('messages.fetchUserInfoFailed', '获取用户信息失败'),
    FETCH_ERROR: () => t('messages.fetchUserInfoError', '获取用户信息时发生错误'),
    UPDATE_SUCCESS: () => t('messages.updateUserInfoSuccess', '更新用户信息成功'),
    UPDATE_FAILED: () => t('messages.updateUserInfoFailed', '更新用户信息失败'),
    LOGIN_SUCCESS: () => t('messages.loginSuccess', '登录成功'),
    LOGIN_FAILED: () => t('messages.loginFailed', '登录失败'),
    LOGOUT_SUCCESS: () => t('messages.logoutSuccess', '退出登录成功'),
    LOGOUT_FAILED: () => t('messages.logoutFailed', '退出登录失败'),
    INVALID_CREDENTIALS: () => t('messages.invalidCredentials', '用户名或密码错误'),
    PARAM_ERROR: () => t('messages.paramError', '登录参数错误'),
    AUTH_FAILED: () => t('messages.authFailed', '认证失败，请重新登录')
  },

  // 通用操作消息
  GENERAL: {
    SUCCESS: () => t('messages.operationSuccess', '操作成功'),
    FAILED: () => t('messages.operationFailed', '操作失败'),
    ERROR: () => t('messages.operationError', '操作时发生错误'),
    NETWORK_ERROR: () => t('messages.networkError', '网络异常，请稍后重试'),
    LOADING: () => t('messages.loading', '加载中...'),
    NO_DATA: () => t('messages.noData', '暂无数据'),
    CONFIRM_DELETE: () => t('messages.confirmDelete', '确认删除吗？'),
    DELETE_SUCCESS: () => t('messages.deleteSuccess', '删除成功'),
    SAVE_SUCCESS: () => t('messages.saveSuccess', '保存成功'),
    SAVE_FAILED: () => t('messages.saveFailed', '保存失败')
  },

  // 系统消息
  SYSTEM: {
    TITLE: () => t('messages.systemTitle', '考勤系统'),
    WELCOME: () => t('messages.welcome', '欢迎使用考勤系统'),
    MAINTENANCE: () => t('messages.maintenance', '系统维护中'),
    VERSION: () => t('messages.version', '版本信息')
  },
  
  // 通用消息
  COMMON: {
    SERVER_ERROR: () => t('messages.serverError', '服务器内部错误，请稍后重试'),
    REQUEST_FAILED: () => t('messages.requestFailed', '请求失败'),
    UNKNOWN_ERROR: () => t('messages.unknownError', '未知错误')
  }
}