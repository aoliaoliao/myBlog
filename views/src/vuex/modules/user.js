import { getUserInfo } from '@/API'

let state = {
  avatar: '',
  nickname: '',
  signature: ''
}

let mutations = {
  setUserAvatar(state, avatar = '') {
    state.avatar = avatar
  },
  setUserNickname(state, nickname = '') {
    state.nickname = nickname
  },
  setUserSignature(state, signature = '') {
    state.signature = signature
  }
}

let actions = {
  getUserInfo({ commit }, param) {
    getUserInfo(param).then(res => {
      let { rt } = res
      commit('setUserAvatar', rt.avatar)
      commit('setUserNickname', rt.nickname)
      commit('setUserSignature', rt.signature)

    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
