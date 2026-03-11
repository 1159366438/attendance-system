<template>
  <Layout v-if="!isAuthPage" />
  <router-view v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Layout from './layouts/Layout.vue'

const route = useRoute()

// 检查当前页面是否为认证相关页面（如登录页），这些页面不需要Layout
const isAuthPage = computed(() => {
  return route.path.startsWith('/login')
})
</script>

<style>
@import './assets/css/global.css';
</style>