const { findUserById } = require('../utils')
const { formatResponse } = require('../../../utils')
const { decodedToken } = require('../../../utils/token')

// 查询用户详情
module.exports = async function detailSelf(req, res, next) {
  const { authorization } = req.headers
  if (!authorization) {
    res.send(formatResponse(0, '用户未登陆'))
    return
  }
  const token = decodedToken(authorization)
  try {
    const result = await findUserById(token.userId || '')
    if (result.id) {
      res.send(formatResponse(1, result.dataValues))
    } else {
      res.send(formatResponse(0, '未找到相关用户，请检查'))
    }
  } catch (error) {
    console.log('查看用户详情 ： err', error)
    res.send(formatResponse(0, error.message || '查询错误'))
  }
}
