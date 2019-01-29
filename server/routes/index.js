const fs = require("fs");
const path = require('path')
const express = require('express');
const router = express.Router();
const {} = require('../middlewares/middle_token')

let routerMap = new Map()
let allFiles = fs.readdirSync(__dirname)
allFiles.forEach(file => {
    if (file !== 'index.js') {
        const model = require(path.posix.join(__dirname, file))
        const name = file.slice(0, -3)

        model.forEach(v => {
            const key = path.posix.join('/', name, v.path)
            routerMap.set(key, v)
        })
    }
})


router.use('*', function(req, res, next) {
    const path = req.baseUrl
    if (routerMap.has(path)) {
        const { meta = {} } = routerMap.get(path)
        if (meta.token) {
            // 验证
            validateToken(req, res, next)
        } else {
            next()
        }
    } else {
        res.send('路径不存在')
    }
})

routerMap.forEach((value, key, map) => {
    router[value.method](key, value.handler)
})

module.exports = router




// module.exports = app => {
//     // app.use( '/', ( req, res, next ) => {
//     //   res.render( 'index', {
//     //     title: 'Express'
//     //   } )
//     // } )
//     app.use('/user', require('./user'))
//     app.use('/article', require('./articles'))
//     app.use('/moment', require('./moment'))
//     app.use('/comment', require('./comment'))
//     // catch 404 and forward to error handler
//     app.use('*', function(req, res, next) {
//         next(createError(404))
//         // next()
//     })
// }