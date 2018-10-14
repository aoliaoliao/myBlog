var createError = require('http-errors');

module.exports = (app) => {
  // app.use( '/', ( req, res, next ) => {
  //   res.render( 'index', {
  //     title: 'Express'
  //   } )
  // } )
  app.use('/user', require('./user'))
  app.use('/articles', require('./articles'))
  // catch 404 and forward to error handler
  app.use('*', function (req, res, next) {
    next(createError(404));
    // next()
  });



}