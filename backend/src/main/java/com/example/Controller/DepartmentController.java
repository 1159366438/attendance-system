package com.example.controller;

/**
 * 部门管理控制器
 * 提供部门增删改查等管理功能
 * 
 * @author Attendance System Team
 * @since 2026-03-27
 * @version v1.1.0-alpha.1
 */

import com.example.common.ResponseResult;
import com.example.dto.CreateDepartmentRequest;
import com.example.dto.QueryDepartmentRequest;
import com.example.dto.UpdateDepartmentRequest;
import com.example.dto.UserDTO;
import com.example.entity.Department;
import com.example.service.DepartmentService;
import com.example.constants.AppConstants;
import com.example.entity.User;
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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/departments")
@CrossOrigin
@Validated
@Tag(name = "部门管理", description = "部门相关的API接口，包括增删改查等功能")
public class DepartmentController {

    private static final Logger logger = LoggerFactory.getLogger(DepartmentController.class);

    @Autowired
    private DepartmentService departmentService;

    /**
     * 获取部门列表（分页）
     * <p>
     * 该接口用于获取部门列表信息，支持分页查询
     * </p>
     *
     * @param request 查询部门请求参数
     * @return 分页部门列表
     * @since 1.0.0
     */
    @Operation(summary = "获取部门列表", description = "分页获取部门列表信息")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "获取部门列表成功")
    })
    @GetMapping
    public ResponseResult<Object> getDepartmentList(QueryDepartmentRequest request) {
        logger.info("获取部门列表请求: page={}, size={}, name={}", 
            request.getPage(), request.getSize(), request.getName());

        try {
            // 调用服务层获取部门列表
            return ResponseResult.success(departmentService.getDepartmentList(request));
        } catch (Exception e) {
            logger.error("获取部门列表失败", e);
            return ResponseResult.error(AppConstants.Error.SERVER_ERROR_CODE, AppConstants.Department.DEPARTMENT_GET_LIST_FAILED_MSG);
        }
    }

    /**
     * 根据ID获取部门信息
     * <p>
     * 该接口用于根据部门ID获取部门详细信息
     * </p>
     *
     * @param id 部门ID
     * @return 部门详细信息
     * @since 1.0.0
     */
    @Operation(summary = "获取部门详情", description = "根据部门ID获取部门详细信息")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "获取部门详情成功"),
            @ApiResponse(responseCode = "404", description = "部门不存在")
    })
    @GetMapping("/{id}")
    public ResponseResult<Department> getDepartmentById(@Parameter(description = "部门ID") @PathVariable Integer id) {
        logger.info("获取部门详情请求: id={}", id);

        try {
            Department department = departmentService.getDepartmentById(id);
            if (department == null) {
                return ResponseResult.error(AppConstants.Department.DEPARTMENT_NOT_FOUND_CODE, AppConstants.Department.DEPARTMENT_NOT_FOUND_MSG);
            }
            return ResponseResult.success(department);
        } catch (Exception e) {
            logger.error("获取部门详情失败", e);
            return ResponseResult.error(AppConstants.Error.SERVER_ERROR_CODE, AppConstants.Department.DEPARTMENT_GET_DETAIL_FAILED_MSG);
        }
    }

    /**
     * 创建部门
     * <p>
     * 该接口用于创建新的部门信息
     * </p>
     *
     * @param request 创建部门请求参数
     * @return 创建的部门信息
     * @since 1.0.0
     */
    @Operation(summary = "创建部门", description = "创建新的部门信息")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "创建部门成功"),
            @ApiResponse(responseCode = "400", description = "创建参数错误"),
            @ApiResponse(responseCode = "500", description = "创建部门失败")
    })
    @PostMapping
    public ResponseResult<Department> createDepartment(@RequestBody @Validated CreateDepartmentRequest request) {
        logger.info("创建部门请求: name={}", request.getName());

        try {
            // 验证请求参数
            if (request.getName() == null || request.getName().trim().isEmpty()) {
                return ResponseResult.error(AppConstants.Department.DEPARTMENT_NAME_EMPTY_CODE, AppConstants.Department.DEPARTMENT_NAME_EMPTY_MSG);
            }

            // 调用服务层创建部门
            Department department = departmentService.createDepartment(request);
            return ResponseResult.success(department);
        } catch (Exception e) {
            logger.error("创建部门失败", e);
            return ResponseResult.error(AppConstants.Error.SERVER_ERROR_CODE, AppConstants.Department.DEPARTMENT_CREATE_FAILED_MSG + ": " + e.getMessage());
        }
    }

    /**
     * 更新部门信息
     * <p>
     * 该接口用于更新指定部门的信息
     * </p>
     *
     * @param id 部门ID
     * @param request 更新部门请求参数
     * @return 更新的部门信息
     * @since 1.0.0
     */
    @Operation(summary = "更新部门", description = "更新指定部门的信息")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "更新部门成功"),
            @ApiResponse(responseCode = "400", description = "更新参数错误"),
            @ApiResponse(responseCode = "404", description = "部门不存在"),
            @ApiResponse(responseCode = "500", description = "更新部门失败")
    })
    @PutMapping("/{id}")
    public ResponseResult<Department> updateDepartment(
            @Parameter(description = "部门ID") @PathVariable Integer id,
            @RequestBody @Validated UpdateDepartmentRequest request) {
        logger.info("更新部门请求: id={}, name={}", id, request.getName());

        try {
            // 设置ID，确保更新的是正确的部门
            request.setId(id);

            // 验证请求参数
            if (request.getName() == null || request.getName().trim().isEmpty()) {
                return ResponseResult.error(AppConstants.Department.DEPARTMENT_NAME_EMPTY_CODE, AppConstants.Department.DEPARTMENT_NAME_EMPTY_MSG);
            }

            // 调用服务层更新部门
            Department department = departmentService.updateDepartment(request);
            if (department == null) {
                return ResponseResult.error(AppConstants.Department.DEPARTMENT_NOT_FOUND_CODE, AppConstants.Department.DEPARTMENT_NOT_FOUND_MSG);
            }
            return ResponseResult.success(department);
        } catch (Exception e) {
            logger.error("更新部门失败", e);
            return ResponseResult.error(AppConstants.Error.SERVER_ERROR_CODE, AppConstants.Department.DEPARTMENT_UPDATE_FAILED_MSG + ": " + e.getMessage());
        }
    }

    /**
     * 删除部门
     * <p>
     * 该接口用于删除指定部门（逻辑删除）
     * </p>
     *
     * @param id 部门ID
     * @return 删除结果
     * @since 1.0.0
     */
    @Operation(summary = "删除部门", description = "删除指定部门（逻辑删除）")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "删除部门成功"),
            @ApiResponse(responseCode = "404", description = "部门不存在"),
            @ApiResponse(responseCode = "500", description = "删除部门失败")
    })
    @DeleteMapping("/{id}")
    public ResponseResult<String> deleteDepartment(@Parameter(description = "部门ID") @PathVariable Integer id) {
        logger.info("删除部门请求: id={}", id);

        try {
            // 调用服务层删除部门
            Boolean result = departmentService.deleteDepartment(id);
            if (!result) {
                return ResponseResult.error(AppConstants.Department.DEPARTMENT_NOT_FOUND_CODE, AppConstants.Department.DEPARTMENT_NOT_FOUND_MSG);
            }
            return ResponseResult.success(AppConstants.Department.DEPARTMENT_DELETE_SUCCESS_MSG);
        } catch (Exception e) {
            logger.error("删除部门失败", e);
            return ResponseResult.error(AppConstants.Error.SERVER_ERROR_CODE, AppConstants.Department.DEPARTMENT_DELETE_FAILED_MSG + ": " + e.getMessage());
        }
    }
    
    /**
     * 根据部门ID获取员工列表
     * <p>
     * 该接口用于获取指定部门下的所有员工信息
     * </p>
     *
     * @param id 部门ID
     * @return 部门员工列表
     * @since 1.0.0
     */
    @Operation(summary = "获取部门员工", description = "根据部门ID获取该部门下的员工列表")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "获取部门员工成功"),
            @ApiResponse(responseCode = "404", description = "部门不存在"),
            @ApiResponse(responseCode = "500", description = "获取部门员工失败")
    })
    @GetMapping("/{id}/employees")
    public ResponseResult<List<UserDTO>> getDepartmentEmployees(@Parameter(description = "部门ID") @PathVariable Integer id) {
        logger.info("获取部门员工请求: departmentId={}", id);

        try {
            // 首先检查部门是否存在
            Department department = departmentService.getDepartmentById(id);
            if (department == null) {
                return ResponseResult.error(AppConstants.Department.DEPARTMENT_NOT_FOUND_CODE, AppConstants.Department.DEPARTMENT_NOT_FOUND_MSG);
            }
            
            // 调用服务层获取部门员工
            List<User> employees = departmentService.getDepartmentEmployees(id);
            // 转换为DTO，排除敏感信息
            List<UserDTO> employeeDTOs = employees.stream()
                .map(UserDTO::new)
                .collect(java.util.stream.Collectors.toList());
            return ResponseResult.success(employeeDTOs);
        } catch (Exception e) {
            logger.error("获取部门员工失败", e);
            return ResponseResult.error(AppConstants.Error.SERVER_ERROR_CODE, AppConstants.Department.DEPARTMENT_GET_EMPLOYEES_FAILED_MSG + ": " + e.getMessage());
        }
    }
    
    /**
     * 获取子部门列表（用于懒加载树形结构）
     * <p>
     * 该接口用于获取指定父部门下的子部门列表，支持懒加载树形结构
     * </p>
     *
     * @param parentId 父部门ID，顶级部门为0或null
     * @return 子部门列表
     * @since 1.0.0
     */
    @Operation(summary = "获取子部门列表", description = "根据父部门ID获取子部门列表，用于懒加载树形结构")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "获取子部门列表成功")
    })
    @GetMapping("/children")
    public ResponseResult<List<Department>> getChildDepartments(Integer parentId) {
        logger.info("获取子部门列表请求: parentId={}", parentId);

        try {
            List<Department> childDepartments = departmentService.getChildDepartments(parentId);
            return ResponseResult.success(childDepartments);
        } catch (Exception e) {
            logger.error("获取子部门列表失败", e);
            return ResponseResult.error(AppConstants.Error.SERVER_ERROR_CODE, AppConstants.Department.DEPARTMENT_GET_CHILDREN_FAILED_MSG + ": " + e.getMessage());
        }
    }
}