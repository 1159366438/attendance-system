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
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- 插入测试用户（密码均为123456的BCrypt哈希）
INSERT IGNORE INTO `user` (`username`, `password`, `age`, `gender`) VALUES 
('admin', '$2a$10$byZHeNtemB1DFSAPJgGLzuuVLHig9xsUq4fbVaip806VYU1mFO9BG', 25, 1), -- 密码为 '123456' 的BCrypt哈希值
('user1', '$2a$10$byZHeNtemB1DFSAPJgGLzuuVLHig9xsUq4fbVaip806VYU1mFO9BG', 30, 2), -- 密码为 '123456' 的BCrypt哈希值
('user2', '$2a$10$byZHeNtemB1DFSAPJgGLzuuVLHig9xsUq4fbVaip806VYU1mFO9BG', 28, 0); -- 密码为 '123456' 的BCrypt哈希值