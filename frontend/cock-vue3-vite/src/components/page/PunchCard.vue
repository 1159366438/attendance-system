<template>
  <div class="punch-card">
    <div class="punch-header">
      <h2>{{ todayText }}</h2>
      <span class="date">{{ todayDate }}</span>
    </div>
    <div class="punch-body">
      <el-card class="punch-card-item">
        <div class="punch-status">
          <el-icon :size="APP_CONFIG.UI.SIZES.ICON_SIZE" :color="APP_CONFIG.UI.COLORS.PRIMARY_SUCCESS" v-if="isPunched"><CircleCheck /></el-icon>
          <el-icon :size="APP_CONFIG.UI.SIZES.ICON_SIZE" :color="APP_CONFIG.UI.COLORS.PRIMARY_ERROR" v-else><CircleClose /></el-icon>
          <p>{{ punchStatusText }}</p>
        </div>
        <el-button type="primary" size="large" @click="handlePunchIn" v-if="!isPunched">
          {{ punchButtonText }}
        </el-button>
        <el-button type="success" size="large" disabled v-else>
          {{ alreadyPunchedText }}（{{ punchedTime }}）
        </el-button>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { CircleCheck, CircleClose } from '@element-plus/icons-vue'
import { usePunchStore, useUserStore } from '../../store'
import { formatDate } from '../../utils'
import { APP_CONSTANTS, getMenuText, MENU_KEYS } from '../../constants'
import { ElMessage } from 'element-plus'
import { APP_CONFIG } from '../../config/appConfig'

// 响应式数据
const todayDate = ref('')
const punchStore = usePunchStore()
const userStore = useUserStore()
const isPunched = computed(() => punchStore.isPunched)
const punchedTime = computed(() => punchStore.punchedTime)
const todayText = getMenuText(MENU_KEYS.MAIN.TODAY, APP_CONSTANTS.I18N_FALLBACKS.MENU.TODAY)
const punchStatusText = computed(() => isPunched.value ? APP_CONSTANTS.PUNCH_CARD.STATUS.PUNCHED() : APP_CONSTANTS.PUNCH_CARD.STATUS.UNPUNCHED())
const punchButtonText = APP_CONSTANTS.PUNCH_CARD.TEXTS.PUNCH_NOW()
const alreadyPunchedText = APP_CONSTANTS.PUNCH_CARD.TEXTS.ALREADY_PUNCHED()

// 格式化今日日期
const formatTodayDate = () => {
  todayDate.value = formatDate(new Date(), 'date')
}

// 打卡操作
const handlePunchIn = async () => {
  // 确保用户信息已加载
  if (!userStore.userInfo.name) {
    await userStore.fetchUserInfo()
  }
  
  const username = userStore.userInfo.name || APP_CONSTANTS.PUNCH_CARD.MESSAGES.UNKNOWN_USER()
  const userId = userStore.userInfo.userId || 1
  try {
    // 调用store中的打卡方法（已封装API调用）
    const success = await punchStore.punchIn(username, userId)
    
    if (success) {
      ElMessage.success(APP_CONSTANTS.PUNCH.MESSAGES.SUCCESS())
    }
    // 其他错误已在axios拦截器中统一处理
  } catch (error) {
    ElMessage.error(APP_CONSTANTS.PUNCH.MESSAGES.ERROR())
    // 开发调试时可以启用日志
    // console.error('打卡失败:', error)
  }
}

// 初始化
onMounted(() => {
  formatTodayDate()
  // 模拟已打卡状态（实际项目从接口获取）
  // isPunched.value = true
  // punchedTime.value = '09:05:30'
})
</script>

<style scoped>
@import '../../assets/css/punch-card.css';
</style>