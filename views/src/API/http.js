import axios from 'axios'
import { Notification } from 'element-ui'

let curCancel
let cancelObj = {}
const { CancelToken } = axios
// let baseURL = 'https://easy-mock.com/mock/5bc440f3f8cdf063243f379b/views/'
// let baseURL = 'http://localhost:3000/'
let baseURL = 'http://47.101.150.40:3000/'

axios.defaults.headers = {}
axios.defaults.timeout = 10000

axios.interceptors.request.use(
  config => {
    // console.log( this )
    if (cancelObj[ config.url ]) {
      cancelObj[ config.url ]('request cancel')
    }
    cancelObj[ config.url ] = curCancel
    const protocol = config.url.split('://')[ 0 ]

    if (![ 'http', 'https' ].includes(protocol)) {
      config.url = baseURL + config.url
    }

    return config
  },
  error => Promise.reject(error)
)

axios.interceptors.response.use(
  response => {
    let { data } = response
    if (data.cd) {
      return response
    } else {
      Notification({
        type: 'warning',
        message: data.msg || '请检查并重试'
      })
      return Promise.reject(response)
    }
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
        default:
          break
      }
    } else {
      error.message = '连接到服务器失败'
    }
    Notification({
      type: 'warning',
      message: error.message || '网络请求失败'
    })
    return Promise.reject(error.response)
  }
)

export default {
  get: (url, params = {}) => axios
      .get(url, {
        params,
        cancelToken: new CancelToken(c => {
          curCancel = c
        })
      })
      .then(({ data }) => data),

  post: (url, params, config) => axios
      .post(url, params, {
        headers: {
          'content-type': 'text/plain;charset=UTF-8'
        },
        cancelToken: new CancelToken(c => {
          curCancel = c
        }),
        ...config
      })
      .then(({ data }) => data)
      .catch(err => {
        console.log(err)
      })
}
