/**
 * 国际化资源管理
 */

export const zhCN = {
  // 菜单相关
  menu: {
    system: '员工内网',
    systemName: '考勤系统',
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
    time: '时间'
  },

  // 消息提示
  messages: {
    getUserInfoFailed: '获取用户信息失败',
    getUserInfoError: '获取用户信息时发生错误',
    punchSuccess: '打卡成功',
    punchFailed: '打卡失败！',
    punchError: '打卡时发生错误',
    networkError: '网络异常，请稍后重试',
    invalidUser: '用户信息无效'
  },

  // 页面标题
  pageTitles: {
    punch: '打卡页面',
    record: '打卡记录',
    user: '用户中心',
    setting: '设置'
  },

  // 打卡状态
  punchStatus: {
    punched: '已打卡',
    unpunched: '未打卡',
    success: '正常',
    late: '迟到',
    absent: '缺勤'
  },

  // 按钮文本
  buttons: {
    punchNow: '立即打卡',
    alreadyPunched: '已打卡'
  }
}

export const enUS = {
  // Menu related
  menu: {
    system: 'Employee Network',
    systemName: 'Attendance System',
    today: 'Today Punch',
    record: 'Punch Records',
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
    punchSuccess: 'Punch successful',
    punchFailed: 'Punch failed!',
    punchError: 'An error occurred during punching',
    networkError: 'Network error, please try again later',
    invalidUser: 'Invalid user information'
  },

  // Page titles
  pageTitles: {
    punch: 'Punch Card',
    record: 'Punch Records',
    user: 'User Center',
    setting: 'Settings'
  },

  // Punch status
  punchStatus: {
    punched: 'Punched',
    unpunched: 'Not Punched',
    success: 'Success',
    late: 'Late',
    absent: 'Absent'
  },

  // Button texts
  buttons: {
    punchNow: 'Punch Now',
    alreadyPunched: 'Already Punched'
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

// 获取特定消息
export const t = (key: string, fallback?: string) => {
  const keys = key.split('.')
  let result: any = getLocaleMessages()
  
  for (const k of keys) {
    result = result?.[k]
  }
  
  return result || fallback || key
}