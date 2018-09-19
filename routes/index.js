module.default = function ( app ) {
  app.use( '/', ( req, res, next ) => {
    res.render( 'index', {
      title: 'Express'
    } )
  } )
  app.use( '/user', require( './user' ) )
}