<template>
  <div class="record-card">
    <el-table 
      :data="attendanceRecords" 
      stripe 
      style="width: 100%" 
      v-loading="loading"
      :empty-text="noRecordsText"
    >
      <el-table-column :label="dateLabel" :width="TABLE_CONSTANTS.COLUMN_WIDTHS.DATE">
        <template #default="{ row }">
          {{ formatDateField(row.checkInTime) }}
        </template>
      </el-table-column>
      <el-table-column :label="nameLabel" :width="TABLE_CONSTANTS.COLUMN_WIDTHS.NAME">
        <template #default="{ row }">
          {{ formatUserId(row.userId) }}
        </template>
      </el-table-column>
      <el-table-column :label="timeLabel" :width="TABLE_CONSTANTS.COLUMN_WIDTHS.TIME">
        <template #default="{ row }">
          {{ formatTimeField(row.checkInTime) }}
        </template>
      </el-table-column>
      <el-table-column 
        prop="checkInLocation" 
        :label="locationLabel" 
        :formatter="locationFormatter"
      />
    </el-table>
    
    <!-- 分页组件 -->
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="TABLE_CONSTANTS.PAGINATION.OPTIONS"
      :small="false"
      :disabled="false"
      :background="false"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalRecords"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      class="pagination"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * 考勤记录卡片
 * 展示考勤记录表格和分页功能
 * @author Attendance System Team
 * @since 2026-03-18
 * @version v1.1.0-alpha.1
 */

import { onMounted, computed, onErrorCaptured, ref } from 'vue'
import { useAttendanceStore, useUserStore } from '../../store'
import { formatDate } from '../../utils'
import type { AttendanceRecord } from '../../types'
import { ElMessage } from 'element-plus'
import { APP_CONSTANTS, TABLE_CONSTANTS } from '../../constants'

// Store
const attendanceStore = useAttendanceStore()
const userStore = useUserStore()

// Labels
const dateLabel = APP_CONSTANTS.RECORD_CARD.COLUMN_HEADERS.DATE()
const nameLabel = APP_CONSTANTS.RECORD_CARD.COLUMN_HEADERS.NAME()
const timeLabel = APP_CONSTANTS.RECORD_CARD.COLUMN_HEADERS.TIME()
const locationLabel = APP_CONSTANTS.RECORD_CARD.COLUMN_HEADERS.LOCATION()
const noRecordsText = APP_CONSTANTS.RECORD_CARD.MESSAGES.NO_RECORDS()

// Computed properties
const attendanceRecords = computed<AttendanceRecord[]>(() => attendanceStore.attendanceRecords || [])
const loading = computed(() => attendanceStore.isLoading)
const totalRecords = computed(() => attendanceStore.pagination.total)
const currentPage = computed({
  get: () => attendanceStore.currentPage,
  set: (_value) => {
    // 不直接修改，而是在change事件中处理
  }
})
const pageSize = computed({
  get: () => attendanceStore.pageSize,
  set: (_value) => {
    // 不直接修改，而是在change事件中处理
  }
})

// Refs
const currentPageRef = ref(1)
const pageSizeRef = ref(15)

// Methods
const formatDateField = (dateValue: Date | string | undefined): string => {
  if (!dateValue) return '-'
  try {
    return formatDate(new Date(dateValue), 'date')
  } catch (err) {
    console.warn('日期格式化错误:', err)
    return '-'
  }
}

const formatTimeField = (dateValue: Date | string | undefined): string => {
  if (!dateValue) return '-'
  try {
    return formatDate(new Date(dateValue), 'time')
  } catch (err) {
    console.warn('时间格式化错误:', err)
    return '-'
  }
}

const formatUserId = (userId: number | undefined): string => {
  if (typeof userId !== 'number') return '-'
  // 如果需要显示用户名而非ID，可以在这里查询用户信息
  return APP_CONSTANTS.RECORD_CARD.MESSAGES.USER_PREFIX() + userId
}

const locationFormatter = (_row: AttendanceRecord, _column: unknown, cellValue: string): string => {
  return cellValue || APP_CONSTANTS.RECORD_CARD.MESSAGES.UNKNOWN_LOCATION()
}

// 分页大小改变事件
const handleSizeChange = async (size: number) => {
  pageSizeRef.value = size
  currentPageRef.value = 1  // 改变每页大小时回到第一页
  await loadAttendanceRecords(currentPageRef.value, pageSizeRef.value)
}

// 页码改变事件
const handleCurrentChange = async (page: number) => {
  currentPageRef.value = page
  await loadAttendanceRecords(currentPageRef.value, pageSizeRef.value)
}

// 加载考勤记录
const loadAttendanceRecords = async (page: number, size: number) => {
  try {
    // 确保用户信息已加载
    if (!userStore.userInfo.username) {
      await userStore.fetchUserInfo()
    }
    const userId = userStore.userInfo.userId
    const success = await attendanceStore.fetchAttendanceRecords(userId, page, size)
    if (success) {
      ElMessage.success(APP_CONSTANTS.ATTENDANCE.MESSAGES.FETCH_RECORDS_SUCCESS())
      console.log('获取打卡记录成功:', {
        total: attendanceStore.pagination.total,
        currentPage: attendanceStore.pagination.page,
        recordsCount: attendanceStore.pagination.records.length
      })
    }
    // 其他错误已在axios拦截器中统一处理
  } catch (err) {
    console.error('获取考勤记录失败:', err)
    ElMessage.error(APP_CONSTANTS.ATTENDANCE.MESSAGES.FETCH_RECORDS_ERROR())
    return false
  }
}

// Lifecycle
onMounted(async () => {
  // 确保用户信息已加载
  if (!userStore.userInfo.username) {
    await userStore.fetchUserInfo()
  }
  await loadAttendanceRecords(currentPageRef.value, pageSizeRef.value)
})

// Error handling
onErrorCaptured((err) => {
  console.error('RecordCard组件捕获错误:', err)
})
</script>

<style scoped>
.record-card {
  display: flex;
  flex-direction: column;
  min-height: var(--size-record-card-min-height, 400px);
}

.pagination {
  margin-top: var(--spacing-element-margin, 20px);
  justify-content: center;
}
</style>