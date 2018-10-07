
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
var FileStreamRotator = require('file-stream-rotator')
var routers = require('./routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 将日志写入本地文件
let logDirectory = path.join(__dirname, 'log')
let accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
})
app.use(logger('dev', {
  stream: accessLogStream
}));


app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use( '/', indexRouter );
routers(app)

app.use((req, res, next) => {
  res.setTimeout(50000, () => {
    res.send('服务器响应超时');
  })
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // 除开发环境外，应该将错误记录在日志当中
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');


});

module.exports = app;