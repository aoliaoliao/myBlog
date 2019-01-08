const express = require('express')
const router = express.Router()
const commentController = require('../controller/commentController')

/*
 * 列出指定的评论
 * @param<articleId>: string 文章ID
 * @param<momentId>: string 动态ID
 * @param<start>: int 查询的起始位置
 * @param<num> : int 查询的数量·
 */
router.post('/list', commentController.listComments)

/*
 * 新建评论
 * @param<articleId>: string 文章ID
 * @param<momentId>: string 动态ID
 * @param<text>: string 评论内容  
 * @param<userId> : string 用户Id
 * @param<userName> : string 用户姓名
 * @param<parentCommentId> :  string 回复的上一条评论
 */
router.post('/create', commentController.createComment)





module.exports = router