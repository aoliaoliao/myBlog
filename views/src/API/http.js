import axios from 'axios'

let curCancel
let cancelObj = {}
const CancelToken = axios.cancelToken

axios.interceptors.request.use(
  config => {
    if (cancelObj[config.url]) {
      cancelObj[config.url]('request cancel')
    }
    cancelObj[config.url] = curCancel
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '错误请求'
          break
        case 401:
          error.message = '错误请求'
          break
        case 403:
          error.message = '错误请求'
          break
        case 404:
          error.message = '错误请求'
          break
        case 405:
          error.message = '错误请求'
          break
        case 408:
          error.message = '错误请求'
          break
        case 500:
          error.message = '错误请求'
          break
        case 501:
          error.message = '错误请求'
          break
        case 502:
          error.message = '错误请求'
          break
        case 503:
          error.message = '错误请求'
          break
        case 504:
          error.message = '错误请求'
          break
        case 505:
          error.message = '错误请求'
          break
      }
    } else {
      error.message = '连接到服务器失败'
    }
    return Promise.reject(error.response)
  }
)

axios.defaults.baseURL = ''
axios.defaults.headers = {}
axios.defaults.timeout = 10000

export default {
  put: (url, params) => {
    axios
      .get(url, {
        params: params,
        cancelToken: new CancelToken(c => {
          curCancel = c
        })
      })
      .then(res => {})
  },
  get: (url, params) => {
    return axios
      .get(url, {
        params: params,
        cancelToken: new CancelToken(c => {
          curCancel = c
        })
      })
      .then(res => {
        return res
      })
  },
  post: (url, params) => {
    return axios
      .post(url, {
        params: params,
        cancelToken: new CancelToken(c => {
          curCancel = c
        })
      })
      .then(res => {
        return res
      })
  }
}
