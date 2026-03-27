package com.example.dao;

import com.example.entity.User;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

/**
 * 用户数据访问接口
 * 定义对用户表进行数据库操作的方法
 * 
 * @author Attendance System Team
 * @since 2026-03-27
 * @version v1.1.0-alpha.1
 */
@Mapper
public interface UserDao {

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
     * 通过主键删除数据
     *
     * @param id 主键
     * @return 影响行数
     */
    int deleteById(Integer id);
    
    /**
     * 根据部门ID查询用户列表
     *
     * @param departmentId 部门ID
     * @return 用户列表
     */
    List<User> getUsersByDepartmentId(Integer departmentId);
    
    /**
     * 查询未分配部门的用户列表
     *
     * @return 用户列表
     * @author Attendance System Team
     * @since 2026-03-27
     * @version v1.1.0-alpha.1
     */
    List<User> getUnassignedUsers();
}