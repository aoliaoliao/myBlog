const fs = require('fs')

const fsPromises = fs.promises
const articleModel = require('../../../Dao').Articles
const {
  formatResponse,
  createUUID,
  getFileExt,
  getFileDir
} = require('../../../utils')
const { articleConst } = require('../../../conf').gloableConst

function validateArticle(article) {
  let errMsg = ''
  const { name, author, articleAddress, summary } = article

  if (!articleAddress) {
    errMsg = '请上传文章'
    return errMsg
  }

  const ext = getFileExt(articleAddress.name)

  if (articleConst.articleTypes.indexOf(ext) === -1) {
    errMsg = '暂时只接受 .md 或 .html 格式的文章'
  } else if (name.length === 0) {
    errMsg = '文章标题不可为空'
  } else if (name.length > articleConst.nameLength) {
    errMsg = '文章标题不可超过50个字'
  } else if (!author) {
    errMsg = '文章作者不可为空'
  } else if (summary.length > articleConst.summaryLength) {
    errMsg = '文章简介最多300个字符'
  } else {
  }
  return errMsg
}

function formatRequest(req) {
  const { fields, files } = req.formData
  const {
    name = '',
    author = '',
    summary = '',
    isPrivate = 1,
    isComment = 1
  } = fields
  const { articleAddress = {}, summaryImage = {} } = files

  return {
    name,
    author,
    summary,
    articleAddress,
    summaryImage,
    isPrivate,
    isComment
  }
}

async function formatModelData(article) {
  if (article.summary.length === 0) {
    // TODO： 读取文章内容并截取最多300个字符
    article.summary = ''
  }

  if (article.summaryImage) {
    const { path } = article.summaryImage
    article.summaryImage = path
  } else {
    // TODO： 读取文章内容并选择第一张合规的图片（类似微信分享）
    article.summaryImage = ''
  }
  if (article.articleAddress) {
    const { path } = article.articleAddress
    article.articleAddress = path
  }

  article.id = createUUID()
  return article
}

// 删除已储存的文章和图片
function deleteLocalFile({ articleAddress = '', summaryImage = '' }) {
  if (articleAddress) {
    fsPromises.unlink(articleAddress)
  }
  if (summaryImage) {
    fsPromises.unlink(summaryImage)
  }
}

module.exports = async function(req, res, next) {
  let content = { name: '', articleAddress: '', author: '' }
  content = formatRequest(req)

  const valid = validateArticle(content)
  if (valid.length > 0) {
    res.send(formatResponse(0, valid))
    deleteLocalFile({
      articleAddress: content.articleAddress.path,
      summaryImage: content.summaryImage.path
    })
    return
  }

  content = await formatModelData(content)

  articleModel
    .create(content)
    .then(rt => {
      res.send(formatResponse(1, '发表成功'))
    })
    .catch(err => {
      console.log('article发表失败，', err)
      res.send(formatResponse(0, '发表失败'))
      deleteLocalFile({
        articleAddress: content.articleAddress,
        summaryImage: content.summaryImage
      })
    })
}
