package com.example.dto;

/**
 * 创建部门请求数据传输对象
 * 封装创建部门时提交的相关信息
 * 
 * @author Attendance System Team
 * @since 2026-03-27
 * @version v1.1.0-alpha.1
 */
public class CreateDepartmentRequest {
    /**
     * 部门名称
     */
    private String name;

    /**
     * 部门描述
     */
    private String description;

    /**
     * 部门负责人ID
     */
    private Integer managerId;

    /**
     * 父部门ID
     */
    private Integer parentId;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getManagerId() {
        return managerId;
    }

    public void setManagerId(Integer managerId) {
        this.managerId = managerId;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }
}