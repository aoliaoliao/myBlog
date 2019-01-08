const CommentModel = require('../../../Dao').Comment
const { formatResponse } = require('../../../utils')



module.exports = async function(req, res, next) {
    let { text, articleId, momentId, userId, userName, parentCommentId } = req.query

    CommentModel.create({
            text,
            articleId,
            momentId,
            userId,
            userName,
            parentCommentId
        }).then(rt => {
            res.send(formatResponse(1, '发表成功'))
        })
        .catch(err => {
            console.log('评论发表失败，', err)
            res.send(formatResponse(0, '评论发表失败，'))
        })
}