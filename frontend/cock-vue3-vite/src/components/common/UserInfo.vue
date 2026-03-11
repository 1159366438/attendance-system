<template>
  <!-- 新增外层容器：作为定位参考（核心！） -->
  <div class="user-header-container">
    <!-- 标题头：左上角定位 -->
    <h2 class="current-menu">{{ currentMenuText }}</h2>
    
    <div class="user-info">
      <!-- 刷新时间 -->
      <span class="refresh-time">{{ currentTime }}</span>
      <!-- 用户信息 -->
      <div class="user-box">
        <el-avatar :src="userInfo.avatar" class="avatar"></el-avatar>
        <span class="user-name">{{ userInfo.name }}</span>
        <el-button type="text" class="logout-btn" @click="emit(EVENT_CONSTANTS.USER.LOGOUT)">
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
import { USER_INFO_CONSTANTS } from '../../constants/userConstants'
import { EVENT_CONSTANTS } from '../../constants/appArchitectureConstants'
import { ElMessage } from 'element-plus'
import { MESSAGE_CONSTANTS } from '../../constants/messages'


// 接收父组件传递的菜单文本
const props = defineProps({
  currentMenuText: {
    type: String,
    required: true,
  }
});

// 定义事件
const emit = defineEmits([EVENT_CONSTANTS.USER.LOGOUT])

// 计算属性
const logoutText = computed(() => USER_INFO_CONSTANTS.BUTTONS.LOGOUT())



/**
 * 获取用户信息
 * 调用userStore.fetchUserInfo()获取用户信息
 */
const userStore = useUserStore()

// 响应式数据
const currentTime = ref('')
const userInfo = computed(() => userStore.userInfo)

/**
 * 更新时间函数
 * 格式化当前时间为 YYYY-MM-DD HH:mm:ss 格式
 */
const updateTime = () => {
  currentTime.value = formatDate(new Date(), 'datetime')
};

const getUserInfo = async () => {
  try {
    await userStore.fetchUserInfo()
    // 错误已在axios拦截器中统一处理
  } catch (error) {
    // 兜底错误处理，防止错误冒泡
    console.error('获取用户信息失败:', error)
    // 显示错误消息给用户
    ElMessage.error(MESSAGE_CONSTANTS.USER_INFO.FETCH_FAILED())
  }
};


// 生命周期：挂载时初始化
onMounted(() => {
  // 初始化时间和用户信息
  updateTime()
  getUserInfo()
  // 每秒更新时间
  const timer = setInterval(updateTime, APP_CONFIG.UI.TIMING.AUTO_UPDATE_INTERVAL)
  // 卸载时清除定时器
  onUnmounted(() => clearInterval(timer))
})
</script>

<style scoped>
@import '../../assets/css/user-info.css';
</style>