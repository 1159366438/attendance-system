package com.example.constants;

/**
 * 数据库相关常量类
 * 定义数据库操作相关的常量值
 * 
 * @author Attendance System Team
 * @since 2026-03-27
 * @version v1.1.0-alpha.1
 */
public class DatabaseConstants {
    
    /**
     * 逻辑删除相关常量
     */
    public static class LogicDelete {
        public static final int NOT_DELETED = 0;  // 未删除
        public static final int DELETED = 1;      // 已删除
    }
    
    /**
     * 性别相关常量
     */
    public static class Gender {
        public static final Integer MALE = 1;     // 男性
        public static final Integer FEMALE = 0;   // 女性
        public static final Integer UNKNOWN = 2;  // 未知
    }
}