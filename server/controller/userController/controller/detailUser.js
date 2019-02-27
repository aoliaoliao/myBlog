const userModel = require('"../../../Dao').Users
const { formatResponse } = require("../../../utils");



// 查询用户详情
module.exports = async function detailUser(req, res, next) {
    let query = req.query
    userModel.findById('0120f580-f92a-11e8-8db7-791c9005fcff', {
            attributes: ['id', 'nickName', 'avatar', 'signature', 'userHome']
        })
        .then(result => {
            if (result.id && result.id.length > 0) {
                res.send(formatResponse(1, result.dataValues))
            } else {
                res.send(formatResponse(0, '未找到相关用户，请检查'))
            }
        })
        .catch(err => {
            console.log('查看用户详情 ： err', err)
            res.send(formatResponse(0, '查询错误'))
        })
}