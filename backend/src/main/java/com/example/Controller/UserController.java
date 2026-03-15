package com.example.controller;

/**
 * 用户控制器
 * @author Attendance System Team
 * @since 2026-03-15
 */

import com.example.common.ResponseResult;
import com.example.constants.AppConstants;
import com.example.dto.LoginRequest;
import com.example.dto.RegisterRequest;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController // 标识为REST接口，返回JSON数据
@RequestMapping("/api/user") // 匹配前端url的前缀 /api/input
@CrossOrigin // 解决前后端分离的跨域问题（必加，否则前端请求会被拦截）
@Validated // 开启参数校验
@Tag(name = "用户管理", description = "用户相关的API接口，包括登录、注册、获取用户信息等功能")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;
    
    /**
     * 获取打卡记录接口
     * <p>
     * 该接口用于获取用户的打卡记录信息
     * </p>
     *
     * @return User对象，表示查询到的用户信息
     * @since 1.0.0
     */
    @Operation(summary = "获取用户信息", description = "根据用户ID获取用户的基本信息")
     @ApiResponses({
             @ApiResponse(responseCode = "200", description = "获取用户信息成功"),
             @ApiResponse(responseCode = "404", description = "用户不存在"),
             @ApiResponse(responseCode = "500", description = "获取用户信息失败")
     })
     @GetMapping("/info")
     public ResponseResult<User> getUserInfo(@Parameter(description = "用户ID，可选参数") @RequestParam(required = false) Integer userId) {
        logger.info("获取用户信息请求成功，用户ID: {}", userId);
        
        // 委托给服务层处理业务逻辑
        return userService.getUserInfoWithHandling(userId);
    }
    
    /**
     * 用户登录接口
     * <p>
     * 该接口用于处理用户登录请求
     * </p>
     *
     * @param loginRequest 登录请求参数，包含用户名和密码
     * @return 标准响应格式，包含用户信息和认证令牌
     * @since 1.0.0
     */
    @Operation(summary = "用户登录", description = "用户使用用户名和密码进行登录验证")
     @ApiResponses({
             @ApiResponse(responseCode = "200", description = "登录成功"),
             @ApiResponse(responseCode = "400", description = "用户名或密码不能为空"),
             @ApiResponse(responseCode = "401", description = "用户名不存在或密码错误"),
             @ApiResponse(responseCode = "500", description = "登录失败")
     })
     @PostMapping("/login")
     public ResponseResult<Map<String, Object>> login(@RequestBody LoginRequest loginRequest) {
        logger.info("登录请求: username={}", loginRequest.getUsername());
        
        try {
            // 验证登录输入参数
            ResponseResult<Void> validationResponse = validateRequest(loginRequest, null);
            if (validationResponse.getCode() != AppConstants.Error.SUCCESS_CODE) {
                return ResponseResult.error(validationResponse.getCode(), validationResponse.getMsg());
            }
            
            // 调用登录业务逻辑
            User user = userService.login(loginRequest.getUsername(), loginRequest.getPassword());
            
            if (user == null) {
                return ResponseResult.error(AppConstants.Error.LOGIN_FAILED_CODE, AppConstants.Error.LOGIN_FAILED_MSG);
            }
            
            // 构造响应数据
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("user", user);
            // responseData.put("token", generateToken(user.getId())); // 生成临时令牌 - 暂时注释掉
            
            return ResponseResult.success(responseData);
        } catch (Exception e) {
            logger.error("登录失败", e);
            return ResponseResult.error(AppConstants.Error.SERVER_ERROR_CODE, AppConstants.Error.SERVER_ERROR_MSG);
        }
    }
    
    /**
     * 统一验证方法，处理登录和注册请求参数
     * 
     * @param loginRequest 登录请求参数（登录时使用，注册时为null）
     * @param registerRequest 注册请求参数（注册时使用，登录时为null）
     * @return 验证结果
     */
    private ResponseResult<Void> validateRequest(LoginRequest loginRequest, RegisterRequest registerRequest) {
        String username = null;
        String password = null;
        String confirmPassword = null;
        
        if (loginRequest != null) {
            // 处理登录请求
            username = loginRequest.getUsername();
            password = loginRequest.getPassword();
        } else if (registerRequest != null) {
            // 处理注册请求
            username = registerRequest.getUsername();
            password = registerRequest.getPassword();
            confirmPassword = registerRequest.getConfirmPassword();
        }
        
        // 验证基本参数
        ResponseResult<Void> basicValidation = validateBasicCredentials(
            loginRequest != null ? (Object) loginRequest : (Object) registerRequest, 
            username, 
            password
        );
        if (basicValidation.getCode() != AppConstants.Error.SUCCESS_CODE) {
            return basicValidation;
        }
        
        // 如果是注册请求，则验证确认密码
        if (registerRequest != null && confirmPassword != null && !password.equals(confirmPassword)) {
            return ResponseResult.error(AppConstants.Error.PASSWORD_MISMATCH_CODE, AppConstants.Error.PASSWORD_MISMATCH_MSG);
        }
        
        return ResponseResult.success(null);
    }
    
    /**
     * 生成认证令牌
     * 
     * @param userId 用户ID
     * @return 生成的令牌
     */
     /*
     private String generateToken(Integer userId) {
         // 在实际应用中，这里应该生成JWT令牌或其他类型的认证令牌
         // 为了演示目的，我们简单地生成一个包含用户ID的字符串
         return "Bearer temp_token_" + userId + "_" + System.currentTimeMillis();
     }
     */
     
     /**
       * 用户登出接口
       * <p>
       * 该接口用于处理用户登出请求
       * </p>
       *
       * @return 标准响应格式
       * @since 1.0.0
       */
        @Operation(summary = "用户登出", description = "用户登出系统，清除登录状态")
     @ApiResponses({
             @ApiResponse(responseCode = "200", description = "登出成功"),
             @ApiResponse(responseCode = "500", description = "登出失败")
     })
     @PostMapping("/logout")
     public ResponseResult<String> logout() {
          logger.info("登出请求");
          
          // 暂时只返回成功消息，token功能已注释掉
          
          return ResponseResult.success(AppConstants.Success.LOGOUT_SUCCESS_MSG);
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
         @PostMapping("/register")
        public ResponseResult<User> register(@RequestBody RegisterRequest registerRequest) {
         logger.info("用户注册请求: username={}", registerRequest.getUsername());
         
         try {
             // 验证注册输入参数
             ResponseResult<Void> validationResponse = validateRequest(null, registerRequest);
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
       * 验证基本凭据（用户名和密码）
       * 
       * @param requestObject 请求对象
       * @param username 用户名
       * @param password 密码
       * @return 验证结果
       */
      private ResponseResult<Void> validateBasicCredentials(Object requestObject, String username, String password) {
          if (requestObject == null) {
              return ResponseResult.error(AppConstants.Error.USERNAME_EMPTY_CODE, AppConstants.Error.USERNAME_EMPTY_MSG);
          }
          
          if (username == null || username.trim().isEmpty()) {
              return ResponseResult.error(AppConstants.Error.USERNAME_EMPTY_CODE, AppConstants.Error.USERNAME_EMPTY_MSG);
          }
          
          if (password == null || password.trim().isEmpty()) {
              return ResponseResult.error(AppConstants.Error.PASSWORD_EMPTY_CODE, AppConstants.Error.PASSWORD_EMPTY_MSG);
          }
          
          return ResponseResult.success(null);
      }
  
}