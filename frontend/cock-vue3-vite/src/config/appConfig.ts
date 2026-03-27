/**
 * 应用全局配置
 * 集中管理所有硬编码值和配置参数
 * @author Attendance System Team
 * @since 2026-03-15
 * @version v1.1.0-alpha.1
 */

export const APP_CONFIG = {
  // API配置
  API: {
    TIMEOUT: 10000, // 请求超时时间（毫秒）
  },
  
  // UI配置
  UI: {
    COLORS: {
      PRIMARY_SUCCESS: '#67C23A',
      PRIMARY_ERROR: '#F56C6C',
      ACTIVE_TEXT: '#ffd04b',
      BACKGROUND_DARK: '#545c64',
      BACKGROUND_HIGHLIGHT: 'rgba(255, 208, 75, 0.2)',
    },
    SIZES: {
      MENU_WIDTH: 240, // 菜单宽度（像素）
      ICON_SIZE: 48, // 图标大小（像素）
      MENU_ITEM_HEIGHT: 48, // 菜单项高度（像素）
      CARD_WIDTH: 400, // 卡片宽度（像素）
    },
    TIMING: {
      AUTO_UPDATE_INTERVAL: 1000, // 自动更新间隔（毫秒）
    }
  },
  
  // 时间配置
  TIME: {
    MORNING_START: '08:00',
    MORNING_END: '09:30',
    AFTERNOON_START: '17:00',
    AFTERNOON_END: '18:30',
    DATE_FORMAT: 'YYYY-MM-DD',
    DATETIME_FORMAT: 'YYYY-MM-DD HH:mm:ss',
  },
  
  // 系统配置
  SYSTEM: {
    LAYOUT_GAP: 10, // 布局间距（像素）
    LAYOUT_PADDING: 10, // 布局内边距（像素）
    SHADOW_BLUR: 16, // 阴影模糊度（像素）
  }
};