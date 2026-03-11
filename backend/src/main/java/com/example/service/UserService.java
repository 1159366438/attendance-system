package com.example.service;

import com.example.entity.User;
import java.util.List;

/**
 * 用户服务接口
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
     * 用户登录验证
     *
     * @param username 用户名
     * @param rawPassword 明文密码
     * @return 用户对象，如果验证失败则返回null
     */
    User login(String username, String rawPassword);
    
    // 临时保留简单验证方法
    // User loginSimple(String username, String password);

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
     * 通过主键删除数据
     *
     * @param id 主键
     * @return 影响行数
     */
    int deleteById(Integer id);
}