/**
 * API错误消息常量
 * 管理API响应中使用的各种错误消息文本
 * @author Attendance System Team
 * @since 2026-03-15
 * @version v1.1.0-alpha.1
 */

import { t } from '../locales'

export const API_ERROR_MESSAGES = {
  // 网络相关错误
  NETWORK: {
    CONNECTION_FAILED: () => t('errors.network.connectionFailed', '网络连接失败，请稍后重试'),
    TIMEOUT: () => t('errors.network.timeout', '请求超时，请检查网络后重试'),
    SERVER_UNAVAILABLE: () => t('errors.network.serverUnavailable', '无法连接到服务器，请检查服务是否启动'),
    REQUEST_FAILED: () => t('errors.network.requestFailed', '请求发送失败')
  },

  // HTTP状态码相关错误
  HTTP: {
    BAD_REQUEST: () => t('errors.http.badRequest', '请求参数错误'),
    UNAUTHORIZED: () => t('errors.http.unauthorized', '登录已过期，请重新登录'),
    FORBIDDEN: () => t('errors.http.forbidden', '没有权限执行此操作'),
    NOT_FOUND: () => t('errors.http.notFound', '请求的资源不存在'),
    SERVER_ERROR: () => t('errors.http.serverError', '服务器内部错误，请稍后重试'),
    DEFAULT_ERROR: (status: number) => t('errors.http.defaultError', `请求失败 (${status})`)
  },

  // 业务相关错误
  BUSINESS: {
    DEFAULT_ERROR: () => t('errors.business.defaultError', '业务操作失败'),
    UNKNOWN_ERROR: () => t('errors.business.unknownError', '未知业务错误')
  }
}