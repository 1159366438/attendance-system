-- 考勤系统数据库初始化脚本
-- 按模块顺序创建数据库表结构

-- 设置字符集
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 创建数据库（如果不存在）
CREATE DATABASE IF NOT EXISTS `attendance_system`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `attendance_system`;

-- 1. 用户表结构定义
-- 包含用户基本信息：ID、用户名、密码、年龄、头像、性别、创建时间

-- 用户表
CREATE TABLE IF NOT EXISTS `user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户ID，主键',
  `username` VARCHAR(50) NOT NULL COMMENT '用户名，唯一',
  `password` VARCHAR(255) NOT NULL DEFAULT '$2a$10$NQVgZc5sQB7FvHMRxJrwkedBqMTMtwL0C2YdytKE.Ur9eyo9ydwYm' COMMENT 'BCrypt加密密码，默认123456',
  `age` INT UNSIGNED DEFAULT NULL COMMENT '年龄',
  `avatar` VARCHAR(255) DEFAULT NULL COMMENT '头像URL',
  `gender` TINYINT DEFAULT 0 COMMENT '性别（0-未知 1-男 2-女）',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- 插入测试用户（密码均为123456的BCrypt哈希）
INSERT IGNORE INTO `user` (`username`, `password`, `age`, `gender`) VALUES 
('admin', '$2a$10$byZHeNtemB1DFSAPJgGLzuuVLHig9xsUq4fbVaip806VYU1mFO9BG', 25, 1), -- 密码为 '123456' 的BCrypt哈希值
('user1', '$2a$10$byZHeNtemB1DFSAPJgGLzuuVLHig9xsUq4fbVaip806VYU1mFO9BG', 30, 2), -- 密码为 '123456' 的BCrypt哈希值
('user2', '$2a$10$byZHeNtemB1DFSAPJgGLzuuVLHig9xsUq4fbVaip806VYU1mFO9BG', 28, 0); -- 密码为 '123456' 的BCrypt哈希值

-- 2. 打卡记录表结构定义
-- 包含打卡记录：ID、用户ID、打卡时间、打卡类型、打卡状态、打卡地点、创建时间、更新时间

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

-- 插入测试打卡记录（假设admin的打卡）
INSERT IGNORE INTO `punch_record` (`user_id`, `check_in_time`, `check_in_type`, `check_in_status`, `check_in_location`) VALUES
(1, '2026-03-12 08:30:00', 1, 1, '公司'),
(1, '2026-03-12 18:00:00', 2, 1, '公司'),
(1, '2026-03-13 08:45:00', 1, 2, '公司'), -- 迟到
(2, '2026-03-12 08:20:00', 1, 1, '公司');

-- 3. 部门表结构定义
-- 包含部门信息：ID、名称、描述、父部门ID、负责人ID、创建时间、更新时间、删除标识

-- 部门表
CREATE TABLE IF NOT EXISTS `department` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '部门ID，主键',
  `name` VARCHAR(100) NOT NULL COMMENT '部门名称',
  `description` TEXT DEFAULT NULL COMMENT '部门描述',
  `parent_id` INT UNSIGNED DEFAULT 0 COMMENT '父部门ID，顶级部门为0',
  `manager_id` INT UNSIGNED DEFAULT NULL COMMENT '部门负责人ID，关联user表',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_deleted` TINYINT NOT NULL DEFAULT 0 COMMENT '逻辑删除标识，0-未删除，1-已删除',
  PRIMARY KEY (`id`),
  INDEX `idx_parent_id` (`parent_id`),
  INDEX `idx_manager_id` (`manager_id`),
  UNIQUE KEY `uk_name_parent` (`name`, `parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='部门表';

-- 插入测试部门数据
INSERT IGNORE INTO `department` (`name`, `description`, `parent_id`, `manager_id`) VALUES
('技术部', '负责公司技术研发工作', 0, 1),
('人事部', '负责人力资源管理工作', 0, 2),
('前端组', '负责前端开发工作', 1, 3),
('后端组', '负责后端开发工作', 1, 4);

-- 4. 角色表和用户角色关联表结构定义
-- 包含角色信息和用户角色关联关系

-- 角色表
CREATE TABLE IF NOT EXISTS `role` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '角色ID，主键',
  `name` VARCHAR(50) NOT NULL COMMENT '角色名称',
  `description` TEXT DEFAULT NULL COMMENT '角色描述',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_deleted` TINYINT NOT NULL DEFAULT 0 COMMENT '逻辑删除标识，0-未删除，1-已删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色表';

-- 用户角色关联表
CREATE TABLE IF NOT EXISTS `user_role` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '关联ID，主键',
  `user_id` INT UNSIGNED NOT NULL COMMENT '用户ID，关联user表',
  `role_id` INT UNSIGNED NOT NULL COMMENT '角色ID，关联role表',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  INDEX `idx_user_id` (`user_id`),
  INDEX `idx_role_id` (`role_id`),
  UNIQUE KEY `uk_user_role` (`user_id`, `role_id`),
  CONSTRAINT `fk_user_role_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user_role_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户角色关联表';

-- 插入测试角色数据
INSERT IGNORE INTO `role` (`name`, `description`) VALUES
('管理员', '拥有系统最高权限'),
('普通用户', '基本的打卡和查看权限'),
('部门主管', '管理本部门员工考勤'),
('HR', '人事管理权限');

-- 插入测试用户角色关联数据
INSERT IGNORE INTO `user_role` (`user_id`, `role_id`) VALUES
(1, 1), -- admin用户拥有管理员角色
(2, 2), -- user1用户拥有普通用户角色
(3, 3); -- user2用户拥有部门主管角色

-- 5. 权限表和角色权限关联表结构定义
-- 包含权限信息和角色权限关联关系

-- 权限表
CREATE TABLE IF NOT EXISTS `permission` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '权限ID，主键',
  `name` VARCHAR(100) NOT NULL COMMENT '权限名称',
  `code` VARCHAR(100) NOT NULL COMMENT '权限代码，如 user:create, department:view',
  `description` TEXT DEFAULT NULL COMMENT '权限描述',
  `parent_id` INT UNSIGNED DEFAULT 0 COMMENT '父权限ID，顶级权限为0',
  `level` TINYINT NOT NULL DEFAULT 1 COMMENT '权限层级',
  `sort_order` INT NOT NULL DEFAULT 0 COMMENT '排序序号',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_deleted` TINYINT NOT NULL DEFAULT 0 COMMENT '逻辑删除标识，0-未删除，1-已删除',
  PRIMARY KEY (`id`),
  INDEX `idx_parent_id` (`parent_id`),
  UNIQUE KEY `uk_code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='权限表';

-- 角色权限关联表
CREATE TABLE IF NOT EXISTS `role_permission` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '关联ID，主键',
  `role_id` INT UNSIGNED NOT NULL COMMENT '角色ID，关联role表',
  `permission_id` INT UNSIGNED NOT NULL COMMENT '权限ID，关联permission表',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  INDEX `idx_role_id` (`role_id`),
  INDEX `idx_permission_id` (`permission_id`),
  UNIQUE KEY `uk_role_permission` (`role_id`, `permission_id`),
  CONSTRAINT `fk_role_permission_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_role_permission_permission` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色权限关联表';

-- 插入测试权限数据
INSERT IGNORE INTO `permission` (`name`, `code`, `description`, `parent_id`, `level`) VALUES
('用户管理', 'user:*', '用户管理模块', 0, 1),
('用户创建', 'user:create', '创建用户权限', 1, 2),
('用户查看', 'user:read', '查看用户权限', 1, 2),
('用户更新', 'user:update', '更新用户权限', 1, 2),
('用户删除', 'user:delete', '删除用户权限', 1, 2),
('部门管理', 'department:*', '部门管理模块', 0, 1),
('部门创建', 'department:create', '创建部门权限', 6, 2),
('部门查看', 'department:read', '查看部门权限', 6, 2);

-- 插入测试角色权限关联数据
INSERT IGNORE INTO `role_permission` (`role_id`, `permission_id`) VALUES
(1, 1), -- 管理员拥有用户管理权限
(1, 2), -- 管理员拥有用户创建权限
(1, 3), -- 管理员拥有用户查看权限
(1, 4), -- 管理员拥有用户更新权限
(1, 5), -- 管理员拥有用户删除权限
(1, 6), -- 管理员拥有部门管理权限
(1, 7), -- 管理员拥有部门创建权限
(1, 8); -- 管理员拥有部门查看权限

-- 重新启用外键检查
SET FOREIGN_KEY_CHECKS = 1;

-- 显示所有创建的表
SHOW TABLES;