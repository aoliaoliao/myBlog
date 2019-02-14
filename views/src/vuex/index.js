import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import { requireAll } from '../utils/tool'
import { refreshToken } from '@/API'

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
    },
  },
  actions: {
    refreshToken({ commit }) {
      let localRefreshToken = localStorage.getItem('refresh_token') || ''
      refreshToken({
        refreshToken: localRefreshToken
      }).then(res => {
        if (res.cd === 0) {
          commit('setToken', undefined)
          router.replace('/login')
        } else {
          commit('setToken', res.rt)
        }
      }).catch(() => {
        router.replace('/login')
      })
    }
  },
  modules
})
