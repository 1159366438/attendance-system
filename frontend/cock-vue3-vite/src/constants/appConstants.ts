/**
 * 应用主要常量
 * 整合应用中使用的主要常量值，减少文件数量，提高可维护性
 * @author Attendance System Team
 * @since 2026-03-15
 */

import { t } from '../locales'

export const APP_CONSTANTS = {
  // 登录相关常量
  LOGIN: {
    // 登录页面文本
    TEXTS: {
      TITLE: () => t('login.title', '用户登录'),
      REGISTER_TITLE: () => t('login.registerTitle', '用户注册'),
      USERNAME_LABEL: () => t('login.usernameLabel', '用户名'),
      PASSWORD_LABEL: () => t('login.passwordLabel', '密码'),
      CONFIRM_PASSWORD_LABEL: () => t('login.confirmPasswordLabel', '确认密码'),
      AGE_LABEL: () => t('login.ageLabel', '年龄'),
      AVATAR_LABEL: () => t('login.avatarLabel', '头像'),
      GENDER_LABEL: () => t('login.genderLabel', '性别'),
      MALE_LABEL: () => t('login.maleLabel', '男'),
      FEMALE_LABEL: () => t('login.femaleLabel', '女'),
      UNKNOWN_LABEL: () => t('login.unknownLabel', '未知'),
      USERNAME_PLACEHOLDER: () => t('login.usernamePlaceholder', '请输入用户名'),
      PASSWORD_PLACEHOLDER: () => t('login.passwordPlaceholder', '请输入密码'),
      CONFIRM_PASSWORD_PLACEHOLDER: () => t('login.confirmPasswordPlaceholder', '请再次输入密码'),
      AGE_PLACEHOLDER: () => t('login.agePlaceholder', '请输入年龄'),
      AVATAR_PLACEHOLDER: () => t('login.avatarPlaceholder', '请输入头像URL'),
      REMEMBER_ME: () => t('login.rememberMe', '记住密码'),
      ACCEPT_TERMS: () => t('login.acceptTerms', '我已阅读并同意用户协议'),
      BUTTON: () => t('login.button', '登录'),
      REGISTER_BUTTON: () => t('login.registerButton', '注册'),
      FORGOT_PASSWORD: () => t('login.forgotPassword', '忘记密码'),
      BACK_TO_LOGIN: () => t('login.backToLogin', '返回登录'),
      REGISTER: () => t('login.register', '注册账户'),
    },

    // 登录验证消息
    VALIDATION_MESSAGES: {
      USERNAME_REQUIRED: () => t('login.usernameRequired', '请输入用户名'),
      USERNAME_TOO_SHORT: () => t('login.usernameTooShort', '用户名长度至少3位'),
      USERNAME_TOO_LONG: () => t('login.usernameTooLong', '用户名长度不能超过50位'),
      USERNAME_LENGTH_RANGE: () => t('login.usernameLengthRange', '用户名长度必须在3-50个字符之间'),
      PASSWORD_REQUIRED: () => t('login.passwordRequired', '请输入密码'),
      PASSWORD_TOO_SHORT: () => t('login.passwordTooShort', '密码长度至少6位'),
      CONFIRM_PASSWORD_REQUIRED: () => t('login.confirmPasswordRequired', '请确认密码'),
      PASSWORD_MISMATCH: () => t('login.passwordMismatch', '两次输入的密码不一致'),
      AGE_RANGE: () => t('login.ageRange', '年龄应在1-120之间'),
      GENDER_REQUIRED: () => t('login.genderRequired', '请选择性别'),
      GENDER_INVALID: () => t('login.genderInvalid', '选择的性别无效'),
      TERMS_NOT_ACCEPTED: () => t('login.termsNotAccepted', '请阅读并同意用户协议'),
      REGISTRATION_FAILED: () => t('login.registrationFailed', '注册失败'),
      VALIDATION_FAILED: () => t('login.validationFailed', '请检查输入信息'),
    },

    // 辅助消息
    HELP_MESSAGES: {
      FORGOT_PASSWORD_TIP: () => t('login.forgotPasswordTip', '请联系管理员重置密码'),
      REGISTER_TIP: () => t('login.registerTip', '请联系管理员开通账户'),
    },
    
    // 特性标志
    FEATURE_FLAGS: {
      SHOW_AGE_FIELD: () => true,
      SHOW_AVATAR_FIELD: () => true,
      SHOW_GENDER_FIELD: () => true,
    },
  },

  // 用户相关常量
  USER: {
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

    // 默认值
    DEFAULT_VALUES: {
      USER_ID: 0,
      AVATAR: '',
      GENDER: 0,
      MENU_TEXT: '默认菜单',
    },

    // 按钮文本
    BUTTONS: {
      LOGOUT: () => '退出登录',
    },
  },

  // 路由相关常量
  ROUTE: {
    // 路由路径
    PATHS: {
      // 认证相关路由
      AUTH: {
        LOGIN: '/login',
        LOGOUT: '/logout',
        REGISTER: '/register',
      },
      
      // 主要页面路由
      PAGES: {
        HOME: '/',
        ATTENDANCE: {
          PUNCH: '/attendance-punch',
          RECORD: '/attendance-record',
        },
        USER: '/user',
        SETTING: '/setting',
        ORGANIZATION: {
          CHART: '/organizationChart',
          DEPARTMENTS: '/organizationDepartments',
        },
      },
      
      // API 路由
      API: {
        USER: {
          INFO: '/users/me',
          LOGIN: '/auth/login',
          LOGOUT: '/auth/logout',
          REGISTER: '/users',
        },
        ATTENDANCE: {
          RECORDS: '/attendance/records',
        }
      }
    },

    // 路由名称
    NAMES: {
      // 认证相关页面
      AUTH: {
        LOGIN: 'LoginPage',
        REGISTER: 'RegisterPage',
      },
      
      // 主要页面
      PAGES: {
        HOME: 'HomePage',
        ATTENDANCE: {
          PUNCH: 'AttendancePunchPage',
          RECORD: 'AttendanceRecordPage',
        },
        USER: 'UserPage',
        SETTING: 'SettingPage',
        ORGANIZATION: {
          CHART: 'OrganizationChartPage',
          DEPARTMENTS: 'OrganizationDepartmentsPage',
        },
      },
    },
  },

  // 打卡相关常量
  ATTENDANCE: {
    // 考勤消息
    MESSAGES: {
      SUCCESS: () => t('messages.attendanceSuccess', '考勤打卡成功'),
      FAILED: () => t('messages.attendanceFailed', '考勤打卡失败！'),
      ERROR: () => t('messages.attendanceError', '考勤打卡时发生错误'),
      NETWORK_ERROR: () => t('messages.networkError', '网络异常，请稍后重试'),
      INVALID_USER: () => t('messages.invalidUser', '用户信息无效'),
      // 获取考勤记录相关消息
      FETCH_RECORDS_SUCCESS: () => t('messages.fetchAttendanceRecordsSuccess', '获取考勤记录成功'),
      FETCH_RECORDS_FAILED: () => t('messages.fetchAttendanceRecordsFailed', '获取考勤记录失败'),
      FETCH_RECORDS_ERROR: () => t('messages.fetchAttendanceRecordsError', '获取考勤记录时发生错误'),
      NO_RECORDS_FOUND: () => t('messages.noAttendanceRecordsFound', '暂无考勤记录'),
      RECORDS_LOAD_ERROR: () => t('messages.attendanceRecordsLoadError', '加载考勤记录出错')
    },
    
    // 考勤状态
    STATUS: {
      ATTENDED: () => t('attendanceStatus.attended', '已考勤'),
      NOT_ATTENDED: () => t('attendanceStatus.notAttended', '未考勤'),
      SUCCESS: () => t('attendanceStatus.success', '正常'),
      LATE: () => t('attendanceStatus.late', '迟到'),
      EARLY_LEAVE: () => t('attendanceStatus.earlyLeave', '早退'),
      ABSENT: () => t('attendanceStatus.absent', '缺勤')
    }
  },

  // 考勤卡片相关常量
  ATTENDANCE_CARD: {
    // 文本内容
    TEXTS: {
      TODAY: () => t('menu.today', '今日考勤'),
      ATTENDANCE_NOW: () => t('buttons.attendanceNow', '立即考勤'),
      ALREADY_ATTENDED: () => t('buttons.alreadyAttended', '已考勤'),
      ATTENDANCE_PAGE_NAME: () => t('pageNames.attendance', '考勤'),
      RECORD_PAGE_NAME: () => t('pageNames.record', '记录'),
    },

    // 考勤状态文本
    STATUS: {
      ATTENDED: () => t('attendanceStatus.attended', '今日已考勤'),
      NOT_ATTENDED: () => t('attendanceStatus.notAttended', '今日未考勤'),
    },

    // 消息文本
    MESSAGES: {
      UNKNOWN_USER: () => t('messages.unknownUser', '未知用户'),
    }
  },

  // 考勤存储常量
  ATTENDANCE_STORE: {
    // 初始状态值
    INITIAL_STATE: {
      IS_ATTENDED: false,
      ATTENDED_TIME: '',
      LOADING: false,
      ERROR: '',
    },
    
    // 分页初始值
    PAGINATION: {
      TOTAL: 0,
      PAGE: 1,
      PAGES: 0,
    },
    
    // 默认参数值
    DEFAULT_PARAMS: {
      USER_ID: 1,
      PAGE: 1,
    },
    
    // 默认回退值
    FALLBACK_VALUES: {
      TOTAL: 0,
      PAGE: 1,
      PAGES: 1,
    }
  },



  // 记录卡片相关常量
  RECORD_CARD: {
    // 表格列标题
    COLUMN_HEADERS: {
      DATE: () => t('record.date', '日期'),
      NAME: () => t('record.name', '姓名'),
      TIME: () => t('record.time', '时间'),
      LOCATION: () => t('record.location', '打卡地点'),
    },

    // 消息文本
    MESSAGES: {
      NO_RECORDS: () => t('messages.noRecordsFound', '暂无打卡记录'),
      USER_PREFIX: () => t('messages.userPrefix', '用户'),
      UNKNOWN_LOCATION: () => t('messages.unknownLocation', '未知地点'),
      UNKNOWN_USER: () => t('messages.unknownUser', '未知用户'),
    }
  },

  // 页面名称常量
  PAGE_NAMES: {
    ATTENDANCE_PUNCH: () => t('pageTitles.attendancePunch', '考勤打卡'),
    ATTENDANCE_RECORD: () => t('pageTitles.attendanceRecord', '考勤记录'),
    USER: () => t('pageTitles.user', '用户中心'),
    SETTING: () => t('pageTitles.setting', '设置'),
    ORGANIZATION: () => t('pageTitles.organization', '组织管理'),
    ORGANIZATION_CHART: () => t('pageTitles.organizationChart', '组织架构'),
    ORGANIZATION_DEPARTMENTS: () => t('pageTitles.organizationDepartments', '部门管理')
  },

  // 国际化后备文本常量
    I18N_FALLBACKS: {
      // 菜单项
      MENU: {
        ATTENDANCE: {
          PUNCH: '考勤打卡',
          RECORD: '考勤记录',
        },
        ORGANIZATION: {
          CHART: '组织架构',
          DEPARTMENTS: '部门管理',
        },
        SETTINGS: '设置',
        PROFILE: '个人资料',
        HOME: '首页',
        ABOUT: '关于我们',
      },
      
      // 按钮文本
      BUTTONS: {
        SUBMIT: '提交',
        CANCEL: '取消',
        SAVE: '保存',
        DELETE: '删除',
        EDIT: '编辑',
        VIEW: '查看',
      },
      
      // 状态文本
      STATUS: {
        SUCCESS: '成功',
        ERROR: '错误',
        LOADING: '加载中',
        PENDING: '待处理',
      },
      
      // 通用文本
      COMMON: {
        YES: '是',
        NO: '否',
        OK: '确定',
        CONFIRM: '确认',
        BACK: '返回',
      }
    },

    // 存储相关常量
    STORAGE: {
    // 认证状态值
    AUTH_STATUS: {
      LOGGED_IN: 'true',
      LOGGED_OUT: 'false',
    },
    
    // 存储标识符
    IDENTIFIERS: {
      TOKEN_PREFIX: 'token',
      USER_INFO: 'userInfo',
      THEME: 'theme',
    },
    
    // 布尔值表示
    BOOLEAN_REPRESENTATIONS: {
      TRUE: 'true',
      FALSE: 'false',
      ONE: '1',
      ZERO: '0',
    }
  },

  // 表格相关常量
  TABLE: {
    // 列宽设置
    COLUMN_WIDTHS: {
      DEFAULT: '180px',  // 默认列宽
      DATE: '180px',     // 日期列宽
      NAME: '180px',     // 姓名列宽
      TIME: '180px',     // 时间列宽
      LOCATION: '200px', // 地点列宽
    },
    
    // 分页设置
    PAGINATION: {
      DEFAULT_SIZE: 15,      // 默认每页数量
      OPTIONS: [15, 30, 50, 100], // 分页选项
    }
  },

  // 布尔值常量
    BOOLEAN: {
      FALSE: false,
      TRUE: true,
      YES: true,
      NO: false,
      ON: true,
      OFF: false,
      ENABLED: true,
      DISABLED: false,
      VISIBLE: true,
      HIDDEN: false,
      LOADING: false,
      NOT_LOADING: false,
      AUTHENTICATED: true,
      NOT_AUTHENTICATED: false,
      SUCCESS: true,
      FAILURE: false,
      VALID: true,
      INVALID: false,
    },

    // 表单验证相关常量
    FORM_VALIDATION: {
    // 触发时机
    TRIGGERS: {
      BLUR: 'blur',
      CHANGE: 'change',
      INPUT: 'input',
      SUBMIT: 'submit',
    },
    
    // 验证规则
    RULES: {
      REQUIRED: 'required',
      EMAIL: 'email',
      MIN_LENGTH: 'minLength',
      MAX_LENGTH: 'maxLength',
      PATTERN: 'pattern',
    },
    
    // 验证消息类型
    MESSAGES: {
      ERROR: 'error',
      WARNING: 'warning',
      SUCCESS: 'success',
      INFO: 'info',
    }
  },
}