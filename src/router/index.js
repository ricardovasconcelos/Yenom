import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      icon: 'home', title: 'Home'
    },
    component: () => import(/* webpackChunkName: "home" */ '../pages/home/Home')
  },
  {
    path: '/expenses',
    name: 'expenses',
    meta: {
      icon: 'list-ul', title: 'Expenses'
    },
    component: () => import(/* webpackChunkName: "expenses" */ '../pages/expenses/ExpensesList')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login'
    },
    component: () => import(/* webpackChunkName: "login" */ '../pages/login/Login')
  },
  {
    path: '/signup',
    name: 'signup',
    meta: {
      title: 'signup'
    },
    component: () => import(/* webpackChunkName: "signup" */ '../pages/signup/signup')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - Yenom`
  if (!window.uid && to.name !== 'login' && to.name !== 'signup') {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
