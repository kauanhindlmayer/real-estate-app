import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/properties',
      name: 'properties',
      component: () => import('../views/Properties/PropertiesView.vue')
    },
    {
      path: '/properties/new',
      name: 'new-property',
      component: () => import('../views/Properties/partials/PropertyForm.vue')
    }
  ]
})

export default router
