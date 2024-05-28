import { createRouter, createWebHistory } from 'vue-router'
import propertiesRoutes from './properties/routes'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

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
          path: '/security',
          name: 'security',
          component: () => import('@/views/Security.vue'),
          meta: {
            title: 'Security'
          }
        },
        ...propertiesRoutes
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

router.beforeResolve((to, _, next) => {
  if (to.name) NProgress.start()
  next()
})

router.beforeEach((to, _, next) => {
  const appName = import.meta.env.VITE_APP_NAME
  document.title = to.meta.title ? `${to.meta.title} | ${appName}` : appName
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
