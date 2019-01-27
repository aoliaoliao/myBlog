let session = require('express-session')
// global.sessionStore = {}

let sessionConfig = {
  name: 'app',
  proxy: undefined,
  resave: false,
  rolling: false,
  saveUninitialized: false,
  secret: '123456',
  // store: global.sessionStore,
  unset: 'keep',
  cookie: {
    domain: '/',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30
  }
}

// TODO: 网站开启 https 之后开始使用
// if (process.env.NODE_ENV === 'production') {
//   app.set('trust proxy', 1) // trust first proxy
//   options.cookie.secure = true // serve secure cookies
// }

module.exports = sessionConfig
