<template>
  <!-- 新增外层容器：作为定位参考（核心！） -->
  <div class="user-header-container">
    <!-- 标题头：左上角定位 -->
    <h2 class="current-menu">{{ currentMenuText }}</h2>
    
    <div class="user-info">
      <!-- 刷新时间 -->
      <span class="refresh-time">{{ currentTime }}</span>
      <!-- 用户信息 -->
      <div class="user-box">
        <el-avatar :src="userInfo.avatar" class="avatar"></el-avatar>
        <span class="user-name">{{ userInfo.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { userApi } from '../api/punchApi'
import { type MenuText } from '../constants/menu';

// 接收父组件传递的菜单文本
const props = defineProps({
  currentMenuText: {
    type: String as () => MenuText,
    required: true,
  }
});

// 定义用户信息类型
interface UserInfo {
  name: string
  avatar: string
}

// 响应式数据
const currentTime = ref('')
const userInfo = ref<UserInfo>({
  name: '',
  avatar: ''
})

// 更新时间函数
const updateTime = () => {
  const now = new Date()
  // 格式化时间：YYYY-MM-DD HH:mm:ss
  currentTime.value = now.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).replace(/\//g, '-')
}

// 获取用户信息
const getUserInfo = async () => {
  const res = await userApi.getUserInfo()
  if (res.code === 200) {
    userInfo.value = res.data
  }
}

// 生命周期：挂载时初始化
onMounted(() => {
  // 初始化时间和用户信息
  updateTime()
  getUserInfo()
  // 每秒更新时间
  const timer = setInterval(updateTime, 1000)
  // 卸载时清除定时器
  onUnmounted(() => clearInterval(timer))
})
</script>

<style scoped>
/* 外层容器：作为标题定位的参考（必须加relative） */
.user-header-container {
  position: relative; /* 核心：让子元素absolute基于此定位 */
  width: 100%; /* 占满父容器宽度 */
  padding: 8px 16px; /* 内边距，避免标题贴边 */
}

/* h2标题样式：左上角固定 + 重置默认样式 */
.current-menu {
  /* 核心：左上角定位 */
  position: absolute; /* 脱离文档流，固定位置 */
  top: 8px; /* 距离顶部8px */
  left: 16px;
}

/* 用户信息区域：向右偏移，避免被标题覆盖 */
.user-info {
  display: flex;
  justify-content: flex-end; /* 整体居右 */
  align-items: center;
  gap: 16px;
  /* 关键：给右侧内容加左内边距，避开左上角标题 */
  padding-left: 200px; /* 足够容纳标题宽度，可根据标题长度调整 */
}

.user-box {
  display: flex;
  align-items: center;
  gap: 8px;
}

.avatar {
  width: 32px;
  height: 32px;
  cursor: pointer;
}

.user-name {
  font-size: 14px;
  color: #333;
}

.refresh-time {
  font-size: 12px;
  color: #999; /* 加浅灰色，和标题区分 */
}
</style>