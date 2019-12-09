const likeModel = require('../../../Dao').Votes

module.exports = async function(req, res, next) {
  let { userId, momentId } = req.body

  if (!userId) {
    res.send($blog.formatResponse(0, '请先登录'))
    return
  }

  if (!momentId) {
    res.send($blog.formatResponse(0, '未关联动态内容'))
    return
  }

  likeModel
    .create({
      userId,
      momentId
    })
    .then(() => {
      res.send(formatResponse(1))
    })
    .catch(() => {
      res.send($blog.formatResponse(1))
    })
}
