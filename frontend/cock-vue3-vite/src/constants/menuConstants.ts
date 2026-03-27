/**
 * 菜单相关常量
 * 管理菜单中使用的各种常量值，包括键值、文本和工具函数
 * @author Attendance System Team
 * @since 2026-03-15
 * @version v1.1.0-alpha.1
 */

import { t } from '../locales'

// 类型约束：菜单Key类型
export type MenuKey = 'system' | 'attendance' | 'attendancePunch' | 'attendanceRecord' | 'organization' | 'organizationChart' | 'organizationDepartments' | '2' | '3' | '4' | 'navigatorTwo' | 'navigatorThree' | 'navigatorFour';

// 类型约束：菜单文本类型
export type MenuText = string;

export const MENU_CONSTANTS = {
  // 菜单键值
  KEYS: {
    // 主要菜单项
    MAIN: {
      ATTENDANCE:{
        ATTENDANCE: 'attendance',
        PUNCH: 'attendancePunch',
        RECORD: 'attendanceRecord',
      },
      ORGANIZATION: {
        ORGANIZATION: 'organization',
        CHART: 'organizationChart',
        DEPARTMENTS: 'organizationDepartments',
      },
      SETTINGS: 'settings',
      PROFILE: 'profile',
      HOME: 'home',
      ABOUT: 'about',
      SYSTEM: 'system',
      NAVIGATION_TWO: '2',
      NAVIGATION_THREE: '3',
      NAVIGATION_FOUR: '4',
      NAVIGATOR_TWO: 'navigatorTwo',
      NAVIGATOR_THREE: 'navigatorThree',
      NAVIGATOR_FOUR: 'navigatorFour',
    },
    
    // 页面相关
    PAGES: {
      ATTENDANCE_CARD: 'attendanceCard',
      RECORD_PAGE: 'recordPage',
      SETTINGS_PAGE: 'settingsPage',
    },
    
    // 功能相关
    FEATURES: {
      ATTENDANCE_IN: 'attendanceIn',
      VIEW_RECORDS: 'viewRecords',
      UPDATE_PROFILE: 'updateProfile',
    }
  },

  // 菜单项文本
  ITEMS: {
    SYSTEM: () => t('menu.system', '员工内网'),
    ATTENDANCE: () => t('menu.attendance', '考勤管理'),
    ATTENDANCE_PUNCH: () => t('menu.attendancePunch', '考勤打卡'),
    ATTENDANCE_RECORD: () => t('menu.attendanceRecord', '考勤记录'),
    NAVIGATION_TWO: () => t('menu.2', '导航二'),
    NAVIGATION_THREE: () => t('menu.3', '导航三'),
    NAVIGATION_FOUR: () => t('menu.4', '导航四'),
    ORGANIZATION: () => t('menu.organization', '组织管理'),
    ORGANIZATION_CHART: () => t('menu.organizationChart', '组织架构'),
    ORGANIZATION_DEPARTMENTS: () => t('menu.organizationDepartments', '部门管理'),
    NAVIGATOR_TWO: () => t('menu.navigatorTwo', '部门管理'),
    NAVIGATOR_THREE: () => t('menu.navigatorThree', 'Navigator Three'),
    NAVIGATOR_FOUR: () => t('menu.navigatorFour', 'Navigator Four'),
  },

  // 获取菜单文本的函数（为了保持兼容性）
  getMenuText: (key: string | number, defaultText: string = '员工内网'): string => {
    const keyStr = String(key);
    switch (keyStr) {
      case 'system': return MENU_CONSTANTS.ITEMS.SYSTEM();
      case 'attendance': return MENU_CONSTANTS.ITEMS.ATTENDANCE();
      case 'attendancePunch': return MENU_CONSTANTS.ITEMS.ATTENDANCE_PUNCH();
      case 'attendanceRecord': return MENU_CONSTANTS.ITEMS.ATTENDANCE_RECORD();
      case '2': return MENU_CONSTANTS.ITEMS.NAVIGATION_TWO();
      case '3': return MENU_CONSTANTS.ITEMS.NAVIGATION_THREE();
      case '4': return MENU_CONSTANTS.ITEMS.NAVIGATION_FOUR();
      case 'organization': return MENU_CONSTANTS.ITEMS.ORGANIZATION();
      case 'organizationChart': return MENU_CONSTANTS.ITEMS.ORGANIZATION_CHART();
      case 'organizationDepartments': return MENU_CONSTANTS.ITEMS.ORGANIZATION_DEPARTMENTS();
      case 'navigatorTwo': return MENU_CONSTANTS.ITEMS.NAVIGATOR_TWO();
      case 'navigatorThree': return MENU_CONSTANTS.ITEMS.NAVIGATOR_THREE();
      case 'navigatorFour': return MENU_CONSTANTS.ITEMS.NAVIGATOR_FOUR();
      default: return defaultText;
    }
  }
}

/**
 * 根据菜单Key获取对应的显示文本
 * @param key 菜单索引（支持字符串/数字类型）
 * @param defaultText 兜底文本（默认：员工内网）
 * @returns 菜单显示文本
 */
export function getMenuText(key: string | number, defaultText: MenuText = '员工内网'): MenuText {
  // 使用常量替代直接的国际化调用
  return MENU_CONSTANTS.getMenuText(key, defaultText);
}

/**
 * 获取所有菜单Key列表
 * @returns 菜单Key数组
 */
export function getAllMenuKeys(): MenuKey[] {
  return ['system', 'attendance', 'attendancePunch', 'attendanceRecord', '2', '3', '4'];
}

/**
 * 验证菜单Key是否有效
 * @param key 待验证的菜单索引
 * @returns 是否为有效菜单Key
 */
export function isValidMenuKey(key: string | number): boolean {
  const keyStr = String(key);
  return getAllMenuKeys().includes(keyStr as MenuKey);
}

/**
 * 获取所有菜单文本列表
 * @returns 菜单文本数组
 */
export function getAllMenuTexts(): MenuText[] {
  return getAllMenuKeys().map(key => getMenuText(key));
}

// 为了向后兼容，导出MENU_KEYS
export const MENU_KEYS = MENU_CONSTANTS.KEYS;