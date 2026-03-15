<template>
  <div class="layout-container">
    <!-- 左侧菜单（优化布局结构） -->
    <div class="layout-sidebar"> <!-- 替换el-row/el-col，简化结构+优化布局 -->
      <div class="sidebar-header">
        <h5>{{ getMenuText(MENU_KEYS.MAIN.SYSTEM) }}</h5>
      </div>
      <el-menu
        :active-text-color="LAYOUT_CONSTANTS.MENU_CONFIG.ACTIVE_TEXT_COLOR"
        :background-color="LAYOUT_CONSTANTS.MENU_CONFIG.BACKGROUND_COLOR"
        class="el-menu-vertical-demo sidebar-menu"
        :default-active="activeIndex"
        text-color="#fff"
        :default-openeds="defaultOpenedMenus"
        @open="handleOpen"
        @close="handleClose"
        @select="handleMenuSelect"
      >
        <el-sub-menu :index="LAYOUT_CONSTANTS.MENU_INDEXES.SUB_MENU_SYSTEM">
          <template #title>
            <el-icon class="menu-icon"><Location /></el-icon>
            <span >{{ getMenuText(MENU_KEYS.MAIN.SYSTEM_NAME) }}</span>
          </template>
          <el-menu-item :index="LAYOUT_CONSTANTS.MENU_INDEXES.PUNCH">
            <span>{{ getMenuText(MENU_KEYS.MAIN.TODAY) }}</span>
          </el-menu-item>
          <el-menu-item :index="LAYOUT_CONSTANTS.MENU_INDEXES.RECORD">
            <span>{{ getMenuText(MENU_KEYS.MAIN.RECORD) }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item :index="LAYOUT_CONSTANTS.MENU_INDEXES.NAVIGATION_TWO">
          <el-icon class="menu-icon"><IconMenu /></el-icon>
          <span>{{ navigatorTwoText }}</span>
        </el-menu-item>
        <el-menu-item :index="LAYOUT_CONSTANTS.MENU_INDEXES.NAVIGATION_THREE">
          <el-icon class="menu-icon"><Document /></el-icon>
          <span>{{ navigatorThreeText }}</span>
        </el-menu-item>
        <el-menu-item :index="LAYOUT_CONSTANTS.MENU_INDEXES.NAVIGATION_FOUR">
          <el-icon class="menu-icon"><Setting /></el-icon>
          <span>{{ navigatorFourText }}</span>
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 右侧内容区（使用路由视图） -->
    <div class="layout-content">
      <div class="content-header">
        <UserInfo :currentMenuText="currentMenuText" @logout="handleLogout" />
      </div>
      <div class="content-body">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../store'
import UserInfo from '../components/common/UserInfo.vue'
import { APP_CONSTANTS, LAYOUT_CONSTANTS, getMenuText, type MenuText, MENU_KEYS } from '../constants'
import { ElMessage } from 'element-plus'

import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'



const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// 默认展开的菜单项
const defaultOpenedMenus = ref(LAYOUT_CONSTANTS.MENU_INDEXES.DEFAULT_OPENED)

// 动态激活的菜单项
const activeIndex = ref(LAYOUT_CONSTANTS.MENU_INDEXES.PUNCH)

// 新增：当前要传递给UserInfo的菜单文本（初始化显示今日打卡）
const currentMenuText = ref<MenuText>(getMenuText(MENU_KEYS.MAIN.TODAY));

// 导航项文本
const navigatorTwoText = computed(() => getMenuText(LAYOUT_CONSTANTS.NAVIGATION.TWO, 'Navigator Two'))
const navigatorThreeText = computed(() => getMenuText(LAYOUT_CONSTANTS.NAVIGATION.THREE, 'Navigator Three'))
const navigatorFourText = computed(() => getMenuText(LAYOUT_CONSTANTS.NAVIGATION.FOUR, 'Navigator Four'))

// 根据路由路径获取对应的菜单键
const getMenuKeyByPath = (path: string) => {
  if (path === APP_CONSTANTS.ROUTE.PATHS.PAGES.PUNCH) return LAYOUT_CONSTANTS.MENU_INDEXES.PUNCH
  if (path === APP_CONSTANTS.ROUTE.PATHS.PAGES.RECORD) return LAYOUT_CONSTANTS.MENU_INDEXES.RECORD
  return LAYOUT_CONSTANTS.MENU_INDEXES.PUNCH // 默认返回打卡页面
}

// 根据路由路径获取对应的菜单文本
const getMenuTextByPath = (path: string) => {
  if (path === APP_CONSTANTS.ROUTE.PATHS.PAGES.PUNCH) return getMenuText(MENU_KEYS.MAIN.TODAY)
  if (path === APP_CONSTANTS.ROUTE.PATHS.PAGES.RECORD) return getMenuText(MENU_KEYS.MAIN.RECORD)
  return getMenuText(MENU_KEYS.MAIN.TODAY) // 默认返回打卡文本
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
  if (key === LAYOUT_CONSTANTS.MENU_INDEXES.PUNCH) {
    router.push(APP_CONSTANTS.ROUTE.PATHS.PAGES.PUNCH)
  } else if (key === LAYOUT_CONSTANTS.MENU_INDEXES.RECORD) {
    router.push(APP_CONSTANTS.ROUTE.PATHS.PAGES.RECORD)
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

// 处理登出
const handleLogout = async () => {
  try {
    const result = await userStore.logout()
    if (result.success) {
      ElMessage.success(result.message)
      // 跳转到登录页
      router.push(APP_CONSTANTS.ROUTE.PATHS.AUTH.LOGIN)
    } else {
      ElMessage.error(result.message)
    }
  } catch (error) {
    console.error('Logout error:', error)
    ElMessage.error(LAYOUT_CONSTANTS.MESSAGES.LOGOUT_ERROR())
  }
}
</script>

<style scoped>
@import '../assets/css/layout.css';
</style>