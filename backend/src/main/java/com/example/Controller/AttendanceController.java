package com.example.controller;

/**
 * 考勤控制器
 * 提供考勤记录、打卡等考勤管理相关功能
 * 
 * @author Attendance System Team
 * @since 2026-03-27
 * @version v1.1.0-alpha.1
 */

import com.example.common.ResponseResult;
import com.example.constants.AppConstants;
import com.example.dto.AttendanceRequest;
import com.example.entity.User;
import com.example.service.AttendanceRecordService;
import com.example.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController // 标识为REST接口，返回JSON数据
@RequestMapping("/api/attendance") // 匹配前端url的前缀 /api/attendance
@CrossOrigin // 解决前后端分离的跨域问题（必加，否则前端请求会被拦截）
@Validated // 开启参数校验
@Tag(name = "考勤管理", description = "考勤相关的API接口，包括考勤打卡、获取考勤记录等功能")
public class AttendanceController {

    private static final Logger logger = LoggerFactory.getLogger(AttendanceController.class);

    @Autowired
    private AttendanceRecordService attendanceRecordService;

    @Autowired
    private UserService userService;

    /**
      * 获取考勤记录接口（分页）
      * <p>
      * 该接口用于获取用户的考勤记录信息（支持分页）
      * </p>
      * 
      * @param page 页码，默认为1
      * @param size 每页数量，默认为15
      * @return 包含考勤记录列表和总数的响应
      * @since 1.0.0
      */
      @Operation(summary = "获取考勤记录", description = "根据用户ID获取考勤记录（支持分页）")
     @ApiResponses({
             @ApiResponse(responseCode = "200", description = "获取考勤记录成功"),
             @ApiResponse(responseCode = "400", description = "用户ID不能为空或参数错误"),
             @ApiResponse(responseCode = "500", description = "获取考勤记录失败")
     })
     @GetMapping("/records")
     public ResponseResult<Map<String, Object>> getAttendanceRecords(
             @Parameter(description = "用户ID", required = true) @RequestParam("userId") Integer userId,
             @Parameter(description = "页码，默认为1") @RequestParam(defaultValue = "" + AppConstants.Page.DEFAULT_PAGE_NUM) int page,
             @Parameter(description = "每页数量，默认为15") @RequestParam(defaultValue = "" + AppConstants.Page.DEFAULT_PAGE_SIZE) int size) {

        logger.info("获取考勤记录请求成功，用户ID: {}, 页码: {}, 每页数量: {}", userId, page, size);
        
        try {
            // 验证用户ID是否为空
            if (userId == null) {
                return ResponseResult.error(AppConstants.Error.USER_ID_EMPTY_CODE, AppConstants.Error.USER_ID_EMPTY_MSG);
            }

            // 委托给服务层处理业务逻辑
            return attendanceRecordService.getAttendanceRecords(userId, page, size);
        } catch (Exception e) {
            logger.error("获取考勤记录失败", e);
            return ResponseResult.error(AppConstants.Error.SERVER_ERROR_CODE, AppConstants.Error.SERVER_ERROR_MSG);
        }
    }

    /**
     * 用户考勤打卡接口
     * <p>
     * 该接口用于处理用户的考勤打卡请求，保存考勤记录
     * </p>
     *
     * @param attendanceRequest 考勤请求参数，包含用户名和考勤时间
     * @return 标准响应格式
     * @since v1.1.0-alpha.1
     */
      @Operation(summary = "用户考勤打卡", description = "用户进行考勤打卡操作")
       @ApiResponses({
               @ApiResponse(responseCode = "200", description = "考勤打卡成功"),
               @ApiResponse(responseCode = "400", description = "用户ID不能为空"),
               @ApiResponse(responseCode = "404", description = "用户不存在"),
               @ApiResponse(responseCode = "500", description = "考勤打卡失败")
       })
       @PostMapping("/records")
       public ResponseResult<String> attendanceIn(@RequestBody AttendanceRequest attendanceRequest) {
        logger.info("考勤打卡请求: userId={}", attendanceRequest.getUserId());

        try {
            // 1. 获取前台传递的用户ID
            Integer userId = attendanceRequest.getUserId();
            if (userId == null) {
                return ResponseResult.error(AppConstants.Error.USER_ID_EMPTY_CODE, AppConstants.Error.USER_ID_EMPTY_MSG);
            }

            // 2. 查询用户信息，确保用户存在
            User user = userService.queryById(userId);
            if (user == null) {
                return ResponseResult.error(AppConstants.Error.USER_NOT_EXIST_CODE, AppConstants.Error.USER_NOT_EXIST_MSG);
            }

            // 3. 委托给服务层处理考勤业务
            return attendanceRecordService.performAttendanceIn(userId);
        } catch (Exception e) {
            logger.error("考勤打卡失败", e);
            return ResponseResult.error(AppConstants.Error.ATTENDANCE_FAILED_CODE, AppConstants.Error.ATTENDANCE_FAILED_MSG);
        }
    }

}