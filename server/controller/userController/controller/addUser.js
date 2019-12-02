const userModel = require('"../../../Dao').Users
const { formatResponse, cryptoPasswordByMD5, createUUID } = require('../../../utils')

function validateNickName(nickName) {
    let msg
    if (typeof nickName === 'undefined') {
        msg = '用户昵称不可为空'
    } else if (nickName.length < 2 || nickName.length > 10) {
        msg = '用户昵称的长度为2到10个字符'
    } else {}
    return msg
}

function validatePwd(pwd) {
    let msg
    let regex = /^.*(?=.{9,})(?=.*\d)(?=.*[a-z]).*$/

    if (typeof pwd === 'undefined') {
        msg = '密码不可为空'
    } else if (!regex.test(pwd)) {
        msg = '密码长度不少于9位，必须包含字母和数字'
    }

    return msg
}

function validateEmail(email) {
    let msg
    let regex = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+.)+[A-Za-z]{2,14}/g

    if (typeof email === 'undefined') {
        msg = '邮箱不可为空'
    } else if (!regex.test(email)) {
        msg = '请输入正确的邮箱格式'
    }
    return msg
}

function validateUser( user) {
  let validate = validateNickName(user.nickName) || validatePwd( user.password) || validateEmail( user.linkedEMail)

  return validate
}

module.exports = async function addUser(req, res, next) {
    let body = req.body
    let msg = validateUser( body)
    if ( !msg ) {
        body.password = cryptoPasswordByMD5(body.password)
        body.id = createUUID()
        userModel.create(body)
            .then(rt => {
                console.log('新增单个用户: rt', rt)
                res.send(formatResponse(1, rt.id))
            })
            .catch(err => {
                console.log('新增单个用户: err', err)
                res.send(formatResponse(0, err.message))
            })
    } else {
        res.send(formatResponse(0, msg || '请填写正确的用户信息'))
    }
}