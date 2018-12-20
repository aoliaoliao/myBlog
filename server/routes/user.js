var express = require('express');
var router = express.Router();
const userController = require('../controller/userController')

// // 列出所有 User
router.get('/', userController.listUser);
router.get('/list', userController.listUser);

// 新增一个 user
router.post('/create', userController.addUser);

// // 删除一个User
// router.get( '/delete', userController.deleteUser );

// // 更改User的信息
// router.post( '/update', userController.updateUser );

// 查看User详情
router.get('/detail', userController.detailUser)



module.exports = router;