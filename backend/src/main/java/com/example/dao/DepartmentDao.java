package com.example.dao;

import com.example.entity.Department;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

/**
 * 部门数据访问接口
 * 定义对部门表进行数据库操作的方法
 * 
 * @author Attendance System Team
 * @since 2026-03-27
 * @version v1.1.0-alpha.1
 */
@Mapper
public interface DepartmentDao {


    /**
     * 查询所有部门
     */
    List<Department> selectAll();
    
    /**
     * 根据ID查询部门
     */
    Department selectById(@Param("id") Integer id);

    /**
     * 根据条件查询部门
     */
    List<Department> selectByCondition(@Param("name") String name, @Param("parentId") Integer parentId);

    /**
     * 新增部门
     */
    int insert(Department department);

    /**
     * 更新部门
     */
    int updateById(Department department);

    /**
     * 根据ID删除部门（逻辑删除）
     */
    int updateToDelete(@Param("id") Integer id);

    /**
     * 统计部门数量
     */
    int countByCondition(@Param("name") String name);
    
    /**
     * 根据条件统计部门数量
     */
    int countByConditionWithParent(@Param("name") String name, @Param("parentId") Integer parentId);
    
    /**
     * 根据父部门ID查询子部门
     */
    List<Department> selectByParentId(@Param("parentId") Integer parentId);
}