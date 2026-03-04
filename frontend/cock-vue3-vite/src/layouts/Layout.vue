<template>
  <div class="layout-container">
    <!-- 左侧菜单（优化布局结构） -->
    <div class="layout-sidebar"> <!-- 替换el-row/el-col，简化结构+优化布局 -->
      <div class="sidebar-header">
        <h5>{{ getMenuText('system') }}</h5>
      </div>
      <el-menu
        :active-text-color="APP_CONFIG.UI.COLORS.ACTIVE_TEXT"
        :background-color="APP_CONFIG.UI.COLORS.BACKGROUND_DARK"
        class="el-menu-vertical-demo sidebar-menu"
        :default-active="activeIndex"
        text-color="#fff"
        :default-openeds="defaultOpenedMenus"
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
import { APP_CONFIG } from '../config/appConfig';

import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

// 默认展开的菜单项
const defaultOpenedMenus = ref(['1'])

// 动态激活的菜单项
const activeIndex = ref('punch')

// 新增：当前要传递给UserInfo的菜单文本（初始化显示今日打卡）
const currentMenuText = ref<MenuText>(getMenuText('today'));

// 根据路由路径获取对应的菜单键
const getMenuKeyByPath = (path: string) => {
  if (path === '/punch') return 'punch'
  if (path === '/record') return 'record'
  return 'punch' // 默认返回打卡页面
}

// 根据路由路径获取对应的菜单文本
const getMenuTextByPath = (path: string) => {
  if (path === '/punch') return getMenuText('today')
  if (path === '/record') return getMenuText('record')
  return getMenuText('today') // 默认返回打卡文本
}

const handleOpen = (_key: string, _keyPath: string[]) => {
  // 开发调试时可以启用日志
  // console.log(_key, _keyPath)
};
const handleClose = (_key: string, _keyPath: string[]) => {
  // 开发调试时可以启用日志
  // console.log(_key, _keyPath)
};

const handleMenuSelect = (key: string) => {
  // 开发调试时可以启用日志
  // console.log('切换到菜单：', key)
  // 根据菜单key跳转到对应路由
  if (key === 'punch') {
    router.push('/punch')
  } else if (key === 'record') {
    router.push('/record')
  }
}

// 监听路由变化，同步更新菜单文本和激活项
watch(() => route.path, (newPath) => {
  activeIndex.value = getMenuKeyByPath(newPath)
  currentMenuText.value = getMenuTextByPath(newPath)
}, { immediate: true })

// 初始化时设置菜单状态
onMounted(() => {
  const currentPath = route.path
  activeIndex.value = getMenuKeyByPath(currentPath)
  currentMenuText.value = getMenuTextByPath(currentPath)
})
</script>

<style scoped>
@import '../assets/css/layout.css';
</style>