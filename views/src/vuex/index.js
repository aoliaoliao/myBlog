import Vue from 'vue'
import Vuex from 'vuex'
import { requireAll } from '../utils/tool'

Vue.use(Vuex)

const modules = requireAll(require.context('./modules', true, /\.js$/))

export default new Vuex.Store({
  state: {},
  mutations: {},
  modules
})
