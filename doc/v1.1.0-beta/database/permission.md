# 权限表 (permission)

权限表用于存储系统中的各种权限点。

## 表结构

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

## 索引设计

- PRIMARY KEY (id) - 主键索引
- INDEX idx_parent_id (parent_id) - 父权限ID索引
- UNIQUE uk_code (code) - 权限代码唯一索引

## SQL DDL

```sql
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
```

## 测试数据

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

# 角色权限关联表 (role_permission)

角色权限关联表用于建立角色与权限的多对多关系。

## 表结构

| 字段名 | 类型 | 长度 | 是否为空 | 默认值 | 描述 |
|--------|------|------|----------|--------|------|
| id | INT | 11 | NOT NULL | AUTO_INCREMENT | 关联ID，主键 |
| role_id | INT | 11 | NOT NULL | - | 角色ID，关联role表 |
| permission_id | INT | 11 | NOT NULL | - | 权限ID，关联permission表 |
| create_time | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP | 创建时间 |
| update_time | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |

## 索引设计

- PRIMARY KEY (id) - 主键索引
- INDEX idx_role_id (role_id) - 角色ID索引
- INDEX idx_permission_id (permission_id) - 权限ID索引
- UNIQUE uk_role_permission (role_id, permission_id) - 角色-权限唯一索引

## SQL DDL

```sql
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
```

## 测试数据

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