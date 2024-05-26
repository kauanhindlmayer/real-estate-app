<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import AppInputText from '@/components/wrappers/AppInputText.vue'
import AppInputPassword from '@/components/wrappers/AppInputPassword.vue'

const userStore = useUserStore()

const email = ref('')
const password = ref('')

function login() {
  if (!validateFields()) return
  userStore.login(email.value, password.value)
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
      <form @submit.prevent="login" class="flex flex-column gap-1">
        <h1>{{ $t('common.login') }}</h1>
        <AppInputText
          ref="emailRef"
          v-model="email"
          :label="$t('login.fields.email.label')"
          required
        />
        <AppInputPassword
          ref="passwordRef"
          v-model="password"
          :label="$t('login.fields.password.label')"
          toggle-mask
          required
        />
        <AppButton
          :label="$t('common.login')"
          type="submit"
          class="mt-2"
          :loading="userStore.isLoading"
        />
        <p>
          {{ $t('login.dontHaveAccount') }}
          <RouterLink to="/register">{{ $t('common.register') }}</RouterLink>
        </p>
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
a {
  color: var(--primary-color);
}
</style>
