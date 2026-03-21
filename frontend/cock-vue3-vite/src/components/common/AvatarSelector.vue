<template>
  <div class="avatar-selector-wrapper">
    <div class="avatar-options">
      <div 
        v-for="(avatar, index) in avatarOptions" 
        :key="index"
        class="avatar-option"
        :class="{ active: modelValue === avatar }"
        @click="selectAvatar(avatar)"
      >
        <el-avatar :src="avatar" :size="optionSize" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { APP_CONSTANTS } from '../../constants/appConstants'

// 定义组件props
const props = withDefaults(defineProps<{
  modelValue?: string
  optionSize?: number
  avatarList?: string[]
}>(), {
  modelValue: '',
  optionSize: 50,
  avatarList: () => APP_CONSTANTS.USER.AVATAR.DEFAULT_AVATARS
})

// 定义组件emit
const emit = defineEmits(['update:modelValue'])

// 头像选项
const avatarOptions = props.avatarList

// 选择头像
const selectAvatar = (avatar: string) => {
  emit('update:modelValue', avatar)
}
</script>

<style scoped>
.avatar-selector-wrapper {
  width: 100%;
}

.avatar-options {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.avatar-option {
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.avatar-option:hover {
  background-color: #f0f0f0;
}

.avatar-option.active {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.3);
}

.input-prepend-text {
  white-space: nowrap;
}
</style>