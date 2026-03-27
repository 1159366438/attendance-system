<template>
  <div class="attendance-card">
    <div class="attendance-header">
      <h2>{{ todayText }}</h2>
      <span class="date">{{ todayDate }}</span>
    </div>
    <div class="attendance-body">
      <el-card class="attendance-card-item">
        <div class="attendance-status">
          <el-icon :size="APP_CONFIG.UI.SIZES.ICON_SIZE" :color="APP_CONFIG.UI.COLORS.PRIMARY_SUCCESS" v-if="isAttended"><CircleCheck /></el-icon>
          <el-icon :size="APP_CONFIG.UI.SIZES.ICON_SIZE" :color="APP_CONFIG.UI.COLORS.PRIMARY_ERROR" v-else><CircleClose /></el-icon>
          <p>{{ attendanceStatusText }}</p>
        </div>
        <el-button type="primary" size="large" @click="handleAttendanceIn" v-if="!isAttended">
          {{ punchButtonText }}
        </el-button>
        <el-button type="success" size="large" disabled v-else>
          {{ alreadyPunchedText }}（{{ attendedTime }}）
        </el-button>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 考勤打卡卡片
 * 提供考勤打卡功能和状态显示
 * @author Attendance System Team
 * @since 2026-03-18
 * @version v1.1.0-alpha.1
 */

import { ref, onMounted, computed } from 'vue'
import { CircleCheck, CircleClose } from '@element-plus/icons-vue'
import { useAttendanceStore, useUserStore } from '../../store'
import { formatDate } from '../../utils'
import { APP_CONSTANTS, getMenuText, MENU_KEYS } from '../../constants'
import { ElMessage } from 'element-plus'
import { APP_CONFIG } from '../../config/appConfig'

// 响应式数据
const todayDate = ref('')
const punchStore = useAttendanceStore()
const userStore = useUserStore()
const isAttended = computed(() => punchStore.isAttended)
const attendedTime = computed(() => punchStore.attendedTime)
const todayText = getMenuText(MENU_KEYS.MAIN.ATTENDANCE.PUNCH, APP_CONSTANTS.I18N_FALLBACKS.MENU.ATTENDANCE.PUNCH)
const attendanceStatusText = computed(() => isAttended.value ? APP_CONSTANTS.ATTENDANCE_CARD.STATUS.ATTENDED() : APP_CONSTANTS.ATTENDANCE_CARD.STATUS.NOT_ATTENDED())
const punchButtonText = APP_CONSTANTS.ATTENDANCE_CARD.TEXTS.ATTENDANCE_NOW()
const alreadyPunchedText = APP_CONSTANTS.ATTENDANCE_CARD.TEXTS.ALREADY_ATTENDED()

// 格式化今日日期
const formatTodayDate = () => {
  todayDate.value = formatDate(new Date(), 'date')
}

// 考勤操作
const handleAttendanceIn = async () => {
  // 确保用户信息已加载
  if (!userStore.userInfo.username) {
    await userStore.fetchUserInfo()
  }
  
  const username = userStore.userInfo.username || APP_CONSTANTS.ATTENDANCE_CARD.MESSAGES.UNKNOWN_USER()
  const userId = userStore.userInfo.userId
  try {
    // 调用store中的考勤方法（已封装API调用）
    const success = await punchStore.attendanceIn(username, userId)
    
    if (success) {
      ElMessage.success(APP_CONSTANTS.ATTENDANCE.MESSAGES.SUCCESS())
    }
    // 其他错误已在axios拦截器中统一处理
  } catch (error) {
    ElMessage.error(APP_CONSTANTS.ATTENDANCE.MESSAGES.ERROR())
    // 开发调试时可以启用日志
    // console.error('打卡失败:', error)
  }
}

// 初始化
onMounted(() => {
  formatTodayDate()
  // 模拟已打卡状态（实际项目从接口获取）
  
})
</script>

<style scoped>
@import '../../assets/css/attendance-card.css';
</style>