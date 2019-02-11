var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var FileStreamRotator = require('file-stream-rotator')
var routers = require('./routes')
const { staticPublicPath } = require('./conf')['gloableConst']
const parseFormData = require('./middlewares/parseFormData')
const bodyParser = require('body-parser')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// 将日志写入本地文件
let logDirectory = path.join(__dirname, 'log')
let accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false,
    file_options: {
        encoding: 'utf-8'
    }
})

app.use(
    logger('dev', {
        stream: accessLogStream,
        immediate: true
    })
)

app.use(express.json())
app.use(
    express.urlencoded({
        extended: false
    })
)
app.use(cookieParser())

app.use(`/${staticPublicPath}`, express.static(path.join(__dirname, staticPublicPath)))

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Content-Length, Authorization, Accept, X-Requested-With '
    )
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')

    if (req.method == 'OPTIONS') {
        res.send(200)
        // 让options请求快速返回
    } else {
        next()
    }
})

// 格式化post请求参数(针对 ‘application/json’)
app.use(
    bodyParser.json({
        inflate: true, // 是否解压缩请求体
        limit: '100kb', // Controls the maximum request body size
        reviver: null, // 一般为一个函数，将被传递给 JSON.parse，作为其第二个参数, 可以用来修改解析生成的原始值，调用时机在parse函数返回之前。
        strict: true, // 为 true 时，只接受数组或对象，为false时，可接受任何 JSON.parse 可以解析的类型
        type: 'application/json' //  确定该中间件会作用于哪些MIME类型
    })
)
// 格式化post请求参数(针对 'application/x-www-form-urlencoded')
app.use(
    bodyParser.urlencoded({
        extended: false, //扩展模式
        limit: 2 * 1024 * 1024 //限制-2M
    })
)

// 格式化 FormData 请求
app.use(parseFormData)

// 路由
app.use(routers)

app.use((req, res, next) => {
    res.setTimeout(50000, () => {
        res.send('服务器响应超时')
    })
})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    // 除开发环境外，应该将错误记录在日志当中
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app