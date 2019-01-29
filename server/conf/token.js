const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

const payload = {
    user: '奥利奥'
}

const cert = '123456'

const token = jwt.sign(payload, 'cert');

const options = {
    algorithm: 'HS256',
    expiresIn: '30m',
}

module.exports = {
    cert: '123456',
    validePeriod: '30m', // token有效期
    cachePeriod: 10 * 1000 // 旧token的缓存期(失效前多少秒发出警告)
}