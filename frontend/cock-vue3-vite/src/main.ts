/**
 * 应用主入口文件
 * 初始化Vue应用、Pinia状态管理和路由
 * @author Attendance System Team
 * @since 2026-03-15
 * @version v1.1.0-alpha.1
 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue' // 导入所有图标
import router from './router'
import ElementPlus from 'element-plus' // 导入 Element Plus

const app = createApp(App)
const pinia = createPinia()

// 全局注册 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.mount('#app')