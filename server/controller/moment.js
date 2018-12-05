const momentModel = require("../Dao").Moment
const { formatResponse } = require("../utils")
const momentConst = require('../conf')['gloableConst'].momentConst

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

module.exports = {
    addMoment(req, res, next) {
        let body = req.body
        let result = validateMoment(body)

        if (!result.isValidate) {
            res.send(formatResponse(0, result.message))
            return
        }

        momentModel.create(body).then(rt => {
            res.send(formatResponse(1, '发表成功'))
        }).catch(err => {
            res.send(formatResponse(0, '发表失败，请重试'))
        })

    },
    // 新增单个用户
    addUser(req, res, next) {
        let body = req.body
        if (validateUser(res, body)) {
            body.password = cryptoPasswordByMD5(body.password)
            userModel.create(body).then(rt => {
                console.log('新增单个用户: rt', rt)
                res.send(formatResponse(1, rt.id))
            }).catch(err => {
                console.log('新增单个用户: err', err)
                res.send(formatResponse(0, err.message))
            })
        }
    },
}