<script lang="ts" setup>
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppInputText from '@/components/wrappers/AppInputText.vue'
import AppInputPassword from '@/components/wrappers/AppInputPassword.vue'
import AppButton from '@/components/wrappers/AppButton.vue'
import useBaseToast from '@/composables/useBaseToast'
import type UserGateway from '@/gateways/UserGateway'
import { useLoadingStore } from '@/stores/loadingStore'

const userGateway = inject<UserGateway>('userGateway')

const toast = useBaseToast()
const router = useRouter()
const loadingStore = useLoadingStore()

const username = ref('')
const password = ref('')

function login() {
  loadingStore.startLoading()
  try {
    userGateway.login(username.value, password.value)
    router.push({ name: 'login' })
  } catch {
    toast.error({ message: 'Invalid credentials' })
  } finally {
    loadingStore.stopLoading()
  }
}
</script>

<template>
  <div class="container">
    <div class="left-panel" />

    <div class="right-panel">
      <div>
        <h1>Login</h1>
        <div class="p-fluid">
          <div class="p-field">
            <AppInputText label="Username" v-model="username" />
          </div>
          <div class="p-field">
            <AppInputPassword toggle-mask v-model="password" />
          </div>
        </div>
        <footer class="mt-1">
          <AppButton label="Login" @click="login" />
          <p>
            Don't have an account?
            <RouterLink to="/register" class="register-link">Register</RouterLink>
          </p>
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
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
.p-field {
  margin-bottom: 10px;
}
.register-link {
  color: #3b82f6;
}
</style>
