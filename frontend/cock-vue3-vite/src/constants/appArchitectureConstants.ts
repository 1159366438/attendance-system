/**
 * 应用架构相关常量
 * 管理应用架构中使用的各种常量值，包括Store名称和事件名称
 * @author Attendance System Team
 * @since 2026-03-15
 * @version v1.1.0-alpha.1
 */

export const APP_ARCHITECTURE_CONSTANTS = {
  // Store名称常量
  STORE_NAMES: {
    // 用户相关Store
    USER: 'user',
    
    // 考勤相关Store
    ATTENDANCE: 'attendance',
    
    // 部门相关Store
    DEPARTMENT: 'department',
    
    // 其他业务Store
    OTHER: {
      SETTINGS: 'settings',
      NOTIFICATION: 'notification',
      PROFILE: 'profile',
    }
  },

  // 事件常量
  EVENTS: {
    // 用户相关事件
    USER: {
      LOGOUT: 'logout',
      LOGIN: 'login',
      UPDATE_PROFILE: 'update-profile',
      CHANGE_PASSWORD: 'change-password',
    },
    
    // 表单相关事件
    FORM: {
      SUBMIT: 'submit',
      RESET: 'reset',
      VALIDATE: 'validate',
      CHANGE: 'change',
    },
    
    // 系统相关事件
    SYSTEM: {
      INIT: 'init',
      READY: 'ready',
      ERROR: 'error',
      LOADING_START: 'loading-start',
      LOADING_END: 'loading-end',
    },
  }
}

// 为了向后兼容，单独导出原有的常量
export const STORE_NAMES = APP_ARCHITECTURE_CONSTANTS.STORE_NAMES;
export const EVENT_CONSTANTS = {
  USER: APP_ARCHITECTURE_CONSTANTS.EVENTS.USER,
  FORM: APP_ARCHITECTURE_CONSTANTS.EVENTS.FORM,
  SYSTEM: APP_ARCHITECTURE_CONSTANTS.EVENTS.SYSTEM,
};