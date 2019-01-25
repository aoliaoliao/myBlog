const userModel = require('"../../../Dao').User
const { formatResponse, formatDBResult } = require("../../../utils");


function setWhereOption(account) {
    const keys = ['linkedEMail', 'nickName']

    let map = keys.map(v => {
        const one = {}
        one[v] = account
        return one
    })
    return map
}


module.exports = async function loginUser(req, res, next) {
    let body = req.body
    const { account, password } = body

    if (!(account && password)) {
        res.send(0, '请输入账号和密码')
        return
    }

    let where = setWhereOption(account)

    userModel.findAll({
        where
    }).then(res => {
        const value = formatDBResult(res)
        if (value.length) {
            res.send(formatResponse(0, '未找到对应用户'))
        } else {
            let user = null
            value.some(v => {
                if (v.password === cryptoPasswordByMD5(password)) {
                    user = v
                    return true
                }
                return false
            })

            if (user) {
                res.send(formatResponse(1, {
                    userId: user.id,
                    userName: user.nickName
                }))
            } else {
                res.send(formatResponse(0, '密码错误'))
            }
        }
    })

}