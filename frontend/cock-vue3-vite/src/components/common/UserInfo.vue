<template>
  <!-- 用户信息组件容器 -->
  <div class="user-header-container">
    <!-- 当前菜单标题 -->
    <h2 class="current-menu">{{ currentMenuText }}</h2>
    
    <div class="user-info">
      <!-- 当前时间显示 -->
      <span class="refresh-time">{{ currentTime }}</span>
      <!-- 用户信息区域 -->
      <div class="user-box">
        <!-- 用户头像 -->
        <el-avatar :src="userInfo.avatar" class="avatar" @click="openEditDialog"></el-avatar>
        <!-- 用户名 -->
        <span class="user-name">{{ userInfo.username }}</span>
        <!-- 登出按钮 -->
        <el-button link class="logout-btn" @click="handleLogout">
          {{ logoutText }}
        </el-button>
      </div>
    </div>
    
    <!-- 编辑用户信息对话框 -->
    <el-dialog 
      v-model="editDialogVisible" 
      :title="dialogTitle" 
      :width="APP_CONSTANTS.USER.MODAL.WIDTH"
      :close-on-click-modal="false"
    >
      <el-form :model="editForm" :rules="formRules" ref="editFormRef" label-width="80px">
        <el-form-item :label="APP_CONSTANTS.USER.FORM_LABELS.USERNAME()" prop="username">
          <el-input 
            v-model="editForm.username" 
            :placeholder="APP_CONSTANTS.USER.FORM_PLACEHOLDERS.USERNAME()"
            maxlength="50"
          ></el-input>
        </el-form-item>
        <el-form-item :label="APP_CONSTANTS.USER.FORM_LABELS.AGE()" prop="age">
          <el-input-number 
            v-model="editForm.age" 
            :min="APP_CONSTANTS.USER.VALIDATION.AGE_MIN"
            :max="APP_CONSTANTS.USER.VALIDATION.AGE_MAX"
            :placeholder="APP_CONSTANTS.USER.FORM_PLACEHOLDERS.AGE()"
          ></el-input-number>
        </el-form-item>
        <el-form-item :label="APP_CONSTANTS.USER.FORM_LABELS.GENDER()" prop="gender">
          <el-radio-group v-model="editForm.gender">
            <el-radio :label="APP_CONSTANTS.USER.GENDER.MALE">{{ APP_CONSTANTS.USER.GENDER_OPTIONS.MALE() }}</el-radio>
            <el-radio :label="APP_CONSTANTS.USER.GENDER.FEMALE">{{ APP_CONSTANTS.USER.GENDER_OPTIONS.FEMALE() }}</el-radio>
            <el-radio :label="APP_CONSTANTS.USER.GENDER.UNKNOWN">{{ APP_CONSTANTS.USER.GENDER_OPTIONS.UNKNOWN() }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="APP_CONSTANTS.USER.FORM_LABELS.AVATAR()" prop="avatar">
          <AvatarSelector 
            v-model="editForm.avatar"
          />
        </el-form-item>
        <el-form-item :label="APP_CONSTANTS.USER.FORM_LABELS.EMAIL()" prop="email">
          <el-input 
            v-model="editForm.email" 
            :placeholder="APP_CONSTANTS.USER.FORM_PLACEHOLDERS.EMAIL()"
            maxlength="100"
          ></el-input>
        </el-form-item>
        <el-form-item :label="APP_CONSTANTS.USER.FORM_LABELS.PHONE()" prop="phone">
          <el-input 
            v-model="editForm.phone" 
            :placeholder="APP_CONSTANTS.USER.FORM_PLACEHOLDERS.PHONE()"
            maxlength="20"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelEdit">{{ APP_CONSTANTS.USER.BUTTONS.CANCEL() }}</el-button>
          <el-button type="primary" @click="saveUserInfo">{{ APP_CONSTANTS.USER.BUTTONS.SAVE() }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useUserStore } from '../../store'
import { formatDate } from '../../utils'
import { APP_CONFIG } from '../../config/appConfig'
import { APP_CONSTANTS, MESSAGE_CONSTANTS, EVENT_CONSTANTS } from '../../constants'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import AvatarSelector from './AvatarSelector.vue'

/**
 * 用户信息显示组件
 * 显示当前用户信息，包括头像、姓名和登出按钮
 * @author Attendance System Team
 * @since 2026-03-15
 * @version v1.1.0-alpha.1
 */

// 接收父组件传递的菜单文本
const props = withDefaults(defineProps<{
  currentMenuText: string;  // 当前菜单文本
}>(), {
  currentMenuText: APP_CONSTANTS.USER.DEFAULT_VALUES.MENU_TEXT  // 默认菜单文本
});

// 定义组件事件
const emit = defineEmits([EVENT_CONSTANTS.USER.LOGOUT])  // 用户登出事件

// 计算属性
const logoutText = computed(() => APP_CONSTANTS.USER.BUTTONS.LOGOUT())  // 登出按钮文本

// 响应式数据
const currentTime = ref('')  // 当前时间显示

/**
 * 获取用户信息
 * 调用userStore.fetchUserInfo()获取用户信息
 */
const userStore = useUserStore()

// 响应式数据
const userInfo = computed(() => userStore.userInfo)     // 用户信息计算属性

// 编辑相关数据
const editDialogVisible = ref(false)
const dialogTitle = computed(() => APP_CONSTANTS.USER.MODAL.TITLE())
const editForm = ref({
  username: '',
  age: undefined as number | undefined,
  gender: undefined as number | undefined,
  avatar: '',
  email: '',
  phone: ''
})
const editFormRef = ref<FormInstance>()
const formRules = computed<FormRules>(() => ({
  username: [
    { required: true, message: APP_CONSTANTS.USER.VALIDATION.USERNAME_REQUIRED(), trigger: 'blur' },
    { min: 3, max: 50, message: APP_CONSTANTS.USER.VALIDATION.USERNAME_LENGTH(), trigger: 'blur' }
  ],
  age: [
    { 
      validator: (_rule: any, value: number, callback: Function) => {
        if (value !== undefined && (value < APP_CONSTANTS.USER.VALIDATION.AGE_MIN || value > APP_CONSTANTS.USER.VALIDATION.AGE_MAX)) {
          callback(new Error(APP_CONSTANTS.USER.VALIDATION.AGE_RANGE()))
        } else {
          callback()
        }
      }, 
      trigger: 'blur' 
    }
  ],
  email: [
    { 
      validator: (_rule: any, value: string, callback: Function) => {
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          callback(new Error('请输入有效的邮箱地址'))
        } else {
          callback()
        }
      }, 
      trigger: 'blur' 
    }
  ],
  phone: [
    { 
      validator: (_rule: any, value: string, callback: Function) => {
        if (value && !/^1[3-9]\d{9}$/.test(value)) {
          callback(new Error('请输入有效的手机号码'))
        } else {
          callback()
        }
      }, 
      trigger: 'blur' 
    }
  ]
}))

/**
 * 更新时间函数
 * 格式化当前时间为指定格式并更新显示
 */
const updateTime = () => {
  currentTime.value = formatDate(new Date(), 'datetime')  // 更新当前时间显示
};

/**
 * 获取用户信息
 * 从状态管理中获取用户信息并处理可能的错误
 */
const getUserInfo = async () => {
  try {
    await userStore.fetchUserInfo()  // 获取用户信息
    // 错误已在axios拦截器中统一处理
  } catch (error) {
    // 兜底错误处理，防止错误冒泡
    console.error('获取用户信息失败:', error)
    // 显示错误消息给用户
    ElMessage.error(MESSAGE_CONSTANTS.USER_INFO.FETCH_FAILED())
  }
};

/**
 * 处理登出事件
 * 触发登出事件，由父组件处理具体逻辑
 */
const handleLogout = () => {
  // 触发登出事件
  emit(EVENT_CONSTANTS.USER.LOGOUT)
}

/**
 * 打开编辑对话框
 */
const openEditDialog = async () => {
  // 先获取最新的用户信息
  await getUserInfo()
  
  // 将当前用户信息复制到编辑表单
  editForm.value = {
    username: userInfo.value.username || '',
    age: userInfo.value.age,
    gender: userInfo.value.gender,
    avatar: userInfo.value.avatar || '',
    email: userInfo.value.email || '',
    phone: userInfo.value.phone || ''
  }
  editDialogVisible.value = true
}

/**
 * 选择头像
 */
const selectAvatar = (avatarUrl: string) => {
  editForm.value.avatar = avatarUrl
}

/**
 * 取消编辑
 */
const cancelEdit = () => {
  editDialogVisible.value = false
  // 重置表单验证
  if (editFormRef.value) {
    editFormRef.value.resetFields()
  }
}

/**
 * 保存用户信息
 */
const saveUserInfo = async () => {
  if (editFormRef.value) {
    const valid = await editFormRef.value.validate().catch(() => false)
    if (valid) {
      try {
        // 调用store中的更新用户信息方法
        const updateData = {
          username: editForm.value.username,
          age: editForm.value.age,
          gender: editForm.value.gender,
          avatar: editForm.value.avatar
        }
        
        const result = await userStore.updateUserInfo(updateData)
        
        if (result.success) {
          ElMessage.success(result.message || APP_CONSTANTS.USER.MESSAGES.UPDATE_SUCCESS())
          editDialogVisible.value = false
        } else {
          ElMessage.error(result.message || APP_CONSTANTS.USER.MESSAGES.UPDATE_FAILED())
        }
      } catch (error) {
        console.error('更新用户信息失败:', error)
        ElMessage.error(APP_CONSTANTS.USER.MESSAGES.UPDATE_FAILED())
      }
    }
  }
}

// 组件挂载时的初始化逻辑
onMounted(() => {
  // 初始化时间和用户信息
  updateTime()      // 初始化时间显示
  getUserInfo()     // 获取用户信息
  
  // 设置定时器，定期更新时间显示
  const timer = setInterval(updateTime, APP_CONFIG.UI.TIMING.AUTO_UPDATE_INTERVAL)
  
  // 组件卸载时清理定时器，防止内存泄漏
  onUnmounted(() => {
    clearInterval(timer)  // 清除时间更新定时器
  })
})
</script>

<style scoped>
/* 导入用户信息组件的样式 */
@import '../../assets/css/user-info.css';

.avatar-selector {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.avatar-option {
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.3s;
}

.avatar-option:hover {
  background-color: #f0f0f0;
}

.avatar-option.active {
  background-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.3);
}
</style>