const routers = [
  {
    path: '/',
    name: '首页',
    components: ''
  },
  {
    path: '/article',
    name: 'article',
    meta: {
      keepAlive: true,
    },
    component: () => import( '../views/article/articleList' )
  },
]

export default routers