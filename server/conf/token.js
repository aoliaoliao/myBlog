const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

const payload = {
    user: '奥利奥'
}

const cert = '123456'

const token = jwt.sign(payload, 'cert');

module.exports = cert