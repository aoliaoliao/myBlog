import $http from './http'

export const addUser = params => $http.post('user/addUser', params)
export const updateUser = params => $http.post('user/updateUser', params)
export const getUserInfo = params => $http.get('user/getUserInfo', params)
