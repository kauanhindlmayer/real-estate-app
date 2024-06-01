import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import type { Router } from 'vue-router'

NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

function installNProgress(router: Router) {
  router.beforeResolve((to, _, next) => {
    if (to.name) NProgress.start()
    next()
  })

  router.afterEach(() => {
    NProgress.done()
  })
}
export default installNProgress
