const userModel = require('"../../../Dao').Users
const { formatResponse } = require('../../../utils')

module.exports = async function listUser(req, res, next) {
  const { query } = req
  userModel
    .findAll({
      where: query
    })
    .then(results => {
      const rt = []
      results.forEach(result => {
        rt.push(result.dataValues)
      })
      res.send(formatResponse(1, rt))
    })
    .catch(err => {
      console.log(err)
      res.send(formatResponse(0, '查询错误'))
    })
}
