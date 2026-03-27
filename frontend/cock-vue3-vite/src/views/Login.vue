<template>
  <div class="login-container">
    <div class="login-form">
      <div class="login-header">
        <h2>{{ loginTitle }}</h2>
      </div>
      <el-form 
        :model="loginForm" 
        :rules="loginRules" 
        ref="loginFormRef"
        class="form-content"
      >
        <el-form-item prop="username" :label="usernameLabel">
          <el-input 
            v-model="loginForm.username" 
            :placeholder="usernamePlaceholder"
            :prefix-icon="User"
          />
        </el-form-item>
        
        <el-form-item prop="password" :label="passwordLabel">
          <el-input 
            v-model="loginForm.password" 
            type="password"
            :placeholder="passwordPlaceholder"
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        
        <el-form-item>
          <el-checkbox v-model="rememberMe">{{ rememberMeLabel }}</el-checkbox>
        </el-form-item>
        
        <el-form-item>
          <el-button 
            type="primary" 
            @click="handleLogin" 
            :loading="loading" 
            class="login-button"
          >
            {{ loginButtonLabel }}
          </el-button>
        </el-form-item>
      </el-form>
      
      <div class="login-footer">
        <el-link type="primary" @click="handleForgotPassword">{{ forgotPasswordLabel }}</el-link>
        <el-divider direction="vertical" />
        <el-link type="primary" @click="handleRegister">{{ registerLabel }}</el-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store'
import { ElMessage } from 'element-plus'
import { APP_CONSTANTS, MESSAGE_CONSTANTS } from '../constants'

/**
 * 登录页面
 * 处理用户登录逻辑，包括表单验证、认证和路由跳转
 * @author Attendance System Team
 * @since 2026-03-18
 * @version v1.1.0-alpha.1
 */

// 路由和状态管理
const router = useRouter()
const userStore = useUserStore()

// 登录表单数据
const loginForm = reactive({
  username: '',      // 用户名输入框
  password: '',      // 密码输入框
  // rememberMe: false,  // 使用单独的响应式变量
  acceptTerms: false, // 接受条款复选框
})

// 登录页面的响应式状态
const rememberMe = ref(false)                           // 记住密码选项
const loading = ref(APP_CONSTANTS.BOOLEAN.FALSE)        // 加载状态
const loginFormRef = ref()                              // 表单引用

// 计算属性 - 国际化文本
const loginTitle = computed(() => APP_CONSTANTS.LOGIN.TEXTS.TITLE())                      // 登录标题
const usernameLabel = computed(() => APP_CONSTANTS.LOGIN.TEXTS.USERNAME_LABEL())          // 用户名标签
const passwordLabel = computed(() => APP_CONSTANTS.LOGIN.TEXTS.PASSWORD_LABEL())          // 密码标签
const usernamePlaceholder = computed(() => APP_CONSTANTS.LOGIN.TEXTS.USERNAME_PLACEHOLDER()) // 用户名占位符
const passwordPlaceholder = computed(() => APP_CONSTANTS.LOGIN.TEXTS.PASSWORD_PLACEHOLDER()) // 密码占位符
const rememberMeLabel = computed(() => APP_CONSTANTS.LOGIN.TEXTS.REMEMBER_ME())           // 记住我标签
const loginButtonLabel = computed(() => APP_CONSTANTS.LOGIN.TEXTS.BUTTON())              // 登录按钮文本
const forgotPasswordLabel = computed(() => APP_CONSTANTS.LOGIN.TEXTS.FORGOT_PASSWORD())   // 忘记密码链接文本
const registerLabel = computed(() => APP_CONSTANTS.LOGIN.TEXTS.REGISTER())               // 注册链接文本

/**
 * 表单验证规则
 * 定义登录表单各字段的验证逻辑
 */

// 用户名验证规则
const validateUsername = (_rule: any, value: any, callback: any) => {
  if (!value) {
    // 验证用户名是否为空
    callback(new Error(APP_CONSTANTS.LOGIN.VALIDATION_MESSAGES.USERNAME_REQUIRED()))
  } else if (value.length < 3) {
    // 验证用户名长度是否小于最小长度要求
    callback(new Error(APP_CONSTANTS.LOGIN.VALIDATION_MESSAGES.USERNAME_TOO_SHORT()))
  } else {
    // 验证通过
    callback()
  }
}

// 密码验证规则
const validatePassword = (_rule: any, value: any, callback: any) => {
  if (!value) {
    // 验证密码是否为空
    callback(new Error(APP_CONSTANTS.LOGIN.VALIDATION_MESSAGES.PASSWORD_REQUIRED()))
  } else if (value.length < 6) {
    // 验证密码长度是否小于最小长度要求
    callback(new Error(APP_CONSTANTS.LOGIN.VALIDATION_MESSAGES.PASSWORD_TOO_SHORT()))
  } else {
    // 验证通过
    callback()
  }
}

const loginRules = computed(() => ({
      username: [
        { required: true, validator: validateUsername, trigger: APP_CONSTANTS.FORM_VALIDATION.TRIGGERS.BLUR }
      ],
      password: [
        { required: true, validator: validatePassword, trigger: APP_CONSTANTS.FORM_VALIDATION.TRIGGERS.BLUR }
      ]
    }))

// 登录处理函数
const handleLogin = async () => {
  try {
    // 表单验证
    await loginFormRef.value.validate()
    loading.value = APP_CONSTANTS.BOOLEAN.TRUE
    
    // 调用用户存储的登录方法
    const result = await userStore.login(loginForm.username, loginForm.password)
    
    if (result.success) {
      ElMessage.success(MESSAGE_CONSTANTS.USER_INFO.LOGIN_SUCCESS())
      
      // 设置认证状态
      localStorage.setItem(APP_CONSTANTS.USER.STORAGE_KEYS.IS_LOGGED_IN, APP_CONSTANTS.STORAGE.AUTH_STATUS.LOGGED_IN)
      /* // 暂时注释掉token相关功能
      // 这里可以设置token或其他认证信息
      localStorage.setItem(APP_CONSTANTS.USER.STORAGE_KEYS.AUTH_TOKEN, 'temp_token_for_demo') // 仅为演示用 - 实际项目中应使用真实token
      */
      
      // 根据是否记住密码决定跳转行为
      if (rememberMe.value) {
        // 可以在这里处理记住密码的逻辑
        localStorage.setItem(APP_CONSTANTS.USER.STORAGE_KEYS.REMEMBERED_USERNAME, loginForm.username)
      }
      
      // 检查是否有重定向路径
      const redirectPath = router.currentRoute.value.query.redirect as string
      // 跳转到指定页面或首页
      router.push({ path: redirectPath || APP_CONSTANTS.ROUTE.PATHS.PAGES.HOME })
    }
    // 其他错误已在axios拦截器中统一处理
  } catch (error) {
    console.error('Login error:', error)
    ElMessage.error(APP_CONSTANTS.LOGIN.VALIDATION_MESSAGES.VALIDATION_FAILED())
  } finally {
    loading.value = APP_CONSTANTS.BOOLEAN.FALSE
  }
}

// 忘记密码处理
const handleForgotPassword = () => {
  ElMessage.info(APP_CONSTANTS.LOGIN.HELP_MESSAGES.FORGOT_PASSWORD_TIP())
}

// 注册处理
const handleRegister = () => {
  router.push({ path: APP_CONSTANTS.ROUTE.PATHS.AUTH.REGISTER })
}
</script>

<style scoped>
@import '../assets/css/login.css';
</style>