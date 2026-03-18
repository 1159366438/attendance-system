<template>
  <div class="organization-chart">
    <h2>{{ APP_CONSTANTS.PAGE_NAMES.ORGANIZATION_CHART() }}</h2>
    <div class="chart-container">
      <!-- 左侧部门树 -->
      <div class="dept-tree-panel">
        <h3>{{ t('organization.deptTree', '部门结构') }}</h3>
        <el-input
          v-model="searchDept"
          :placeholder="t('organization.searchDept', '搜索部门')"
          prefix-icon="Search"
          clearable
          class="search-input"
        />
        <el-tree
          :data="deptTreeData"
          :props="treeProps"
          node-key="id"
          :default-expanded-keys="expandedKeys"
          :filter-node-method="filterNode"
          @node-click="handleDeptClick"
          class="dept-tree"
          highlight-current
        />
      </div>

      <!-- 右侧员工列表 -->
      <div class="employee-list-panel">
        <div class="panel-header">
          <h3>{{ currentDeptName ? `${currentDeptName} - ${t('organization.employees', '员工列表')}` : t('organization.selectDept', '请选择部门') }}</h3>
          <div class="actions">
            <el-button type="primary" @click="addEmployee">
              {{ t('organization.addEmployee', '添加员工') }}
            </el-button>
            <el-button @click="refreshEmployees">
              {{ t('organization.refresh', '刷新') }}
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
            :label="t('organization.employeeName', '员工姓名')"
            width="150"
          />
          <el-table-column
            prop="email"
            :label="t('organization.email', '邮箱')"
            width="200"
          />
          <el-table-column
            prop="phone"
            :label="t('organization.phone', '电话')"
            width="150"
          />
          <el-table-column
            prop="position"
            :label="t('organization.position', '职位')"
            width="150"
          />
          <el-table-column
            prop="status"
            :label="t('organization.status', '状态')"
            width="100"
          >
            <template #default="{ row }">
              <el-tag :type="row.status === 'active' ? 'success' : 'info'">
                {{ row.status === 'active' ? t('organization.active', '在职') : t('organization.inactive', '离职') }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            :label="t('organization.actions', '操作')"
            width="200"
          >
            <template #default="{ row }">
              <el-button size="small" @click="editEmployee(row)">
                {{ t('organization.edit', '编辑') }}
              </el-button>
              <el-button size="small" type="danger" @click="deleteEmployee(row)">
                {{ t('organization.delete', '删除') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div v-else class="empty-state">
          {{ t('organization.selectDeptPrompt', '请在左侧选择一个部门以查看员工信息') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 组织架构页面
 * 提供组织架构树形展示、部门员工管理功能
 * @author Attendance System Team
 * @since 2026-03-18
 */

import { ref, onMounted, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { t } from '../locales'
import { APP_CONSTANTS } from '../constants'

// 模拟部门数据
const deptTreeData = ref([
  {
    id: 1,
    label: t('organization.company', '公司总部'),
    children: [
      {
        id: 2,
        label: t('organization.hrDept', '人力资源部'),
        children: [
          { id: 5, label: t('organization.recruitmentGroup', '招聘组') },
          { id: 6, label: t('organization.trainingGroup', '培训组') }
        ]
      },
      {
        id: 3,
        label: t('organization.techDept', '技术部'),
        children: [
          { id: 7, label: t('organization.frontendGroup', '前端组') },
          { id: 8, label: t('organization.backendGroup', '后端组') },
          { id: 9, label: t('organization.qaGroup', '测试组') }
        ]
      },
      {
        id: 4,
        label: t('organization.financeDept', '财务部'),
      }
    ]
  }
])

// 模拟员工数据
const employeeList = ref<any[]>([])
const currentDeptId = ref<number | null>(null)
const currentDeptName = ref('')
const employeeLoading = ref(false)
const searchDept = ref('')
const expandedKeys = ref([1])

const treeProps = {
  children: 'children',
  label: 'label'
}

// 加载员工数据（模拟）
const loadEmployees = async (deptId: number) => {
  employeeLoading.value = true
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // 根据部门ID返回不同员工数据
    const mockEmployees: Record<number, Array<{
      id: number;
      username: string;
      email: string;
      phone: string;
      position: string;
      status: string;
    }>> = {
      1: [
        { id: 1, username: 'admin', email: 'admin@company.com', phone: '13800138001', position: 'Administrator', status: 'active' },
        { id: 2, username: 'manager', email: 'manager@company.com', phone: '13800138002', position: 'Manager', status: 'active' }
      ],
      2: [
        { id: 3, username: 'hr_zhang', email: 'zhang@hr.com', phone: '13800138003', position: 'HR Specialist', status: 'active' },
        { id: 4, username: 'hr_li', email: 'li@hr.com', phone: '13800138004', position: 'HR Manager', status: 'active' }
      ],
      3: [
        { id: 5, username: 'dev_wang', email: 'wang@tech.com', phone: '13800138005', position: 'Frontend Dev', status: 'active' },
        { id: 6, username: 'dev_zhao', email: 'zhao@tech.com', phone: '13800138006', position: 'Backend Dev', status: 'active' },
        { id: 7, username: 'qa_sun', email: 'sun@tech.com', phone: '13800138007', position: 'QA Engineer', status: 'active' }
      ],
      5: [
        { id: 8, username: 'recruit_chen', email: 'chen@hr.com', phone: '13800138008', position: 'Recruiter', status: 'active' }
      ],
      7: [
        { id: 9, username: 'front_yang', email: 'yang@tech.com', phone: '13800138009', position: 'Senior Frontend', status: 'active' },
        { id: 10, username: 'front_liu', email: 'liu@tech.com', phone: '13800138010', position: 'Junior Frontend', status: 'active' }
      ]
    }
    
    employeeList.value = mockEmployees[deptId] ?? []
  } catch (error) {
    ElMessage.error(t('organization.loadEmployeeError', '加载员工数据失败'))
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

// 刷新员工列表
const refreshEmployees = () => {
  if (currentDeptId.value) {
    loadEmployees(currentDeptId.value)
  }
}

// 添加员工
const addEmployee = () => {
  ElMessage.info(t('organization.notImplemented', '功能尚未实现'))
}

// 编辑员工
const editEmployee = (row: any) => {
  ElMessage.info(`${t('organization.edit')} ${row.username}`)
}

// 删除员工
const deleteEmployee = async (row: any) => {
  try {
    await ElMessageBox.confirm(
      `${t('organization.confirmDelete', '确认删除员工')} "${row.username}"?`,
      t('organization.deleteEmployee', '删除员工'),
      {
        confirmButtonText: t('buttons.confirm', '确认'),
        cancelButtonText: t('buttons.cancel', '取消'),
        type: 'warning'
      }
    )
    ElMessage.success(t('organization.deleteSuccess', '删除成功'))
    // 实际应用中这里会调用API删除员工
    refreshEmployees()
  } catch {
    // 用户取消操作
  }
}

// 监听搜索框变化
watch(searchDept, (val) => {
  // 在实际应用中，这里会调用el-tree的过滤方法
})

onMounted(() => {
  // 初始化时可以加载某个默认部门的数据
})
</script>

<style scoped>
.organization-chart {
  padding: 20px;
}

.chart-container {
  display: flex;
  gap: 20px;
  height: calc(100vh - 150px);
}

.dept-tree-panel {
  width: 300px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 15px;
  background-color: #fff;
  overflow-y: auto;
}

.dept-tree-panel h3 {
  margin-top: 0;
  margin-bottom: 15px;
}

.search-input {
  margin-bottom: 15px;
}

.dept-tree {
  max-height: calc(100% - 60px);
  overflow-y: auto;
}

.employee-list-panel {
  flex: 1;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 15px;
  background-color: #fff;
  overflow-y: auto;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.panel-header h3 {
  margin: 0;
}

.employee-table {
  min-height: 300px;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  color: #909399;
  font-size: 16px;
}

@media (max-width: 768px) {
  .chart-container {
    flex-direction: column;
    height: auto;
  }
  
  .dept-tree-panel {
    width: 100%;
    max-height: 300px;
  }
}
</style>