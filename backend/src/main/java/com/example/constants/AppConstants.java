package com.example.constants;

/**
 * 应用程序常量类
 * 定义系统中使用的各类常量值
 * 
 * @author Attendance System Team
 * @since 2026-03-27
 * @version v1.1.0-alpha.1
 */
public class AppConstants {
    
    /**
     * 分页相关常量
     */
    public static class Page {
        /** 默认页码 */
        public static final int DEFAULT_PAGE_NUM = 1;
        
        /** 默认每页数量 */
        public static final int DEFAULT_PAGE_SIZE = 15;
    }
    
    /**
     * 考勤相关常量
     */
    public static class Attendance {
        // 考勤类型
        /** 上班考勤 */
        public static final int CHECK_IN_TYPE_ON_WORK = 1;
        
        /** 下班考勤 */
        public static final int CHECK_IN_TYPE_OFF_WORK = 2;
        
        /** 加班考勤 */
        public static final int CHECK_IN_TYPE_OVERTIME = 3;
        
        // 考勤状态
        /** 正常 */
        public static final int CHECK_IN_STATUS_NORMAL = 1;
        
        /** 迟到 */
        public static final int CHECK_IN_STATUS_LATE = 2;
        
        /** 早退 */
        public static final int CHECK_IN_STATUS_LEAVE_EARLY = 3;
        
        /** 旷工 */
        public static final int CHECK_IN_STATUS_ABSENTEEISM = 4;
    }
    
    /**
     * 用户相关常量
     */
    public static class User {
        /** 默认用户ID（仅用于演示）*/
        public static final int DEFAULT_USER_ID = 1;
        

    }
    
    /**
     * CORS相关常量
     */
    public static class Cors {
        /** 前端开发服务器地址 */
        public static final String FRONTEND_URL_LOCAL = "http://localhost:5173";
    }
    
    /**
     * 错误码相关常量
     */
    public static class Error {
        public static final int SUCCESS_CODE = ErrorCodeConstants.Common.SUCCESS_CODE;
        public static final String SUCCESS_MSG = ErrorCodeConstants.Common.SUCCESS_MSG;
        
        public static final int SERVER_ERROR_CODE = ErrorCodeConstants.Common.SERVER_ERROR_CODE;
        public static final String SERVER_ERROR_MSG = ErrorCodeConstants.Common.SERVER_ERROR_MSG;
        
        public static final int BAD_REQUEST_CODE = ErrorCodeConstants.Common.BAD_REQUEST_CODE;
        public static final String BAD_REQUEST_MSG = ErrorCodeConstants.Common.BAD_REQUEST_MSG;
        
        public static final int NOT_FOUND_CODE = ErrorCodeConstants.Common.NOT_FOUND_CODE;
        public static final String NOT_FOUND_MSG = ErrorCodeConstants.Common.NOT_FOUND_MSG;
        
        public static final int UNAUTHORIZED_CODE = ErrorCodeConstants.Common.UNAUTHORIZED_CODE;
        public static final String UNAUTHORIZED_MSG = ErrorCodeConstants.Common.UNAUTHORIZED_MSG;
        
        // 用户相关错误码
        public static final int USERNAME_EMPTY_CODE = ErrorCodeConstants.User.USERNAME_EMPTY_CODE;
        public static final String USERNAME_EMPTY_MSG = ErrorCodeConstants.User.USERNAME_EMPTY_MSG;
        
        public static final int PASSWORD_EMPTY_CODE = ErrorCodeConstants.User.PASSWORD_EMPTY_CODE;
        public static final String PASSWORD_EMPTY_MSG = ErrorCodeConstants.User.PASSWORD_EMPTY_MSG;
        
        public static final int PASSWORD_MISMATCH_CODE = ErrorCodeConstants.User.PASSWORD_MISMATCH_CODE;
        public static final String PASSWORD_MISMATCH_MSG = ErrorCodeConstants.User.PASSWORD_MISMATCH_MSG;
        
        public static final int LOGIN_FAILED_CODE = ErrorCodeConstants.User.LOGIN_FAILED_CODE;
        public static final String LOGIN_FAILED_MSG = ErrorCodeConstants.User.LOGIN_FAILED_MSG;
        
        public static final int USER_NOT_EXIST_CODE = ErrorCodeConstants.User.USER_NOT_EXIST_CODE;
        public static final String USER_NOT_EXIST_MSG = ErrorCodeConstants.User.USER_NOT_EXIST_MSG;
        
        public static final int USER_EXISTS_CODE = ErrorCodeConstants.User.USER_EXISTS_CODE;
        public static final String USER_EXISTS_MSG = ErrorCodeConstants.User.USER_EXISTS_MSG;
        
        public static final int GET_USER_INFO_FAILED_CODE = ErrorCodeConstants.User.GET_USER_INFO_FAILED_CODE;
        public static final String GET_USER_INFO_FAILED_MSG = ErrorCodeConstants.User.GET_USER_INFO_FAILED_MSG;
        
        public static final int REGISTER_FAILED_CODE = ErrorCodeConstants.User.REGISTER_FAILED_CODE;
        public static final String REGISTER_FAILED_MSG = ErrorCodeConstants.User.REGISTER_FAILED_MSG;
        
        public static final int UPDATE_USER_INFO_FAILED_CODE = ErrorCodeConstants.User.UPDATE_USER_INFO_FAILED_CODE;
        public static final String UPDATE_USER_INFO_FAILED_MSG = ErrorCodeConstants.User.UPDATE_USER_INFO_FAILED_MSG;
        
        // 考勤相关错误码
        public static final int USER_ID_EMPTY_CODE = ErrorCodeConstants.Attendance.USER_ID_EMPTY_CODE;
        public static final String USER_ID_EMPTY_MSG = ErrorCodeConstants.Attendance.USER_ID_EMPTY_MSG;
        
        public static final int ATTENDANCE_FAILED_CODE = ErrorCodeConstants.Attendance.ATTENDANCE_FAILED_CODE;
        public static final String ATTENDANCE_FAILED_MSG = ErrorCodeConstants.Attendance.ATTENDANCE_FAILED_MSG;
        
        public static final int GET_ATTENDANCE_RECORDS_FAILED_CODE = ErrorCodeConstants.Attendance.GET_ATTENDANCE_RECORDS_FAILED_CODE;
        public static final String GET_ATTENDANCE_RECORDS_FAILED_MSG = ErrorCodeConstants.Attendance.GET_ATTENDANCE_RECORDS_FAILED_MSG;
        
        // 参数校验相关错误码
        public static final int VALIDATION_FAILED_CODE = ErrorCodeConstants.Validation.VALIDATION_FAILED_CODE;
        public static final String VALIDATION_FAILED_MSG = ErrorCodeConstants.Validation.VALIDATION_FAILED_MSG;
        
        public static final int VALIDATION_ERROR_CODE = ErrorCodeConstants.Validation.VALIDATION_ERROR_CODE;
        public static final String VALIDATION_ERROR_MSG = ErrorCodeConstants.Validation.VALIDATION_ERROR_MSG;
        
        public static final int USERNAME_LENGTH_ERROR_CODE = ErrorCodeConstants.Validation.USERNAME_LENGTH_ERROR_CODE;
        public static final String USERNAME_LENGTH_ERROR_MSG = ErrorCodeConstants.Validation.USERNAME_LENGTH_ERROR_MSG;
        
        public static final int PASSWORD_LENGTH_ERROR_CODE = ErrorCodeConstants.Validation.PASSWORD_LENGTH_ERROR_CODE;
        public static final String PASSWORD_LENGTH_ERROR_MSG = ErrorCodeConstants.Validation.PASSWORD_LENGTH_ERROR_MSG;
        
        public static final int CONFIRM_PASSWORD_ERROR_CODE = ErrorCodeConstants.Validation.CONFIRM_PASSWORD_ERROR_CODE;
        public static final String CONFIRM_PASSWORD_ERROR_MSG = ErrorCodeConstants.Validation.CONFIRM_PASSWORD_ERROR_MSG;
        
        public static final int CONFIRM_PASSWORD_MISMATCH_CODE = ErrorCodeConstants.Validation.CONFIRM_PASSWORD_MISMATCH_CODE;
        public static final String CONFIRM_PASSWORD_MISMATCH_MSG = ErrorCodeConstants.Validation.CONFIRM_PASSWORD_MISMATCH_MSG;
    }
    
    /**
     * 成功消息相关常量
     */
    public static class Success {
        public static final String ATTENDANCE_SUCCESS_MSG = "考勤打卡成功";
        public static final String LOGOUT_SUCCESS_MSG = "登出成功";
        public static final String OPERATION_SUCCESS_MSG = "操作成功";
    }
    
    /**
     * 部门管理相关常量
     */
    public static class Department {
        // 成功消息
        public static final String DEPARTMENT_CREATE_SUCCESS_MSG = "创建部门成功";
        public static final String DEPARTMENT_UPDATE_SUCCESS_MSG = "更新部门成功";
        public static final String DEPARTMENT_DELETE_SUCCESS_MSG = "部门删除成功";
        public static final String DEPARTMENT_GET_LIST_SUCCESS_MSG = "获取部门列表成功";
        public static final String DEPARTMENT_GET_DETAIL_SUCCESS_MSG = "获取部门详情成功";
        public static final String DEPARTMENT_GET_EMPLOYEES_SUCCESS_MSG = "获取部门员工成功";
        public static final String DEPARTMENT_GET_CHILDREN_SUCCESS_MSG = "获取子部门列表成功";
        
        // 错误消息
        public static final String DEPARTMENT_NAME_EMPTY_MSG = "部门名称不能为空";
        public static final String DEPARTMENT_NOT_FOUND_MSG = "部门不存在";
        public static final String DEPARTMENT_CREATE_FAILED_MSG = "创建部门失败";
        public static final String DEPARTMENT_UPDATE_FAILED_MSG = "更新部门失败";
        public static final String DEPARTMENT_DELETE_FAILED_MSG = "删除部门失败";
        public static final String DEPARTMENT_GET_LIST_FAILED_MSG = "获取部门列表失败";
        public static final String DEPARTMENT_GET_DETAIL_FAILED_MSG = "获取部门详情失败";
        public static final String DEPARTMENT_GET_EMPLOYEES_FAILED_MSG = "获取部门员工失败";
        public static final String DEPARTMENT_GET_CHILDREN_FAILED_MSG = "获取子部门列表失败";
        
        // 错误码
        public static final int DEPARTMENT_NAME_EMPTY_CODE = ErrorCodeConstants.Department.DEPARTMENT_NAME_EMPTY_CODE;
        public static final int DEPARTMENT_NOT_FOUND_CODE = ErrorCodeConstants.Department.DEPARTMENT_NOT_FOUND_CODE;
        public static final int DEPARTMENT_OPERATION_FAILED_CODE = ErrorCodeConstants.Department.DEPARTMENT_OPERATION_FAILED_CODE;
        public static final int DEPARTMENT_GET_EMPLOYEES_FAILED_CODE = ErrorCodeConstants.Department.DEPARTMENT_GET_EMPLOYEES_FAILED_CODE;
        public static final int DEPARTMENT_GET_CHILDREN_FAILED_CODE = ErrorCodeConstants.Department.DEPARTMENT_GET_CHILDREN_FAILED_CODE;
    }
}