const { formatResponse } = require('../../../utils')
const { createToken, validateRefreshToken, tokenList, decodedToken } = require('../../../utils/token')

module.exports = async function refreshToken(req, res, next) {
    const { refreshToken } = req.query

    validateRefreshToken(refreshToken).then(decoded => {
        // 验证 refresh_token 是否来自相同的客户端
        if (decoded.ip !== ip || decoded.hostname !== hostname) {
            res.send(formatResponse(0, 'token已过期，请重新登录'))
            return
        }
        delete decoded.iat
        delete decoded.exp
        const newToken = createToken(decoded)
        res.send(formatResponse(1, newToken))
    }).catch(() => {
        res.send(formatResponse(0, 'token已过期，请重新登录'))
    })
}