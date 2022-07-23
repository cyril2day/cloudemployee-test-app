import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from 'src/pages/DashboardPage.vue'
import NProgress from 'nprogress'


NProgress.configure({ showSpinner: false })

const routes = [
   {
      path: '/',
      name: 'Dashboard',
      component: DashboardPage
   },
   {
      path: '/plan',
      name: 'Plan List',
      component: () => import('src/pages/Plan/ListPage.vue')
   },
   {
      path: '/create',
      name: 'Create',
      component: () => import('src/pages/Create/CreatePage.vue')
   },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
    name: 'NotFound',
    meta: { hidden: true },
  },
]

const router = createRouter({
   history: createWebHistory(),
   routes
})

router.beforeEach(() => { NProgress.start() })
router.afterEach(() => { NProgress.done() })

export default router
