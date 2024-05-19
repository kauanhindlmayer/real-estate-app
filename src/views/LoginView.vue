<script lang="ts" setup>
import { ref } from 'vue'
import AppInputText from '@/components/wrappers/AppInputText.vue'
import AppButton from '@/components/wrappers/AppButton.vue'
import { useRouter } from 'vue-router'
import useBaseToast from '@/composables/useBaseToast'

const toast = useBaseToast()
const router = useRouter()

const username = ref('')
const password = ref('')

function login() {
  if (username.value === 'admin' && password.value === 'admin') {
    router.push({ path: '/properties' })
  } else {
    toast.error({ message: 'Invalid credentials' })
  }
}
</script>

<template>
  <div class="login-wrapper">
    <div class="left-panel" />

    <div class="right-panel">
      <div class="login-container">
        <div class="login-header">
          <h1>Login</h1>
        </div>
        <div class="login-body">
          <div class="p-fluid">
            <div class="p-field">
              <AppInputText label="Username" v-model="username" />
            </div>
            <div class="p-field">
              <AppInputText label="Password" v-model="password" />
            </div>
          </div>
        </div>
        <div class="login-footer">
          <AppButton label="Login" @click="login" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-wrapper {
  display: flex;
  height: 100vh;
  width: 100vw;
}
.left-panel {
  background-color: #3b82f6;
  width: 50vw;
  height: 100vh;
}
.right-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 100vh;
}
.login-footer {
  margin-top: 1rem;
}
.p-field {
  margin-bottom: 10px;
}
</style>
