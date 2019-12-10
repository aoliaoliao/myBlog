import { getUserInfo } from '@/API'

let state = {
  user: {}
}

let mutations = {
  setUserMsg(state, msg = {}) {
    state.user = Object.assign(state.user, msg)
  }
}

let actions = {
  getUserInfo({ commit }, param) {
    getUserInfo(param).then(res => {
      let { rt } = res
      commit('setUserMsg', rt)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
