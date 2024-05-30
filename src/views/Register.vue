<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/userStore'
import BaseInputText from '@/components/wrappers/form/BaseInputText.vue'
import BaseInputPassword from '@/components/wrappers/form/BaseInputPassword.vue'
import { useField, useForm } from 'vee-validate'
import { object, string, ref } from 'yup'
import type { UserRegistrationData } from '@/gateways/UserGateway'

const { t } = useI18n()
const userStore = useUserStore()

const validationSchema = object({
  fullName: string()
    .required(t('register.fields.fullName.required'))
    .matches(/^[a-zA-Z\s]+$/, t('register.fields.fullName.invalidFormat'))
    .min(3, t('register.fields.fullName.minLength')),
  email: string()
    .required(t('register.fields.email.required'))
    .email(t('register.fields.email.invalidFormat')),
  password: string()
    .required(t('register.fields.password.required'))
    .min(8, t('register.fields.password.minLength'))
    .matches(/[a-z]/, t('register.fields.password.lowercaseLetter'))
    .matches(/[A-Z]/, t('register.fields.password.uppercaseLetter'))
    .matches(/[0-9]/, t('register.fields.password.number'))
    .matches(/[@$!%*?&]/, t('register.fields.password.specialCharacter')),
  passwordConfirmation: string()
    .required(t('register.fields.passwordConfirmation.required'))
    .oneOf([ref('password')], t('register.fields.passwordConfirmation.notMatch'))
})

const { handleSubmit, errors } = useForm({ validationSchema })
const { value: fullName } = useField('fullName')
const { value: email } = useField('email')
const { value: password } = useField('password')
const { value: passwordConfirmation } = useField('passwordConfirmation')

const register = handleSubmit(async (values) => {
  await userStore.register(values as UserRegistrationData)
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
              :label="$t('register.fields.fullName.label')"
              :placeholder="$t('register.fields.fullName.placeholder')"
              :error="errors.fullName"
            />
          </div>
          <div class="col-12">
            <BaseInputText
              v-model="email"
              :label="$t('register.fields.email.label')"
              :placeholder="$t('register.fields.email.placeholder')"
              :error="errors.email"
            />
          </div>
          <div class="col-12">
            <BaseInputPassword
              v-model="password"
              :feedback="false"
              :label="$t('register.fields.password.label')"
              :placeholder="$t('register.fields.password.placeholder')"
              :error="errors.password"
              class="w-full"
            />
          </div>
          <div class="col-12">
            <BaseInputPassword
              v-model="passwordConfirmation"
              :feedback="false"
              :label="$t('register.fields.passwordConfirmation.label')"
              :placeholder="$t('register.fields.passwordConfirmation.placeholder')"
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
              <RouterLink to="/login">{{ $t('common.login') }}</RouterLink>
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
a {
  color: var(--primary-color);
}
</style>
