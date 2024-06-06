import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'

NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

const nProgress = {
  install() {
    router.beforeResolve((to, _, next) => {
      if (to.name) NProgress.start()
      next()
    })

    router.afterEach(() => {
      NProgress.done()
    })
  }
}

export default nProgress
