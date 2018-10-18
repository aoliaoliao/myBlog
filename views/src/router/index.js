import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [ {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () =>
        import('../pages/home')
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
        import('../pages/login/AppLogin')
  },
  {
    path: '/register',
    name: 'register',
    component: () =>
        import('../pages/login/AppRegister')
  },
  {
    path: '*',
    component: () =>
        import('../pages/404')
  }
  ]
})
