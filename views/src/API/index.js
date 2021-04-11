import $http from './http'
import store from '@/vuex/index'
import user from './models/user'

// const { userId, userName } = store.state  // 和 @/vuex/index 存在循环引用

export const replaceAccessToken = params => $http.get('/user/replaceAccessToken', params)
export const replaceRefreshToken = params => $http.get('/user/replaceRefreshToken', params)

export const addUser = params => $http.post('/user/create', params)
export const getUserInfo = params => $http.get('/user/detail', params)
export const loginUser = params => $http.post('/user/login', params)

export const getArticleList = params => $http.get('/article/list', params)
export const getArticleDetail = params => $http.get('/article/content', params)
export const createNewArticle = params =>
  $http.post('/article/create', params, {
    headers: {
      'Content-type': 'multipart/form-data'
    }
  })

export const getMomentList = params => $http.get('/moment/list', params)
export const likeMoment = params =>
  $http.post('/moment/like', {
    ...params,
    userId: store.state.userId
  })
export const unlikeMoment = params =>
  $http.post('/moment/unlike', {
    ...params,
    userId: store.state.userId
  })
export const createMoment = params =>
  $http.post('/moment/create', params, {
    headers: {
      'Content-type': 'multipart/form-data'
    }
  })

export const getComments = params => $http.post('/comment/list', params)
export const createComments = params =>
  $http.post('/comment/create', {
    ...params,
    userId: store.state.userId,
    userName: store.state.userName
  })

export default {
  user
}
