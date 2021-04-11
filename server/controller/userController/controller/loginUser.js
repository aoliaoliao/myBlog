const userModel = require('"../../../Dao').Users
const {
  formatResponse,
  formatDBResult,
  cryptoPasswordByMD5
} = require('../../../utils')
const { createToken } = require('../../../utils/token')

function setWhereOption(account) {
  const keys = ['linkedEMail', 'nickName']

  const map = keys.map(v => {
    const one = {}
    one[v] = account
    return one
  })
  return map
}

module.exports = async function loginUser(req, res, next) {
  const { body } = req
  const { account, password } = body
  const { hostname, ip } = req

  if (!(account && password)) {
    res.send(formatResponse(0, '请输入账号和密码'))
    return
  }

  const where = setWhereOption(account)

  userModel
    .findAll({
      where: {
        $or: where
      }
    })
    .then(rt => {
      const value = formatDBResult(rt)
      if (value.length === 0) {
        res.send(formatResponse(0, '未找到对应用户'))
      } else {
        let user = null
        value.some(v => {
          if (v.password === cryptoPasswordByMD5(password)) {
            user = v
            return true
          }
          return false
        })

        if (user) {
          const accessToken = createToken({ userId: user.id })
          const refreshToken = createToken(
            {
              userId: user.id,
              hostname,
              ip
            },
            'refresh'
          )
          res.send(
            formatResponse(1, {
              userId: user.id,
              nickName: user.nickName,

              accessToken,
              refreshToken
            })
          )
        } else {
          res.send(formatResponse(0, '密码错误'))
        }
      }
    })
}
