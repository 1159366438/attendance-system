package com.example.common;

import com.example.constants.AppConstants;

/**
 * 统一响应结果类
 * 定义API接口的统一响应格式
 * 
 * @author Attendance System Team
 * @since 2026-03-27
 * @version v1.1.0-alpha.1
 * 
 * @param <T> 响应数据类型
 */
public class ResponseResult<T> {
    private int code;    // 业务状态码，SUCCESS_CODE成功，非SUCCESS_CODE失败
    private String msg;  // 提示信息
    private T data;      // 真正的业务数据

    public ResponseResult() {}

    public ResponseResult(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public ResponseResult(int code, String msg, T data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    // 成功响应
    public static <T> ResponseResult<T> success(T data) {
        return new ResponseResult<>(AppConstants.Error.SUCCESS_CODE, AppConstants.Error.SUCCESS_MSG, data);
    }

    // 成功响应（无数据）
    public static <T> ResponseResult<T> success() {
        return new ResponseResult<>(AppConstants.Error.SUCCESS_CODE, AppConstants.Error.SUCCESS_MSG, null);
    }

    // 成功响应（带自定义消息）
    public static <T> ResponseResult<T> success(String msg, T data) {
        return new ResponseResult<>(AppConstants.Error.SUCCESS_CODE, msg, data);
    }

    // 失败响应
    public static <T> ResponseResult<T> error(int code, String msg) {
        return new ResponseResult<>(code, msg, null);
    }

    // 失败响应（默认错误消息）
    public static <T> ResponseResult<T> error(String msg) {
        return new ResponseResult<>(AppConstants.Error.SERVER_ERROR_CODE, msg, null);
    }

    // 失败响应（带数据）
    public static <T> ResponseResult<T> error(int code, String msg, T data) {
        return new ResponseResult<>(code, msg, data);
    }

    // getter和setter方法
    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}