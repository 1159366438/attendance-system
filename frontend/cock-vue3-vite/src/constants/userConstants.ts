/**
 * 用户相关常量
 * 管理用户功能中使用的各种常量值
 */

export const USER_CONSTANTS = {
  // 年龄限制
  AGE_LIMITS: {
    MIN: 1,
    MAX: 120,
  },

  // 存储键名
  STORAGE_KEYS: {
    IS_LOGGED_IN: 'isLoggedIn',
    USER_INFO: 'userInfo',
    TOKEN: 'token',
    REMEMBERED_USERNAME: 'rememberedUsername',
    AUTH_TOKEN: 'authToken',
  },



  // 用户名限制
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50,
  },

  // 密码限制
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 128,
  },

  // 头像相关
  AVATAR: {
    DEFAULT_SIZE: 80,
    OPTION_SIZE: 50,
  },

   // 表单验证类型
   FORM_TYPES: {
     NUMBER: 'number',
     STRING: 'string',
     ARRAY: 'array',
     OBJECT: 'object',
   },

  // 性别相关
  GENDER: {
    UNKNOWN: 0,
    MALE: 1,
    FEMALE: 2,
    LABELS: {
      0: '未知',
      1: '男',
      2: '女',
    }
  },

  // 按钮文本
  BUTTONS: {
    LOGOUT: () => '退出登录',
  },

  // 默认值
  DEFAULT_VALUES: {
    USER_ID: 0,
    AVATAR: '',
    GENDER: 0,
    MENU_TEXT: '默认菜单',
  },
};