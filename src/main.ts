import '@/assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import i18n from '@/plugins/i18n'

import installPrimeVue from '@/plugins/primeVue'
import installYup from '@/plugins/yup'
import installNProgress from '@/plugins/nprogress'

import registerComponents from '@/utils/registerComponents'
import registerGateways from '@/utils/registerGateways'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
installPrimeVue(app)
installYup()
installNProgress(router)

registerComponents(app)
registerGateways(app, { useInMemory: true })

app.mount('#app')
