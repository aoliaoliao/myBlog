import $http from './http'

export const addUser = params => $http.post('user/create', params)
export const updateUser = params => $http.post('user/updateUser', params)
export const getUserInfo = params => $http.get('user/detail', params)

export const getArticleList = params => $http.get('article/list', params)
export const getArticleDetail = params => $http.get('article/content', params)
export const getArticleComment = params => $http.get('article/getComment', params)
export const postArticle = params => $http.post('article/createArticle', params)
export const updateArticle = params => $http.post('article/updateArticle', params)
export const postArticleComment = params => $http.post('article/createComment', params)

export const getMomentList = params => $http.get('moment/list', params)
export const getMomentDetail = params => $http.get('moment/detail', params)
export const createMoment = params => $http.post('moment/create', params, {
    headers: {
        'Content-type': 'multipart/form-data'
    }
})
