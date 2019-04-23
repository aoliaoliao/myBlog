import Vue from 'vue'
import Router from 'vue-router'

Vue.use( Router )

const scrollBehavior = ( to, from, savedPosition ) => {
  if ( savedPosition ) {
    return savedPosition
  }

}
const routes = [ {
  path: '/',
  redirect: '/home/articles',
},
{
  path: '/home',
  name: 'home',
  redirect: '/home/articles',
  component: () => import( '../pages/home/Index' ),
  children: [ {
    path: 'articles',
    name: 'articles',
    meta: {
      keepAlive: true,
    },
    component: () => import( '../pages/article/ArticleList' ),
  },
  {
    path: 'moments',
    name: 'moments',
    meta: {
      keepAlive: true,
    },
    component: () => import( '../pages/moment/MomentList' ),
  },
  {
    path: 'my',
    name: 'my',
    meta: {
      keepAlive: true,
    },
    component: () => import( '../pages/my/Index' ),
  },
  ],
},
{
  path: '/publish/moment',
  name: 'createMoment',
  component: () => import( '../pages/create/CreateMoment' ),
},
{
  path: '/publish/article',
  name: 'createArticle',
  component: () => import( '../pages/create/CreateArticle' ),
},

{
  path: '/article/:id',
  name: 'article',
  meta: {
    keepAlive: true,
  },
  component: () => import( '../pages/article/ArticleDetail' ),
},

{
  path: '/login',
  name: 'login',
  component: () => import( '../pages/login' ),
},
{
  path: '/register',
  name: 'register',
  component: () => import( '../pages/login/AppRegister' ),
},
{
  path: '*',
  component: () => import( '../pages/404' ),
},
]


const router = new Router( {
  routes,
  scrollBehavior
} )

export default router
