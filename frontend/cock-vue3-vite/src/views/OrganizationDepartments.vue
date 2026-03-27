<template>
  <div class="department-management">
    <div class="header">
      <h2>{{ APP_CONSTANTS.DEPARTMENT_MANAGEMENT.PAGE_TITLE() }}</h2>
    </div>
    
    <div class="toolbar">
      <el-button 
        type="primary" 
        @click="addDepartment"
      >
        {{ APP_CONSTANTS.DEPARTMENT_MANAGEMENT.BUTTONS.ADD() }}
      </el-button>
    </div>
    
    <div class="content">
      <el-table :data="departments" style="width: 100%" v-loading="loading">
        <el-table-column 
          prop="id" 
          :label="APP_CONSTANTS.DEPARTMENT_MANAGEMENT.TABLE_HEADERS.ID()" 
          :width="APP_CONSTANTS.DEPARTMENT_MANAGEMENT.COMPONENTS.ID_COLUMN_WIDTH"
        ></el-table-column>
        <el-table-column 
          prop="name" 
          :label="APP_CONSTANTS.DEPARTMENT_MANAGEMENT.TABLE_HEADERS.NAME()"
        ></el-table-column>
        <el-table-column 
          prop="description" 
          :label="APP_CONSTANTS.DEPARTMENT_MANAGEMENT.TABLE_HEADERS.DESCRIPTION()"
        ></el-table-column>
        <el-table-column 
          prop="managerId" 
          :label="APP_CONSTANTS.DEPARTMENT_MANAGEMENT.TABLE_HEADERS.MANAGER_ID()"
        ></el-table-column>
        <el-table-column 
          prop="createTime" 
          :label="APP_CONSTANTS.DEPARTMENT_MANAGEMENT.TABLE_HEADERS.CREATE_TIME()"
        ></el-table-column>
        <el-table-column 
          :label="APP_CONSTANTS.DEPARTMENT_MANAGEMENT.TABLE_HEADERS.ACTIONS()" 
          :width="APP_CONSTANTS.DEPARTMENT_MANAGEMENT.COMPONENTS.ACTIONS_COLUMN_WIDTH"
        >
          <template #default="{ row }">
            <el-button 
              size="small" 
              @click="editDepartment(row)"
            >
              {{ APP_CONSTANTS.DEPARTMENT_MANAGEMENT.BUTTONS.EDIT() }}
            </el-button>
            <el-button 
              size="small" 
              type="danger" 
              @click="deleteDepartment(row.id)"
            >
              {{ APP_CONSTANTS.DEPARTMENT_MANAGEMENT.BUTTONS.DELETE() }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <!-- 部门编辑对话框 -->
    <el-dialog 
      v-model="dialogVisible" 
      :title="dialogTitle" 
      :width="APP_CONSTANTS.DEPARTMENT_MANAGEMENT.COMPONENTS.DIALOG_WIDTH"
    >
      <el-form :model="currentDepartment" :label-width="APP_CONSTANTS.DEPARTMENT_MANAGEMENT.COMPONENTS.DIALOG_LABEL_WIDTH">
        <el-form-item :label="APP_CONSTANTS.DEPARTMENT_MANAGEMENT.FORM_LABELS.NAME()">
          <el-input 
            v-model="currentDepartment.name" 
            :placeholder="APP_CONSTANTS.DEPARTMENT_MANAGEMENT.FORM_PLACEHOLDERS.NAME()"
          ></el-input>
        </el-form-item>
        <el-form-item :label="APP_CONSTANTS.DEPARTMENT_MANAGEMENT.FORM_LABELS.DESCRIPTION()">
          <el-input 
            v-model="currentDepartment.description" 
            type="textarea" 
            :placeholder="APP_CONSTANTS.DEPARTMENT_MANAGEMENT.FORM_PLACEHOLDERS.DESCRIPTION()"
          ></el-input>
        </el-form-item>
        <el-form-item :label="APP_CONSTANTS.DEPARTMENT_MANAGEMENT.FORM_LABELS.MANAGER_ID()">
          <el-input 
            v-model="currentDepartment.managerId" 
            :placeholder="APP_CONSTANTS.DEPARTMENT_MANAGEMENT.FORM_PLACEHOLDERS.MANAGER_ID()"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">
            {{ APP_CONSTANTS.DEPARTMENT_MANAGEMENT.BUTTONS.CANCEL() }}
          </el-button>
          <el-button 
            type="primary" 
            @click="saveDepartment"
          >
            {{ APP_CONSTANTS.DEPARTMENT_MANAGEMENT.BUTTONS.CONFIRM() }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
/**
 * 部门管理页面
 * 提供部门增删改查功能
 * @author Attendance System Team
 * @since 2026-03-18
 * @version v1.1.0-alpha.1
 */

import { ref, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useDepartmentStore } from '../store/modules/department'
import { APP_CONSTANTS } from '../constants/appConstants'

// 部门类型定义
interface Department {
  id: number
  name: string
  description: string
  managerId: number
  createTime?: string
  updateTime?: string
  isDeleted?: number
}

// 使用部门store
const departmentStore = useDepartmentStore()

// 响应式数据
const departments = computed(() => departmentStore.allDepartments)
const loading = computed(() => departmentStore.isLoading)
const dialogVisible = ref(false)
const dialogTitle = ref('')
const currentDepartment = ref<Partial<Department>>({
  name: APP_CONSTANTS.DEFAULT_VALUES.EMPTY_STRING,
  description: APP_CONSTANTS.DEFAULT_VALUES.EMPTY_STRING,
  managerId: APP_CONSTANTS.DEFAULT_VALUES.UNDEFINED
})

// 加载部门列表
const loadDepartments = async () => {
  try {
    // 使用store获取部门列表
    const success = await departmentStore.fetchDepartments({
      page: 1,
      size: 100  // 获取所有部门
    })
    
    if (!success) {
      ElMessage.error(APP_CONSTANTS.DEPARTMENT_MANAGEMENT.ERROR_MESSAGES.LOAD())
    }
  } catch (error) {
    console.error('获取部门列表失败:', error)
    ElMessage.error(APP_CONSTANTS.DEPARTMENT_MANAGEMENT.ERROR_MESSAGES.LOAD())
  }
}

// 新增部门
const addDepartment = () => {
  dialogTitle.value = APP_CONSTANTS.DEPARTMENT_MANAGEMENT.DIALOG_TITLES.ADD()
  currentDepartment.value = {
    name: APP_CONSTANTS.DEFAULT_VALUES.EMPTY_STRING,
    description: APP_CONSTANTS.DEFAULT_VALUES.EMPTY_STRING,
    managerId: APP_CONSTANTS.DEFAULT_VALUES.UNDEFINED
  }
  dialogVisible.value = true
}

// 编辑部门
const editDepartment = (dept: Department) => {
  dialogTitle.value = APP_CONSTANTS.DEPARTMENT_MANAGEMENT.DIALOG_TITLES.EDIT()
  currentDepartment.value = { ...dept }
  dialogVisible.value = true
}

// 删除部门
const deleteDepartment = async (id: number) => {
  try {
    await ElMessageBox.confirm(
      APP_CONSTANTS.DEPARTMENT_MANAGEMENT.CONFIRM_MESSAGES.DELETE(),
      APP_CONSTANTS.DEPARTMENT_MANAGEMENT.CONFIRM_MESSAGES.DELETE_TITLE(),
      {
        confirmButtonText: APP_CONSTANTS.DEPARTMENT_MANAGEMENT.BUTTONS.CONFIRM(),
        cancelButtonText: APP_CONSTANTS.DEPARTMENT_MANAGEMENT.BUTTONS.CANCEL(),
        type: APP_CONSTANTS.ELEMENT_TYPES.WARNING as 'success' | 'warning' | 'info' | 'error' | undefined
      }
    )
    
    // 调用store删除部门
    const success = await departmentStore.deleteDepartment(id)
    
    if (success) {
      ElMessage.success(APP_CONSTANTS.DEPARTMENT_MANAGEMENT.SUCCESS_MESSAGES.DELETE())
      // loadDepartments() // 由于store已经更新了状态，无需重新加载
    } else {
      ElMessage.error(APP_CONSTANTS.DEPARTMENT_MANAGEMENT.ERROR_MESSAGES.DELETE())
    }
  } catch (error) {
    console.error('删除部门失败:', error)
    if (error !== 'cancel') { // 用户取消操作时不显示错误
      ElMessage.error(APP_CONSTANTS.DEPARTMENT_MANAGEMENT.ERROR_MESSAGES.DELETE())
    }
  }
}

// 保存部门
const saveDepartment = async () => {
  if (!currentDepartment.value.name) {
    ElMessage.error(APP_CONSTANTS.DEPARTMENT_MANAGEMENT.ERROR_MESSAGES.EMPTY_NAME())
    return
  }
  
  try {
    let success: boolean
    
    if (dialogTitle.value === APP_CONSTANTS.DEPARTMENT_MANAGEMENT.DIALOG_TITLES.ADD()) {
      // 调用store创建部门
      success = await departmentStore.createDepartment({
        name: currentDepartment.value.name,
        description: currentDepartment.value.description,
        managerId: currentDepartment.value.managerId
      })
    } else {
      // 调用store更新部门
      if (!currentDepartment.value.id) {
        ElMessage.error(APP_CONSTANTS.DEPARTMENT_MANAGEMENT.ERROR_MESSAGES.EMPTY_ID())
        return
      }
      
      success = await departmentStore.updateDepartment(currentDepartment.value.id, {
        name: currentDepartment.value.name,
        description: currentDepartment.value.description,
        managerId: currentDepartment.value.managerId
      })
    }
    
    if (success) {
      ElMessage.success(
        dialogTitle.value === APP_CONSTANTS.DEPARTMENT_MANAGEMENT.DIALOG_TITLES.ADD() 
          ? APP_CONSTANTS.DEPARTMENT_MANAGEMENT.SUCCESS_MESSAGES.ADD() 
          : APP_CONSTANTS.DEPARTMENT_MANAGEMENT.SUCCESS_MESSAGES.UPDATE()
      )
      dialogVisible.value = false
      // loadDepartments() // 由于store已经更新了状态，无需重新加载
    } else {
      ElMessage.error(
        dialogTitle.value === APP_CONSTANTS.DEPARTMENT_MANAGEMENT.DIALOG_TITLES.ADD() 
          ? APP_CONSTANTS.DEPARTMENT_MANAGEMENT.ERROR_MESSAGES.ADD() 
          : APP_CONSTANTS.DEPARTMENT_MANAGEMENT.ERROR_MESSAGES.UPDATE()
      )
    }
  } catch (error) {
    console.error(
      dialogTitle.value === APP_CONSTANTS.DEPARTMENT_MANAGEMENT.DIALOG_TITLES.ADD() 
        ? APP_CONSTANTS.DEPARTMENT_MANAGEMENT.LOG_MESSAGES.ADD_ERROR() 
        : APP_CONSTANTS.DEPARTMENT_MANAGEMENT.LOG_MESSAGES.UPDATE_ERROR(), 
      error
    )
    ElMessage.error(
      dialogTitle.value === APP_CONSTANTS.DEPARTMENT_MANAGEMENT.DIALOG_TITLES.ADD() 
        ? APP_CONSTANTS.DEPARTMENT_MANAGEMENT.ERROR_MESSAGES.ADD() 
        : APP_CONSTANTS.DEPARTMENT_MANAGEMENT.ERROR_MESSAGES.UPDATE()
    )
  }
}

// 组件挂载时加载数据
onMounted(() => {
  loadDepartments()
})
</script>

<style scoped>
@import '../assets/css/organization-departments.module.css';
</style>