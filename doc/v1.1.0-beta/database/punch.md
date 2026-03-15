# 打卡记录表 (punch_record)

存储用户的打卡记录。

## 表结构

| 字段名 | 数据类型 | 约束 | 默认值 | 是否可为空 | 注释 |
|--------|----------|------|--------|------------|------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | - | NOT NULL | 记录唯一标识，自增主键 |
| user_id | INT | FOREIGN KEY (user.id) | - | NOT NULL | 用户ID，关联用户表 |
| check_in_time | TIMESTAMP | - | - | NOT NULL | 打卡时间（UTC） |
| check_in_type | TINYINT | - | - | NOT NULL | 打卡类型：1-上班 2-下班 3-加班 |
| check_in_status | TINYINT | - | - | NOT NULL | 打卡状态：1-正常 2-迟到 3-早退 4-旷工 |
| check_in_location | VARCHAR(100) | - | - | YES | 打卡地点（如"公司"、"家"或具体地址） |
| create_time | TIMESTAMP | - | CURRENT_TIMESTAMP | NOT NULL | 记录创建时间 |
| update_time | TIMESTAMP | - | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | NOT NULL | 记录最后更新时间 |

### 字段说明
- `user_id` 外键，级联删除和更新，保证数据完整性。
- `check_in_type` 和 `check_in_status` 使用 `TINYINT` 节省空间，具体含义在应用层维护。
- `check_in_location` 预留长度 100，可存储文本描述或地理坐标字符串（如 "经度,纬度"）。
- `update_time` 自动更新，用于追踪记录变更。

## 索引设计

| 索引名 | 索引字段 | 索引类型 | 说明 |
|--------|----------|----------|------|
| PRIMARY | id | 主键索引 | 聚簇索引 |
| idx_user_id | user_id | 普通索引 | 加速按用户查询打卡记录 |
| idx_check_in_time | check_in_time | 普通索引 | 加速按时间范围查询 |

### 附加建议
- 若查询经常同时使用 `user_id` 和 `check_in_time` 组合条件，可考虑建立复合索引 `(user_id, check_in_time)`。
- 当前数据量较小，可先按需添加，后续通过慢查询日志优化。

## SQL DDL

```sql
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

## 测试数据

```sql
-- 插入测试打卡记录（假设admin的打卡）
INSERT INTO `punch_record` (`user_id`, `check_in_time`, `check_in_type`, `check_in_status`, `check_in_location`) VALUES
(1, '2026-03-12 08:30:00', 1, 1, '公司'),
(1, '2026-03-12 18:00:00', 2, 1, '公司'),
(1, '2026-03-13 08:45:00', 1, 2, '公司'), -- 迟到
(2, '2026-03-12 08:20:00', 1, 1, '公司');
```