import axios from 'axios'
import { Toast } from 'mint-ui'
import store from '../vuex/index'
import router from '../router'

let curCancel
let cancelObj = {}
const { CancelToken } = axios

// let baseURL = 'https://easy-mock.com/mock/5bc440f3f8cdf063243f379b/views/'
let baseURL = 'http://localhost:3000/'
// let baseURL = 'http://192.168.188.163:3000/'
// let baseURL = 'http://47.101.150.40:3000/'


async function doRequest(error) {
  await store.dispatch('refreshToken')

  let { config } = error.response
  config.headers.Authorization = store.token || ''

  const res = await axios.request(config)
  return res
}

axios.defaults.headers = {}
axios.defaults.timeout = 10 * 1000 * 6 * 10

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
    const { state } = store
    config.headers.authorization = state.token || ''

    return config
  },
  error => Promise.reject(error)
)

axios.interceptors.response.use(
  response => {
    if (response.headers[ 'token-warning' ] === 'true') {
      store.dispatch('refreshToken')
    }

    let { data = {} } = response
    return data
  },
  error => {
    if (error && error.response) {
      const { status } = error.response
      if (status === 401) {
        doRequest(error).then(content => {
          let { data = {} } = content
          return data
        })
        // store.commit('setToken', undefined)
        // router.replace('/login')
      } else {
        error.message = '错误请求'
      }
    } else {
      error.message = '连接到服务器失败'
    }
    Toast({
      message: error.message || '网络请求失败',
      duration: 2000
    })
    return Promise.reject(error.response)
  }
)

export default {
  get: (url, params = {}) => axios.get(url, {
    params,
    cancelToken: new CancelToken(c => {
      curCancel = c
    })
  }).then((data) => data).catch(err => {
    console.log(err)
  }),

  post: (url, params, config) => axios.post(url, params, {
    headers: {
      // 'content-type': 'text/plain;charset=UTF-8'
      'content-type': 'application/json'
    },
    cancelToken: new CancelToken(c => {
      curCancel = c
    }),
    ...config
  }).then((data) => data).catch(err => {
    console.log(err)
  })
}
