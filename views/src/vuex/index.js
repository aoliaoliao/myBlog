import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import { requireAll } from '../utils/tool'
import { replaceAccessToken } from '@/API'

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
    replaceAccessToken({ commit }) {
      let localRefreshToken = localStorage.getItem('refresh_token') || ''
      return replaceAccessToken({
        refreshToken: localRefreshToken
      }).then(res => {
        if (res.cd === 1) {
          commit('setToken', res.rt)
        } else {
          commit('setToken', undefined)
          router.replace('/login')
        }
      }).catch(() => {
        router.replace('/login')
      })
    }
  },
  modules
})
