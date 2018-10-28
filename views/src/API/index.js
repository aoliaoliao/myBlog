import $http from './http'

export const addUser = params => $http.post('user/addUser', params)
export const updateUser = params => $http.post('user/updateUser', params)
export const getUserInfo = params => $http.get('user/getUserInfo', params)

export const getArticleList = params => $http.post('article/list', params)
export const getArticleDetail = params => $http.get('article/getDetail', params)
export const getArticleComment = params =>
  $http.post('article/getComment', params)
export const postArticle = params => $http.post('article/createArticle', params)
export const postArticleComment = params =>
  $http.post('article/createComment', params)

export const getStatusList = params => $http.get('user/getStatusList', params)
export const getStatusDetail = params =>
  $http.get('user/getStatusDetail', params)
