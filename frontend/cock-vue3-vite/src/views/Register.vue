<template>
  <div class="login-container">
    <div class="login-form">
      <div class="login-header">
        <h2>{{ registerTitle }}</h2>
      </div>
      <el-form 
        :model="registerForm" 
        :rules="registerRules" 
        ref="registerFormRef"
        class="form-content"
      >
        <el-form-item prop="username" :label="usernameLabel">
          <el-input 
            v-model="registerForm.username" 
            :placeholder="usernamePlaceholder"
            :prefix-icon="User"
          />
        </el-form-item>
        
        <el-form-item prop="password" :label="passwordLabel">
          <el-input 
            v-model="registerForm.password" 
            type="password"
            :placeholder="passwordPlaceholder"
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        
        <el-form-item prop="confirmPassword" :label="confirmPasswordLabel">
          <el-input 
            v-model="registerForm.confirmPassword" 
            type="password"
            :placeholder="confirmPasswordPlaceholder"
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        
        <el-form-item prop="age" :label="ageLabel" v-if="showAgeField">
          <el-input-number 
            v-model="registerForm.age" 
            :min="APP_CONSTANTS.USER.AGE_LIMITS.MIN" 
            :max="APP_CONSTANTS.USER.AGE_LIMITS.MAX" 
            :placeholder="agePlaceholder"
            class="full-width"
          />
        </el-form-item>
        
        <el-form-item prop="avatar" :label="avatarLabel" v-if="showAvatarField">
          <AvatarSelector 
            v-model="registerForm.avatar"
          />
        </el-form-item>
        
        <el-form-item prop="gender" :label="genderLabel" v-if="showGenderField">
          <el-radio-group v-model="registerForm.gender">
            <el-radio :value="APP_CONSTANTS.USER.GENDER.MALE">{{ maleLabel }}</el-radio>
            <el-radio :value="APP_CONSTANTS.USER.GENDER.FEMALE">{{ femaleLabel }}</el-radio>
            <el-radio :value="APP_CONSTANTS.USER.GENDER.UNKNOWN">{{ unknownLabel }}</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item>
          <el-checkbox v-model="acceptTerms">{{ acceptTermsLabel }}</el-checkbox>
        </el-form-item>
        
        <el-form-item>
          <el-button 
            type="primary" 
            @click="handleRegister" 
            :loading="loading" 
            class="login-button"
          >
            {{ registerButtonLabel }}
          </el-button>
        </el-form-item>
      </el-form>
      
      <div class="login-footer">
        <el-link type="primary" @click="handleBackToLogin">{{ backToLoginLabel }}</el-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 注册页面
 * 处理用户注册逻辑，包括表单验证、注册和路由跳转
 * @author Attendance System Team
 * @since 2026-03-18
 * @version v1.1.0-alpha.1
 */

import { ref, reactive, computed } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store'
import { ElMessage } from 'element-plus'
import { APP_CONSTANTS, MESSAGE_CONSTANTS } from '../constants'
import AvatarSelector from '../components/common/AvatarSelector.vue'



// 路由和状态管理
const router = useRouter()
const userStore = useUserStore()

// 响应式数据
const registerForm = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  age: undefined as number | undefined,
  avatar: '',
  gender: APP_CONSTANTS.USER.GENDER.UNKNOWN as number | undefined,
})
const acceptTerms = ref(APP_CONSTANTS.BOOLEAN.FALSE)
const loading = ref(APP_CONSTANTS.BOOLEAN.FALSE)
const registerFormRef = ref()

// 计算属性
  const registerTitle = computed(() => APP_CONSTANTS.LOGIN.TEXTS.REGISTER_TITLE())
  const usernameLabel = computed(() => APP_CONSTANTS.LOGIN.TEXTS.USERNAME_LABEL())
  const passwordLabel = computed(() => APP_CONSTANTS.LOGIN.TEXTS.PASSWORD_LABEL())
  const confirmPasswordLabel = computed(() => APP_CONSTANTS.LOGIN.TEXTS.CONFIRM_PASSWORD_LABEL())
  const ageLabel = computed(() => APP_CONSTANTS.LOGIN.TEXTS.AGE_LABEL())
  const avatarLabel = computed(() => APP_CONSTANTS.LOGIN.TEXTS.AVATAR_LABEL())
  const genderLabel = computed(() => APP_CONSTANTS.LOGIN.TEXTS.GENDER_LABEL())
  const maleLabel = computed(() => APP_CONSTANTS.LOGIN.TEXTS.MALE_LABEL())
  const femaleLabel = computed(() => APP_CONSTANTS.LOGIN.TEXTS.FEMALE_LABEL())
  const unknownLabel = computed(() => APP_CONSTANTS.LOGIN.TEXTS.UNKNOWN_LABEL())
  const usernamePlaceholder = computed(() => APP_CONSTANTS.LOGIN.TEXTS.USERNAME_PLACEHOLDER())
  const passwordPlaceholder = computed(() => APP_CONSTANTS.LOGIN.TEXTS.PASSWORD_PLACEHOLDER())
  const confirmPasswordPlaceholder = computed(() => APP_CONSTANTS.LOGIN.TEXTS.CONFIRM_PASSWORD_PLACEHOLDER())
  const agePlaceholder = computed(() => APP_CONSTANTS.LOGIN.TEXTS.AGE_PLACEHOLDER())
  const avatarPlaceholder = computed(() => APP_CONSTANTS.LOGIN.TEXTS.AVATAR_PLACEHOLDER())

  const acceptTermsLabel = computed(() => APP_CONSTANTS.LOGIN.TEXTS.ACCEPT_TERMS())
  const registerButtonLabel = computed(() => APP_CONSTANTS.LOGIN.TEXTS.REGISTER_BUTTON())
  const backToLoginLabel = computed(() => APP_CONSTANTS.LOGIN.TEXTS.BACK_TO_LOGIN())

// 显示选项
const showAgeField = computed(() => APP_CONSTANTS.LOGIN.FEATURE_FLAGS.SHOW_AGE_FIELD())
const showAvatarField = computed(() => APP_CONSTANTS.LOGIN.FEATURE_FLAGS.SHOW_AVATAR_FIELD())
const showGenderField = computed(() => APP_CONSTANTS.LOGIN.FEATURE_FLAGS.SHOW_GENDER_FIELD())

// 表单验证规则
const validateUsername = (_rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(APP_CONSTANTS.LOGIN.VALIDATION_MESSAGES.USERNAME_REQUIRED()))
  } else if (value.length < APP_CONSTANTS.USER.USERNAME.MIN_LENGTH) {
    callback(new Error(APP_CONSTANTS.LOGIN.VALIDATION_MESSAGES.USERNAME_TOO_SHORT()))
  } else if (value.length > APP_CONSTANTS.USER.USERNAME.MAX_LENGTH) {
    callback(new Error(APP_CONSTANTS.LOGIN.VALIDATION_MESSAGES.USERNAME_TOO_LONG()))
  } else {
    callback()
  }
}

const validatePassword = (_rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(APP_CONSTANTS.LOGIN.VALIDATION_MESSAGES.PASSWORD_REQUIRED()))
  } else if (value.length < APP_CONSTANTS.USER.PASSWORD.MIN_LENGTH) {
    callback(new Error(APP_CONSTANTS.LOGIN.VALIDATION_MESSAGES.PASSWORD_TOO_SHORT()))
  } else {
    callback()
  }
}

const validateConfirmPassword = (_rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(APP_CONSTANTS.LOGIN.VALIDATION_MESSAGES.CONFIRM_PASSWORD_REQUIRED()))
  } else if (value !== registerForm.password) {
    callback(new Error(APP_CONSTANTS.LOGIN.VALIDATION_MESSAGES.PASSWORD_MISMATCH()))
  } else {
    callback()
  }
}

const validateGender = (_rule: any, value: any, callback: any) => {
  if (value === undefined || value === null) {
    callback(new Error(APP_CONSTANTS.LOGIN.VALIDATION_MESSAGES.GENDER_REQUIRED()))
  } else if (![APP_CONSTANTS.USER.GENDER.UNKNOWN, APP_CONSTANTS.USER.GENDER.MALE, APP_CONSTANTS.USER.GENDER.FEMALE].includes(value)) {
    callback(new Error(APP_CONSTANTS.LOGIN.VALIDATION_MESSAGES.GENDER_INVALID()))
  } else {
    callback()
  }
}

const registerRules = reactive({
  username: [
    { validator: validateUsername, trigger: APP_CONSTANTS.FORM_VALIDATION.TRIGGERS.BLUR },
    { min: APP_CONSTANTS.USER.USERNAME.MIN_LENGTH, max: APP_CONSTANTS.USER.USERNAME.MAX_LENGTH, message: APP_CONSTANTS.LOGIN.VALIDATION_MESSAGES.USERNAME_LENGTH_RANGE(), trigger: APP_CONSTANTS.FORM_VALIDATION.TRIGGERS.CHANGE }
  ],
  password: [
    { validator: validatePassword, trigger: APP_CONSTANTS.FORM_VALIDATION.TRIGGERS.BLUR }
  ],
  confirmPassword: [
    { validator: validateConfirmPassword, trigger: APP_CONSTANTS.FORM_VALIDATION.TRIGGERS.BLUR }
  ],
  age: [
    { type: APP_CONSTANTS.USER.FORM_TYPES.NUMBER, min: APP_CONSTANTS.USER.AGE_LIMITS.MIN, max: APP_CONSTANTS.USER.AGE_LIMITS.MAX, message: APP_CONSTANTS.LOGIN.VALIDATION_MESSAGES.AGE_RANGE(), trigger: APP_CONSTANTS.FORM_VALIDATION.TRIGGERS.CHANGE }
  ],
  gender: [
    { validator: validateGender, trigger: APP_CONSTANTS.FORM_VALIDATION.TRIGGERS.CHANGE }
  ]
})

// 注册处理函数
const handleRegister = async () => {
  try {
    // 检查是否同意条款
    if (!acceptTerms.value) {
      ElMessage.warning(APP_CONSTANTS.LOGIN.VALIDATION_MESSAGES.TERMS_NOT_ACCEPTED())
      return
    }
    
    // 表单验证
    await registerFormRef.value.validate()
    loading.value = APP_CONSTANTS.BOOLEAN.TRUE
    
    // 调用用户存储的注册方法
    const result = await userStore.register(
      registerForm.username, 
      registerForm.password, 
      registerForm.confirmPassword,
      registerForm.age,
      registerForm.avatar,
      registerForm.gender
    )
    
    if (result.success) {
      ElMessage.success(MESSAGE_CONSTANTS.USER_INFO.REGISTER_SUCCESS())
      
      // 设置认证状态
      localStorage.setItem(APP_CONSTANTS.USER.STORAGE_KEYS.IS_LOGGED_IN, APP_CONSTANTS.STORAGE.AUTH_STATUS.LOGGED_IN)
      
      // 注册成功后跳转到登录页，让用户登录
      router.push({ path: APP_CONSTANTS.ROUTE.PATHS.AUTH.LOGIN })
    } else {
      ElMessage.error(result.message || APP_CONSTANTS.LOGIN.VALIDATION_MESSAGES.REGISTRATION_FAILED())
    }
  } catch (error) {
    console.error('Registration error:', error)
    ElMessage.error(APP_CONSTANTS.LOGIN.VALIDATION_MESSAGES.VALIDATION_FAILED())
  } finally {
    loading.value = APP_CONSTANTS.BOOLEAN.FALSE
  }
}



// 返回登录页面
const handleBackToLogin = () => {
  router.push({ path: APP_CONSTANTS.ROUTE.PATHS.AUTH.LOGIN })
}
</script>

<style scoped>
@import '../assets/css/login.css';
@import '../assets/css/register.css';
</style>