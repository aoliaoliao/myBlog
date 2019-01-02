const express = require('express');
const router = express.Router();
const articleController = require('../controller/atricleController')

router.get('/', articleController.listArticle);

router.get('/list', articleController.listArticle);
/* 
 * 获取文章的首屏内容，包括作者信息，可供首屏展示的文章内容
 * @param<id>: string  文章ID
 */
router.get('/summary', articleController.detailArticle);
/* 
 *  获取文章的具体内容
 * @param<id>: string  文章ID
 * @param<offset>: int 读取文章内容的起始位置
 */
router.get('/content', articleController.detailArticle);
/* 
 * 获取文章的评论
 * @param<id>: string 文章ID
 * @param<start>: int 查询的起始位置
 * @param<num>: int 查询的数量
 */
router.get('/comments', articleController.detailArticle);
/* 
 * 新增文章
 */
router.post('/create', articleController.addArticle);



// router.get( '/delete', articlesModel.delete );
// router.post( '/update', articlesModel.update );
// router.get( '/refresh', articlesModel.refresh )


module.exports = router;