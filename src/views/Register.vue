<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import BaseInputText from '@/components/wrappers/form/BaseInputText.vue'
import BaseInputPassword from '@/components/wrappers/form/BaseInputPassword.vue'
import type { IUserData } from '@/gateways/UserGateway'

const userStore = useUserStore()

const signupForm = ref<IUserData>({
  fullName: '',
  email: '',
  password: '',
  passwordConfirmation: ''
})

function register() {
  if (!validateFields()) return
  userStore.register(signupForm.value)
}

const fullNameRef = ref<InstanceType<typeof BaseInputText> | null>(null)
const emailRef = ref<InstanceType<typeof BaseInputText> | null>(null)
const passwordRef = ref<InstanceType<typeof BaseInputPassword> | null>(null)
const passwordConfirmationRef = ref<InstanceType<typeof BaseInputPassword> | null>(null)

function validateFields() {
  const fieldsToValidate = [fullNameRef, emailRef, passwordRef, passwordConfirmationRef]
  const validationResults = fieldsToValidate.map((ref) => ref.value?.isValid())
  return validationResults.every((valid) => valid)
}
</script>

<template>
  <div class="container">
    <div class="left-panel">
      <form @submit.prevent="register">
        <h1>{{ $t('common.register') }}</h1>
        <BaseInputText
          ref="fullNameRef"
          v-model="signupForm.fullName"
          :label="$t('register.fields.fullName.label')"
          required
        />
        <BaseInputText
          ref="emailRef"
          v-model="signupForm.email"
          :label="$t('register.fields.email.label')"
          required
        />
        <BaseInputPassword
          ref="passwordRef"
          v-model="signupForm.password"
          :label="$t('register.fields.password.label')"
          class="w-full mb-2"
          required
        />
        <BaseInputPassword
          ref="passwordConfirmationRef"
          v-model="signupForm.passwordConfirmation"
          :password="signupForm.password"
          :label="$t('register.fields.passwordConfirmation.label')"
          class="w-full"
          required
        />
        <BaseButton
          :label="$t('common.register')"
          type="submit"
          class="w-full mt-4"
          :loading="userStore.isLoading"
        />
        <p>
          {{ $t('register.alreadyHaveAccount') }}
          <RouterLink to="/login">{{ $t('common.login') }}</RouterLink>
        </p>
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
  background-color: var(--primary-color);
  width: 50vw;
  height: 100vh;
}
a {
  color: var(--primary-color);
}
</style>
