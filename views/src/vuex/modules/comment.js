import { getComments, createComments } from '@/API'

const state = {
  commentList: [],
  isEnd: false
}

const mutations = {
  setCommentEnd(state, end) {
    state.isEnd = end
  },
  addOneComment(state, comment = {}) {
    state.commentList.unshift(comment)
  },
  pushCommentList(state, list) {
    state.commentList = [ ...state.commentList, ...list ]
  }
}

const actions = {
  getCommentList({ commit }, param) {
    getComments(param).then(res => {
      if (res.cd) {
        const { rt } = res
        commit('setCommentEnd', rt.end)
        commit('pushCommentList', rt.list)
      }
    })
  },
  createOneComment({ commit, rootState }, { param = {}, parentComment = {} }) {
    const pComment = {
      text: param.text,
      userName: rootState.userName,
      createdAt: Date.now()
    }
    if (Object.keys(parentComment).length > 0) {
      const { userId, userName, id } = parentComment
      Object.assign(pComment, { parentCommentUserId: userId, parentCommentUserName: userName })
      param.parentCommentId = id || undefined
    }

    return createComments(param).then(res => {
      if (res && res.cd) {
        this.isShowInput = false
        commit('addOneComment', pComment)
      }
      return res.cd
    })
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
