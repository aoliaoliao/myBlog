const CommentModel = require('../../../Dao').Comments
const { formatResponse } = require('../../../utils')

function validateParam(req, res) {
  let { text, articleId, momentId, userId, userName } = req.body
  let right = true

  if (!(userId || userName)) {
    res.send(formatResponse(0, '请先登录'))
    right = false
  } else if (!(text && text.length > 0)) {
    res.send(formatResponse(0, '评论内容不可为空'))
    right = false
  } else if (!(articleId || momentId)) {
    res.send(formatResponse(0, '评论未关联文章或动态'))
    right = false
  } else {
  }

  return right
}

module.exports = async function(req, res, next) {
  if (!validateParam(req, res)) {
    return
  }

  const {
    text,
    articleId,
    momentId,
    userId,
    userName,
    parentCommentId
  } = req.body

  CommentModel.create({
    text,
    articleId,
    momentId,
    userId,
    userName,
    parentCommentId
  })
    .then(rt => {
      res.send(formatResponse(1, '发表成功'))
    })
    .catch(err => {
      console.log('评论发表失败，', err)
      res.send(formatResponse(0, '评论发表失败，'))
    })
}
