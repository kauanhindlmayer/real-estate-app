import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import { t } from '@/plugins/i18n'
import { useStorage } from '@vueuse/core'
import useBaseToast from '@/composables/useBaseToast'
import User from '@/types/models/User'
import type { RegistrationRequest, LoginRequest, IUserGateway } from '@/gateways/UserGateway'

export const useUserStore = defineStore('user', () => {
  const userGateway = inject<IUserGateway>('userGateway')!
  const toast = useBaseToast()
  const router = useRouter()

  const isLoading = ref(false)
  const user = useStorage('user', new User())

  const isLoggedIn = computed(() => Boolean(user.value.id))

  async function register(registrationData: RegistrationRequest) {
    isLoading.value = true
    try {
      await userGateway.register(registrationData)
      router.push({ name: 'login' })
      toast.success({ message: t('register.messages.userRegistered') })
    } catch {
      toast.error({ message: t('login.messages.invalidCredentials') })
    } finally {
      isLoading.value = false
    }
  }

  async function login(loginData: LoginRequest) {
    isLoading.value = true
    try {
      user.value = await userGateway.login(loginData)
      delete user.value.password
      router.push({ name: 'home' })
    } catch {
      toast.error({ message: t('login.messages.invalidCredentials') })
    } finally {
      isLoading.value = false
    }
  }

  async function logout() {
    user.value = new User()
    router.push({ name: 'login' })
  }

  return {
    /* State */
    isLoading,
    user,
    /* Getters */
    isLoggedIn,
    /* Actions */
    register,
    login,
    logout
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
