// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vueLazy from 'vue-lazyload'

import store from './vuex'
import router from './router'
import http from './API/http'
import App from './App'

import './libs/vuxUI'
import './libs/elementUI'
import '@/assets/font/iconfont.js'
import '@/assets/styles/globalStyles.styl'
import TheScroll from './components/TheScroll.vue'
import errorImg from './assets/images/blog_default.jpg'

Vue.component( TheScroll.name, TheScroll )
Vue.prototype.$http = http
Vue.use( vueLazy, {
  preLoad: 1.1, // 预加载的宽高比
  error: errorImg, // 图片加载失败时使用的图片源
  loading: errorImg, // 图片加载的路径
  attempt: 1, // 尝试加载次数
} )

/* eslint-disable no-new */
new Vue( {
  el: '#app',
  router,
  store,
  components: {
    App,
  },
  template: '<App/>',
} )
