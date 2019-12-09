const { formatResponse, formatDBResult } = require('../utils/index')

function globalFunction(req, res, next) {
  global.$blog = {}
  global.$blog.formatResponse = formatResponse
  global.$blog.formatDBResult = formatDBResult
  next()
}

module.exports = globalFunction
