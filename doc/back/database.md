# v1.1.0-beta 数据库设计文档

<p align="center">
  <strong>版本：v1.1.0-beta</strong> | 
  <strong>最后更新：2026-03-14</strong> | 
  <strong>数据库：MySQL 8.0</strong>
</p>

## 目录

- [1. 概述](#1-概述)
  - [1.1 设计原则](#11-设计原则)
  - [1.2 命名规范](#12-命名规范)
  - [1.3 字符集与引擎](#13-字符集与引擎)
- [2. 表结构设计](#2-表结构设计)
  - [2.1 用户表 (user)](#21-用户表-user)
  - [2.2 打卡记录表 (punch_record)](#22-打卡记录表-punch_record)
  - [2.3 部门表 (department)](#23-部门表-department)
  - [2.4 角色表 (role)](#24-角色表-role)
  - [2.5 用户角色关联表 (user_role)](#25-用户角色关联表-user_role)
  - [2.6 权限表 (permission)](#26-权限表-permission)
  - [2.7 角色权限关联表 (role_permission)](#27-角色权限关联表-role_permission)
- [3. 表关系与ER图](#3-表关系与er图)
  - [3.1 外键关系](#31-外键关系)
  - [3.2 ER图（文字描述）](#32-er图文字描述)
- [4. 索引设计](#4-索引设计)
- [5. SQL DDL](#5-sql-ddl)
- [6. 测试数据](#6-测试数据)
- [7. 注意事项与扩展建议](#7-注意事项与扩展建议)
  - [7.1 安全性](#71-安全性)
  - [7.2 性能优化](#72-性能优化)
  - [7.3 后续版本扩展](#73-后续版本扩展)
- [8. 版本历史](#8-版本历史)

---

## 1. 概述

本文档描述了考勤系统（Attendance System）的数据库设计方案，涵盖表结构、字段定义、关系设计、索引策略及 SQL 脚本。数据库设计遵循**第三范式（3NF）**，兼顾查询效率与扩展性，为后续功能迭代（如 RBAC、规则引擎）预留空间。

### 1.1 设计原则
- **完整性**：通过主键、外键、非空约束保证数据一致性。
- **一致性**：使用统一的时间格式（TIMESTAMP）和枚举值（INT 类型，代码层定义含义）。
- **扩展性**：字段类型选择考虑未来可能的变化，如 `varchar` 长度适当冗余。
- **性能**：合理建立索引，避免全表扫描。
- **安全性**：用户密码使用BCrypt算法加密存储，应用层不返回密码字段给客户端。

### 1.2 命名规范
- **数据库名**：小写字母，下划线分隔，如 `attendance_system`（当前脚本为 `mydatebase`，建议实际部署时修改）。
- **表名**：小写字母，下划线分隔，单数形式（如 `user`、`punch_record`）。
- **字段名**：小写字母，下划线分隔，避免使用数据库关键字。
- **主键**：统一命名为 `id`。
- **外键**：关联表名 + `_id`，如 `user_id`。
- **索引名**：`idx_` + 字段名（或多个字段简写）。

### 1.3 字符集与引擎
- **字符集**：`utf8mb4`，支持完整的 Unicode 字符（如表情符号）。
- **排序规则**：`utf8mb4_unicode_ci`，基于 Unicode 的通用排序。
- **存储引擎**：`InnoDB`，支持事务、外键、行级锁，适合业务系统。

---

## 2. 表结构设计

### 2.1 用户表 (user)

存储系统用户的基本信息。

| 字段名 | 数据类型 | 约束 | 默认值 | 是否可为空 | 注释 |
|--------|----------|------|--------|------------|------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | - | NOT NULL | 用户唯一标识，自增主键 |
| username | VARCHAR(50) | UNIQUE | - | NOT NULL | 用户名，唯一，用于登录 |
| password | VARCHAR(255) | - | BCrypt('123456') | NOT NULL | 加密后的密码，初始默认值为 '123456' 的哈希 |
| age | INT | - | - | YES | 年龄（可选字段） |
| avatar | VARCHAR(255) | - | - | YES | 头像文件路径或URL |
| create_time | TIMESTAMP | - | CURRENT_TIMESTAMP | NOT NULL | 记录创建时间 |

**字段说明**：
- `password` 使用 BCrypt 算法加密，长度 255 足以存储未来可能更长的哈希值。
- `avatar` 存储相对路径或 CDN URL，便于静态资源分离。
- `create_time` 自动填充当前时间，不随更新改变。

### 2.2 打卡记录表 (punch_record)

存储用户的打卡记录。

| 字段名 | 数据类型 | 约束 | 默认值 | 是否可为空 | 注释 |
|--------|----------|------|--------|------------|------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | - | NOT NULL | 记录唯一标识，自增主键 |
| user_id | INT | FOREIGN KEY (user.id) | - | NOT NULL | 用户ID，关联用户表 |
| check_in_time | TIMESTAMP | - | - | NOT NULL | 打卡时间（UTC） |
| check_in_type | TINYINT | - | - | NOT NULL | 打卡类型：1-上班 2-下班 3-加班 |
| check_in_status | TINYINT | - | - | NOT NULL | 打卡状态：1-正常 2-迟到 3-早退 4-旷工 |
| check_in_location | VARCHAR(100) | - | - | YES | 打卡地点（如“公司”、“家”或具体地址） |
| create_time | TIMESTAMP | - | CURRENT_TIMESTAMP | NOT NULL | 记录创建时间 |
| update_time | TIMESTAMP | - | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | NOT NULL | 记录最后更新时间 |

**字段说明**：
- `user_id` 外键，级联删除和更新，保证数据完整性。
- `check_in_type` 和 `check_in_status` 使用 `TINYINT` 节省空间，具体含义在应用层维护。
- `check_in_location` 预留长度 100，可存储文本描述或地理坐标字符串（如 "经度,纬度"）。
- `update_time` 自动更新，用于追踪记录变更。

---

## 3. 表关系与ER图

### 3.1 外键关系

- **主表**：`user`（一方）
- **从表**：`punch_record`（多方）
- **关系**：一个用户可以有多次打卡记录，一条打卡记录仅属于一个用户。
- **约束**：`FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE`

### 3.2 ER图（文字描述）

```
+----------------+          +---------------------+
|      user      |          |    punch_record     |
+----------------+          +---------------------+
| id (PK)        |<-------- | user_id (FK)        |
| username       |          | id (PK)             |
| password       |          | check_in_time       |
| age            |          | check_in_type       |
| avatar         |          | check_in_status     |
| create_time    |          | check_in_location   |
+----------------+          | create_time         |
                            | update_time         |
                            +---------------------+
```

---

## 4. 索引设计

为提高查询性能，在以下字段建立索引：

| 索引名 | 所属表 | 索引字段 | 索引类型 | 说明 |
|--------|--------|----------|----------|------|
| PRIMARY | user | id | 主键索引 | 聚簇索引 |
| idx_username | user | username | 唯一索引 | 加速登录查询 |
| PRIMARY | punch_record | id | 主键索引 | 聚簇索引 |
| idx_user_id | punch_record | user_id | 普通索引 | 加速按用户查询打卡记录 |
| idx_check_in_time | punch_record | check_in_time | 普通索引 | 加速按时间范围查询 |

**附加建议**：
- 若查询经常同时使用 `user_id` 和 `check_in_time` 组合条件，可考虑建立复合索引 `(user_id, check_in_time)`。
- 当前数据量较小，可先按需添加，后续通过慢查询日志优化。

---

## 5. SQL DDL

```sql
-- 创建数据库（实际部署时请替换数据库名）
CREATE DATABASE IF NOT EXISTS `attendance_system`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `attendance_system`;

-- 用户表
CREATE TABLE IF NOT EXISTS `user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户ID，主键',
  `username` VARCHAR(50) NOT NULL COMMENT '用户名，唯一',
  `password` VARCHAR(255) NOT NULL DEFAULT '$2a$10$NQVgZc5sQB7FvHMRxJrwkedBqMTMtwL0C2YdytKE.Ur9eyo9ydwYm' COMMENT 'BCrypt加密密码，默认123456',
  `age` INT UNSIGNED DEFAULT NULL COMMENT '年龄',
  `avatar` VARCHAR(255) DEFAULT NULL COMMENT '头像URL',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- 打卡记录表
CREATE TABLE IF NOT EXISTS `punch_record` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '记录ID，主键',
  `user_id` INT UNSIGNED NOT NULL COMMENT '用户ID，外键关联user.id',
  `check_in_time` TIMESTAMP NOT NULL COMMENT '打卡时间',
  `check_in_type` TINYINT UNSIGNED NOT NULL COMMENT '打卡类型：1-上班 2-下班 3-加班',
  `check_in_status` TINYINT UNSIGNED NOT NULL COMMENT '打卡状态：1-正常 2-迟到 3-早退 4-旷工',
  `check_in_location` VARCHAR(100) DEFAULT NULL COMMENT '打卡地点',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '记录创建时间',
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_check_in_time` (`check_in_time`),
  CONSTRAINT `fk_punch_record_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='打卡记录表';
```

---

## 6. 测试数据

```sql
-- 插入测试用户（密码均为123456的BCrypt哈希）
INSERT INTO `user` (`username`, `password`, `age`) VALUES 
('admin', '$2a$10$byZHeNtemB1DFSAPJgGLzuuVLHig9xsUq4fbVaip806VYU1mFO9BG', 25); -- 密码为 '123456' 的BCrypt哈希值
INSERT INTO `user` (`username`, `password`, `age`) VALUES 
('user1', '$2a$10$byZHeNtemB1DFSAPJgGLzuuVLHig9xsUq4fbVaip806VYU1mFO9BG', 30); -- 密码为 '123456' 的BCrypt哈希值
INSERT INTO `user` (`username`, `password`, `age`) VALUES 
('user2', '$2a$10$byZHeNtemB1DFSAPJgGLzuuVLHig9xsUq4fbVaip806VYU1mFO9BG', 28); -- 密码为 '123456' 的BCrypt哈希值

-- 插入测试打卡记录（假设admin的打卡）
INSERT INTO `punch_record` (`user_id`, `check_in_time`, `check_in_type`, `check_in_status`, `check_in_location`) VALUES
(1, '2026-03-12 08:30:00', 1, 1, '公司'),
(1, '2026-03-12 18:00:00', 2, 1, '公司'),
(1, '2026-03-13 08:45:00', 1, 2, '公司'), -- 迟到
(2, '2026-03-12 08:20:00', 1, 1, '公司');
```

### 2.3 部门表 (department)

部门表用于存储组织架构信息，支持多级部门结构。

#### 表结构
| 字段名 | 类型 | 长度 | 是否为空 | 默认值 | 描述 |
|--------|------|------|----------|--------|------|
| id | INT | 11 | NOT NULL | AUTO_INCREMENT | 部门ID，主键 |
| name | VARCHAR | 100 | NOT NULL | - | 部门名称 |
| description | TEXT | - | NULL | - | 部门描述 |
| parent_id | INT | 11 | NULL | 0 | 父部门ID，顶级部门为0 |
| manager_id | INT | 11 | NULL | - | 部门负责人ID，关联user表 |
| create_time | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP | 创建时间 |
| update_time | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |
| is_deleted | TINYINT | 1 | NOT NULL | 0 | 逻辑删除标识，0-未删除，1-已删除 |

#### 索引
- PRIMARY KEY (id) - 主键索引
- INDEX idx_parent_id (parent_id) - 父部门ID索引
- INDEX idx_manager_id (manager_id) - 负责人ID索引
- UNIQUE uk_name_parent (name, parent_id) - 部门名称在同级部门中唯一

#### 示例数据
```sql
INSERT INTO `department` (`name`, `description`, `parent_id`, `manager_id`) VALUES
('技术部', '负责公司技术研发工作', 0, 1),
('人事部', '负责人力资源管理工作', 0, 2),
('前端组', '负责前端开发工作', 1, 3),
('后端组', '负责后端开发工作', 1, 4);
```

### 2.4 角色表 (role)

角色表用于存储系统角色信息，支持RBAC权限控制模型。

#### 表结构
| 字段名 | 类型 | 长度 | 是否为空 | 默认值 | 描述 |
|--------|------|------|----------|--------|------|
| id | INT | 11 | NOT NULL | AUTO_INCREMENT | 角色ID，主键 |
| name | VARCHAR | 50 | NOT NULL | - | 角色名称 |
| description | TEXT | - | NULL | - | 角色描述 |
| create_time | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP | 创建时间 |
| update_time | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |
| is_deleted | TINYINT | 1 | NOT NULL | 0 | 逻辑删除标识，0-未删除，1-已删除 |

#### 索引
- PRIMARY KEY (id) - 主键索引
- UNIQUE uk_name (name) - 角色名称唯一索引

#### 示例数据
```sql
INSERT INTO `role` (`name`, `description`) VALUES
('管理员', '拥有系统最高权限'),
('普通用户', '基本的打卡和查看权限'),
('部门主管', '管理本部门员工考勤'),
('HR', '人事管理权限');
```

### 2.5 用户角色关联表 (user_role)

用户角色关联表用于建立用户与角色的多对多关系。

#### 表结构
| 字段名 | 类型 | 长度 | 是否为空 | 默认值 | 描述 |
|--------|------|------|----------|--------|------|
| id | INT | 11 | NOT NULL | AUTO_INCREMENT | 关联ID，主键 |
| user_id | INT | 11 | NOT NULL | - | 用户ID，关联user表 |
| role_id | INT | 11 | NOT NULL | - | 角色ID，关联role表 |
| create_time | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP | 创建时间 |
| update_time | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |

#### 索引
- PRIMARY KEY (id) - 主键索引
- INDEX idx_user_id (user_id) - 用户ID索引
- INDEX idx_role_id (role_id) - 角色ID索引
- UNIQUE uk_user_role (user_id, role_id) - 用户-角色唯一索引

#### 示例数据
```sql
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES
(1, 1), -- admin用户拥有管理员角色
(2, 2), -- user1用户拥有普通用户角色
(3, 3); -- user2用户拥有部门主管角色
```

### 2.6 权限表 (permission)

权限表用于存储系统中的各种权限点。

#### 表结构
| 字段名 | 类型 | 长度 | 是否为空 | 默认值 | 描述 |
|--------|------|------|----------|--------|------|
| id | INT | 11 | NOT NULL | AUTO_INCREMENT | 权限ID，主键 |
| name | VARCHAR | 100 | NOT NULL | - | 权限名称 |
| code | VARCHAR | 100 | NOT NULL | - | 权限代码，如 user:create, department:view |
| description | TEXT | - | NULL | - | 权限描述 |
| parent_id | INT | 11 | NULL | 0 | 父权限ID，顶级权限为0 |
| level | TINYINT | 3 | NOT NULL | 1 | 权限层级 |
| sort_order | INT | 11 | NOT NULL | 0 | 排序序号 |
| create_time | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP | 创建时间 |
| update_time | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |
| is_deleted | TINYINT | 1 | NOT NULL | 0 | 逻辑删除标识，0-未删除，1-已删除 |

#### 索引
- PRIMARY KEY (id) - 主键索引
- INDEX idx_parent_id (parent_id) - 父权限ID索引
- UNIQUE uk_code (code) - 权限代码唯一索引

#### 示例数据
```sql
INSERT INTO `permission` (`name`, `code`, `description`, `parent_id`, `level`) VALUES
('用户管理', 'user:*', '用户管理模块', 0, 1),
('用户创建', 'user:create', '创建用户权限', 1, 2),
('用户查看', 'user:read', '查看用户权限', 1, 2),
('用户更新', 'user:update', '更新用户权限', 1, 2),
('用户删除', 'user:delete', '删除用户权限', 1, 2),
('部门管理', 'department:*', '部门管理模块', 0, 1),
('部门创建', 'department:create', '创建部门权限', 6, 2),
('部门查看', 'department:read', '查看部门权限', 6, 2);
```

### 2.7 角色权限关联表 (role_permission)

角色权限关联表用于建立角色与权限的多对多关系。

#### 表结构
| 字段名 | 类型 | 长度 | 是否为空 | 默认值 | 描述 |
|--------|------|------|----------|--------|------|
| id | INT | 11 | NOT NULL | AUTO_INCREMENT | 关联ID，主键 |
| role_id | INT | 11 | NOT NULL | - | 角色ID，关联role表 |
| permission_id | INT | 11 | NOT NULL | - | 权限ID，关联permission表 |
| create_time | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP | 创建时间 |
| update_time | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |

#### 索引
- PRIMARY KEY (id) - 主键索引
- INDEX idx_role_id (role_id) - 角色ID索引
- INDEX idx_permission_id (permission_id) - 权限ID索引
- UNIQUE uk_role_permission (role_id, permission_id) - 角色-权限唯一索引

#### 示例数据
```sql
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES
(1, 1), -- 管理员拥有用户管理权限
(1, 2), -- 管理员拥有用户创建权限
(1, 3), -- 管理员拥有用户查看权限
(1, 4), -- 管理员拥有用户更新权限
(1, 5), -- 管理员拥有用户删除权限
(1, 6), -- 管理员拥有部门管理权限
(1, 7), -- 管理员拥有部门创建权限
(1, 8); -- 管理员拥有部门查看权限
```

---

## 7. 注意事项与扩展建议

### 7.1 安全性
- **密码加密**：使用 BCrypt 强哈希算法，避免明文存储。
- **SQL 注入防护**：应用层应使用参数化查询或 ORM 框架。
- **敏感字段脱敏**：如 `password` 不应在 API 响应中返回。

### 7.2 性能优化
- **分表分库**：当打卡记录量级达到百万以上，可考虑按时间分区或分表。
- **缓存**：引入 Redis 缓存热点用户信息，减少数据库查询。
- **定期归档**：历史打卡记录可迁移至归档表，保持主表轻量。

### 7.3 后续版本扩展
- **v1.2.0（打卡规则）**：需新增 `attendance_rule` 表，存储规则配置，如上下班时间、迟到阈值等。
- **v1.3.0（报表导出）**：可预先在 `punch_record` 添加冗余字段（如统计标志）以加速报表生成，或建立汇总表。
- **v1.4.0（Redis缓存）**：设计缓存键与失效策略，避免数据库压力。

**建议预留字段**：在 `user` 表中可预留一个 `JSON` 类型字段（MySQL 5.7+）用于存储扩展属性，但优先考虑通过关联表实现灵活扩展。

---

## 8. 版本历史

| 版本 | 日期 | 变更内容 |
|------|------|----------|
| v1.0.0-beta | 2026-03-12 | 初始版本，包含用户表和打卡记录表，定义基础字段与索引 |
| v1.0.1-beta | 2026-03-13 | 内测版更新，修复登录认证问题，更新BCrypt密码哈希值，优化数据库设计，加强密码字段安全性 |
| v1.1.0-beta | 2026-03-14 | 内测版，新增部门、角色、权限管理相关表结构，实现RBAC权限控制模型，支持用户组织架构管理 |
---