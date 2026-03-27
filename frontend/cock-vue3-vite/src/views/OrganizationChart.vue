<template>
  <div class="organization-chart">
    <h2>{{ APP_CONSTANTS.PAGE_NAMES.ORGANIZATION_CHART() }}</h2>
    <div class="chart-container">
      <!-- 左侧部门树 -->
      <div class="dept-tree-panel">
        <div class="panel-header">
          <h3>{{ APP_CONSTANTS.ORGANIZATION_CHART.MESSAGES.DEPARTMENT_TREE() }}</h3>
          <el-input
            v-model="searchDept"
            :placeholder="APP_CONSTANTS.ORGANIZATION_CHART.MESSAGES.SEARCH_DEPARTMENT()"
            prefix-icon="Search"
            clearable
            class="search-input"
          />
        </div>
        <el-tree
          ref="deptTreeRef"
          :data="deptTreeData"
          :props="treeProps"
          node-key="id"
          lazy
          :load="loadChildNodes"
          :filter-node-method="filterNode"
          @node-click="handleDeptClick"
          class="dept-tree"
          highlight-current
        />
      </div>

      <!-- 右侧员工列表 -->
      <div class="employee-list-panel">
        <div class="panel-header">
          <h3>{{ currentDeptName ? currentDeptName + ' - ' + APP_CONSTANTS.ORGANIZATION_CHART.MESSAGES.EMPLOYEES() : APP_CONSTANTS.ORGANIZATION_CHART.MESSAGES.SELECT_DEPT() }}</h3>
          <div class="actions">
            <el-button type="primary" @click="openAddEmployeeDialog">
              {{ APP_CONSTANTS.ORGANIZATION_CHART.BUTTONS.ADD_EMPLOYEE() }}
            </el-button>
            <el-button @click="refreshEmployees">
              {{ APP_CONSTANTS.ORGANIZATION_CHART.BUTTONS.REFRESH() }}
            </el-button>
          </div>
        </div>

        <el-table
          v-if="currentDeptId"
          :data="employeeList"
          :loading="employeeLoading"
          style="width: 100%"
          row-key="id"
          :border="true"
          class="employee-table"
        >
          <el-table-column
          prop="username"
          :label="APP_CONSTANTS.ORGANIZATION_CHART.TABLE.HEADERS.EMPLOYEE_NAME()"
          :width="APP_CONSTANTS.ORGANIZATION_CHART.TABLE_COLUMNS.NAME_WIDTH"
        />
          <el-table-column
          prop="email"
          :label="APP_CONSTANTS.ORGANIZATION_CHART.TABLE.HEADERS.EMAIL()"
          :width="APP_CONSTANTS.ORGANIZATION_CHART.TABLE_COLUMNS.EMAIL_WIDTH"
        />
        <el-table-column
          prop="phone"
          :label="APP_CONSTANTS.ORGANIZATION_CHART.TABLE.HEADERS.PHONE()"
          :width="APP_CONSTANTS.ORGANIZATION_CHART.TABLE_COLUMNS.PHONE_WIDTH"
        />
        <el-table-column
          prop="position"
          :label="APP_CONSTANTS.ORGANIZATION_CHART.TABLE.HEADERS.POSITION()"
          :width="APP_CONSTANTS.ORGANIZATION_CHART.TABLE_COLUMNS.POSITION_WIDTH"
        />
        <el-table-column
          prop="status"
          :label="APP_CONSTANTS.ORGANIZATION_CHART.TABLE.HEADERS.STATUS()"
          :width="APP_CONSTANTS.ORGANIZATION_CHART.TABLE_COLUMNS.STATUS_WIDTH"
        >
          <template #default="{ row }">
            <el-tag :type="row.status === APP_CONSTANTS.ORGANIZATION_CHART.STATUS.ACTIVE ? 'success' : 'info'">
              {{ row.status === APP_CONSTANTS.ORGANIZATION_CHART.STATUS.ACTIVE ? APP_CONSTANTS.ORGANIZATION_CHART.TABLE.STATUS.ACTIVE() : APP_CONSTANTS.ORGANIZATION_CHART.TABLE.STATUS.INACTIVE() }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          :label="APP_CONSTANTS.ORGANIZATION_CHART.TABLE.HEADERS.ACTIONS()"
          :width="APP_CONSTANTS.ORGANIZATION_CHART.TABLE_COLUMNS.ACTIONS_WIDTH"
        >
          <template #default="{ row }">
            <el-button size="small" @click="editEmployee(row)">
              {{ APP_CONSTANTS.ORGANIZATION_CHART.TABLE.ACTIONS.EDIT() }}
            </el-button>
            <el-button size="small" type="danger" @click="deleteEmployee(row)">
              {{ APP_CONSTANTS.ORGANIZATION_CHART.TABLE.ACTIONS.DELETE() }}
            </el-button>
          </template>
        </el-table-column>
        </el-table>

        <div v-else class="empty-state">
          {{ APP_CONSTANTS.ORGANIZATION_CHART.MESSAGES.SELECT_DEPT_PROMPT() }}
        </div>
      </div>
    </div>
    
    <!-- 添加员工对话框 -->
    <el-dialog
      v-model="addEmployeeDialogVisible"
      :title="APP_CONSTANTS.ORGANIZATION_CHART.DIALOGS.ADD_EMPLOYEE_TITLE()"
      width="500px"
      :close-on-click-modal="false"
    >
      <el-form>
        <el-form-item :label="APP_CONSTANTS.ORGANIZATION_CHART.FORM.LABELS.SELECT_EMPLOYEE()">
          <el-select
            v-model="selectedUnassignedEmployee"
            :placeholder="APP_CONSTANTS.ORGANIZATION_CHART.FORM.PLACEHOLDERS.SELECT_EMPLOYEE()"
            filterable
            style="width: 100%"
            :loading="loadingUnassigned"
          >
            <el-option
              v-for="employee in unassignedEmployees"
              :key="employee.id"
              :label="employee.username"
              :value="employee.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="addEmployeeDialogVisible = false">{{ APP_CONSTANTS.ORGANIZATION_CHART.BUTTONS.CANCEL() }}</el-button>
          <el-button type="primary" @click="addEmployee" :disabled="!selectedUnassignedEmployee">{{ APP_CONSTANTS.ORGANIZATION_CHART.BUTTONS.CONFIRM() }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
/**
 * 组织架构页面
 * 提供组织架构树形展示、部门员工管理功能
 * @author Attendance System Team
 * @since 2026-03-18
 * @version v1.1.0-alpha.1
 */

import { ref, onMounted, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useDepartmentStore } from '../store/modules/department'
import { t } from '../locales'
import { APP_CONSTANTS } from '../constants'
import departmentApi from '../api/departmentApi'
import { userApi } from '../api/userApi'

// 使用部门store
const departmentStore = useDepartmentStore()

// 部门树数据
const deptTreeData = ref<any[]>([])

// 初始化部门树 - 只加载顶级部门
const loadDeptTree = async () => {
  try {
    // 只加载顶级部门（parentId为null或0）
    const departmentsData = await departmentStore.loadDepartmentTree(null)
    if (departmentsData) {
      // 添加hasChildren属性以启用懒加载
      deptTreeData.value = Array.isArray(departmentsData) ? departmentsData.map((dept: any) => ({
        ...dept,
        label: dept.name,
        children: [],
        hasChildren: true // 表示可能存在子节点，启用懒加载
      })) : []
    } else {
      ElMessage.error(APP_CONSTANTS.ORGANIZATION_CHART.MESSAGES.LOAD_DEPT_ERROR())
      deptTreeData.value = []
    }
  } catch (error: any) {
    console.error('加载部门数据失败:', error)
    ElMessage.error(APP_CONSTANTS.ORGANIZATION_CHART.MESSAGES.LOAD_DEPT_ERROR())
    deptTreeData.value = []
  }
}



// 员工列表数据（通过API获取）
const employeeList = ref<any[]>([])
const currentDeptId = ref<number | null>(null)
const currentDeptName = ref('')
const employeeLoading = ref(false)
const searchDept = ref('')
const deptTreeRef = ref()

const treeProps = {
  children: APP_CONSTANTS.ORGANIZATION_CHART.TREE_PROPS.CHILDREN,
  label: APP_CONSTANTS.ORGANIZATION_CHART.TREE_PROPS.LABEL,
  hasChildren: APP_CONSTANTS.ORGANIZATION_CHART.TREE_PROPS.HAS_CHILDREN
}

// 加载员工数据（真实API）
const loadEmployees = async (deptId: number) => {
  employeeLoading.value = true
  try {
    const response = await departmentApi.getDepartmentEmployees(deptId)
    // 根据API响应结构处理数据
    if (response && response.data && response.data.code === 200) {
      // 对于员工列表，response.data.data就是用户数组
      const employeesData = response.data.data || [];
      // 转换用户数据为员工表格所需的格式
      employeeList.value = Array.isArray(employeesData) ? employeesData.map((user: any) => ({
        id: user.id,
        username: user.username,
        email: user.email || '', // 假设User实体中有email字段，否则使用空字符串
        phone: user.phone || '', // 假设User实体中有phone字段，否则使用空字符串
        position: user.position || '', // 假设User实体中有position字段，否则使用空字符串
        status: user.isDeleted === 1 ? APP_CONSTANTS.ORGANIZATION_CHART.STATUS.INACTIVE : APP_CONSTANTS.ORGANIZATION_CHART.STATUS.ACTIVE  // 根据isDeleted字段判断状态
      })) : [];
    } else {
      ElMessage.error(APP_CONSTANTS.ORGANIZATION_CHART.MESSAGES.LOAD_EMPLOYEE_ERROR())
      employeeList.value = []
    }
  } catch (error: any) {
    console.error('加载员工数据失败:', error)
    ElMessage.error(APP_CONSTANTS.ORGANIZATION_CHART.MESSAGES.LOAD_EMPLOYEE_ERROR())
    employeeList.value = []
  } finally {
    employeeLoading.value = false
  }
}

// 部门树节点点击事件
const handleDeptClick = (data: any) => {
  currentDeptId.value = data.id
  currentDeptName.value = data.label
  loadEmployees(data.id)
}

// 过滤部门树节点
const filterNode = (value: string, data: any) => {
  if (!value) return true
  return data.label.includes(value)
}

// 懒加载子节点
const loadChildNodes = (node: any, resolve: any) => {
  // 如果是根节点或有子节点的节点，加载其子部门
  if (!node || node.level === 0 || (node.data && node.data.hasChildren)) {
    departmentStore.loadDepartmentTree(node.data ? node.data.id : null)
      .then(childDepartments => {
        if (childDepartments) {
          // 为子部门添加必要的属性
          const children = Array.isArray(childDepartments) ? childDepartments.map((dept: any) => ({
            ...dept,
            label: dept.name,
            children: [],
            hasChildren: true // 如果子部门还可能有子部门，继续标记为true
          })) : []
          
          resolve(children)
        } else {
          console.error('加载子部门失败:')
          resolve([])
        }
      })
      .catch(error => {
        console.error('加载子部门失败:', error)
        ElMessage.error(APP_CONSTANTS.ORGANIZATION_CHART.MESSAGES.LOAD_DEPT_ERROR())
        resolve([])
      })
  } else {
    resolve([])
  }
}

// 刷新员工列表
const refreshEmployees = () => {
  if (currentDeptId.value) {
    loadEmployees(currentDeptId.value)
  }
}

// 添加员工相关变量
const addEmployeeDialogVisible = ref(false)
const unassignedEmployees = ref<any[]>([])
const selectedUnassignedEmployee = ref<number | null>(null)
const loadingUnassigned = ref(false)

// 获取未分配部门的员工
const loadUnassignedEmployees = async () => {
  loadingUnassigned.value = true
  try {
    const response = await departmentApi.getUnassignedEmployees()
    if (response && response.data && response.data.code === 200) {
      unassignedEmployees.value = Array.isArray(response.data.data) ? response.data.data.map((user: any) => ({
        id: user.id,
        username: user.username,
        email: user.email || '',
        phone: user.phone || '',
        position: user.position || ''
      })) : []
    } else {
      ElMessage.error(APP_CONSTANTS.ORGANIZATION_CHART.MESSAGES.FETCH_UNASSIGNED_FAILED())
      unassignedEmployees.value = []
    }
  } catch (error: any) {
    console.error(APP_CONSTANTS.ORGANIZATION_CHART.MESSAGES.FETCH_UNASSIGNED_FAILED(), ':', error)
    ElMessage.error(APP_CONSTANTS.ORGANIZATION_CHART.MESSAGES.FETCH_UNASSIGNED_FAILED())
    unassignedEmployees.value = []
  } finally {
    loadingUnassigned.value = false
  }
}

// 打开添加员工对话框
const openAddEmployeeDialog = async () => {
  if (!currentDeptId.value) {
    ElMessage.warning(APP_CONSTANTS.ORGANIZATION_CHART.MESSAGES.SELECT_DEPT())
    return
  }
  await loadUnassignedEmployees()
  if (unassignedEmployees.value.length === 0) {
    ElMessage.info(APP_CONSTANTS.ORGANIZATION_CHART.MESSAGES.NO_UNASSIGNED_EMPLOYEES())
    return
  }
  addEmployeeDialogVisible.value = true
}

// 添加员工
const addEmployee = async () => {
  if (!currentDeptId.value) {
    ElMessage.warning(APP_CONSTANTS.ORGANIZATION_CHART.MESSAGES.SELECT_DEPT())
    return
  }
  
  if (!selectedUnassignedEmployee.value) {
    ElMessage.warning(APP_CONSTANTS.ORGANIZATION_CHART.FORM.PLACEHOLDERS.SELECT_EMPLOYEE())
    return
  }
  
  try {
    const response = await userApi.assignUserToDepartment(selectedUnassignedEmployee.value, currentDeptId.value)
    if (response && response.data && response.data.code === 200) {
      ElMessage.success(APP_CONSTANTS.ORGANIZATION_CHART.MESSAGES.EMPLOYEE_ADD_SUCCESS())
      addEmployeeDialogVisible.value = false
      selectedUnassignedEmployee.value = null
      // 刷新员工列表
      refreshEmployees()
    } else {
      ElMessage.error(response.data?.msg || APP_CONSTANTS.ORGANIZATION_CHART.MESSAGES.EMPLOYEE_ADD_FAILED())
    }
  } catch (error: any) {
    console.error(APP_CONSTANTS.ORGANIZATION_CHART.MESSAGES.FETCH_UNASSIGNED_FAILED(), ':', error)
    ElMessage.error(APP_CONSTANTS.ORGANIZATION_CHART.MESSAGES.EMPLOYEE_ADD_FAILED())
  }
}

// 编辑员工
const editEmployee = (row: any) => {
  ElMessage.info(APP_CONSTANTS.ORGANIZATION_CHART.MESSAGES.EDIT(row.username))
}

// 删除员工
const deleteEmployee = async (row: any) => {
  try {
    await ElMessageBox.confirm(
      APP_CONSTANTS.ORGANIZATION_CHART.MESSAGES.CONFIRM_DELETE(row.username),
      APP_CONSTANTS.ORGANIZATION_CHART.MESSAGES.DELETE_EMPLOYEE(),
      {
        confirmButtonText: APP_CONSTANTS.ORGANIZATION_CHART.BUTTONS.CONFIRM(),
        cancelButtonText: APP_CONSTANTS.ORGANIZATION_CHART.BUTTONS.CANCEL(),
        type: 'warning'
      }
    )
    ElMessage.success(APP_CONSTANTS.ORGANIZATION_CHART.MESSAGES.DELETE_SUCCESS())
    // 实际应用中这里会调用API删除员工
    refreshEmployees()
  } catch {
    // 用户取消操作
  }
}

// 监听搜索框变化
watch(searchDept, (val) => {
  // 调用el-tree的过滤方法
  if (deptTreeRef.value) {
    deptTreeRef.value.filter(val)
  }
})

onMounted(() => {
  // 初始化时加载部门树
  loadDeptTree()
})
</script>

<style scoped>
@import '../assets/css/organization-chart.module.css';
</style>