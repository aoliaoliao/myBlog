const express = require('express');
const router = express.Router();
const momentController = require('../controller/momentController')

// 新增一个 user
router.post('/create', momentController.addMoment); // 新增动态内容
router.get('/list', momentController.listMoment); // 获取动态列表

module.exports = router;