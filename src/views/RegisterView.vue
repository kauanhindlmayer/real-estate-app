<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import AppInputText from '@/components/wrappers/AppInputText.vue'
import AppButton from '@/components/wrappers/AppButton.vue'

const authStore = useAuthStore()

const email = ref('')
const password = ref('')

function register() {
  if (!validateFields()) return
  authStore.register(email.value, password.value)
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
      <form @submit.prevent="register">
        <h1>{{ $t('register.title') }}</h1>
        <div class="p-fluid">
          <div class="p-field">
            <AppInputText
              ref="emailRef"
              v-model="email"
              :label="$t('register.fields.email.label')"
              required
            />
          </div>
          <div class="p-field">
            <AppInputText
              ref="passwordRef"
              v-model="password"
              :label="$t('register.fields.password.label')"
              required
            />
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
  background-color: var(--primary-color);
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
  color: var(--primary-color);
}
</style>
