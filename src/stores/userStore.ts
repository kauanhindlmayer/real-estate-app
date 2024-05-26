import { defineStore } from 'pinia'
import { computed, inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import useBaseToast from '@/composables/useBaseToast'
import User from '@/types/models/User'
import type UserGateway from '@/gateways/UserGateway'
import type { IUserData } from '@/gateways/UserGateway'

export const useUserStore = defineStore('user', () => {
  const userGateway = inject('userGateway') as UserGateway

  const toast = useBaseToast()
  const router = useRouter()
  const { t } = useI18n()

  const isLoading = ref(false)
  const user = ref<User>(new User())

  const isUserLoggedIn = computed(() => Boolean(user.value.id))

  async function register(userData: IUserData) {
    isLoading.value = true
    try {
      await userGateway.register(userData)
      router.push({ name: 'home' })
    } catch {
      toast.error({ message: t('login.messages.invalidCredentials') })
    } finally {
      isLoading.value = false
    }
  }

  async function login(email: string, password: string) {
    isLoading.value = true
    try {
      user.value = await userGateway.login(email, password)
      localStorage.setItem('user', JSON.stringify(user.value))
      router.push({ name: 'home' })
    } catch {
      toast.error({ message: t('login.messages.invalidCredentials') })
    } finally {
      isLoading.value = false
    }
  }

  async function logout() {
    localStorage.removeItem('user')
    router.push({ name: 'login' })
  }

  return {
    /* State */
    isLoading,
    user,
    /* Getters */
    isUserLoggedIn,
    /* Actions */
    register,
    login,
    logout
  }
})
