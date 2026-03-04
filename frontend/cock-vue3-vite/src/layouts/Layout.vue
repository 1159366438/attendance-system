<template>
  <div class="layout-container">
    <!-- 左侧菜单（优化布局结构） -->
    <div class="layout-sidebar"> <!-- 替换el-row/el-col，简化结构+优化布局 -->
      <div class="sidebar-header">
        <h5>{{ getMenuText('system') }}</h5>
      </div>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo sidebar-menu"
        default-active="punch"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        @select="handleMenuSelect"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon class="menu-icon"><Location /></el-icon>
            <span >{{ getMenuText('systemName') }}</span>
          </template>
          <el-menu-item index="punch">
            <span>{{ getMenuText('today') }}</span>
          </el-menu-item>
          <el-menu-item index="record">
            <span>{{ getMenuText('record') }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon class="menu-icon"><IconMenu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon class="menu-icon"><Document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon class="menu-icon"><Setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 右侧内容区（使用路由视图） -->
    <div class="layout-content">
      <div class="content-header">
        <UserInfo :currentMenuText="currentMenuText" />
      </div>
      <div class="content-body">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UserInfo from '../components/common/UserInfo.vue'
import { getMenuText, type MenuText} from '../constants/menu';

import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

// 新增：当前要传递给UserInfo的菜单文本（初始化显示今日打卡）
const currentMenuText = ref<MenuText>(getMenuText('today'));

// 根据当前路由更新菜单文本
const updateMenuTextByRoute = () => {
  const path = route.path
  if (path === '/punch') {
    currentMenuText.value = getMenuText('today')
  } else if (path === '/record') {
    currentMenuText.value = getMenuText('record')
  }
}

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const handleMenuSelect = (key: string) => {
  console.log('切换到菜单：', key)
  // 根据菜单key跳转到对应路由
  if (key === 'punch') {
    router.push('/punch')
  } else if (key === 'record') {
    router.push('/record')
  }
}

// 监听路由变化，更新菜单文本
watch(() => route.path, () => {
  updateMenuTextByRoute()
})

// 初始化时更新菜单文本
onMounted(() => {
  updateMenuTextByRoute()
})
</script>

<style scoped>
@import '../assets/css/layout.css';
</style>