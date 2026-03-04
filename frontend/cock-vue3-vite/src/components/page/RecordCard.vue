<template>
  <el-table 
    :data="tableData" 
    stripe 
    style="width: 100%" 
    v-loading="loading"
    empty-text="暂无打卡记录"
  >
    <el-table-column :label="dateLabel" width="180">
      <template #default="{ row }">
        {{ formatDateField(row.checkInTime) }}
      </template>
    </el-table-column>
    <el-table-column :label="nameLabel" width="180">
      <template #default="{ row }">
        {{ formatUserId(row.userId) }}
      </template>
    </el-table-column>
    <el-table-column :label="timeLabel" width="180">
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
</template>

<script setup lang="ts">
import { onMounted, computed, onErrorCaptured } from 'vue'
import { usePunchStore } from '../../store'
import { t } from '../../locales'
import { formatDate } from '../../utils'
import type { PunchRecord } from '../../types'

// Store
const punchStore = usePunchStore()

// Labels
const dateLabel = computed(() => t('record.date', 'Date'))
const nameLabel = computed(() => t('record.name', 'Name'))
const timeLabel = computed(() => t('record.time', 'Time'))
const locationLabel = computed(() => t('record.location', '打卡地点'))

// Computed properties
const tableData = computed<PunchRecord[]>(() => punchStore.punchRecords || [])
const loading = computed(() => punchStore.loading)

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
  return `用户${userId}`
}

const locationFormatter = (_row: PunchRecord, _column: unknown, cellValue: string): string => {
  return cellValue || '未知地点'
}

// Lifecycle
onMounted(async () => {
  try {
    await punchStore.fetchPunchRecords()
  } catch (err) {
    console.error('获取打卡记录失败:', err)
  }
})

// Error handling
onErrorCaptured((err) => {
  console.error('RecordCard组件捕获错误:', err)
})
</script>