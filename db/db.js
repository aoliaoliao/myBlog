var mysql = require( 'mysql' )

var con = mysql.createConnection( {
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'nodejs',
  post: '3306'
} )
console.log( mysql.escape.toString() )
con.connect( function ( err ) {
  if ( err ) throw err
  console.log( 'connected!' )
} )

let conPol = mysql.createPool( {

} )


con.on( 'error', function ( err ) {
  console.log( "[mysql error]", err );
} );