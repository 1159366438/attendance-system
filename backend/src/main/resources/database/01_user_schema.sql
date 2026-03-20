-- 用户表结构定义
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
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `department_id` INT UNSIGNED DEFAULT NULL COMMENT '部门ID',
  `email` VARCHAR(100) DEFAULT NULL COMMENT '邮箱',
  `phone` VARCHAR(20) DEFAULT NULL COMMENT '电话',
  `position` VARCHAR(50) DEFAULT NULL COMMENT '职位',
  `is_deleted` TINYINT DEFAULT 0 COMMENT '删除标识（0-未删除 1-已删除）',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_username` (`username`),
  KEY `idx_department_id` (`department_id`),
  KEY `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- 插入测试用户（密码均为123456的BCrypt哈希）
INSERT IGNORE INTO `user` (`username`, `password`, `age`, `gender`, `department_id`, `email`, `phone`, `position`, `is_deleted`) VALUES 
('admin', '$2a$10$byZHeNtemB1DFSAPJgGLzuuVLHig9xsUq4fbVaip806VYU1mFO9BG', 25, 1, 1, 'admin@company.com', '13800138001', 'System Administrator', 0),
('user1', '$2a$10$byZHeNtemB1DFSAPJgGLzuuVLHig9xsUq4fbVaip806VYU1mFO9BG', 30, 2, 2, 'user1@company.com', '13800138002', 'HR Manager', 0),
('user2', '$2a$10$byZHeNtemB1DFSAPJgGLzuuVLHig9xsUq4fbVaip806VYU1mFO9BG', 28, 0, 3, 'user2@company.com', '13800138003', 'Developer', 0),
('john_doe', '$2a$10$byZHeNtemB1DFSAPJgGLzuuVLHig9xsUq4fbVaip806VYU1mFO9BG', 32, 1, 3, 'john.doe@company.com', '13800138004', 'Senior Developer', 0),
('jane_smith', '$2a$10$byZHeNtemB1DFSAPJgGLzuuVLHig9xsUq4fbVaip806VYU1mFO9BG', 27, 2, 2, 'jane.smith@company.com', '13800138005', 'HR Specialist', 0),
('mike_wilson', '$2a$10$byZHeNtemB1DFSAPJgGLzuuVLHig9xsUq4fbVaip806VYU1mFO9BG', 29, 1, 4, 'mike.wilson@company.com', '13800138006', 'Financial Analyst', 0),
('sarah_jones', '$2a$10$byZHeNtemB1DFSAPJgGLzuuVLHig9xsUq4fbVaip806VYU1mFO9BG', 31, 2, 3, 'sarah.jones@company.com', '13800138007', 'Team Lead', 0);