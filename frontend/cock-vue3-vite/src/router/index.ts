import { createRouter, createWebHistory } from 'vue-router'
import PunchPage from '../pages/home/PunchPage.vue'
import RecordPage from '../pages/home/RecordPage.vue'
import LoginPage from '../views/Login.vue'
import { PAGE_NAMES } from '../constants/punchConstants'
import { USER_CONSTANTS } from '../constants/userConstants'
import { LOGIN_CONSTANTS } from '../constants/login'
import { ROUTE_CONSTANTS } from '../constants/routeConstants'
import { BOOLEAN_CONSTANTS } from '../constants/booleans'
import { STORAGE_VALUES } from '../constants/storageValues'

const routes = [
  {
    path: ROUTE_CONSTANTS.PATHS.AUTH.LOGIN,
    name: ROUTE_CONSTANTS.NAMES.AUTH.LOGIN,
    component: LoginPage,
    meta: { title: LOGIN_CONSTANTS.TEXTS.TITLE, requiresAuth: BOOLEAN_CONSTANTS.FALSE }
  },
  {
    path: ROUTE_CONSTANTS.PATHS.PAGES.HOME,
    redirect: ROUTE_CONSTANTS.PATHS.PAGES.PUNCH
  },
  {
    path: ROUTE_CONSTANTS.PATHS.PAGES.PUNCH,
    name: ROUTE_CONSTANTS.NAMES.PAGES.PUNCH,
    component: PunchPage,
    meta: { title: PAGE_NAMES.PUNCH() }
  },
  {
    path: ROUTE_CONSTANTS.PATHS.PAGES.RECORD,
    name: ROUTE_CONSTANTS.NAMES.PAGES.RECORD,
    component: RecordPage,
    meta: { title: PAGE_NAMES.RECORD() }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach((to, _, next) => {
  // 如果目标路由需要认证（除了登录页之外的其他页面）
  if (to.matched.some(record => record.meta?.requiresAuth !== BOOLEAN_CONSTANTS.FALSE) && to.path !== ROUTE_CONSTANTS.PATHS.AUTH.LOGIN) {
    // 这里应该检查用户的认证状态
    // 仅使用localStorage检查是否存在登录状态
    const isAuthenticated = localStorage.getItem(USER_CONSTANTS.STORAGE_KEYS.IS_LOGGED_IN) === STORAGE_VALUES.AUTH_STATUS.LOGGED_IN
    /* // 暂时注释掉token相关功能
    || !!localStorage.getItem(USER_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN)
    */
    
    if (!isAuthenticated) {
      // 如果未认证，重定向到登录页
      next({
        path: ROUTE_CONSTANTS.PATHS.AUTH.LOGIN,
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