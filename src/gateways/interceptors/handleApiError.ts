import { AxiosError } from 'axios'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { t } from '@/plugins/i18n'
import useBaseToast from '@/composables/useBaseToast'

const Status401Unauthorized = 401
const Status500InternalServerError = 500

function handleApiError(error: AxiosError) {
  const toast = useBaseToast()
  const status = error.response?.status

  if (status === Status401Unauthorized) {
    const userStore = useUserStore()
    toast.error({ message: t('common.messages.sessionExpirationMessage') })
    userStore.logout()
  }

  if (status === Status500InternalServerError) {
    const router = useRouter()
    toast.error({ message: t('common.messages.internalServerError') })
    router.push({ name: 'network-error' })
  }

  return Promise.reject(error)
}

export default handleApiError
