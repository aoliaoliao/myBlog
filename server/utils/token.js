const { refreshTokenPeriod, accessTokenPeriod } = require('../conf/gloableConst')
const jwt = require('jsonwebtoken')
const { formatResponse } = require("./index.js");

const cert = '123456'
const cachePeriod = 10 * 1000 // 旧token的缓存期，10秒
const tokenList = new Map() // 新旧token的列表

/* 
 * 生成一个新的token
 *
 * @param {Object} payload,
 * @param {String} type, 
 * @return { String } 
 */
function createToken(payload = {}, type) {
    let time = accessTokenPeriod
    switch (type) {
        case 'refresh':
            time = refreshTokenPeriod
            break;
        default:
            time = accessTokenPeriod
            break;
    }
    const token = jwt.sign(payload, cert, {
        expiresIn: time
    })
    return `Bears ${token}`
}

/* 
 * 获取token的主体内容
 */
function getTokenBody(token) {

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
function validateRefreshToken(token) {
    return new Promise((resolve, reject) => {
        if (!token) {
            reject('invalid token')
            return
        }
        token = getTokenBody(token)
        jwt.verify(token, cert, function(err, decoded) {
            if (err) {
                reject('invalid token')
            } else {
                resolve(decoded)
            }
        })
    })
}

// 验证access_token，为了处理并发请求有个10秒的缓存期
function validateAccessToken(req, res, next) {
    let token = getTokenBody(req.get('authorization'))

    if (!token) {
        setFailedResponse(res)
        return
    }
    jwt.verify(token, cert, function(err, decoded) {
        if (err) {
            setFailedResponse(res)
        } else {
            // 查看 tokenList 是否含有已更新过的 token 
            if (tokenList.has(token)) {
                let newToken = tokenList.get(token)
                const time_space = Date.now() - newToken.createToken
                if (time_space > 10 * 1000 && time_space < 0) {
                    req.headers.authorization = newToken.value
                } else {
                    tokenList.delete(token)
                }
            }
            next()
        }
    })

}

// 解码token，获取其中的载荷信息
function decodedToken(token) {
    token = getTokenBody(token)
    let data = jwt.decode(token)
    return data || {}
}


module.exports = {
    validateAccessToken,
    validateRefreshToken,
    createToken,
    tokenList,
    decodedToken
}