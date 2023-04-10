import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/',
    name: 'root',
    component: HomeView
  },
  {
    path: '/cnpjs',
    name: 'cnpjs',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Cnpjs.vue'),
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('../views/Orders.vue'),
  },
  {
    path: '/providers',
    name: 'providers',
    component: () => import('../views/Providers.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
