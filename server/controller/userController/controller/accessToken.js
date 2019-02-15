const { formatResponse } = require('../../../utils')
const { createToken, validateRefreshToken, tokenList, decodedToken } = require('../../../utils/token')

function setAccessTokenPayload(token) {
    const data = decodedToken(token)
    delete data.iat
    delete data.exp
    return data
}


// 刷新 access_token
module.exports = async function accessToken(req, res, next) {
    const { refreshToken } = req.query
    const { hostname, ip } = req
    const accessToken = req.get('authorization')

    // 验证 refresh_token 的有效期
    validateRefreshToken(refreshToken).then(decoded => {

        // 验证 refresh_token 是否来自相同的客户端
        if (decoded.ip !== ip || decoded.hostname !== hostname) {
            res.send(formatResponse(0, 'token已过期，请重新登录'))
            return
        }
        // 生成新的token
        const newAccessToken = createToken(setAccessTokenPayload(accessToken))
        // 新token添加到缓存列表
        tokenList.set(accessToken, {
            create: Date.now(),
            value: newAccessToken
        })

        res.send(formatResponse(1, newAccessToken))

    }).catch(err => {
        res.send(formatResponse(0, 'token已过期，请重新登录'))
    })


}