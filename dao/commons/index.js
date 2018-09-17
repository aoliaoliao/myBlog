import {
  database
} from '/conf'

let mysql = require( 'mysql' )

export let pool = mysql.createPool( {
  ...database,
  connectionLimit: 10
} )