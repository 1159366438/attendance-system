package com.example.controller;

/**
 * 认证控制器
 * 提供用户登录、注册等认证相关接口
 * 
 * @author Attendance System Team
 * @since 2026-03-27
 * @version v1.1.0-alpha.1
 */

import com.example.common.ResponseResult;
import com.example.constants.AppConstants;
import com.example.dto.LoginRequest;
import com.example.dto.UserDTO;
import com.example.entity.User;
import com.example.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController // 标识为REST接口，返回JSON数据
@RequestMapping("/api/auth")
@CrossOrigin // 解决前后端分离的跨域问题
@Validated // 开启参数校验
@Tag(name = "认证管理", description = "认证相关的API接口，包括登录、登出等功能")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserService userService;
    
    /**
     * 用户登录接口
     * <p>
     * 该接口用于处理用户登录请求
     * </p>
     *
     * @param loginRequest 登录请求参数，包含用户名和密码
     * @return 标准响应格式，包含用户信息（不包含敏感信息）和认证令牌
     * @since v1.1.0-alpha.1
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
            ResponseResult<Void> validationResponse = validateRequest(loginRequest);
            if (validationResponse.getCode() != AppConstants.Error.SUCCESS_CODE) {
                return ResponseResult.error(validationResponse.getCode(), validationResponse.getMsg());
            }
            
            // 调用登录业务逻辑
            UserDTO userDTO = userService.login(loginRequest.getUsername(), loginRequest.getPassword());
            
            if (userDTO == null) {
                return ResponseResult.error(AppConstants.Error.LOGIN_FAILED_CODE, AppConstants.Error.LOGIN_FAILED_MSG);
            }
            
            // 构造响应数据
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("user", userDTO);
            // responseData.put("token", generateToken(user.getId())); // 生成临时令牌 - 暂时注释掉
            
            return ResponseResult.success(responseData);
        } catch (Exception e) {
            logger.error("登录失败", e);
            return ResponseResult.error(AppConstants.Error.SERVER_ERROR_CODE, AppConstants.Error.SERVER_ERROR_MSG);
        }
    }
    
    /**
     * 统一验证方法，处理登录请求参数
     * 
     * @param loginRequest 登录请求参数
     * @return 验证结果
     */
    private ResponseResult<Void> validateRequest(LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();
        
        // 验证基本参数
        ResponseResult<Void> basicValidation = validateBasicCredentials(username, password);
        if (basicValidation.getCode() != AppConstants.Error.SUCCESS_CODE) {
            return basicValidation;
        }
        
        return ResponseResult.success(null);
    }
    
    /**
       * 用户登出接口
       * <p>
       * 该接口用于处理用户登出请求
       * </p>
       *
       * @return 标准响应格式
       * @since v1.1.0-alpha.1
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
       * 验证基本凭据（用户名和密码）
       * 
       * @param username 用户名
       * @param password 密码
       * @return 验证结果
       */
      private ResponseResult<Void> validateBasicCredentials(String username, String password) {
          if (username == null || username.trim().isEmpty()) {
              return ResponseResult.error(AppConstants.Error.USERNAME_EMPTY_CODE, AppConstants.Error.USERNAME_EMPTY_MSG);
          }
          
          if (password == null || password.trim().isEmpty()) {
              return ResponseResult.error(AppConstants.Error.PASSWORD_EMPTY_CODE, AppConstants.Error.PASSWORD_EMPTY_MSG);
          }
          
          return ResponseResult.success(null);
      }
}