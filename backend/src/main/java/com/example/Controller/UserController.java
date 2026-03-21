package com.example.controller;

/**
 * 用户控制器
 * @author Attendance System Team
 * @since 2026-03-15
 */

import com.example.common.ResponseResult;
import com.example.constants.AppConstants;
import com.example.dto.RegisterRequest;
import com.example.dto.UserDTO;
import com.example.entity.User;
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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController // 标识为REST接口，返回JSON数据
@RequestMapping("/api") // 匹配前端url的前缀 /api/input
@CrossOrigin // 解决前后端分离的跨域问题（必加，否则前端请求会被拦截）
@Validated // 开启参数校验
@Tag(name = "用户管理", description = "用户相关的API接口，包括获取用户信息、注册等功能")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;
    
    /**
     * 获取用户信息接口
     * <p>
     * 该接口用于获取用户的个人信息
     * </p>
     *
     * @return UserDTO对象，表示查询到的用户信息（不包含敏感信息）
     * @since 1.0.0
     */
    @Operation(summary = "获取用户信息", description = "根据用户ID获取用户的基本信息")
     @ApiResponses({
             @ApiResponse(responseCode = "200", description = "获取用户信息成功"),
             @ApiResponse(responseCode = "404", description = "用户不存在"),
             @ApiResponse(responseCode = "500", description = "获取用户信息失败")
     })
     @GetMapping("/users/me")
     public ResponseResult<UserDTO> getUserInfo(@Parameter(description = "用户ID，可选参数") @RequestParam(required = false) Integer userId) {
        logger.info("获取用户信息请求成功，用户ID: {}", userId);
        
        // 委托给服务层处理业务逻辑
        return userService.getUserInfoWithHandling(userId);
    }
    
    /**
     * 用户注册接口
     * <p>
     * 该接口用于处理用户注册请求
     * </p>
     *
     * @param registerRequest 注册请求参数，包含用户名、密码等信息
     * @return 标准响应格式，包含注册成功的用户信息
     * @since 1.1.0
     */
     @Operation(summary = "用户注册", description = "新用户注册账户")
     @ApiResponses({
             @ApiResponse(responseCode = "200", description = "注册成功"),
             @ApiResponse(responseCode = "400", description = "注册参数错误（用户名已存在、密码不符合要求等）"),
             @ApiResponse(responseCode = "500", description = "注册失败")
     })
     @PostMapping("/users")
    public ResponseResult<User> register(@RequestBody RegisterRequest registerRequest) {
     logger.info("用户注册请求: username={}", registerRequest.getUsername());
     
     try {
         // 验证注册输入参数
         ResponseResult<Void> validationResponse = validateRegisterRequest(registerRequest);
         if (validationResponse.getCode() != AppConstants.Error.SUCCESS_CODE) {
             return ResponseResult.error(validationResponse.getCode(), validationResponse.getMsg());
         }
         
         // 调用注册业务逻辑
         ResponseResult<User> registerResult = userService.register(registerRequest);
         
         // 直接返回服务层的结果
         return registerResult;
     } catch (Exception e) {
         logger.error("用户注册失败", e);
         return ResponseResult.error(AppConstants.Error.SERVER_ERROR_CODE, AppConstants.Error.SERVER_ERROR_MSG);
     }
 }

 /**
  * 验证注册请求参数
  * 
  * @param registerRequest 注册请求参数
  * @return 验证结果
  */
 private ResponseResult<Void> validateRegisterRequest(RegisterRequest registerRequest) {
     if (registerRequest == null) {
         return ResponseResult.error(AppConstants.Error.USERNAME_EMPTY_CODE, AppConstants.Error.USERNAME_EMPTY_MSG);
     }
     
     String username = registerRequest.getUsername();
     String password = registerRequest.getPassword();
     String confirmPassword = registerRequest.getConfirmPassword();
     
     // 验证用户名
     if (username == null || username.trim().isEmpty()) {
         return ResponseResult.error(AppConstants.Error.USERNAME_EMPTY_CODE, AppConstants.Error.USERNAME_EMPTY_MSG);
     }
     
     if (username.length() < 3 || username.length() > 50) {
         return ResponseResult.error(AppConstants.Error.USERNAME_LENGTH_ERROR_CODE, AppConstants.Error.USERNAME_LENGTH_ERROR_MSG);
     }
     
     // 验证密码
     if (password == null || password.trim().isEmpty()) {
         return ResponseResult.error(AppConstants.Error.PASSWORD_EMPTY_CODE, AppConstants.Error.PASSWORD_EMPTY_MSG);
     }
     
     if (password.length() < 6) {
         return ResponseResult.error(AppConstants.Error.PASSWORD_LENGTH_ERROR_CODE, AppConstants.Error.PASSWORD_LENGTH_ERROR_MSG);
     }
     
     // 验证确认密码
     if (confirmPassword == null || confirmPassword.trim().isEmpty()) {
         return ResponseResult.error(AppConstants.Error.CONFIRM_PASSWORD_ERROR_CODE, AppConstants.Error.CONFIRM_PASSWORD_ERROR_MSG);
     }
     
     if (!password.equals(confirmPassword)) {
         return ResponseResult.error(AppConstants.Error.PASSWORD_MISMATCH_CODE, AppConstants.Error.PASSWORD_MISMATCH_MSG);
     }
     
     return ResponseResult.success(null);
 }
 
 /**
  * 更新用户信息接口
  * <p>
  * 该接口用于更新用户的个人信息
  * </p>
  *
  * @param userId 用户ID
  * @param updateData 更新的数据
  * @return 标准响应格式，包含更新后的用户信息（不包含敏感信息）
  * @since 1.2.0
  */
 @Operation(summary = "更新用户信息", description = "更新当前登录用户的信息")
 @ApiResponses({
         @ApiResponse(responseCode = "200", description = "更新用户信息成功"),
         @ApiResponse(responseCode = "400", description = "更新参数错误"),
         @ApiResponse(responseCode = "404", description = "用户不存在"),
         @ApiResponse(responseCode = "500", description = "更新用户信息失败")
 })
 @PutMapping("/users/me")
 public ResponseResult<UserDTO> updateUserInfo(@RequestParam Integer userId, @RequestBody User updateData) {
     logger.info("更新用户信息请求: userId={}", userId);
     
     try {
         // 调用更新用户信息业务逻辑
         ResponseResult<UserDTO> updateResult = userService.updateUserInfo(userId, updateData);
         
         return updateResult;
     } catch (Exception e) {
         logger.error("更新用户信息失败", e);
         return ResponseResult.error(AppConstants.Error.SERVER_ERROR_CODE, AppConstants.Error.SERVER_ERROR_MSG);
     }
 }
}