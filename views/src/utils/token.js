import { replaceRefreshToken } from '@/API'

export const updateRefreshToken = () => {
  const lastedLogin = localStorage.getItem('lasted_login')
  let isUpdate = false

  if (lastedLogin) {
    const lastedLoginTimestamp = new Date(lastedLogin).setHours(0, 0, 0, 0)
    const now = new Date().setHours(0, 0, 0, 0)
    now - lastedLoginTimestamp > 0 ? isUpdate = true : isUpdate = false
  } else {
    isUpdate = true
  }

  if (isUpdate) {
    const token = localStorage.getItem('refresh_token')
    replaceRefreshToken({
      refreshToken: token
    }).then((res = {}) => {
      const { cd } = res
      if (cd === 1) {
        localStorage.setItem('refresh_token', res.rt)
        localStorage.setItem('lasted_login', Date.now())
      }
    })
  }
}

export default {}
