/**
 * 菜单文本管理模块
 * 统一管理系统所有菜单的显示文本、类型约束及工具方法
 * 键说明：与el-menu组件的index属性一一对应
 */
import { t } from '../locales'

// 类型约束：菜单Key类型
export type MenuKey = 'system' | 'systemName' | 'today' | 'record' | '2' | '3' | '4';

// 类型约束：菜单文本类型
export type MenuText = string;

/**
 * 根据菜单Key获取对应的显示文本
 * @param key 菜单索引（支持字符串/数字类型）
 * @param defaultText 兜底文本（默认：员工内网）
 * @returns 菜单显示文本
 */
export function getMenuText(key: string | number, defaultText: MenuText = '员工内网'): MenuText {
  // 尝试从国际化资源获取
  const keyStr = String(key) as MenuKey;
  const localizedKey = `menu.${keyStr}`;
  return t(localizedKey, defaultText);
}

/**
 * 获取所有菜单Key列表
 * @returns 菜单Key数组
 */
export function getAllMenuKeys(): MenuKey[] {
  return ['system', 'systemName', 'today', 'record', '2', '3', '4'];
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

/**
 * 安全设置菜单Key（核心：解决TS类型报错）
 * @param key 待设置的菜单Key（字符串/数字）
 * @param defaultKey 默认兜底Key（默认：today）
 * @returns 有效的MenuKey类型
 */
export function setSafeMenuKey(key: string | number, defaultKey: MenuKey = 'today'): MenuKey {
  const keyStr = String(key);
  // 验证key有效则返回，无效则返回默认值
  return isValidMenuKey(keyStr) ? (keyStr as MenuKey) : defaultKey;
}