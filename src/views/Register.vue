<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import { useField, useForm } from 'vee-validate'
import { object, string, ref } from 'yup'
import type { RegistrationRequest } from '@/gateways/UserGateway'

const userStore = useUserStore()

const validationSchema = object({
  fullName: string()
    .required()
    .matches(/^[a-zA-Z\s]+$/)
    .min(3),
  email: string().required().email(),
  password: string()
    .required()
    .min(8)
    .matches(/[a-z]/)
    .matches(/[A-Z]/)
    .matches(/[0-9]/)
    .matches(/[@$!%*?&]/),
  passwordConfirmation: string()
    .required()
    .oneOf([ref('password')])
})

const { handleSubmit, errors } = useForm<RegistrationRequest>({ validationSchema })
const { value: fullName } = useField('fullName')
const { value: email } = useField('email')
const { value: password } = useField('password')
const { value: passwordConfirmation } = useField('passwordConfirmation')

const register = handleSubmit(async (registrationData) => {
  await userStore.register(registrationData)
})
</script>

<template>
  <div class="container">
    <div class="left-panel">
      <form @submit.prevent="register" class="flex justify-content-center">
        <div class="grid w-7">
          <div class="col-12">
            <h1>{{ $t('common.register') }}</h1>
          </div>
          <div class="col-12">
            <BaseInputText
              v-model="fullName"
              :label="$t('fields.fullName')"
              :placeholder="$t('fields.fullName')"
              :error="errors.fullName"
            />
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
              :feedback="false"
              :label="$t('fields.password')"
              :placeholder="$t('fields.password')"
              :error="errors.password"
              class="w-full"
            />
          </div>
          <div class="col-12">
            <BaseInputPassword
              v-model="passwordConfirmation"
              :feedback="false"
              :label="$t('fields.passwordConfirmation')"
              :placeholder="$t('fields.passwordConfirmation')"
              :error="errors.passwordConfirmation"
              class="w-full"
            />
          </div>
          <div class="col-12">
            <BaseButton
              :label="$t('common.register')"
              type="submit"
              class="w-full mt-4"
              :loading="userStore.isLoading"
            />
          </div>
          <div class="col-12">
            <p>
              {{ $t('register.alreadyHaveAccount') }}
              <RouterLink to="/login" class="emphasis">{{ $t('common.login') }}</RouterLink>
            </p>
          </div>
        </div>
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
}
.right-panel {
  background-color: var(--primary-color);
  width: 50vw;
}
@media (max-width: 1024px) {
  .left-panel {
    width: 100vw;
    height: 100vh;
  }
  .right-panel {
    display: none;
  }
}
</style>
