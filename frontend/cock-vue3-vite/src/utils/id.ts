/**
 * ID生成工具函数
 */

/**
 * 生成随机ID
 * @param length ID长度
 * @returns 随机ID字符串
 */
export const generateId = (length: number = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};