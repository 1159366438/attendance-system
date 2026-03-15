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
        <el-avatar :src="userInfo.avatar" class="avatar"></el-avatar>
        <!-- 用户名 -->
        <span class="user-name">{{ userInfo.name }}</span>
        <!-- 登出按钮 -->
        <el-button link class="logout-btn" @click="handleLogout">
          {{ logoutText }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useUserStore } from '../../store'
import { formatDate } from '../../utils'
import { APP_CONFIG } from '../../config/appConfig'
import { APP_CONSTANTS, MESSAGE_CONSTANTS, EVENT_CONSTANTS } from '../../constants'
import { ElMessage } from 'element-plus'

/**
 * 用户信息显示组件
 * 显示当前用户信息，包括头像、姓名和登出按钮
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
</style>