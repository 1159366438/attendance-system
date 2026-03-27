package com.example.constants;

/**
 * 错误码常量类
 * 定义系统中使用的各类错误码常量值
 * 
 * @author Attendance System Team
 * @since 2026-03-27
 * @version v1.1.0-alpha.1
 */
public class ErrorCodeConstants {
    
    /**
     * 通用错误码
     */
    public static class Common {
        /** 成功 */
        public static final int SUCCESS_CODE = 200;
        public static final String SUCCESS_MSG = "操作成功";
        
        /** 服务器内部错误 */
        public static final int SERVER_ERROR_CODE = 500;
        public static final String SERVER_ERROR_MSG = "服务器内部错误";
        
        /** 请求参数错误 */
        public static final int BAD_REQUEST_CODE = 400;
        public static final String BAD_REQUEST_MSG = "请求参数错误";
        
        /** 未找到 */
        public static final int NOT_FOUND_CODE = 404;
        public static final String NOT_FOUND_MSG = "未找到";
        
        /** 未授权 */
        public static final int UNAUTHORIZED_CODE = 401;
        public static final String UNAUTHORIZED_MSG = "未授权访问";
    }
    
    /**
     * 用户相关错误码
     */
    public static class User {
        /** 用户名不能为空 */
        public static final int USERNAME_EMPTY_CODE = 400;
        public static final String USERNAME_EMPTY_MSG = "用户名不能为空";
        
        /** 密码不能为空 */
        public static final int PASSWORD_EMPTY_CODE = 400;
        public static final String PASSWORD_EMPTY_MSG = "密码不能为空";
        
        /** 密码不匹配 */
        public static final int PASSWORD_MISMATCH_CODE = 400;
        public static final String PASSWORD_MISMATCH_MSG = "两次输入的密码不一致";
        
        /** 用户名或密码错误 */
        public static final int LOGIN_FAILED_CODE = 401;
        public static final String LOGIN_FAILED_MSG = "用户名或密码错误";
        
        /** 用户不存在 */
        public static final int USER_NOT_EXIST_CODE = 404;
        public static final String USER_NOT_EXIST_MSG = "用户不存在";
        
        /** 用户已存在 */
        public static final int USER_EXISTS_CODE = 409;
        public static final String USER_EXISTS_MSG = "用户名已存在";
        
        /** 获取用户信息失败 */
        public static final int GET_USER_INFO_FAILED_CODE = 500;
        public static final String GET_USER_INFO_FAILED_MSG = "获取用户信息失败";
        
        /** 注册失败 */
        public static final int REGISTER_FAILED_CODE = 500;
        public static final String REGISTER_FAILED_MSG = "注册失败";
        
        /** 更新用户信息失败 */
        public static final int UPDATE_USER_INFO_FAILED_CODE = 500;
        public static final String UPDATE_USER_INFO_FAILED_MSG = "更新用户信息失败";
    }
    
    /**
     * 考勤相关错误码
     */
    public static class Attendance {
        /** 用户ID不能为空 */
        public static final int USER_ID_EMPTY_CODE = 400;
        public static final String USER_ID_EMPTY_MSG = "用户ID不能为空";
        
        /** 考勤打卡失败 */
        public static final int ATTENDANCE_FAILED_CODE = 500;
        public static final String ATTENDANCE_FAILED_MSG = "考勤打卡失败";
        
        /** 获取考勤记录失败 */
        public static final int GET_ATTENDANCE_RECORDS_FAILED_CODE = 500;
        public static final String GET_ATTENDANCE_RECORDS_FAILED_MSG = "获取考勤记录失败";
    }
    
    /**
     * 参数校验相关错误码
     */
    public static class Validation {
        /** 参数校验失败 */
        public static final int VALIDATION_FAILED_CODE = 400;
        public static final String VALIDATION_FAILED_MSG = "参数校验失败";
        
        /** 通用验证错误 */
        public static final int VALIDATION_ERROR_CODE = 400;
        public static final String VALIDATION_ERROR_MSG = "参数验证错误";
        
        /** 用户名长度错误 */
        public static final int USERNAME_LENGTH_ERROR_CODE = 400;
        public static final String USERNAME_LENGTH_ERROR_MSG = "用户名长度必须在3-50个字符之间";
        
        /** 密码长度错误 */
        public static final int PASSWORD_LENGTH_ERROR_CODE = 400;
        public static final String PASSWORD_LENGTH_ERROR_MSG = "密码长度至少6位";
        
        /** 确认密码错误 */
        public static final int CONFIRM_PASSWORD_ERROR_CODE = 400;
        public static final String CONFIRM_PASSWORD_ERROR_MSG = "确认密码不能为空";
        
        /** 确认密码不匹配错误 */
        public static final int CONFIRM_PASSWORD_MISMATCH_CODE = 400;
        public static final String CONFIRM_PASSWORD_MISMATCH_MSG = "两次输入的密码不一致";
    }
    
    /**
     * 部门管理相关错误码
     */
    public static class Department {
        /** 部门名称不能为空 */
        public static final int DEPARTMENT_NAME_EMPTY_CODE = 400;
        public static final String DEPARTMENT_NAME_EMPTY_MSG = "部门名称不能为空";
        
        /** 部门不存在 */
        public static final int DEPARTMENT_NOT_FOUND_CODE = 404;
        public static final String DEPARTMENT_NOT_FOUND_MSG = "部门不存在";
        
        /** 部门操作失败 */
        public static final int DEPARTMENT_OPERATION_FAILED_CODE = 500;
        public static final String DEPARTMENT_OPERATION_FAILED_MSG = "部门操作失败";
        
        /** 获取部门员工失败 */
        public static final int DEPARTMENT_GET_EMPLOYEES_FAILED_CODE = 500;
        public static final String DEPARTMENT_GET_EMPLOYEES_FAILED_MSG = "获取部门员工失败";
        
        /** 获取子部门列表失败 */
        public static final int DEPARTMENT_GET_CHILDREN_FAILED_CODE = 500;
        public static final String DEPARTMENT_GET_CHILDREN_FAILED_MSG = "获取子部门列表失败";
    }
}