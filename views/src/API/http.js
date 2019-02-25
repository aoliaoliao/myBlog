import axios from 'axios'
import { Toast } from 'mint-ui'
import store from '../vuex/index'
import router from '../router'

const MAX_TRY_TOKEN_REQUEST = 2
let curTryTokenRequest = 0

// let baseURL = 'https://easy-mock.com/mock/5bc440f3f8cdf063243f379b/views/'
// let baseURL = 'http://localhost:3000/'
let baseURL = 'http://192.168.0.106:3000/'
// let baseURL = 'http://192.168.188.163:3000/'
// let baseURL = 'http://47.101.150.40:3000/'


async function doRequest(error) {
  // await store.dispatch('replaceAccessToken')

  await store.dispatch('replaceAccessToken')

  let { config } = error.response
  const { state } = store
  config.headers.authorization = state.token || ''
  const res = await axios.request(config)
  return res
}


function keepLogin(error) {
  return new Promise((resolve, reject) => {
    if (curTryTokenRequest < MAX_TRY_TOKEN_REQUEST && router.currentRoute.path !== '/login') {
      // 最多发送 MAX_TRY_TOKEN_REQUEST 次获取token的请求，如果超过则返回到登录页面，避免死循环
      doRequest(error).then(content => {
        curTryTokenRequest = 0
        // return data
        resolve(content)
      })
    } else {
      curTryTokenRequest = 0
      reject()
      // router.replace('/login')
    }
  })
}

axios.defaults.headers = {}
axios.defaults.timeout = 60 * 1000

axios.interceptors.request.use(
  config => {
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
    let { data = {} } = response
    return data
  },
  error => {
    let showToast = true
    if (error && error.response) {
      const { status } = error.response
      if (status === 401) {
        showToast = false
        return keepLogin(error).then(data => data).catch(() => {
          router.replace('/login')
        })

      } else {
        showToast = true
        error.message = '错误请求'
      }
    } else {
      error.message = '连接到服务器失败'
    }
    // 401 的错误不进行提示
    if (showToast) {
      Toast({
        message: error.message || '网络请求失败',
        duration: 2000
      })
    }
    return Promise.reject(error.response)
  }
)

export default {
  get: (url, params = {}) => axios.get(url, {
    params,
  }).then((data = { rt: undefined, cd: 0 }) => data).catch((err) => {
    console.log('getErr', err)
  }),

  post: (url, params, config) => axios.post(url, params, {
    headers: {
      // 'content-type': 'text/plain;charset=UTF-8'
      'content-type': 'application/json'
    },
    ...config
  }).then((data = {}) => data).catch(() => {
    // console.log(err)
  })
}
