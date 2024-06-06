import { AxiosError } from 'axios'
import { useUserStore } from '@/stores/user'
import { t } from '@/plugins/i18n'
import useBaseToast from '@/composables/useBaseToast'

const Status401Unauthorized = 401

function logoutOnUnauthorized(error: AxiosError) {
  const userStore = useUserStore()
  const toast = useBaseToast()
  if (error.response?.status === Status401Unauthorized) {
    toast.error({ message: t('common.sessionExpirationMessage') })
    userStore.logout()
  }
  return Promise.reject(error)
}

export default logoutOnUnauthorized
