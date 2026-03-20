package com.example.service;

import com.example.common.ResponseResult;
import com.example.dto.RegisterRequest;
import com.example.entity.User;
import java.util.List;

/**
 * 用户服务接口
 * @author Attendance System Team
 * @since 2026-03-15
 */

public interface UserService {

    /**
     * 通过ID查询单条数据
     *
     * @param id 主键
     * @return 实例对象
     */
    User queryById(Integer id);

    /**
     * 根据用户名查询用户
     *
     * @param username 用户名
     * @return 实例对象
     */
    User queryByUsername(String username);

    /**
     * 查询所有用户数据
     *
     * @return 用户列表
     */
    List<User> queryAll();

    /**
     * 新增数据
     *
     * @param user 实例对象
     * @return 影响行数
     */
    int insert(User user);

    /**
     * 修改数据
     *
     * @param user 实例对象
     * @return 影响行数
     */
    int update(User user);

    /**
     * 用户注册
     *
     * @param registerRequest 注册请求参数
     * @return 注册结果
     */
    ResponseResult<User> register(RegisterRequest registerRequest);

    /**
     * 通过主键删除数据
     *
     * @param id 主键
     * @return 影响行数
     */
    int deleteById(Integer id);

    /**
     * 用户登录验证
     *
     * @param username 用户名
     * @param rawPassword 明文密码
     * @return 用户对象，如果验证失败则返回null
     */
    User login(String username, String rawPassword);
    
    /**
     * 获取用户信息（带错误处理）
     *
     * @param userId 用户ID
     * @return 用户信息响应
     */
    ResponseResult<User> getUserInfoWithHandling(Integer userId);
    
    /**
     * 根据部门ID获取员工列表
     *
     * @param departmentId 部门ID
     * @return 员工列表
     */
    List<User> getUsersByDepartmentId(Integer departmentId);
}