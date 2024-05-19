<script lang="ts" setup>
import { ref } from 'vue'
import AppInputText from '@/components/wrappers/AppInputText.vue'
import AppButton from '@/components/wrappers/AppButton.vue'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'

const toast = useToast()
const router = useRouter()

const username = ref('')
const password = ref('')

function login() {
  if (username.value === 'admin' && password.value === 'admin') {
    router.push({ path: '/properties' })
  } else {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Invalid credentials', life: 3000 })
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
              <label for="username">Username</label>
              <AppInputText id="username" v-model="username" />
            </div>
            <div class="p-field">
              <label for="password">Password</label>
              <AppInputText id="password" v-model="password" />
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
</style>
