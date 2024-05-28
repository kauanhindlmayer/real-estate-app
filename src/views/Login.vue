<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import BaseInputText from '@/components/wrappers/form/BaseInputText.vue'
import BaseInputPassword from '@/components/wrappers/form/BaseInputPassword.vue'

const userStore = useUserStore()

const email = ref('')
const password = ref('')

function login() {
  if (!validateFields()) return
  userStore.login(email.value, password.value)
}

const emailRef = ref<InstanceType<typeof BaseInputText> | null>(null)
const passwordRef = ref<InstanceType<typeof BaseInputText> | null>(null)

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
        <h1>{{ $t('common.login') }}</h1>
        <BaseInputText
          ref="emailRef"
          v-model="email"
          :label="$t('login.fields.email.label')"
          required
        />
        <BaseInputPassword
          ref="passwordRef"
          v-model="password"
          :label="$t('login.fields.password.label')"
          toggle-mask
          class="w-full"
          required
        />
        <BaseButton
          :label="$t('common.login')"
          type="submit"
          class="w-full mt-4"
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
