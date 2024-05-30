import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

function startLoading() {
  NProgress.start()
}

function finishLoading() {
  NProgress.done()
}

export { startLoading, finishLoading }
