const fs = require( 'fs' )
const path = require( 'path' )
const basename = path.basename( __filename )
const config = {}

fs.readdirSync( __dirname )
  .filter( file => ( file !== basename ) && ( file.slice( -3 ) === '.js' ) )
  .forEach( file => {
    const model = require( path.join( __dirname, file ) )
    const name = file.slice( 0, -3 )
    config[ name ] = model
  } )

module.exports = config