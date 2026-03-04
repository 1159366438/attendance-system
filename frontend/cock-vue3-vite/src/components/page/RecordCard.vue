<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="date" :label="dateLabel" width="180" />
    <el-table-column prop="name" :label="nameLabel" width="180" />
    <el-table-column prop="time" :label="timeLabel" />
  </el-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { t } from '../../locales'

const dateLabel = t('record.date', 'Date')
const nameLabel = t('record.name', 'Name')
const timeLabel = t('record.time', 'Time')

const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    time: '14:35:57',
  },
  {
    date: '2016-05-02',
    name: '张三',
    time: '15:35:57',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    time: '16:35:57',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    time: '20:35:57',
  },
])
</script>