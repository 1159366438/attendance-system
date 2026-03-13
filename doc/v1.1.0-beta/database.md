# v1.1.0-beta 数据库设计文档

**版本**: v1.1.0-beta  
**更新时间**: 2026-03-13  
**状态**: 设计中  

## 1. 概述

v1.1.0-beta 版本将引入用户管理和权限控制系统，需要设计新的数据库表结构以支持部门管理、基于角色的访问控制（RBAC）等功能。本文档详细描述了新增的数据表结构及其关系。

## 2. 数据库表结构

### 2.1 部门表 (department)

存储部门信息

| 字段名 | 类型 | 长度 | 是否为空 | 默认值 | 描述 |
|--------|------|------|----------|--------|------|
| id | INT | 11 | NOT NULL | AUTO_INCREMENT | 部门ID，主键 |
| name | VARCHAR | 100 | NOT NULL | - | 部门名称 |
| description | TEXT | - | NULL | - | 部门描述 |
| parent_id | INT | 11 | NULL | 0 | 父部门ID，顶级部门为0 |
| manager_id | INT | 11 | NULL | - | 部门负责人ID，关联用户表 |
| status | TINYINT | 1 | NOT NULL | 1 | 状态：1-启用，0-禁用 |
| sort_order | INT | 11 | NULL | 0 | 排序 |
| create_time | DATETIME | - | NOT NULL | CURRENT_TIMESTAMP | 创建时间 |
| update_time | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |
| is_deleted | TINYINT | 1 | NOT NULL | 0 | 删除标识：0-未删除，1-已删除 |

**索引**：
- PRIMARY KEY (id)
- INDEX idx_parent_id (parent_id)
- INDEX idx_manager_id (manager_id)
- INDEX idx_status (status)

### 2.2 角色表 (role)

存储角色信息

| 字段名 | 类型 | 长度 | 是否为空 | 默认值 | 描述 |
|--------|------|------|----------|--------|------|
| id | INT | 11 | NOT NULL | AUTO_INCREMENT | 角色ID，主键 |
| name | VARCHAR | 100 | NOT NULL | - | 角色名称 |
| description | TEXT | - | NULL | - | 角色描述 |
| status | TINYINT | 1 | NOT NULL | 1 | 状态：1-启用，0-禁用 |
| create_time | DATETIME | - | NOT NULL | CURRENT_TIMESTAMP | 创建时间 |
| update_time | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |
| is_deleted | TINYINT | 1 | NOT NULL | 0 | 删除标识：0-未删除，1-已删除 |

**索引**：
- PRIMARY KEY (id)
- INDEX idx_status (status)

### 2.3 权限表 (permission)

存储权限信息

| 字段名 | 类型 | 长度 | 是否为空 | 默认值 | 描述 |
|--------|------|------|----------|--------|------|
| id | INT | 11 | NOT NULL | AUTO_INCREMENT | 权限ID，主键 |
| name | VARCHAR | 100 | NOT NULL | - | 权限名称 |
| code | VARCHAR | 100 | NOT NULL | - | 权限代码，如"user:read" |
| description | TEXT | - | NULL | - | 权限描述 |
| type | VARCHAR | 50 | NULL | "function" | 权限类型：function-功能权限，data-数据权限 |
| parent_id | INT | 11 | NULL | 0 | 父权限ID，顶级权限为0 |
| status | TINYINT | 1 | NOT NULL | 1 | 状态：1-启用，0-禁用 |
| sort_order | INT | 11 | NULL | 0 | 排序 |
| create_time | DATETIME | - | NOT NULL | CURRENT_TIMESTAMP | 创建时间 |
| update_time | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |
| is_deleted | TINYINT | 1 | NOT NULL | 0 | 删除标识：0-未删除，1-已删除 |

**索引**：
- PRIMARY KEY (id)
- UNIQUE KEY uk_code (code)
- INDEX idx_parent_id (parent_id)
- INDEX idx_type (type)
- INDEX idx_status (status)

### 2.4 用户角色关联表 (user_role)

存储用户与角色的关联关系

| 字段名 | 类型 | 长度 | 是否为空 | 默认值 | 描述 |
|--------|------|------|----------|--------|------|
| id | INT | 11 | NOT NULL | AUTO_INCREMENT | 关联ID，主键 |
| user_id | INT | 11 | NOT NULL | - | 用户ID，关联用户表 |
| role_id | INT | 11 | NOT NULL | - | 角色ID，关联角色表 |
| assigned_by | INT | 11 | NULL | - | 分配人ID，关联用户表 |
| assigned_time | DATETIME | - | NOT NULL | CURRENT_TIMESTAMP | 分配时间 |
| status | TINYINT | 1 | NOT NULL | 1 | 状态：1-启用，0-禁用 |
| create_time | DATETIME | - | NOT NULL | CURRENT_TIMESTAMP | 创建时间 |
| update_time | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |

**索引**：
- PRIMARY KEY (id)
- UNIQUE KEY uk_user_role (user_id, role_id)
- INDEX idx_user_id (user_id)
- INDEX idx_role_id (role_id)
- INDEX idx_assigned_by (assigned_by)
- INDEX idx_status (status)

### 2.5 角色权限关联表 (role_permission)

存储角色与权限的关联关系

| 字段名 | 类型 | 长度 | 是否为空 | 默认值 | 描述 |
|--------|------|------|----------|--------|------|
| id | INT | 11 | NOT NULL | AUTO_INCREMENT | 关联ID，主键 |
| role_id | INT | 11 | NOT NULL | - | 角色ID，关联角色表 |
| permission_id | INT | 11 | NOT NULL | - | 权限ID，关联权限表 |
| assigned_by | INT | 11 | NULL | - | 分配人ID，关联用户表 |
| assigned_time | DATETIME | - | NOT NULL | CURRENT_TIMESTAMP | 分配时间 |
| create_time | DATETIME | - | NOT NULL | CURRENT_TIMESTAMP | 创建时间 |
| update_time | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |

**索引**：
- PRIMARY KEY (id)
- UNIQUE KEY uk_role_permission (role_id, permission_id)
- INDEX idx_role_id (role_id)
- INDEX idx_permission_id (permission_id)
- INDEX idx_assigned_by (assigned_by)

## 3. 数据库关系图

```
用户表 (user) 
    |
    |---< 用户角色关联表 (user_role) >---| 
                                        |
                                        |---< 角色表 (role)
                                             |
                                             |---< 角色权限关联表 (role_permission) >---|
                                                                                       |
                                                                                       |---< 权限表 (permission)

部门表 (department)
    |
    |---< 用户表 (user) [manager_id] 
```

## 4. SQL 创建语句

```sql
-- 部门表
CREATE TABLE `department` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '部门ID',
  `name` VARCHAR(100) NOT NULL COMMENT '部门名称',
  `description` TEXT COMMENT '部门描述',
  `parent_id` INT DEFAULT 0 COMMENT '父部门ID，顶级部门为0',
  `manager_id` INT COMMENT '部门负责人ID，关联用户表',
  `status` TINYINT NOT NULL DEFAULT 1 COMMENT '状态：1-启用，0-禁用',
  `sort_order` INT DEFAULT 0 COMMENT '排序',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_deleted` TINYINT NOT NULL DEFAULT 0 COMMENT '删除标识：0-未删除，1-已删除',
  PRIMARY KEY (`id`),
  INDEX `idx_parent_id` (`parent_id`),
  INDEX `idx_manager_id` (`manager_id`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='部门表';

-- 角色表
CREATE TABLE `role` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `name` VARCHAR(100) NOT NULL COMMENT '角色名称',
  `description` TEXT COMMENT '角色描述',
  `status` TINYINT NOT NULL DEFAULT 1 COMMENT '状态：1-启用，0-禁用',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_deleted` TINYINT NOT NULL DEFAULT 0 COMMENT '删除标识：0-未删除，1-已删除',
  PRIMARY KEY (`id`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色表';

-- 权限表
CREATE TABLE `permission` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '权限ID',
  `name` VARCHAR(100) NOT NULL COMMENT '权限名称',
  `code` VARCHAR(100) NOT NULL COMMENT '权限代码，如"user:read"',
  `description` TEXT COMMENT '权限描述',
  `type` VARCHAR(50) DEFAULT 'function' COMMENT '权限类型：function-功能权限，data-数据权限',
  `parent_id` INT DEFAULT 0 COMMENT '父权限ID，顶级权限为0',
  `status` TINYINT NOT NULL DEFAULT 1 COMMENT '状态：1-启用，0-禁用',
  `sort_order` INT DEFAULT 0 COMMENT '排序',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_deleted` TINYINT NOT NULL DEFAULT 0 COMMENT '删除标识：0-未删除，1-已删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_code` (`code`),
  INDEX `idx_parent_id` (`parent_id`),
  INDEX `idx_type` (`type`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='权限表';

-- 用户角色关联表
CREATE TABLE `user_role` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '关联ID',
  `user_id` INT NOT NULL COMMENT '用户ID，关联用户表',
  `role_id` INT NOT NULL COMMENT '角色ID，关联角色表',
  `assigned_by` INT COMMENT '分配人ID，关联用户表',
  `assigned_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '分配时间',
  `status` TINYINT NOT NULL DEFAULT 1 COMMENT '状态：1-启用，0-禁用',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_role` (`user_id`, `role_id`),
  INDEX `idx_user_id` (`user_id`),
  INDEX `idx_role_id` (`role_id`),
  INDEX `idx_assigned_by` (`assigned_by`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户角色关联表';

-- 角色权限关联表
CREATE TABLE `role_permission` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '关联ID',
  `role_id` INT NOT NULL COMMENT '角色ID，关联角色表',
  `permission_id` INT NOT NULL COMMENT '权限ID，关联权限表',
  `assigned_by` INT COMMENT '分配人ID，关联用户表',
  `assigned_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '分配时间',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_role_permission` (`role_id`, `permission_id`),
  INDEX `idx_role_id` (`role_id`),
  INDEX `idx_permission_id` (`permission_id`),
  INDEX `idx_assigned_by` (`assigned_by`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色权限关联表';
```

## 5. 初始化数据

```sql
-- 插入初始角色
INSERT INTO `role` (`id`, `name`, `description`) VALUES
(1, '超级管理员', '拥有系统所有权限'),
(2, '管理员', '拥有大部分管理权限'),
(3, '普通用户', '基本的用户权限');

-- 插入初始权限
INSERT INTO `permission` (`id`, `name`, `code`, `description`) VALUES
(1, '用户管理-查看', 'user:read', '查看用户信息的权限'),
(2, '用户管理-编辑', 'user:write', '编辑用户信息的权限'),
(3, '部门管理-查看', 'department:read', '查看部门信息的权限'),
(4, '部门管理-编辑', 'department:write', '编辑部门信息的权限'),
(5, '角色管理-查看', 'role:read', '查看角色信息的权限'),
(6, '角色管理-编辑', 'role:write', '编辑角色信息的权限');
```

## 6. 注意事项

1. 所有表均采用软删除策略，通过 `is_deleted` 字段标识删除状态
2. 时间字段使用 DATETIME 和 TIMESTAMP 类型，分别记录创建时间和更新时间
3. 所有外键关系应在应用层面进行验证，数据库层面不强制设置外键约束以提高性能
4. 索引设计考虑了常用查询场景，包括按状态、按ID等查询
5. 权限代码采用 "资源:动作" 的格式，便于权限控制系统的实现