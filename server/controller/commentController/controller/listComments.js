const path = require('path')
const userModel = require('../../../Dao').User
const CommentModel = require('../../../Dao').Comment
const { formatResponse } = require('../../../utils')

const commentAttributes = [
  'userId',
  'userName',
  'parentCommentId',
  'text',
  'id',
  'updatedAt'
]
const userAttributes = ['nickName', 'avatar']

// 设置查询对象中的where条件
function setFindWhere(type, id) {
  const where = {}
  switch (type) {
    case 0:
      where.articleId = id
      break
    case 1:
      where.momentId = id
      break
  }
  return where
}

function createCommentOption(limit, offset, where) {
  return {
    attributes: commentAttributes,
    limit: limit,
    offset: offset,
    order: [['updatedAt', 'ASC']],
    where,
    include: [
      { model: userModel, as: 'commentAuthor', attributes: userAttributes }
    ]
  }
}

function formatQueryResult(results) {
  return results
}

async function listComments(option) {
  return CommentModel.findAndCount(option)
    .then(result => {
      return result
    })
    .catch(err => {})
}

module.exports = async function(req, res, next) {
  try {
    let end = false
    const { num, start, type, id } = req.param // type ：0 文章的评论, 1：动态的评论
    const where = setFindWhere(+type, id)
    const result = await listComments(createCommentOption(num, start, where))
    // TODO: 对查询结果的格式化，尤其是父子关系的评论
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
