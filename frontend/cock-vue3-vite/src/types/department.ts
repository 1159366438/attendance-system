/**
 * 部门和员工相关类型定义
 * 定义部门管理和员工相关的类型接口
 * @author Attendance System Team
 * @since 2026-03-21
 * @version v1.1.0-alpha.1
 */

// 部门类型
export interface Department {
  id?: number;              // 主键ID
  name?: string;            // 部门名称
  description?: string;     // 部门描述
  parentId?: number;        // 父级部门ID
  managerId?: number;       // 部门负责人ID
  createTime?: string;      // 创建时间
  updateTime?: string;      // 更新时间
  isDeleted?: number;       // 删除标识
}

// 员工类型
export interface Employee {
  id?: number;              // 主键ID
  username?: string;        // 用户名
  age?: number;             // 年龄
  gender?: number;          // 性别 0-女 1-男
  avatar?: string;          // 头像
  email?: string;           // 邮箱
  phone?: string;           // 电话
  position?: string;        // 职位
  departmentId?: number;    // 部门ID
  createTime?: string;      // 创建时间
  updateTime?: string;      // 更新时间
  isDeleted?: number;       // 删除标识
}

// 部门树节点类型
export interface DepartmentTreeNode extends Department {
  children?: DepartmentTreeNode[];  // 子部门
  employees?: Employee[];           // 部门员工
}