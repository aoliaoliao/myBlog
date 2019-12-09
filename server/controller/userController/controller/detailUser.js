const { findUserById } = require('../utils')
const { formatResponse } = require('../../../utils')

// 查询用户详情
module.exports = async function detailUser(req, res, next) {
  let query = req.query || {}
  try {
    const result = await findUserById(query.id)
    if (result.id) {
      res.send(formatResponse(1, result.dataValues))
    } else {
      res.send(formatResponse(0, '未找到相关用户，请检查'))
    }
  } catch (error) {
    console.log('查看用户详情 ： err', error)
    res.send(formatResponse(0, '查询错误'))
  }
}
