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
import { MESSAGE_CONSTANTS } from '../constants/messages'
import { LOGIN_CONSTANTS } from '../constants/login'
import { ROUTE_CONSTANTS } from '../constants/routeConstants'
import { USER_CONSTANTS } from '../constants/userConstants'
import { BOOLEAN_CONSTANTS } from '../constants/booleans'
import { FORM_VALIDATION_CONSTANTS } from '../constants/formValidation'

// 导入样式文件
import '../assets/css/login.css'

// 路由和状态管理
const router = useRouter()
const userStore = useUserStore()

// 响应式数据
const loginForm = reactive({
  username: '',
  password: ''
})
const rememberMe = ref(BOOLEAN_CONSTANTS.FALSE)
const loading = ref(BOOLEAN_CONSTANTS.FALSE)
const loginFormRef = ref()

// 计算属性
const loginTitle = computed(() => LOGIN_CONSTANTS.TEXTS.TITLE())
const usernameLabel = computed(() => LOGIN_CONSTANTS.TEXTS.USERNAME_LABEL())
const passwordLabel = computed(() => LOGIN_CONSTANTS.TEXTS.PASSWORD_LABEL())
const usernamePlaceholder = computed(() => LOGIN_CONSTANTS.TEXTS.USERNAME_PLACEHOLDER())
const passwordPlaceholder = computed(() => LOGIN_CONSTANTS.TEXTS.PASSWORD_PLACEHOLDER())
const rememberMeLabel = computed(() => LOGIN_CONSTANTS.TEXTS.REMEMBER_ME())
const loginButtonLabel = computed(() => LOGIN_CONSTANTS.TEXTS.BUTTON())
const forgotPasswordLabel = computed(() => LOGIN_CONSTANTS.TEXTS.FORGOT_PASSWORD())
const registerLabel = computed(() => LOGIN_CONSTANTS.TEXTS.REGISTER())

// 表单验证规则
const validateUsername = (_rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(LOGIN_CONSTANTS.VALIDATION_MESSAGES.USERNAME_REQUIRED()))
  } else if (value.length < 3) {
    callback(new Error(LOGIN_CONSTANTS.VALIDATION_MESSAGES.USERNAME_LENGTH()))
  } else {
    callback()
  }
}

const validatePassword = (_rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(LOGIN_CONSTANTS.VALIDATION_MESSAGES.PASSWORD_REQUIRED()))
  } else if (value.length < 6) {
    callback(new Error(LOGIN_CONSTANTS.VALIDATION_MESSAGES.PASSWORD_LENGTH()))
  } else {
    callback()
  }
}

const loginRules = reactive({
  username: [
    { validator: validateUsername, trigger: FORM_VALIDATION_CONSTANTS.TRIGGERS.BLUR },
    { min: 3, message: LOGIN_CONSTANTS.VALIDATION_MESSAGES.USERNAME_LENGTH(), trigger: FORM_VALIDATION_CONSTANTS.TRIGGERS.BLUR }
  ],
  password: [
    { validator: validatePassword, trigger: FORM_VALIDATION_CONSTANTS.TRIGGERS.BLUR },
    { min: 6, message: LOGIN_CONSTANTS.VALIDATION_MESSAGES.PASSWORD_LENGTH(), trigger: FORM_VALIDATION_CONSTANTS.TRIGGERS.BLUR }
  ]
})

// 登录处理函数
const handleLogin = async () => {
  try {
    // 表单验证
    await loginFormRef.value.validate()
    loading.value = BOOLEAN_CONSTANTS.TRUE
    
    // 调用用户存储的登录方法
    const result = await userStore.login(loginForm.username, loginForm.password)
    
    if (result.success) {
      ElMessage.success(MESSAGE_CONSTANTS.USER_INFO.LOGIN_SUCCESS())
      
      // 设置认证状态
      localStorage.setItem(USER_CONSTANTS.STORAGE_KEYS.IS_LOGGED_IN, 'true')
      /* // 暂时注释掉token相关功能
      // 这里可以设置token或其他认证信息
      localStorage.setItem(USER_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN, 'temp_token_for_demo') // 仅为演示用
      */
      
      // 根据是否记住密码决定跳转行为
      if (rememberMe.value) {
        // 可以在这里处理记住密码的逻辑
        localStorage.setItem(USER_CONSTANTS.STORAGE_KEYS.REMEMBERED_USERNAME, loginForm.username)
      }
      
      // 检查是否有重定向路径
      const redirectPath = router.currentRoute.value.query.redirect as string
      // 跳转到指定页面或首页
      router.push({ path: redirectPath || ROUTE_CONSTANTS.PATHS.PAGES.HOME })
    }
    // 其他错误已在axios拦截器中统一处理
  } catch (error) {
    console.error('Login error:', error)
    ElMessage.error(LOGIN_CONSTANTS.VALIDATION_MESSAGES.VALIDATION_FAILED())
  } finally {
    loading.value = BOOLEAN_CONSTANTS.FALSE
  }
}

// 忘记密码处理
const handleForgotPassword = () => {
  ElMessage.info(LOGIN_CONSTANTS.HELP_MESSAGES.FORGOT_PASSWORD_TIP())
}

// 注册处理
const handleRegister = () => {
  ElMessage.info(LOGIN_CONSTANTS.HELP_MESSAGES.REGISTER_TIP())
}
</script>

<style scoped>
@import '../assets/css/login.css';
</style>