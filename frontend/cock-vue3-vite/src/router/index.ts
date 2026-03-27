/**
 * 路由配置文件
 * 定义应用的所有路由规则
 * @author Attendance System Team
 * @since 2026-03-15
 * @version v1.1.0-alpha.1
 */

import { createRouter, createWebHistory } from 'vue-router'
import AttendancePunchPage from '../pages/home/AttendancePunchPage.vue'
import AttendanceRecordPage from '../pages/home/AttendanceRecordPage.vue'
import LoginPage from '../views/Login.vue'
import RegisterPage from '../views/Register.vue'
import OrganizationChartPage from '../views/OrganizationChart.vue'
import OrganizationDepartmentsPage from '../views/OrganizationDepartments.vue'
import { APP_CONSTANTS } from '../constants'

const routes = [
  {
    path: APP_CONSTANTS.ROUTE.PATHS.AUTH.LOGIN,
    name: APP_CONSTANTS.ROUTE.NAMES.AUTH.LOGIN,
    component: LoginPage,
    meta: { title: APP_CONSTANTS.LOGIN.TEXTS.TITLE, requiresAuth: false }
  },
  {
    path: APP_CONSTANTS.ROUTE.PATHS.AUTH.REGISTER,
    name: APP_CONSTANTS.ROUTE.NAMES.AUTH.REGISTER,
    component: RegisterPage,
    meta: { title: APP_CONSTANTS.LOGIN.TEXTS.REGISTER_TITLE, requiresAuth: false }
  },
  {
    path: APP_CONSTANTS.ROUTE.PATHS.PAGES.HOME,
    redirect: APP_CONSTANTS.ROUTE.PATHS.PAGES.ATTENDANCE.PUNCH
  },
  {
    path: APP_CONSTANTS.ROUTE.PATHS.PAGES.ATTENDANCE.PUNCH,
    name: APP_CONSTANTS.ROUTE.NAMES.PAGES.ATTENDANCE.PUNCH,
    component: AttendancePunchPage,
    meta: { title: APP_CONSTANTS.PAGE_NAMES.ATTENDANCE_PUNCH() }
  },
  {
    path: APP_CONSTANTS.ROUTE.PATHS.PAGES.ATTENDANCE.RECORD,
    name: APP_CONSTANTS.ROUTE.NAMES.PAGES.ATTENDANCE.RECORD,
    component: AttendanceRecordPage,
    meta: { title: APP_CONSTANTS.PAGE_NAMES.ATTENDANCE_RECORD() }
  },
  {
    path: APP_CONSTANTS.ROUTE.PATHS.PAGES.ORGANIZATION.CHART,
    name: APP_CONSTANTS.ROUTE.NAMES.PAGES.ORGANIZATION.CHART,
    component: OrganizationChartPage,
    meta: { title: APP_CONSTANTS.PAGE_NAMES.ORGANIZATION_CHART() }
  },
  {
    path: APP_CONSTANTS.ROUTE.PATHS.PAGES.ORGANIZATION.DEPARTMENTS,
    name: APP_CONSTANTS.ROUTE.NAMES.PAGES.ORGANIZATION.DEPARTMENTS,
    component: OrganizationDepartmentsPage,
    meta: { title: APP_CONSTANTS.PAGE_NAMES.ORGANIZATION_DEPARTMENTS() }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach((to, _, next) => {
  // 如果目标路由需要认证（除了登录页之外的其他页面）
  if (to.matched.some(record => record.meta?.requiresAuth !== false) && to.path !== APP_CONSTANTS.ROUTE.PATHS.AUTH.LOGIN) {
    // 这里应该检查用户的认证状态
    // 仅使用localStorage检查是否存在登录状态
    const isAuthenticated = localStorage.getItem(APP_CONSTANTS.USER.STORAGE_KEYS.IS_LOGGED_IN) === APP_CONSTANTS.STORAGE.AUTH_STATUS.LOGGED_IN
    /* // 暂时注释掉token相关功能
    || !!localStorage.getItem(APP_CONSTANTS.USER.STORAGE_KEYS.AUTH_TOKEN)
    */
    
    if (!isAuthenticated) {
      // 如果未认证，重定向到登录页
      next({
        path: APP_CONSTANTS.ROUTE.PATHS.AUTH.LOGIN,
        // 将目标路径作为查询参数，以便登录后重定向
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    // 不需要认证的路由直接通过
    next()
  }
})

export default router