const jwt = require('jsonwebtoken')
const { formatResponse } = require("./index.js");

const cert = '123456'
const validePeriod = '30m' // token有效期
const cachePeriod = 10 * 1000 // 旧token的缓存期

/* 
 * 生成一个新的token
 */
function createToken(payload = {}) {
    const token = jwt.sign(payload, cert, {
        expiresIn: validePeriod
    })
    return token
}

/* 
 * 获取token中的负载数据
 */
function getTokenData(req) {
    let token = req.get('authorization')
    if (!token) {
        return null
    }

    const token_tmp = token.split(' ')

    if (token_tmp.length === 2) {
        token = token_tmp[1]
    } else if (token_tmp.length === 1) {
        token = token_tmp[0]
    } else {
        token = null
    }
    return token
}

function setFailedResponse(res) {
    res.status(401).send('invalid token')
}

/* 
 * 验证token是否在有效期内
 */
function validateToken(req, res, next) {
    let token = getTokenData(req)

    if (!token) {
        setFailedResponse(res)
        return
    }

    jwt.verify(token, cert, function(err, decoded) {
        if (err) {
            setFailedResponse(res)
        } else {
            const time_expired = (decoded.exp || 0) * 1000 // 过期时间

            if (time_expired - cachePeriod < Date.now()) {
                res.append('Token-Warning', true)
            }
            next()
        }
    })

}

/* 
 *  在token将要过期的时候，重新生成token，以延长token的有效期
 */
function refreshToken(req, res, next) {
    let token = getTokenData(req)

    if (!token) {
        formatResponse(0, 'token刷新失败')
        return
    }

    jwt.verify(token, cert, function(err, decoded) {
        if (err) {
            formatResponse(0, 'token刷新失败')
        } else {
            const decoded = jwt.decode(token)
            delete decoded.iat
            delete decoded.exp

            formatResponse(1, createToken(decoded))
        }
    })
}

module.exports = {
    validateToken,
    refreshToken,
    createToken
}