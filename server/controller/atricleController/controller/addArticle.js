const path = require('path')
const formidable = require('formidable')
const validator = require('validator')
const fs = require('fs')
const fsPromises = fs.promises;
const articleModel = require("../../../Dao").Article;
const { formatResponse, createUUID, getFileExt } = require("../../../utils");
const { staticPublicPath, articleConst } = require('../../../conf')['gloableConst']

const userId = '0120f580-f92a-11e8-8db7-791c9005fcff'

function validateArticle(article) {
    let errMsg = ''
    let { name, author, articleAddress, summary } = article

    if (!articleAddress) {
        errMsg = '请上传文章'
        return errMsg
    }

    let ext = getFileExt(articleAddress.name)

    if (articleConst.articleTypes.indexOf(ext) === -1) {
        errMsg = '暂时只接受 .md 或 .html 格式的文章'
    } else if (name.length === 0) {
        errMsg = '文章标题不可为空'
    } else if (name.length > articleConst.nameLength) {
        errMsg = '文章标题不可超过50个字'
    } else if (!author) {
        errMsg = '文章作者不可为空'
    } else if (!validator.isUUID(author)) {
        errMsg = '请先登录'
    } else if (summary.length > articleConst.summaryLength) {
        errMsg = '文章简介最多300个字符'
    } else {}
    return errMsg;
}




// 图片存储的目标位置
async function createTargetDir() {
    const date = new Date()
    targetDir = `${staticPublicPath}/articles/${date.getFullYear()}_${date.getMonth() + 1}/${date.getDate()}/`

    if (!fs.existsSync(targetDir)) {
        try {
            await fsPromises.mkdir(targetDir, {
                recursive: true
            })
        } catch (error) {
            console.log(` ${date} : article: createTargetDir: 新建文件夹出错 : ${error}。
              正确路径应该为：${targetDir},
              当前暂存路径为：${staticPublicPath}
              `)
            targetDir = `${staticPublicPath}/`
        }
    }
    return targetDir
}

function resetFileName(file, preDir, name) {

}

async function formatRequest(req) {
    const form = new formidable.IncomingForm()
    form.uploadDir = await createTargetDir()
    form.keepExtensions = true
    form.multiples = true
    return new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
            if (err) {
                reject(err)
                throw err
            }

            let { name = '', author = '', summary = '', isPrivate = 1, isComment = 1 } = fields
            let { articleAddress = '', summaryImage = '' } = files

            // if ( articleAddress ) {
            //   resetFileName( articleAddress, form.uploadDir, name )
            // }
            // if ( summaryImage ) {

            // }

            // // 将图片和文章重命名
            // const uuid = createUUID()
            // let articlePath = form.uploadDir + name + uuid + getFileExt(articleAddress.name)
            // let summaryImgPath = form.uploadDir + name + uuid + getFileExt(summaryImage.name)

            // try {
            //     await Promise.all([fsPromises.rename(articleAddress.path, articlePath), fsPromises.rename1(summaryImage.path, summaryImgPath)])
            // } catch (error) {
            //     articlePath = articleAddress.path
            //     summaryImgPath = summaryImage.path
            // }

            resolve({ name, author, summary, articleAddress, summaryImage, isPrivate, isComment })
        })
    })
}

function formatModelData(article) {
    if (article.summary.length === 0) {
        // TODO： 读取文章内容并截取最多300个字符
        article.summary = ''
    }
    if (!article.summaryImage) {
        // TODO： 读取文章内容并选择第一张合规的图片（类似微信分享）
        article.summaryImage = ''
    }
    delete article.id
    return article
}

function deleteLocalFile({ articleAddress = '', summaryImage = '' }) {
    // 删除已储存的文章和图片
    if (articleAddress) {
        fsPromises.unlink(articleAddress)
    }
    if (summaryImage) {
        fsPromises.unlink(summaryImage)
    }
}

module.exports = async function(req, res, next) {
    let content = { name: '', articleAddress: '', author: '', }
    try {
        content = await formatRequest(req)
    } catch (error) {
        res.send(formatRequest(0, error))
        return
    }

    let valid = validateArticle(content)
    if (valid.length > 0) {
        res.send(formatResponse(0, valid))
        // 删除已储存的文章和图片
        deleteLocalFile({
            articleAddress: content.articleAddress.path,
            summaryImage: content.summaryImage.path
        })
        return
    }

    content = formatModelData(content)

    articleModel.create(content).then(rt => {
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