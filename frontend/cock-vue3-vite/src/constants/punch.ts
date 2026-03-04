/**
 * 打卡相关常量
 */
import { t } from '../locales'

// 打卡相关常量
export const PUNCH_CONSTANTS = {
  // 打卡消息
  MESSAGES: {
    SUCCESS: () => t('messages.punchSuccess', '打卡成功'),
    FAILED: () => t('messages.punchFailed', '打卡失败！'),
    ERROR: () => t('messages.punchError', '打卡时发生错误'),
    NETWORK_ERROR: () => t('messages.networkError', '网络异常，请稍后重试'),
    INVALID_USER: () => t('messages.invalidUser', '用户信息无效')
  },
  
  // 打卡状态
  STATUS: {
    PUNCHED: () => t('punchStatus.punched', '已打卡'),
    UNPUNCHED: () => t('punchStatus.unpunched', '未打卡'),
    SUCCESS: () => t('punchStatus.success', '正常'),
    LATE: () => t('punchStatus.late', '迟到'),
    ABSENT: () => t('punchStatus.absent', '缺勤')
  },
  
  // 打卡时间限制（可选）
  TIME_LIMITS: {
    MORNING_START: '08:00',
    MORNING_END: '09:30',
    AFTERNOON_START: '17:00',
    AFTERNOON_END: '18:30'
  }
}

// 页面名称常量
export const PAGE_NAMES = {
  PUNCH: () => t('pageTitles.punch', '打卡页面'),
  RECORD: () => t('pageTitles.record', '打卡记录'),
  USER: () => t('pageTitles.user', '用户中心'),
  SETTING: () => t('pageTitles.setting', '设置')
}