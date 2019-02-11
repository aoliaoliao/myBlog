import Vue from 'vue'
import Vuex from 'vuex'
import { requireAll } from '../utils/tool'

Vue.use(Vuex)

const modules = requireAll(require.context('./modules', true, /\.js$/))

function getLocalToken() {
  const token = localStorage.getItem('token')
  return token
}


export default new Vuex.Store({
  state: {
    userId: '',
    token: getLocalToken()
  },
  mutations: {
    setUserId(state, id) {
      state.userId = id
    },
    setToken(state, token) {
      localStorage.setItem('token', token)
      state.token = token
    }
  },
  modules
})
