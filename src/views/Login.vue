<script lang="ts" setup>
import { useUserStore } from '@/stores/userStore'
import { useField, useForm } from 'vee-validate'
import { object, string } from 'yup'

const userStore = useUserStore()

const validationSchema = object({
  email: string().required().email(),
  password: string().required()
})

const { handleSubmit, errors } = useForm({ validationSchema })
const { value: email } = useField('email')
const { value: password } = useField('password')

const login = handleSubmit(async (values) => {
  await userStore.login(values.email, values.password)
})
</script>

<template>
  <div class="container">
    <div class="left-panel" />
    <div class="right-panel">
      <form @submit.prevent="login" class="flex justify-content-center">
        <div class="grid w-7">
          <div class="col-12">
            <h1>{{ $t('common.login') }}</h1>
          </div>
          <div class="col-12">
            <BaseInputText
              v-model="email"
              :label="$t('fields.email')"
              :placeholder="$t('fields.email')"
              :error="errors.email"
            />
          </div>
          <div class="col-12">
            <BaseInputPassword
              v-model="password"
              toggle-mask
              :feedback="false"
              :label="$t('fields.password')"
              :placeholder="$t('fields.password')"
              :error="errors.password"
              class="w-full"
            />
          </div>
          <div class="col-12">
            <BaseButton
              :label="$t('common.login')"
              type="submit"
              class="w-full mt-4"
              :loading="userStore.isLoading"
            />
          </div>
          <div class="col-12">
            <p>
              {{ $t('login.dontHaveAccount') }}
              <RouterLink to="/register" class="emphasis">{{ $t('common.register') }}</RouterLink>
            </p>
          </div>
        </div>
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
}
.right-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50vw;
}
</style>
