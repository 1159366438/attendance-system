/**
 * 状态码常量
 * 管理API响应和业务操作的状态码常量
 * @author Attendance System Team
 * @since 2026-03-15
 * @version v1.1.0-alpha.1
 */

export const STATUS_CODES = {
  // HTTP响应状态码
  HTTP: {
    SUCCESS: 200,        // 成功
    BAD_REQUEST: 400,    // 请求错误
    UNAUTHORIZED: 401,   // 未授权
    FORBIDDEN: 403,      // 禁止访问
    NOT_FOUND: 404,      // 未找到
    SERVER_ERROR: 500,   // 服务器错误
  },
  
  // 业务状态码
  BUSINESS: {
    SUCCESS: 200,        // 业务操作成功
    PARAM_ERROR: 400,    // 参数错误
    AUTH_FAILED: 401,    // 认证失败
    PERMISSION_DENIED: 403, // 权限不足
    RESOURCE_NOT_FOUND: 404, // 资源未找到
    VALIDATION_ERROR: 422,   // 验证错误
    SERVER_ERROR: 500,   // 服务器错误
  }
}