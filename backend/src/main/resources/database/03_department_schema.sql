-- 部门表结构定义
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