/**
 * 国际化资源管理
 * 管理应用的多语言资源
 * @author Attendance System Team
 * @since 2026-03-15
 * @version v1.1.0-alpha.1
 */

export const zhCN = {
  // 菜单相关
  menu: {
    system: '员工内网',
    systemName: '考勤系统',
    attendancePunch: '考勤打卡',
    attendanceRecord: '考勤记录',
    // 保留旧的键作为备用
    today: '今日打卡',
    record: '打卡记录',
    '2': '导航二',
    '3': '导航三',
    '4': '导航四'
  },

  // 记录表格相关
  record: {
    date: '日期',
    name: '姓名',
    time: '时间',
    location: '打卡地点'
  },

  // 消息提示
  messages: {
    getUserInfoFailed: '获取用户信息失败',
    getUserInfoError: '获取用户信息时发生错误',
    attendanceSuccess: '考勤打卡成功',
    attendanceFailed: '考勤打卡失败！',
    attendanceError: '考勤打卡时发生错误',
    networkError: '网络异常，请稍后重试',
    invalidUser: '用户信息无效',
    noRecordsFound: '暂无打卡记录',
    unknownLocation: '未知地点',
    fetchUserInfoSuccess: '获取用户信息成功',
    fetchUserInfoFailed: '获取用户信息失败',
    fetchUserInfoError: '获取用户信息时发生错误',
    updateUserInfoSuccess: '更新用户信息成功',
    updateUserInfoFailed: '更新用户信息失败',
    loginSuccess: '登录成功',
    loginFailed: '登录失败',
    logoutSuccess: '退出登录成功',
    logoutFailed: '退出登录失败',
    operationSuccess: '操作成功',
    operationFailed: '操作失败',
    operationError: '操作时发生错误',
    loading: '加载中...',
    noData: '暂无数据',
    confirmDelete: '确认删除吗？',
    deleteSuccess: '删除成功',
    saveSuccess: '保存成功',
    saveFailed: '保存失败',
    fetchRecordsSuccess: '获取打卡记录成功',
    fetchRecordsFailed: '获取打卡记录失败',
    fetchRecordsError: '获取打卡记录时发生错误',
    recordsLoadError: '加载打卡记录出错',
    userPrefix: '用户',
    unknownUser: '未知用户'
  },

  // 页面标题
  pageTitles: {
    attendancePunch: '考勤打卡',
    attendanceRecord: '考勤记录',
    // 保留旧的键作为备用
    attendance: '考勤页面',
    record: '打卡记录',
    user: '用户中心',
    setting: '设置'
  },



  // 按钮文本
  buttons: {
    attendanceNow: '立即考勤',
    alreadyAttended: '已考勤',
    logout: '退出'
  },

  // 登录页面
  login: {
    title: '用户登录',
    usernameLabel: '用户名',
    passwordLabel: '密码',
    usernamePlaceholder: '请输入用户名',
    passwordPlaceholder: '请输入密码',
    rememberMe: '记住密码',
    button: '登录',
    forgotPassword: '忘记密码',
    register: '注册账户',
    usernameRequired: '请输入用户名',
    usernameLength: '用户名长度至少3位',
    passwordRequired: '请输入密码',
    passwordLength: '密码长度至少6位',
    success: '登录成功',
    failed: '登录失败',
    validationFailed: '请检查输入信息',
    forgotPasswordTip: '请联系管理员重置密码',
    registerTip: '请联系管理员开通账户'
  },

  // 组织架构相关
  organizationChart: {
    pageTitle: '组织架构',
    addEmployeeButton: '添加员工',
    refreshButton: '刷新',
    editButton: '编辑',
    deleteButton: '删除',
    confirmButton: '确定',
    cancelButton: '取消',
    employeeNameHeader: '员工姓名',
    emailHeader: '邮箱',
    phoneHeader: '电话',
    positionHeader: '职位',
    statusHeader: '状态',
    actionsHeader: '操作',
    activeStatus: '在职',
    inactiveStatus: '离职',
    selectDeptPrompt: '请在左侧选择一个部门以查看员工信息',
    selectDept: '请选择部门',
    employees: '员工列表',
    departmentTree: '部门树',
    searchDepartment: '搜索部门',
    loadDeptError: '加载部门数据失败',
    loadEmployeeError: '加载员工数据失败',
    deleteSuccess: '删除成功',
    deleteEmployee: '删除员工',
    confirmDelete: '确认删除员工 "%{name}"?',
    notImplemented: '功能尚未实现',
    edit: '编辑 %{name}',
    addEmployeeDialogTitle: '添加员工',
    selectEmployeeLabel: '选择员工',
    selectEmployeePlaceholder: '请选择要添加的员工',
    noUnassignedEmployees: '没有未分配部门的员工',
    employeeAddSuccess: '员工添加成功',
    employeeAddFailed: '员工添加失败',
    fetchUnassignedFailed: '获取未分配员工失败'
  }
}

export const enUS = {
  // Menu related
  menu: {
    system: 'Employee Network',
    systemName: 'Attendance System',
    attendancePunch: 'Attendance Punch',
    attendanceRecord: 'Attendance Records',
    // Keep old keys as backup
    today: 'Today Attendance',
    record: 'Attendance Records',
    '2': 'Navigation Two',
    '3': 'Navigation Three',
    '4': 'Navigation Four'
  },

  // Record table related
  record: {
    date: 'Date',
    name: 'Name',
    time: 'Time'
  },

  // Message prompts
  messages: {
    getUserInfoFailed: 'Failed to get user information',
    getUserInfoError: 'An error occurred while getting user information',
    attendanceSuccess: 'Attendance check-in successful',
    attendanceFailed: 'Attendance check-in failed!',
    attendanceError: 'An error occurred during attendance check-in',
    noAttendanceRecordsFound: 'No attendance records found',
    networkError: 'Network error, please try again later',
    invalidUser: 'Invalid user information',
    unknownLocation: 'Unknown location',
    fetchUserInfoSuccess: 'Successfully fetched user information',
    fetchUserInfoFailed: 'Failed to fetch user information',
    fetchUserInfoError: 'An error occurred while fetching user information',
    updateUserInfoSuccess: 'Successfully updated user information',
    updateUserInfoFailed: 'Failed to update user information',
    loginSuccess: 'Login successful',
    loginFailed: 'Login failed',
    logoutSuccess: 'Logout successful',
    logoutFailed: 'Logout failed',
    operationSuccess: 'Operation successful',
    operationFailed: 'Operation failed',
    operationError: 'An error occurred during operation',
    loading: 'Loading...',
    noData: 'No data available',
    confirmDelete: 'Confirm deletion?',
    deleteSuccess: 'Deleted successfully',
    saveSuccess: 'Saved successfully',
    saveFailed: 'Save failed',
    fetchRecordsSuccess: 'Successfully fetched attendance records',
    fetchRecordsFailed: 'Failed to fetch attendance records',
    fetchRecordsError: 'An error occurred while fetching attendance records',
    recordsLoadError: 'Error loading attendance records',
    userPrefix: 'User',
    unknownUser: 'Unknown User'
  },

  // Page titles
  pageTitles: {
    attendancePunch: 'Attendance Punch',
    attendanceRecord: 'Attendance Records',
    user: 'User Center',
    setting: 'Settings'
  },



  // Button texts
  buttons: {
    attendanceNow: 'Attendance Now',
    alreadyAttended: 'Already Attended',
    logout: 'Logout'
  },

  // Login page
  login: {
    title: 'User Login',
    usernameLabel: 'Username',
    passwordLabel: 'Password',
    usernamePlaceholder: 'Please enter username',
    passwordPlaceholder: 'Please enter password',
    rememberMe: 'Remember Password',
    button: 'Login',
    forgotPassword: 'Forgot Password',
    register: 'Register Account',
    usernameRequired: 'Please enter username',
    usernameLength: 'Username must be at least 3 characters',
    passwordRequired: 'Please enter password',
    passwordLength: 'Password must be at least 6 characters',
    success: 'Login successful',
    failed: 'Login failed',
    validationFailed: 'Please check input information',
    forgotPasswordTip: 'Please contact administrator to reset password',
    registerTip: 'Please contact administrator to activate account'
  },

  // Organization chart related
  organizationChart: {
    pageTitle: 'Organization Chart',
    addEmployeeButton: 'Add Employee',
    refreshButton: 'Refresh',
    editButton: 'Edit',
    deleteButton: 'Delete',
    confirmButton: 'Confirm',
    cancelButton: 'Cancel',
    employeeNameHeader: 'Employee Name',
    emailHeader: 'Email',
    phoneHeader: 'Phone',
    positionHeader: 'Position',
    statusHeader: 'Status',
    actionsHeader: 'Actions',
    activeStatus: 'Active',
    inactiveStatus: 'Inactive',
    selectDeptPrompt: 'Please select a department from the left panel to view employee information',
    selectDept: 'Please select a department',
    employees: 'Employee List',
    departmentTree: 'Department Tree',
    searchDepartment: 'Search Department',
    loadDeptError: 'Failed to load department data',
    loadEmployeeError: 'Failed to load employee data',
    deleteSuccess: 'Deleted successfully',
    deleteEmployee: 'Delete Employee',
    confirmDelete: 'Confirm to delete employee "%{name}"?',
    notImplemented: 'Feature not implemented yet',
    edit: 'Edit %{name}',
    addEmployeeDialogTitle: 'Add Employee',
    selectEmployeeLabel: 'Select Employee',
    selectEmployeePlaceholder: 'Please select an employee to add',
    noUnassignedEmployees: 'No unassigned employees',
    employeeAddSuccess: 'Employee added successfully',
    employeeAddFailed: 'Failed to add employee',
    fetchUnassignedFailed: 'Failed to fetch unassigned employees'
  }
}

// 默认语言
export const DEFAULT_LOCALE = 'zh-CN'

// 当前语言
let currentLocale = DEFAULT_LOCALE

// 获取当前语言资源
export const getLocaleMessages = () => {
  return currentLocale === 'en-US' ? enUS : zhCN
}

// 设置语言
export const setLocale = (locale: string) => {
  currentLocale = locale
}

// 替换消息中的参数
const interpolateParams = (message: string, params: Record<string, any>): string => {
  let result = message || ''
  for (const [key, value] of Object.entries(params)) {
    result = result.replace(new RegExp(`%\\{${key}\\}`, 'g'), String(value))
  }
  return result
}

// 获取特定消息
export const t = (key: string, fallback?: string, params?: Record<string, any>) => {
  const keys = key.split('.')
  let result: any = getLocaleMessages()
  
  for (const k of keys) {
    result = result?.[k]
  }
  
  const message = result || fallback || key
  
  // 如果提供了参数，则进行参数替换
  if (params && typeof message === 'string') {
    return interpolateParams(message, params)
  }
  
  return message
}