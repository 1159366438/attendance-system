# 用户表 (user)

存储系统用户的基本信息。

## 表结构

| 字段名 | 数据类型 | 约束 | 默认值 | 是否可为空 | 注释 |
|--------|----------|------|--------|------------|------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | - | NOT NULL | 用户唯一标识，自增主键 |
| username | VARCHAR(50) | UNIQUE | - | NOT NULL | 用户名，唯一，用于登录 |
| password | VARCHAR(255) | - | BCrypt('123456') | NOT NULL | 加密后的密码，初始默认值为 '123456' 的哈希 |
| age | INT | - | - | YES | 年龄（可选字段） |
| avatar | VARCHAR(255) | - | - | YES | 头像文件路径或URL |
| gender | TINYINT | - | 0 | YES | 性别（0-未知 1-男 2-女） |
| create_time | TIMESTAMP | - | CURRENT_TIMESTAMP | NOT NULL | 记录创建时间 |

### 字段说明
- `password` 使用 BCrypt 算法加密，长度 255 足以存储未来可能更长的哈希值。
- `avatar` 存储相对路径或 CDN URL，便于静态资源分离。
- `create_time` 自动填充当前时间，不随更新改变。
- `gender` 存储用户性别信息（0-未知 1-男 2-女）

## 索引设计

| 索引名 | 索引字段 | 索引类型 | 说明 |
|--------|----------|----------|------|
| PRIMARY | id | 主键索引 | 聚簇索引 |
| idx_username | username | 唯一索引 | 加速登录查询 |

## SQL DDL

```sql
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
```

## 测试数据

```sql
-- 插入测试用户（密码均为123456的BCrypt哈希）
INSERT INTO `user` (`username`, `password`, `age`, `gender`) VALUES 
('admin', '$2a$10$byZHeNtemB1DFSAPJgGLzuuVLHig9xsUq4fbVaip806VYU1mFO9BG', 25, 1); -- 密码为 '123456' 的BCrypt哈希值
INSERT INTO `user` (`username`, `password`, `age`, `gender`) VALUES 
('user1', '$2a$10$byZHeNtemB1DFSAPJgGLzuuVLHig9xsUq4fbVaip806VYU1mFO9BG', 30, 2); -- 密码为 '123456' 的BCrypt哈希值
INSERT INTO `user` (`username`, `password`, `age`, `gender`) VALUES 
('user2', '$2a$10$byZHeNtemB1DFSAPJgGLzuuVLHig9xsUq4fbVaip806VYU1mFO9BG', 28, 0); -- 密码为 '123456' 的BCrypt哈希值
```