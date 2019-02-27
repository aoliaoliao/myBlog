const momentModel = require('../../../Dao').Moments
const fs = require('fs')
const util = require('util')
const { formatResponse } = require('../../../utils')
const { momentConst } = require('../../../conf')['gloableConst']
const userId = '0120f580-f92a-11e8-8db7-791c9005fcff'

// 请求内容的验证
function validateMoment(moment) {
    let message = ''
    const text = moment.text || ''
    const imgs = moment.imgs || []
    const video = moment.video

    if (text.length === 0 && imgs.length === 0) {
        message = '动态内容不允许为空'
    } else if (text.length > momentConst.textMaxLength) {
        message = '字数需在200字以内'
    } else if (imgs.length > momentConst.imgMaxCount) {
        message = '最多上传九张图片'
    } else if (video) {}

    imgs.some(img => {
        let right_mime = !momentConst.imgMIMeTypes.includes(img.type)
        if (right_mime) {
            message = `只接受${momentConst.imgMIMeTypes.join(' ')}类型的图片`
        }
        return right_mime
    })

    return message
}

// 格式化新增moment的请求
function formatRequest(req) {
    let { fields, files } = req.formData
    const text = fields.text
    const imgs = Array.isArray(files.imgs) ?
        files.imgs :
        files.imgs ? [files.imgs] : []
    return { text, imgs }
}

module.exports = async function(req, res, next) {
    let content = { imgs: [], text: '' }
    content = formatRequest(req)

    const localImgs = content.imgs.map(img => img.path)
    let valid = validateMoment(content)
    if (valid.length > 0) {
        res.send(formatResponse(0, valid))
        // 删除已储存的图片
        localImgs.forEach(img => {
            fs.unlink(img)
        })
        return
    }

    momentModel.create({
        text: content.text,
        userId: userId,
        imgs: localImgs.join(',')
    }).then(rt => {
        res.send(formatResponse(1, '发表成功'))
    }).catch(err => {
        res.send(formatResponse(0, '发表失败'))
        // 删除已储存的图片
        localImgs.forEach(img => {
            fs.unlink(img)
        })
    })
}