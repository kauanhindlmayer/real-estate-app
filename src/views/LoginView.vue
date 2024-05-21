<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import AppInputText from '@/components/wrappers/AppInputText.vue'
import AppInputPassword from '@/components/wrappers/AppInputPassword.vue'
import AppButton from '@/components/wrappers/AppButton.vue'

const authStore = useAuthStore()

const email = ref('')
const password = ref('')

function login() {
  if (!validateFields()) return
  authStore.login(email.value, password.value)
}

const emailRef = ref<InstanceType<typeof AppInputText> | null>(null)
const passwordRef = ref<InstanceType<typeof AppInputText> | null>(null)

function validateFields() {
  const fieldsToValidate = [emailRef, passwordRef]
  const validationResults = fieldsToValidate.map((ref) => ref.value?.isValid())
  return validationResults.every((valid) => valid)
}
</script>

<template>
  <div class="container">
    <div class="left-panel" />

    <div class="right-panel">
      <form @submit.prevent="login">
        <h1>{{ $t('login.title') }}</h1>
        <div class="p-fluid">
          <div class="p-field">
            <AppInputText
              ref="emailRef"
              v-model="email"
              :label="$t('login.fields.email.label')"
              required
            />
          </div>
          <div class="p-field">
            <AppInputPassword
              ref="passwordRef"
              v-model="password"
              :label="$t('login.fields.password.label')"
              toggle-mask
              required
            />
          </div>
        </div>
        <footer class="mt-1">
          <AppButton label="Login" type="submit" />
          <p>
            {{ $t('login.dontHaveAccount') }}
            <RouterLink to="/register" class="register-link">{{ $t('register.title') }}</RouterLink>
          </p>
        </footer>
      </form>
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
  background-color: var(--primary-color);
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
  color: var(--primary-color);
}
</style>
