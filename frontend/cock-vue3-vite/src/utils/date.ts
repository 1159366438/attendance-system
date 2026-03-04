/**
 * 日期时间工具函数
 */

/**
 * 格式化日期时间
 * @param date 日期对象或时间戳
 * @param format 格式化选项
 * @returns 格式化后的日期字符串
 */
export const formatDate = (date: Date | number, format: 'date' | 'time' | 'datetime' = 'datetime') => {
  const now = typeof date === 'number' ? new Date(date) : date;
  
  switch (format) {
    case 'date':
      return now.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      });
    case 'time':
      return now.toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    case 'datetime':
    default:
      return now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).replace(/\//g, '-');
  }
};