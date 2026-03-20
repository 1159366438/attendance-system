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
        },
        DEPARTMENT: {
          LIST: '/departments',
          CHILDREN: '/departments/children',
          DETAIL: '/departments/',
          DETAIL_BY_ID: (id: number) => `/departments/${id}`,
          CREATE: '/departments',
          UPDATE: '/departments/',
          UPDATE_BY_ID: (id: number) => `/departments/${id}`,
          DELETE_BY_ID: (id: number) => `/departments/${id}`,
          EMPLOYEES: '/departments/',
          EMPLOYEES_BY_ID: (id: number) => `/departments/${id}/employees`
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
        CONFIRM: '确认',
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

  // Element Plus 组件类型常量
  ELEMENT_TYPES: {
    WARNING: 'warning',
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'info',
  },

  // 默认值常量
  DEFAULT_VALUES: {
    UNDEFINED: undefined,
    NULL: null,
    EMPTY_STRING: '',
    EMPTY_ARRAY: [],
    FALSE: false,
    TRUE: true,
  },

  // 部门管理相关常量
  DEPARTMENT_MANAGEMENT: {
    // 页面标题
    PAGE_TITLE: () => t('departmentManagement.pageTitle', '部门管理'),
    
    // 按钮文本
    BUTTONS: {
      ADD: () => t('departmentManagement.addButton', '新增部门'),
      EDIT: () => t('departmentManagement.editButton', '编辑'),
      DELETE: () => t('departmentManagement.deleteButton', '删除'),
      CANCEL: () => t('departmentManagement.cancelButton', '取消'),
      CONFIRM: () => t('departmentManagement.confirmButton', '确定'),
    },
    
    // 对话框标题
    DIALOG_TITLES: {
      ADD: () => t('departmentManagement.addDialog', '新增部门'),
      EDIT: () => t('departmentManagement.editDialog', '编辑部门'),
    },
    
    // 确认消息
    CONFIRM_MESSAGES: {
      DELETE: () => t('departmentManagement.deleteConfirm', '确定要删除这个部门吗？'),
      DELETE_TITLE: () => t('departmentManagement.deleteTitle', '提示'),
    },
    
    // 成功消息
    SUCCESS_MESSAGES: {
      DELETE: () => t('departmentManagement.deleteSuccess', '删除成功'),
      ADD: () => t('departmentManagement.addSuccess', '新增成功'),
      UPDATE: () => t('departmentManagement.updateSuccess', '更新成功'),
    },
    
    // 错误消息
    ERROR_MESSAGES: {
      DELETE: () => t('departmentManagement.deleteError', '删除失败'),
      ADD: () => t('departmentManagement.addError', '新增失败'),
      UPDATE: () => t('departmentManagement.updateError', '更新失败'),
      LOAD: () => t('departmentManagement.loadError', '获取部门列表失败'),
      EMPTY_NAME: () => t('departmentManagement.emptyNameError', '请输入部门名称'),
      EMPTY_ID: () => t('departmentManagement.emptyIdError', '部门ID不能为空'),
    },
    
    // 日志消息
    LOG_MESSAGES: {
      ADD_ERROR: () => t('departmentManagement.addLogError', '新增部门失败:'),
      UPDATE_ERROR: () => t('departmentManagement.updateLogError', '更新部门失败:'),
    },

    
    // 表格列标题
    TABLE_HEADERS: {
      ID: () => t('departmentManagement.table.id', 'ID'),
      NAME: () => t('departmentManagement.table.name', '部门名称'),
      DESCRIPTION: () => t('departmentManagement.table.description', '部门描述'),
      MANAGER_ID: () => t('departmentManagement.table.managerId', '部门经理ID'),
      CREATE_TIME: () => t('departmentManagement.table.createTime', '创建时间'),
      ACTIONS: () => t('departmentManagement.table.actions', '操作'),
    },
    
    // 表单标签
    FORM_LABELS: {
      NAME: () => t('departmentManagement.form.name', '部门名称'),
      DESCRIPTION: () => t('departmentManagement.form.description', '部门描述'),
      MANAGER_ID: () => t('departmentManagement.form.managerId', '部门经理ID'),
    },
    
    // 表单占位符
    FORM_PLACEHOLDERS: {
      NAME: () => t('departmentManagement.form.namePlaceholder', '请输入部门名称'),
      DESCRIPTION: () => t('departmentManagement.form.descriptionPlaceholder', '请输入部门描述'),
      MANAGER_ID: () => t('departmentManagement.form.managerIdPlaceholder', '请输入部门经理用户ID'),
    },
    
    // 组件常量
    COMPONENTS: {
      DIALOG_WIDTH: '500px',
      DIALOG_LABEL_WIDTH: '100px',
      ID_COLUMN_WIDTH: '80px',
      ACTIONS_COLUMN_WIDTH: '200px',
    }
  },

  // 组织架构相关常量
  ORGANIZATION_CHART: {
    // 页面标题
    PAGE_TITLE: () => t('organizationChart.pageTitle', '组织架构'),
    
    // 部门树面板
    DEPT_TREE_PANEL: {
      WIDTH: '300px',
      BORDER_COLOR: '#dcdfe6',
      PADDING: '15px',
    },
    
    // 员工列表面板
    EMPLOYEE_LIST_PANEL: {
      BORDER_COLOR: '#dcdfe6',
      PADDING: '15px',
    },
    
    // 表格列宽
    TABLE_COLUMNS: {
      NAME_WIDTH: '150px',
      EMAIL_WIDTH: '200px',
      PHONE_WIDTH: '150px',
      POSITION_WIDTH: '150px',
      STATUS_WIDTH: '100px',
      ACTIONS_WIDTH: '200px',
    },
    
    // 按钮文本
    BUTTONS: {
      ADD_EMPLOYEE: () => t('organizationChart.addEmployeeButton', '添加员工'),
      REFRESH: () => t('organizationChart.refreshButton', '刷新'),
      EDIT: () => t('organizationChart.editButton', '编辑'),
      DELETE: () => t('organizationChart.deleteButton', '删除'),
      CONFIRM: () => t('organizationChart.confirmButton', '确认'),
      CANCEL: () => t('organizationChart.cancelButton', '取消'),
    },
    
    // 表格列标题
    TABLE_HEADERS: {
      EMPLOYEE_NAME: () => t('organizationChart.employeeNameHeader', '员工姓名'),
      EMAIL: () => t('organizationChart.emailHeader', '邮箱'),
      PHONE: () => t('organizationChart.phoneHeader', '电话'),
      POSITION: () => t('organizationChart.positionHeader', '职位'),
      STATUS: () => t('organizationChart.statusHeader', '状态'),
      ACTIONS: () => t('organizationChart.actionsHeader', '操作'),
    },
    
    // 状态文本
    STATUS: {
      ACTIVE: 'active',
      INACTIVE: 'inactive',
      ACTIVE_TEXT: () => t('organizationChart.activeStatus', '在职'),
      INACTIVE_TEXT: () => t('organizationChart.inactiveStatus', '离职'),
    },
    
    // 提示消息
    MESSAGES: {
      SELECT_DEPT_PROMPT: () => t('organizationChart.selectDeptPrompt', '请在左侧选择一个部门以查看员工信息'),
      SELECT_DEPT: () => t('organizationChart.selectDept', '请选择部门'),
      EMPLOYEES: () => t('organizationChart.employees', '员工列表'),
      DEPARTMENT_TREE: () => t('organizationChart.departmentTree', '部门树'),
      SEARCH_DEPARTMENT: () => t('organizationChart.searchDepartment', '搜索部门'),
      LOAD_DEPT_ERROR: () => t('organizationChart.loadDeptError', '加载部门数据失败'),
      LOAD_EMPLOYEE_ERROR: () => t('organizationChart.loadEmployeeError', '加载员工数据失败'),
      DELETE_SUCCESS: () => t('organizationChart.deleteSuccess', '删除成功'),
      DELETE_EMPLOYEE: () => t('organizationChart.deleteEmployee', '删除员工'),
      CONFIRM_DELETE: (name: string) => t('organizationChart.confirmDelete', `确认删除员工 "${name}"?`),
      NOT_IMPLEMENTED: () => t('organizationChart.notImplemented', '功能尚未实现'),
      EDIT: (name: string) => t('organizationChart.edit', `编辑 ${name}`),
    },
    
    // 样式相关
    STYLES: {
      CHART_PADDING: '20px',
      CONTAINER_GAP: '20px',
      CONTAINER_HEIGHT_OFFSET: '150px', // 用于计算高度: 100vh - 150px
      PANEL_BORDER: '1px solid #dcdfe6',
      PANEL_BORDER_RADIUS: '4px',
      PANEL_BACKGROUND: '#fff',
      EMPTY_STATE_COLOR: '#909399',
      EMPTY_STATE_FONT_SIZE: '16px',
      EMPTY_STATE_HEIGHT: '300px',
    },
    
    // 响应式断点
    RESPONSIVE: {
      MOBILE_BREAKPOINT: '768px',
      MOBILE_CONTAINER_FLEX_DIRECTION: 'column',
      MOBILE_CONTAINER_HEIGHT: 'auto',
      MOBILE_DEPT_TREE_MAX_HEIGHT: '300px',
    },
    
    // 树形控件属性
    TREE_PROPS: {
      CHILDREN: 'children',
      LABEL: 'label',
      HAS_CHILDREN: 'hasChildren',
    },
  },
}