package com.example.service.impl;

import com.example.common.PageResult;
import com.example.constants.DatabaseConstants;
import com.example.constants.DepartmentServiceConstants;
import com.example.dao.DepartmentDao;
import com.example.dto.CreateDepartmentRequest;
import com.example.dto.QueryDepartmentRequest;
import com.example.dto.UpdateDepartmentRequest;
import com.example.entity.Department;
import com.example.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 部门业务逻辑实现类
 * 实现部门管理相关的业务逻辑
 * 
 * @author Attendance System Team
 * @since 2026-03-27
 * @version v1.1.0-alpha.1
 */
@Service
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    private DepartmentDao departmentDao;

    @Autowired
    private com.example.service.UserService userService;

    @Override
    @Transactional
    public Department createDepartment(CreateDepartmentRequest request) {
        // 检查部门名称是否已存在
        List<Department> existingDepartments = departmentDao.selectByCondition(request.getName(), null);
        for (Department dept : existingDepartments) {
            if (dept.getIsDeleted() == DatabaseConstants.LogicDelete.NOT_DELETED && dept.getName().equals(request.getName())) {
                throw new RuntimeException(DepartmentServiceConstants.BusinessLogic.DEPARTMENT_NAME_EXISTS_ERROR);
            }
        }

        Department department = new Department();
        department.setName(request.getName());
        department.setDescription(request.getDescription());
        department.setParentId(request.getParentId()); // 设置父部门ID
        department.setManagerId(request.getManagerId());

        department.setCreateTime(LocalDateTime.now());
        department.setUpdateTime(LocalDateTime.now());
        department.setIsDeleted(DatabaseConstants.LogicDelete.NOT_DELETED); // 未删除

        departmentDao.insert(department);
        return department;
    }

    @Override
    @Transactional
    public Department updateDepartment(UpdateDepartmentRequest request) {
        Department existingDepartment = departmentDao.selectById(request.getId());
        if (existingDepartment == null || existingDepartment.getIsDeleted() == DatabaseConstants.LogicDelete.DELETED) {
            throw new RuntimeException(DepartmentServiceConstants.BusinessLogic.DEPARTMENT_NOT_EXISTS_ERROR);
        }

        // 如果更新了部门名称，检查新名称是否已存在
        if (request.getName() != null && !request.getName().equals(existingDepartment.getName())) {
            List<Department> existingDepartments = departmentDao.selectByCondition(request.getName(), null);
            for (Department dept : existingDepartments) {
                if (dept.getIsDeleted() == DatabaseConstants.LogicDelete.NOT_DELETED && dept.getId() != request.getId() && dept.getName().equals(request.getName())) {
                    throw new RuntimeException(DepartmentServiceConstants.BusinessLogic.DEPARTMENT_NAME_EXISTS_ERROR);
                }
            }
        }

        Department department = new Department();
        department.setId(request.getId());
        department.setName(request.getName());
        department.setDescription(request.getDescription());
        department.setParentId(request.getParentId()); // 设置父部门ID
        department.setManagerId(request.getManagerId());

        department.setUpdateTime(LocalDateTime.now());

        departmentDao.updateById(department);
        return department;
    }

    @Override
    @Transactional
    public Boolean deleteDepartment(Integer id) {
        Department department = departmentDao.selectById(id);
        if (department == null || department.getIsDeleted() == DatabaseConstants.LogicDelete.DELETED) {
            return false;
        }

        // 逻辑删除
        return departmentDao.updateToDelete(id) > 0;
    }

    @Override
    public Department getDepartmentById(Integer id) {
        Department department = departmentDao.selectById(id);
        if (department != null && department.getIsDeleted() == DatabaseConstants.LogicDelete.DELETED) {
            return null; // 如果已被逻辑删除，则返回null
        }
        return department;
    }

    @Override
    public PageResult<Department> getDepartmentList(QueryDepartmentRequest request) {
        // 使用支持parentId的统计方法
        int total = departmentDao.countByConditionWithParent(request.getName(), request.getParentId());
        
        // 获取分页数据
        // 使用更新后的selectByCondition方法，支持按名称和parentId查询
        List<Department> departments = departmentDao.selectByCondition(request.getName(), request.getParentId());
        
        // 过滤掉已删除的记录
        departments.removeIf(dept -> dept.getIsDeleted() == DatabaseConstants.LogicDelete.DELETED);
        
        return new PageResult<Department>(
                departments,
                (long)total,
                request.getPage(),
                request.getSize(),
                (long)(Math.ceil(total / (double)request.getSize()))
        );
    }

    @Override
    public List<com.example.entity.User> getDepartmentEmployees(Integer departmentId) {
        // 通过UserService获取部门下的员工
        return userService.getUsersByDepartmentId(departmentId);
    }
    
    @Override
    public List<Department> getAllDepartments() {
        return departmentDao.selectAll();
    }
    
    @Override
    public List<Department> getChildDepartments(Integer parentId) {
        // 如果parentId为null，查询顶级部门（parent_id = 0 或 NULL）
        Integer parentFilter = (parentId == null) ? 0 : parentId;
        return departmentDao.selectByParentId(parentFilter);
    }
}