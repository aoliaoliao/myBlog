var express = require( 'express' );
var router = express.Router();
const userModel = require( '../controller' ).user


// 新增一个 user
router.get( '/create', userModel.addUser );

// // 列出所有 User
// router.get( '/list', userModel.listUser );

// // 删除一个User
// router.get( '/delete', userModel.deleteUser );

// // 更改User的信息
// router.post( '/update', userModel.updateUser );



module.exports = router;