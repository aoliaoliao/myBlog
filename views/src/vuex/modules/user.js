import { getUserInfo } from '@/API'

let state = {
  user: {
  },
  userId: '',
  avatar: '',
  nickname: '',
  signature: ''
}

let mutations = {
  setUserMsg( state, msg = {} ) {
    state.user = Object.assign( state.user, msg )
  },
  setUserAvatar( state, avatar = '' ) {
    state.user.avatar = avatar
  },
  setUserNickname( state, nickname = '' ) {
    state.user.nickname = nickname
  },
  setUserSignature( state, signature = '' ) {
    state.user.signature = signature
  },
  setUserId( state, id ) {
    state.user.id = id
  }
}

let actions = {
  getUserInfo( { commit }, param ) {
    getUserInfo( param ).then( res => {
      let { rt } = res
      commit( 'setUserMsg', rt )
    } )
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
