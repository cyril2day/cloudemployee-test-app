import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from 'src/pages/DashboardPage.vue'

const routes = [
   {
      path: '/',
      name: 'Dashboard',
      component: DashboardPage
   },
   {
      path: '/plan',
      name: 'Plan',
      component: () => import('src/pages/plan/ListPage.vue')
   }
]

const router = createRouter({
   history: createWebHistory(),
   routes
})

export default router
