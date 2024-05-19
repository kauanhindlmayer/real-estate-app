import './assets/main.css'
import 'primevue/resources/themes/aura-light-blue/theme.css'
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

import App from './App.vue'
import router from './router'
import { AxiosAdapter } from './gateways/httpClient'
import PropertyGateway from './gateways/PropertyGateway'
import LocationGateway from './gateways/LocationGateway'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.use(ToastService)

const httpClient = new AxiosAdapter(import.meta.env.VITE_API_URL)
const propertyGateway = new PropertyGateway(httpClient)

const viaCepHttpClient = new AxiosAdapter(import.meta.env.VITE_ZIP_CODE_API_URL)
const locationGateway = new LocationGateway(viaCepHttpClient)

app.provide('propertyGateway', propertyGateway)
app.provide('locationGateway', locationGateway)

app.mount('#app')
