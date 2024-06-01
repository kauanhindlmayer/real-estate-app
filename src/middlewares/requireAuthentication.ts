import { useUserStore } from '@/stores/userStore'
import type { MiddlewareContext } from './middlewarePipeline'

function requireAuthentication({ next }: MiddlewareContext) {
  const userStore = useUserStore()

  if (!userStore.isLoggedIn) {
    return next({ name: 'login' })
  }

  return next()
}

export default requireAuthentication
