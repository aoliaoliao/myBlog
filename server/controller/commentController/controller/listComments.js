const CommentModel = require('../../../Dao').Comment
const { formatResponse } = require('../../../utils')

const commentAttributes = [
    'userId',
    'userName',
    'parentCommentId',
    'text',
    'id',
    'createdAt'
]

// 设置查询对象中的where条件
function setFindWhere(articleId, momentId) {
    const where = {}
    if (momentId) {
        where.momentId = momentId
    } else if (articleId) {
        where.articleId = articleId
    }
    return where
}

function createCommentOption(limit, offset, where) {
    return {
        attributes: commentAttributes,
        limit: limit,
        offset: offset,
        order: [
            ['createdAt', 'ASC']
        ],
        where
    }
}

// 对查询结果的格式化，尤其是父子关系的评论
function formatQueryResult(results) {
    let commentUser = {}
    const comments = []
    results.forEach(({ dataValues }) => {
        if (!dataValues.parentCommentId) {
            commentUser[dataValues.id] = {
                userName: dataValues.userName,
                userId: dataValues.userId
            }
        } else {
            dataValues.parentCommentUserName = commentUser[dataValues.parentCommentId].userName
            dataValues.parentCommentUserId = commentUser[dataValues.parentCommentId].userId
        }
        comments.push(dataValues)
    })

    return comments
}

async function listComments(option) {
    return CommentModel.findAndCount(option)
        .then(result => {
            return result
        })
        .catch(err => {})
}

module.exports = async function(req, res, next) {
    let end = false
    const { num, start, articleId = '', momentId = '' } = req.query
    const where = setFindWhere(articleId, momentId)
    try {
        const result = await listComments(createCommentOption(num, start, where))
        const list = formatQueryResult(result.rows)

        if (result.count < num + start) {
            end = true
        }
        res.send(
            formatResponse(1, {
                end,
                list
            })
        )
    } catch (error) {
        res.send(formatResponse(0, '查询错误，请重试'))
    }
}