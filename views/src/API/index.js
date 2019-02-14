import $http from './http'

export const refreshToken = params => $http.get('user/refreshToken', params)

export const addUser = params => $http.post('user/create', params)
export const getUserInfo = params => $http.get('user/detail', params)
export const loginUser = params => $http.post('user/login', params)

export const getArticleList = params => $http.get('article/list', params)
export const getArticleDetail = params => $http.get('article/content', params)

export const getMomentList = params => $http.get('moment/list', params)
export const createMoment = params => $http.post('moment/create', params, {
  headers: {
    'Content-type': 'multipart/form-data'
  }
})

export const getComments = params => $http.post('comment/list', params)
export const createComments = params => $http.post('comment/create', params)
