import $http from './http'

export default {
  addUser: params => $http('', 'post', params)
}
