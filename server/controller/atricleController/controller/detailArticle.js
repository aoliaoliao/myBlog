const path = require('path')
const fs = require('fs')
const articleModel = require('../../../Dao').Article
const userModel = require('../../../Dao').User
const { formatResponse, formatDBResult } = require('../../../utils')

const articleAttributes = [
  'id',
  'author',
  'name',
  'updatedAt',
  'articleAddress'
]
const userAttributes = ['nickName', 'avatar', 'signature']
// const commentAttributes = ['userId', 'userName', 'parentCommentId', 'text', 'updatedAt']

function readArticleStream(path, func, res) {
  let content = ''

  let fReadStream = fs.createReadStream(path, {
    encoding: 'utf8',
    start: 0
  })

  fReadStream.on('data', chunk => {
    if (chunk) {
      content += chunk
    }
    // res.write(chunk)
  })

  fReadStream.on('close', () => {
    func(content)
    // res.end()
  })

  fReadStream.on('error', () => {})
}

function setQueryOption() {
  return {
    attributes: articleAttributes,
    include: [
      { model: userModel, as: 'articleAuthor', attributes: userAttributes }
    ]
  }
}

function queryArticleById(id) {
  return articleModel
    .findById(id, setQueryOption())
    .then(result => {
      const tmp = formatDBResult(result)
      return tmp
    })
    .catch(err => {
      console.log('err', err)
      return false
    })
}

module.exports = async function(req, res, next) {
  const { id } = req.query
  if (!id) {
    res.send(formatResponse(0, '未获取到文章ID'))
    return
  }

  let result = await queryArticleById(id)
  const articlePath = result.articleAddress || ''

  if (articlePath && fs.existsSync(articlePath)) {
    function setResponse(rt) {
      delete result.articleAddress
      if (rt === null) {
        res.send(formatResponse(0, '文章内容读取错误'))
      } else {
        result.article = rt
        res.send(formatResponse(1, result))
      }
    }
    readArticleStream(articlePath, setResponse, res)
  } else {
    res.send(formatResponse(0, '未找到相关文章'))
  }
}
