/**
 * 部门和员工相关类型定义
 * 定义部门管理和员工相关的类型接口
 * @author Attendance System Team
 * @since 2026-03-21
 */

// 部门类型
export interface Department {
  id?: number;              // 主键ID
  name: string;             // 部门名称
  description?: string;     // 部门描述
  managerId?: number;       // 部门负责人ID
  parentId?: number;        // 父部门ID
  children?: Department[];  // 子部门列表
  hasChildren?: boolean;    // 是否有子部门（用于懒加载）
  createTime?: Date;        // 创建时间
  updateTime?: Date;        // 更新时间
  isDeleted?: number;       // 删除标识 (0-未删除, 1-已删除)
}

// 员工类型
export interface Employee {
  id?: number;              // 主键ID
  username: string;         // 用户名
  age?: number;             // 年龄
  avatar?: string;          // 头像
  gender?: number;          // 性别
  departmentId?: number;    // 部门ID
  email?: string;           // 邮箱
  phone?: string;           // 电话
  position?: string;        // 职位
  isDeleted?: number;       // 删除标识 (0-未删除, 1-已删除)
  createTime?: Date;        // 创建时间
  updateTime?: Date;        // 更新时间
}