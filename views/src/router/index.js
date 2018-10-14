import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../pages/home')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/login')
    }
  ]
})