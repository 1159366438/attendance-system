-- 角色表和用户角色关联表结构定义
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