var express = require( 'express' );
var router = express.Router();
const userModel = require( '../controller/user' )

router.get( '/', userModel.addUser );

module.exports = router;