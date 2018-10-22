// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vueLazy from 'vue-lazyload'
import App from './App'
import router from './router'
import './libs/elementUI'

import http from './API/http'
import store from './vuex'
import '@/assets/font/iconfont.js'
import '@/assets/styles/globalStyles.styl'

Vue.prototype.$http = http
Vue.use(vueLazy)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
