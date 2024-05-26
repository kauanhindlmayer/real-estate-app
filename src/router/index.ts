import { createRouter, createWebHistory } from 'vue-router'
import PropertiesRoutes from './properties'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/BaseLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/Home.vue'),
          meta: {
            title: 'Home'
          }
        },
        {
          path: '/services',
          name: 'services',
          component: () => import('@/views/Services.vue'),
          meta: {
            title: 'Services'
          }
        },
        {
          path: '/help',
          name: 'help',
          component: () => import('@/views/Help.vue'),
          meta: {
            title: 'Help'
          }
        },
        ...PropertiesRoutes
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        title: 'Login'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
      meta: {
        title: 'Register'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFound.vue'),
      meta: {
        title: 'Not Found'
      }
    }
  ]
})

router.beforeEach((to, _, next) => {
  document.title = `${to.meta.title} | Real Estate`
  next()
})

export default router
