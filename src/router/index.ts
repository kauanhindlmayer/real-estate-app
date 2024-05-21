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
          component: () => import('../views/HomeView.vue'),
          meta: {
            title: 'Home'
          }
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('../views/AboutView.vue'),
          meta: {
            title: 'About'
          }
        },
        {
          path: '/blog',
          name: 'blog',
          component: () => import('../views/BlogView.vue'),
          meta: {
            title: 'Blog'
          }
        },
        ...PropertiesRoutes
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        title: 'Login'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: {
        title: 'Register'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
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
