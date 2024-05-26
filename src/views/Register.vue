<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import AppInputText from '@/components/wrappers/AppInputText.vue'

const userStore = useUserStore()

const email = ref('')
const password = ref('')

function register() {
  if (!validateFields()) return
  userStore.register(email.value, password.value)
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
    <div class="left-panel">
      <form class="flex flex-column gap-1" @submit.prevent="register">
        <h1>{{ $t('common.register') }}</h1>
        <AppInputText
          ref="emailRef"
          v-model="email"
          :label="$t('register.fields.email.label')"
          required
        />
        <AppInputText
          ref="passwordRef"
          v-model="password"
          :label="$t('register.fields.password.label')"
          required
        />
        <AppButton :label="$t('register.buttons.register')" type="submit" class="mt-2" />
        <p>
          {{ $t('register.alreadyHaveAccount') }}
          <RouterLink to="/login">{{ $t('login.title') }}</RouterLink>
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
</style>
