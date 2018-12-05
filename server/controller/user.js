const userModel = require("../Dao").User
const {
    formatResponse,
    cryptoPasswordByMD5
} = require("../utils")


function validateNickName(res, nickName) {
    let msg
    if (typeof nickName === 'undefined') {
        msg = '用户昵称不可为空'
    } else if (nickName.length < 2 || nickName.length > 10) {
        msg = '用户昵称的长度为2到10个字符'
    } else {}
    if (msg) {
        res.send(formatResponse(0, msg))
        return false
    }
    return true
}

function validatePwd(res, pwd) {
    let msg
    let regex = /^.*(?=.{9,})(?=.*\d)(?=.*[a-z]).*$/

    if (typeof pwd === 'undefined') {
        msg = '密码不可为空'
    } else if (!regex.test(pwd)) {
        msg = '密码长度不少于9位，必须包含字母和数字'
    }

    if (msg) {
        res.send(formatResponse(0, msg))
        return false
    }
    return true
}

function validateEmail(res, email) {
    let msg
    let regex = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+.)+[A-Za-z]{2,14}/g

    if (typeof email === 'undefined') {
        msg = '邮箱不可为空'
    } else if (!regex.test(email)) {
        msg = '请输入正确的邮箱格式'
    }

    if (msg) {
        res.send(formatResponse(0, msg))
        return false
    }
    return true
}

function validateUser(res, user) {
    try {
        let validate = validateNickName(res, user.nickName) &&
            validatePwd(res, user.password) &&
            validateEmail(res, user.email)

        return validate

    } catch (error) {
        console.log('error', error)
        res.send(formatResponse(0, error))
    }
}

module.exports = {
    validateUser(req, res, next) {
        if (validateUser(res, req.body)) {
            res.send(formatResponse(1))
        }
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

    // 批量新增用户
    branchAddUser(req, res, next) {
        let body = req.body

        userModel.bulkCreate(body, {
            logging: true
        }).then(rt => {
            res.send(formatResponse(1, rt))
        }).catch(err => {
            console.log(err)
            res.send(formatResponse(1, err))
        })
    },

    // 查询所有用户
    listUser(req, res, next) {
        let query = req.query;
        userModel.findAll({
            where: query
        }).then(results => {
            const rt = []
            results.forEach(result => {
                rt.push(result.dataValues)
            });
            res.send(formatResponse(1, rt))
        }).catch(err => {
            console.log(err)
            res.send(formatResponse(0, '查询错误'))
        })
    },
    // 查询用户详情
    detailUser(req, res, next) {
        let query = req.query
        userModel.findOneById({
            where: query
        }).then(results => {
            if (results.length > 0) {
                res.send(formatResponse(1, results))
            } else {
                res.send(formatResponse(0, '未找到相关用户，请检查'))
            }
        }).catch(err => {
            console.log('查看用户详情 ： err', err)
            res.send(formatResponse(0, '查询错误'))
        })
    }

};