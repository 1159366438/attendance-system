/**
 * 通用消息常量
 * 存放系统中常用的提示信息
 * @author Attendance System Team
 * @since 2026-03-15
 * @version v1.1.0-alpha.1
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
    AUTH_FAILED: () => t('messages.authFailed', '认证失败，请重新登录'),
    REGISTER_SUCCESS: () => t('messages.registerSuccess', '注册成功'),
    REGISTER_FAILED: () => t('messages.registerFailed', '注册失败'),
    VALIDATION_ERROR: () => t('messages.validationError', '验证失败')
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
  },
  
  // 部门管理相关消息
  DEPARTMENT: {
    FETCH_LIST_SUCCESS: () => t('messages.department.fetchListSuccess', '获取部门列表成功'),
    FETCH_LIST_ERROR: () => t('messages.department.fetchListError', '获取部门列表失败'),
    FETCH_DETAIL_SUCCESS: () => t('messages.department.fetchDetailSuccess', '获取部门详情成功'),
    FETCH_DETAIL_ERROR: () => t('messages.department.fetchDetailError', '获取部门详情失败'),
    CREATE_SUCCESS: () => t('messages.department.createSuccess', '创建部门成功'),
    CREATE_ERROR: () => t('messages.department.createError', '创建部门失败'),
    UPDATE_SUCCESS: () => t('messages.department.updateSuccess', '更新部门成功'),
    UPDATE_ERROR: () => t('messages.department.updateError', '更新部门失败'),
    DELETE_SUCCESS: () => t('messages.department.deleteSuccess', '删除部门成功'),
    DELETE_ERROR: () => t('messages.department.deleteError', '删除部门失败'),
    FETCH_EMPLOYEES_SUCCESS: () => t('messages.department.fetchEmployeesSuccess', '获取部门员工成功'),
    FETCH_EMPLOYEES_ERROR: () => t('messages.department.fetchEmployeesError', '获取部门员工失败'),
    FETCH_CHILDREN_SUCCESS: () => t('messages.department.fetchChildrenSuccess', '获取子部门列表成功'),
    FETCH_CHILDREN_ERROR: () => t('messages.department.fetchChildrenError', '获取子部门列表失败'),
    NOT_FOUND: () => t('messages.department.notFound', '部门不存在'),
    PARAM_ERROR: () => t('messages.department.paramError', '部门参数错误')
  }
}