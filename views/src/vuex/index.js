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

function getLocalUserId() {
  return localStorage.getItem('user-id') || ''
}

function getLocalUserName() {
  return localStorage.getItem('user-name') || ''
}

export default new Vuex.Store({
  state: {
    userId: getLocalUserId(),
    userName: getLocalUserName(),
    token: getLocalToken()
  },
  mutations: {
    setUserId(state, id) {
      if (id) {
        localStorage.setItem('user-id', id)
      } else {
        localStorage.removeItem('user-id')
      }
      state.userId = id
    },
    setUserName(state, name) {
      if (name) {
        localStorage.setItem('user-name', name)
      } else {
        localStorage.removeItem('user-name')
      }
      state.userName = name
    },
    setToken(state, token) {
      if (token) {
        localStorage.setItem('token', token)
      } else {
        localStorage.removeItem('token')
      }
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
