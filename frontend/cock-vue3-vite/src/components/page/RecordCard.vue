<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="time" label="Time" />
  </el-table>
</template>

<script lang="ts" setup>
const tableData = [
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
]
</script>