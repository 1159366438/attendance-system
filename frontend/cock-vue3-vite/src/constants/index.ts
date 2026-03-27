/**
 * 常量统一导出文件
 * 提供单一入口点来访问所有常量，便于管理和维护
 * @author Attendance System Team
 * @since 2026-03-15
 * @version v1.1.0-alpha.1
 */

// 导出整合的应用主要常量
export { APP_CONSTANTS } from './appConstants'

// 保持向后兼容性，仍然导出原有常量文件
export { STORAGE_VALUES } from './storageValues'

// 也可以导出其他特定功能的常量
export { API_ERROR_MESSAGES } from './apiErrorMessages'
export { APP_ARCHITECTURE_CONSTANTS, STORE_NAMES, EVENT_CONSTANTS } from './appArchitectureConstants'
export { getMenuText, type MenuText, MENU_KEYS } from './menuConstants'
export { LAYOUT_CONSTANTS } from './layoutConstants'
export { MESSAGE_CONSTANTS } from './messages'
export { STATUS_CODES } from './statusCodes'
export { TABLE_CONSTANTS } from './table'