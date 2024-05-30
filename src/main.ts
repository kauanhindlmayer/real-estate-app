import '@/assets/css/main.css'
import 'primevue/resources/themes/aura-light-blue/theme.css'
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

import App from '@/App.vue'
import router from '@/router'
import i18n from '@/plugins/i18n'
import setYupLocale from '@/plugins/yup'

import { registerComponents } from '@/utils/registerComponents'
import { registerGateways } from '@/utils/registerGateways'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.use(i18n)
setYupLocale()

registerComponents(app)
registerGateways(app, { useInMemory: true })

app.mount('#app')
