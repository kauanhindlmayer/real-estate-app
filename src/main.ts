import './assets/main.css'
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

import AxiosAdapter from '@/gateways/httpClient'
import PropertyGateway from '@/gateways/PropertyGateway'
import LocationGateway from '@/gateways/LocationGateway'
// import { PropertyGatewayInMemory } from '@/gateways/PropertyGateway'
// import { LocationGatewayInMemory } from '@/gateways/LocationGateway'
import UserGateway from '@/gateways/UserGateway'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.use(i18n)

const httpClient = new AxiosAdapter({ baseUrl: import.meta.env.VITE_API_URL })
const propertyGateway = new PropertyGateway(httpClient)
const locationGateway = new LocationGateway(httpClient)
// const propertyGateway = new PropertyGatewayInMemory()
// const locationGateway = new LocationGatewayInMemory()
const userGateway = new UserGateway(httpClient)

app.provide('propertyGateway', propertyGateway)
app.provide('userGateway', userGateway)
app.provide('locationGateway', locationGateway)

app.mount('#app')
