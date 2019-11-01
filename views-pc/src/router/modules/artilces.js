const routers = [
  {
    path: '/article',
    name: 'article',
    meta: {
      keepAlive: true,
    },
    component: () => import( '../../views/article/articleList' )
  },
]

export default routers