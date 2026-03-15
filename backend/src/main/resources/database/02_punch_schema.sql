-- 打卡记录表结构定义
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