package com.example.service.impl;

/**
 * 用户服务实现类
 * 实现用户管理相关的业务逻辑
 * 
 * @author Attendance System Team
 * @since 2026-03-27
 * @version v1.1.0-alpha.1
 */

import com.example.common.ResponseResult;
import com.example.constants.AppConstants;
import com.example.constants.DatabaseConstants;
import com.example.dao.UserDao;
import com.example.dto.RegisterRequest;
import com.example.dto.UserDTO;
import com.example.entity.User;
import com.example.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * 用户服务实现类
 */
@Service
public class UserServiceImpl implements UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserDao userDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User queryById(Integer id) {
        return userDao.queryById(id);
    }

    @Override
    public User queryByUsername(String username) {
        return userDao.queryByUsername(username);
    }

    @Override
    public List<User> queryAll() {
        return userDao.queryAll();
    }

    @Override
    public int insert(User user) {
        return userDao.insert(user);
    }

    @Override
    public int update(User user) {
        return userDao.update(user);
    }

    @Override
    public int deleteById(Integer id) {
        return userDao.deleteById(id);
    }

    @Override
    public UserDTO login(String username, String rawPassword) {
        logger.info("用户登录验证，用户名: {}", username);
        
        // 通过用户名查询用户
        User user = userDao.queryByUsername(username);
        
        if (user == null) {
            logger.warn("用户名不存在: {}", username);
            return null;
        }
        
        // 验证密码
        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            logger.warn("密码验证失败，用户名: {}", username);
            return null;
        }
        
        logger.info("用户登录验证成功，用户ID: {}", user.getId());
        // 返回UserDTO（不包含敏感信息）
        return new UserDTO(user);
    }

    @Override
    public ResponseResult<UserDTO> getUserInfoWithHandling(Integer userId) {
        try {
            // 如果没有提供userId参数，则默认返回用户ID为1的信息（仅为演示）
            // 在实际应用中，这里应该从认证信息中获取当前登录用户的ID
            Integer targetUserId = (userId != null) ? userId : AppConstants.User.DEFAULT_USER_ID;
            
            logger.info("获取用户信息请求，目标用户ID: {}", targetUserId);
            
            // 通过服务层查询用户信息
            User user = queryById(targetUserId);
            
            if (user != null) {
                // 使用UserDTO返回用户信息，确保不包含敏感字段
                UserDTO userDTO = new UserDTO(user);
                logger.info("成功获取用户信息，用户ID: {}, 用户名: {}, 年龄: {}, 头像: {}",
                        userDTO.getId(), userDTO.getUsername(), userDTO.getAge(), userDTO.getAvatar());
                return ResponseResult.success(userDTO);
            } else {
                logger.warn("用户不存在，用户ID: {}", targetUserId);
                return ResponseResult.error(AppConstants.Error.USER_NOT_EXIST_CODE, AppConstants.Error.USER_NOT_EXIST_MSG);
            }
        } catch (Exception e) {
            logger.error("获取用户信息失败", e);
            return ResponseResult.error(AppConstants.Error.GET_USER_INFO_FAILED_CODE, AppConstants.Error.GET_USER_INFO_FAILED_MSG);
        }
    }

    @Override
    public ResponseResult<UserDTO> register(RegisterRequest registerRequest) {
        logger.info("注册用户请求，用户名: {}, 年龄: {}, 性别: {}",
                registerRequest.getUsername(), registerRequest.getAge(), registerRequest.getGender());
        // 检查用户名是否已存在
        User existingUser = userDao.queryByUsername(registerRequest.getUsername());
        if (existingUser != null) {
            logger.warn("用户名已存在: {}", registerRequest.getUsername());
            return ResponseResult.error(AppConstants.Error.USER_EXISTS_CODE, AppConstants.Error.USER_EXISTS_MSG);
        }
        
        // 创建新用户
        User newUser = new User();
        newUser.setUsername(registerRequest.getUsername());
        // 加密密码
        String encodedPassword = passwordEncoder.encode(registerRequest.getPassword());
        newUser.setPassword(encodedPassword);
        newUser.setAge(registerRequest.getAge());
        
        // 处理头像 - 直接使用前端传递的头像路径或URL
        if (registerRequest.getAvatar() != null && !registerRequest.getAvatar().isEmpty()) {
            // 直接使用前端传递的头像路径或URL
            newUser.setAvatar(registerRequest.getAvatar());
        }
        
        // 处理性别
        if (registerRequest.getGender() != null) {
            newUser.setGender(registerRequest.getGender());
        } else {
            // 默认性别值为0（未知）
            newUser.setGender(DatabaseConstants.Gender.UNKNOWN);
        }
        
        // 设置创建时间
        newUser.setCreateTime(new java.util.Date());
        
        // 插入数据库
        int result = userDao.insert(newUser);
        
        if (result > 0) {
            // 使用UserDTO返回新创建的用户信息（不包含密码等敏感信息）
            UserDTO registeredUser = new UserDTO(newUser);
            
            logger.info("用户注册成功，用户名: {}", registerRequest.getUsername());
            return ResponseResult.success(registeredUser);
        } else {
            logger.error("用户注册失败，用户名: {}", registerRequest.getUsername());
            return ResponseResult.error(AppConstants.Error.REGISTER_FAILED_CODE, AppConstants.Error.REGISTER_FAILED_MSG);
        }
    }
    
    /*
    @Override
    public User loginSimple(String username, String password) {
        // 临时实现：只验证用户名是否存在（因为数据库中还没有密码字段）
        User user = userDao.queryByUsername(username);
        
        if (user != null) {
            // 用户存在即视为登录成功（暂时绕过密码验证）
            User loginUser = new User();
            loginUser.setId(user.getId());
            loginUser.setUsername(user.getUsername());
            loginUser.setAge(user.getAge());
            loginUser.setAvatar(user.getAvatar());
            loginUser.setCreateTime(user.getCreateTime());
            return loginUser;
        }
        
        return null; // 登录失败
        }
     */
    
    @Override
    public List<User> getUsersByDepartmentId(Integer departmentId) {
        return userDao.getUsersByDepartmentId(departmentId);
    }
    
    @Override
    public ResponseResult<UserDTO> updateUserInfo(Integer userId, User updateData) {
        try {
            logger.info("更新用户信息请求，用户ID: {}, 更新数据: username={}, age={}, gender={}, avatar={}", 
                userId, updateData.getUsername(), updateData.getAge(), updateData.getGender(), updateData.getAvatar());
            
            // 首先检查用户是否存在
            User existingUser = userDao.queryById(userId);
            if (existingUser == null) {
                logger.warn("尝试更新不存在的用户，用户ID: {}", userId);
                return ResponseResult.error(AppConstants.Error.USER_NOT_EXIST_CODE, AppConstants.Error.USER_NOT_EXIST_MSG);
            }
            
            // 更新用户信息
            existingUser.setUsername(updateData.getUsername() != null ? updateData.getUsername() : existingUser.getUsername());
            existingUser.setAge(updateData.getAge() != null ? updateData.getAge() : existingUser.getAge());
            existingUser.setGender(updateData.getGender() != null ? updateData.getGender() : existingUser.getGender());
            existingUser.setAvatar(updateData.getAvatar() != null ? updateData.getAvatar() : existingUser.getAvatar());
            existingUser.setEmail(updateData.getEmail() != null ? updateData.getEmail() : existingUser.getEmail());
            existingUser.setPhone(updateData.getPhone() != null ? updateData.getPhone() : existingUser.getPhone());
            existingUser.setPosition(updateData.getPosition() != null ? updateData.getPosition() : existingUser.getPosition());
            existingUser.setDepartmentId(updateData.getDepartmentId() != null ? updateData.getDepartmentId() : existingUser.getDepartmentId());
            
            // 执行更新操作
            int result = userDao.update(existingUser);
            
            if (result > 0) {
                // 返回更新后的用户信息（不包含密码），使用UserDTO
                UserDTO updatedUser = new UserDTO(existingUser);
                
                logger.info("用户信息更新成功，用户ID: {}", userId);
                return ResponseResult.success(updatedUser);
            } else {
                logger.error("用户信息更新失败，用户ID: {}", userId);
                return ResponseResult.error(AppConstants.Error.UPDATE_USER_INFO_FAILED_CODE, AppConstants.Error.UPDATE_USER_INFO_FAILED_MSG);
            }
        } catch (Exception e) {
            logger.error("更新用户信息时发生异常，用户ID: {}", userId, e);
            return ResponseResult.error(AppConstants.Error.SERVER_ERROR_CODE, AppConstants.Error.SERVER_ERROR_MSG);
        }
    }

    /**
     * 为用户分配部门
     * 
     * @param userId 用户ID
     * @param departmentId 部门ID
     * @return 分配结果
     * @author Attendance System Team
     * @since 2026-03-27
     * @version v1.1.0-alpha.1
     */
    @Override
    public ResponseResult<UserDTO> assignUserToDepartment(Integer userId, Integer departmentId) {
        try {
            logger.info("为用户分配部门请求，用户ID: {}, 部门ID: {}", userId, departmentId);
            
            // 首先检查用户是否存在
            User existingUser = userDao.queryById(userId);
            if (existingUser == null) {
                logger.warn("尝试为不存在的用户分配部门，用户ID: {}", userId);
                return ResponseResult.error(AppConstants.Error.USER_NOT_EXIST_CODE, AppConstants.Error.USER_NOT_EXIST_MSG);
            }
            
            // 更新用户部门信息
            existingUser.setDepartmentId(departmentId);
            
            // 执行更新操作
            int result = userDao.update(existingUser);
            
            if (result > 0) {
                // 返回更新后的用户信息（不包含密码），使用UserDTO
                UserDTO updatedUser = new UserDTO(existingUser);
                
                logger.info("用户部门分配成功，用户ID: {}, 部门ID: {}", userId, departmentId);
                return ResponseResult.success(updatedUser);
            } else {
                logger.error("用户部门分配失败，用户ID: {}", userId);
                return ResponseResult.error(AppConstants.Error.UPDATE_USER_INFO_FAILED_CODE, AppConstants.Error.UPDATE_USER_INFO_FAILED_MSG);
            }
        } catch (Exception e) {
            logger.error("为用户分配部门时发生异常，用户ID: {}", userId, e);
            return ResponseResult.error(AppConstants.Error.SERVER_ERROR_CODE, AppConstants.Error.SERVER_ERROR_MSG);
        }
    }

    /**
     * 获取未分配部门的用户列表
     * 
     * @return 未分配部门的用户列表
     * @author Attendance System Team
     * @since 2026-03-27
     * @version v1.1.0-alpha.1
     */
    @Override
    public List<User> getUnassignedUsers() {
        return userDao.getUnassignedUsers();
    }
}