<script lang="ts" setup>
import { inject, ref } from 'vue'
import AppInputText from '@/components/wrappers/AppInputText.vue'
import AppButton from '@/components/wrappers/AppButton.vue'
import { useRouter } from 'vue-router'
import useBaseToast from '@/composables/useBaseToast'
import type UserGateway from '@/gateways/UserGateway'
import { useI18n } from 'vue-i18n'
import { useLoadingStore } from '@/stores/loadingStore'

const userGateway = inject('userGateway') as UserGateway

const toast = useBaseToast()
const router = useRouter()
const loadingStore = useLoadingStore()
const { t } = useI18n()

const username = ref('')
const password = ref('')

function register() {
  loadingStore.startLoading()
  try {
    userGateway.login(username.value, password.value)
    toast.success({ message: t('register.messages.userRegistered') })
    router.push({ name: 'login' })
  } catch {
    toast.error({ message: t('register.messages.errorRegisteringUser') })
  } finally {
    loadingStore.stopLoading()
  }
}
</script>

<template>
  <div class="container">
    <div class="left-panel">
      <form @submit.prevent="register">
        <h1>{{ $t('register.title') }}</h1>
        <div class="p-fluid">
          <div class="p-field">
            <AppInputText :label="$t('register.fields.email.label')" v-model="username" />
          </div>
          <div class="p-field">
            <AppInputText :label="$t('register.fields.password.label')" v-model="password" />
          </div>
        </div>
        <footer>
          <AppButton :label="$t('register.buttons.register')" type="submit" />
          <p>
            {{ $t('register.alreadyHaveAccount') }}
            <RouterLink to="/login" class="login-link">{{ $t('login.title') }}</RouterLink>
          </p>
        </footer>
      </form>
    </div>

    <div class="right-panel" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  width: 100vw;
}
.left-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 100vh;
}
.right-panel {
  background-color: #3b82f6;
  width: 50vw;
  height: 100vh;
}
footer {
  margin-top: 1rem;
}
.p-field {
  margin-bottom: 10px;
}
.login-link {
  color: #3b82f6;
}
</style>
