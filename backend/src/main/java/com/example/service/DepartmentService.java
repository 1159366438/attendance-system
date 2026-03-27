package com.example.service;

import com.example.common.PageResult;
import com.example.dto.CreateDepartmentRequest;
import com.example.dto.QueryDepartmentRequest;
import com.example.dto.UpdateDepartmentRequest;
import com.example.entity.Department;
import java.util.List;

/**
 * 部门业务逻辑接口
 * 定义部门管理相关的业务逻辑方法
 * 
 * @author Attendance System Team
 * @since 2026-03-27
 * @version v1.1.0-alpha.1
 */
public interface DepartmentService {
    /**
     * 创建部门
     * @param request 创建部门请求参数
     * @return 创建的部门信息
     */
    Department createDepartment(CreateDepartmentRequest request);

    /**
     * 更新部门信息
     * @param request 更新部门请求参数
     * @return 更新的部门信息
     */
    Department updateDepartment(UpdateDepartmentRequest request);

    /**
     * 删除部门（逻辑删除）
     * @param id 部门ID
     * @return 删除结果
     */
    Boolean deleteDepartment(Integer id);

    /**
     * 根据ID获取部门信息
     * @param id 部门ID
     * @return 部门信息
     */
    Department getDepartmentById(Integer id);

    /**
     * 分页查询部门列表
     * @param request 查询部门请求参数
     * @return 分页结果
     */
    PageResult<Department> getDepartmentList(QueryDepartmentRequest request);
    
    /**
     * 根据部门ID获取员工列表
     * @param departmentId 部门ID
     * @return 员工列表
     */
    List<com.example.entity.User> getDepartmentEmployees(Integer departmentId);
    
    /**
     * 获取所有部门列表
     * @return 部门列表
     */
    List<Department> getAllDepartments();
    
    /**
     * 获取子部门列表
     * @param parentId 父部门ID，顶级部门为0或null
     * @return 子部门列表
     */
    List<Department> getChildDepartments(Integer parentId);
}