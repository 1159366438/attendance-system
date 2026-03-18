<template>
  <div class="department-management">
    <div class="header">
      <h2>部门管理</h2>
    </div>
    
    <div class="toolbar">
      <el-button type="primary" @click="addDepartment">新增部门</el-button>
    </div>
    
    <div class="content">
      <el-table :data="departments" style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="ID" width="80"></el-table-column>
        <el-table-column prop="name" label="部门名称"></el-table-column>
        <el-table-column prop="description" label="部门描述"></el-table-column>
        <el-table-column prop="manager" label="部门经理"></el-table-column>
        <el-table-column prop="employeeCount" label="员工数量"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'danger'">
              {{ row.status === 'active' ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button size="small" @click="editDepartment(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteDepartment(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <!-- 部门编辑对话框 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
      <el-form :model="currentDepartment" label-width="100px">
        <el-form-item label="部门名称">
          <el-input v-model="currentDepartment.name"></el-input>
        </el-form-item>
        <el-form-item label="部门描述">
          <el-input v-model="currentDepartment.description" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="部门经理">
          <el-select v-model="currentDepartment.manager" placeholder="请选择部门经理" style="width: 100%">
            <el-option label="张三" value="zhangsan"></el-option>
            <el-option label="李四" value="lisi"></el-option>
            <el-option label="王五" value="wangwu"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="currentDepartment.status"
            :active-value="'active'"
            :inactive-value="'inactive'"
            inline-prompt
            active-text="启用"
            inactive-text="禁用"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveDepartment">确定</el-button>
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
 */

import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 部门类型定义
interface Department {
  id: number
  name: string
  description: string
  manager: string
  employeeCount: number
  status: string
}

// 响应式数据
const departments = ref<Department[]>([])
const loading = ref(false)
const dialogVisible = ref(false)
const dialogTitle = ref('')
const currentDepartment = ref<Partial<Department>>({
  name: '',
  description: '',
  manager: '',
  status: 'active'
})

// 模拟数据加载
const loadDepartments = async () => {
  loading.value = true
  // 模拟API调用
  setTimeout(() => {
    departments.value = [
      { id: 1, name: '技术部', description: '负责技术研发工作', manager: 'zhangsan', employeeCount: 15, status: 'active' },
      { id: 2, name: '人事部', description: '负责人力资源管理工作', manager: 'lisi', employeeCount: 5, status: 'active' },
      { id: 3, name: '财务部', description: '负责财务管理及核算', manager: 'wangwu', employeeCount: 8, status: 'active' },
      { id: 4, name: '市场部', description: '负责市场推广和销售', manager: 'zhangsan', employeeCount: 12, status: 'inactive' }
    ]
    loading.value = false
  }, 500)
}

// 新增部门
const addDepartment = () => {
  dialogTitle.value = '新增部门'
  currentDepartment.value = {
    name: '',
    description: '',
    manager: '',
    status: 'active'
  }
  dialogVisible.value = true
}

// 编辑部门
const editDepartment = (dept: Department) => {
  dialogTitle.value = '编辑部门'
  currentDepartment.value = { ...dept }
  dialogVisible.value = true
}

// 删除部门
const deleteDepartment = async (id: number) => {
  try {
    await ElMessageBox.confirm('确定要删除这个部门吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    // 模拟API调用
    departments.value = departments.value.filter(dept => dept.id !== id)
    ElMessage.success('删除成功')
  } catch {
    // 用户取消删除
  }
}

// 保存部门
const saveDepartment = () => {
  if (!currentDepartment.value.name) {
    ElMessage.error('请输入部门名称')
    return
  }
  
  if (dialogTitle.value === '新增部门') {
    // 添加新部门
    const newDept: Department = {
      id: Math.max(...departments.value.map(d => d.id), 0) + 1,
      name: currentDepartment.value.name || '',
      description: currentDepartment.value.description || '',
      manager: currentDepartment.value.manager || '',
      employeeCount: 0,
      status: currentDepartment.value.status || 'active'
    }
    departments.value.push(newDept)
    ElMessage.success('新增成功')
  } else {
    // 更新现有部门
    const index = departments.value.findIndex(dept => dept.id === currentDepartment.value.id)
    if (index !== -1) {
      departments.value[index] = { ...currentDepartment.value } as Department
      ElMessage.success('更新成功')
    }
  }
  
  dialogVisible.value = false
}

// 组件挂载时加载数据
onMounted(() => {
  loadDepartments()
})
</script>

<style scoped>
.department-management {
  padding: 20px;
}

.header {
  margin-bottom: 20px;
}

.toolbar {
  margin-bottom: 20px;
}

.content {
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>