import { defineStore } from 'pinia'
import { computed, inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useLoadingStore } from '@/stores/loadingStore'
import useBaseToast from '@/composables/useBaseToast'
import type UserGateway from '@/gateways/UserGateway'
import type User from '@/types/models/User'

export const useUserStore = defineStore('user', () => {
  const userGateway = inject('userGateway') as UserGateway

  const loadingStore = useLoadingStore()
  const toast = useBaseToast()
  const router = useRouter()
  const { t } = useI18n()

  const user = ref<User | null>(null)

  const isUserLoggedIn = computed(() => !!user.value)

  async function register(email: string, password: string) {
    loadingStore.startLoading()
    try {
      await userGateway.register(email, password)
      router.push({ name: 'home' })
    } catch {
      toast.error({ message: t('login.messages.invalidCredentials') })
    } finally {
      loadingStore.stopLoading()
    }
  }

  async function login(email: string, password: string) {
    loadingStore.startLoading()
    try {
      user.value = await userGateway.login(email, password)
      localStorage.setItem('user', JSON.stringify(user.value))
      router.push({ name: 'home' })
    } catch {
      toast.error({ message: t('login.messages.invalidCredentials') })
    } finally {
      loadingStore.stopLoading()
    }
  }

  async function logout() {
    user.value = null
    localStorage.removeItem('user')
    router.push({ name: 'login' })
  }

  return {
    /* State */
    user,
    /* Getters */
    isUserLoggedIn,
    /* Actions */
    register,
    login,
    logout
  }
})
