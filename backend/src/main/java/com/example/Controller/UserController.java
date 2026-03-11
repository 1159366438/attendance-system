package com.example.controller;

import com.example.common.ResponseResult;
import com.example.dto.LoginRequest;
import com.example.entity.User;
import com.example.service.UserService;
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
public class UserController {

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
    @GetMapping("/info")
    public ResponseResult<User> getUserInfo(@RequestParam(required = false) Integer userId) {
        System.out.println("请求成功");
        
        try {
            // 如果没有提供userId参数，则默认返回用户ID为1的信息（仅为演示）
            // 在实际应用中，这里应该从认证信息中获取当前登录用户的ID
            Integer targetUserId = (userId != null) ? userId : 1;
            
            // 通过服务层查询用户信息
            User user = userService.queryById(targetUserId);
            
            if (user != null) {
                return ResponseResult.success(user);
            } else {
                return ResponseResult.error(404, "用户不存在");
            }
        } catch (Exception e) {
            System.err.println("获取用户信息失败: " + e.getMessage());
            e.printStackTrace();
            return ResponseResult.error(500, "获取用户信息失败");
        }
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
    @PostMapping("/login")
    public ResponseResult<Map<String, Object>> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("登录请求：" + loginRequest);
        
        try {
            // 验证输入参数
            if (loginRequest.getUsername() == null || loginRequest.getUsername().trim().isEmpty()) {
                return ResponseResult.error(400, "用户名不能为空");
            }
            
            if (loginRequest.getPassword() == null || loginRequest.getPassword().trim().isEmpty()) {
                return ResponseResult.error(400, "密码不能为空");
            }
            
            // 调用登录业务逻辑
            User user = userService.login(loginRequest.getUsername(), loginRequest.getPassword());
            
            if (user == null) {
                return ResponseResult.error(401, "用户名或密码错误");
            }
            
            // 构造响应数据
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("user", user);
            responseData.put("token", generateToken(user.getId())); // 生成临时令牌
            
            return ResponseResult.success(responseData);
        } catch (Exception e) {
            System.err.println("登录失败: " + e.getMessage());
            e.printStackTrace();
            return ResponseResult.error(500, "登录失败");
        }
    }
    
    /**
     * 生成认证令牌
     * 
     * @param userId 用户ID
     * @return 生成的令牌
     */
    private String generateToken(Integer userId) {
         // 在实际应用中，这里应该生成JWT令牌或其他类型的认证令牌
         // 为了演示目的，我们简单地生成一个包含用户ID的字符串
         return "Bearer temp_token_" + userId + "_" + System.currentTimeMillis();
     }
     
     /**
      * 用户登出接口
      * <p>
      * 该接口用于处理用户登出请求
      * </p>
      *
      * @return 标准响应格式
      * @since 1.0.0
      */
     @PostMapping("/logout")
     public ResponseResult<String> logout() {
         System.out.println("登出请求");
         
         // 在实际应用中，这里应该使认证令牌失效
         // 例如：将令牌加入黑名单或从缓存中删除
         
         return ResponseResult.success("登出成功");
     }
  
  }