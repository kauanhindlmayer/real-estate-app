import type { App } from 'vue'

import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css'

import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

const primeVue = {
  install(app: App<Element>) {
    app.use(PrimeVue)
    app.use(ToastService)
  }
}

export default primeVue
