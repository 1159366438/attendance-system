<template>
  <Layout v-if="!isAuthPage" />
  <router-view v-else />
</template>

<script setup lang="ts">
/**
 * 应用根组件
 * 负责根据路由判断是否显示布局组件
 * @author Attendance System Team
 * @since 2026-03-15
 * @version v1.1.0-alpha.1
 */

import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Layout from './layouts/Layout.vue'
import { APP_CONSTANTS } from './constants/appConstants'

const route = useRoute()

// 检查当前页面是否为认证相关页面（如登录页、注册页），这些页面不需要Layout
const isAuthPage = computed(() => {
  return route.path.startsWith(APP_CONSTANTS.ROUTE.PATHS.AUTH.LOGIN) || 
         route.path.startsWith(APP_CONSTANTS.ROUTE.PATHS.AUTH.REGISTER) || 
         route.path === APP_CONSTANTS.ROUTE.PATHS.PAGES.HOME
})
</script>

<style>
@import './assets/css/global.css';
</style>