const momentModel = require("../Dao").Moment
const formidable = require('formidable')
const fs = require('fs')
const { formatResponse, createUUID } = require("../utils")
const { momentConst, staticPublicPath } = require('../conf')['gloableConst']
const userId = '0120f580-f92a-11e8-8db7-791c9005fcff'

function validateMoment(moment) {
    let isValidate = true
    let message = '成功'
    const text = moment.text || ''
    const imgs = moment.imgs || []
    const video = moment.video
    if (text.length > momentConst.textMaxLength) {
        isValidate = false
        message = '字数需在200字以内'
    } else if (imgs.length > momentConst.ImgMaxCount) {
        isValidate = false
        message = '最多上传九张图片'
    } else if (video) {}

    return { isValidate, message }
}

function storeImgs(imgs = []) {
    if (!imgs.length) {
        return []
    }
    let localImgs = []
    imgs.forEach(img => {
        const date = new Date()
        const fileName = `${staticPublicPath}/${date.getFullYear()}/${date.getMonth() + 1 }/${date.getDate()}/${createUUID()}.png`
        img.lastModifiedDate = date

        img.name = fileName;
        localImgs.push(img)
    })

    return localImgs;

}

module.exports = {
    addMoment: async function(req, res, next) {
        const date = new Date()
        const form = new formidable.IncomingForm()
        // form.uploadDir = `${staticPublicPath}/${date.getFullYear()}_${date.getMonth() + 1 }/${date.getDate()}`
        form.uploadDir = `${staticPublicPath}`
        form.keepExtensions = true
        form.multiples = true
        form.parse(req, function(err, fields, files) {
            console.log('fields : ', fields)
            console.log('files : ', files)

            const text = fields.text
            const imgs = files.imgs

            let valid = validateMoment({
                text,
                imgs
            })

            if (!valid.isValidate) {
                res.send(formatResponse(0, result.message))
                return
            }

            let localImgs = []
            const targetDir = `${staticPublicPath}/${date.getFullYear()}_${date.getMonth() + 1 }/${date.getDate()}`

            if (!fs.existsSync(targetDir)) {
                console.log('fs.mkdir( targetDir)', await fs.mkdir(targetDir))
                await fs.mkdir(targetDir)
            }

            for (let i = 0, len = imgs.length; i < len; i++) {
                const img = imgs[i]
                // const fileType = img.type
                const targetFile = path.posix.join(targetDir, img.name)
                await fs.rename(img.path, targetFile).then(res => {
                    localImgs.push(targetFile)
                })
            }

            momentModel.create({
                text,
                userId: userId,
                imgs: localImgs.join(',')
            }).then(rt => {
                res.send(formatResponse(1, '发表成功'))
            }).catch(err => {
                res.send(formatResponse(0, err))
            })

        })

    }
}