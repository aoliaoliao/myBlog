const express = require('express')
const router = express.Router()
const commentController = require('../controller/commentController')

/*
 * 列出指定的评论
 * @param<type>: int 评论类型。0：文章，1：动态
 * @param<id> : string 指定的文章或动态的ID
 * @param<start>: int 查询的起始位置
 * @param<num> : int 查询的数量·
 */
router.post('/list', commentController.listComments)

module.exports = router
