import Vue from 'vue'
import Router from 'vue-router'

Vue.use( Router )

export default new Router( {
  routes: [ {
    path: '/',
    redirect: '/articles'
  },
  {
    path: '/publish/moment',
    name: 'createMoment',
    component: () => import( '../pages/create/CreateMoment' )
  },
  {
    path: '/publish/article',
    name: 'createArticle',
    component: () => import( '../pages/create/CreateArticle' )
  },
  {
    path: '/articles',
    name: 'article',
    meta: {
      keepAlive: true
    },
    component: () => import( '../pages/article/ArticleList' )
  },
  {
    path: '/article/:id',
    name: 'article',
    component: () => import( '../pages/article/ArticleDetail' )
  },
  {
    path: '/moments',
    name: 'moments',
    meta: {
      keepAlive: true
    },
    component: () => import( '../pages/moment/MomentList' )
  },
  {
    path: '/my',
    name: 'my',
    meta: {
      keepAlive: true
    },
    component: () => import( '../pages/my/Index' )
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../pages/login' )
  },
  {
    path: '/register',
    name: 'register',
    component: () => import( '../pages/login/AppRegister' )
  },
  {
    path: '*',
    component: () => import( '../pages/404' )
  }
  ]
} )
