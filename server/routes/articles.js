const express = require('express');
const router = express.Router();
const articleController = require('../controller/atricleController')

router.get('/', articleController.listArticle);
router.get('/list', articleController.listArticle);
router.get('/detail', articleController.detailArticle);
router.post('/create', articleController.addArticle);
// router.get( '/delete', articlesModel.delete );
// router.post( '/update', articlesModel.update );
// router.get( '/refresh', articlesModel.refresh )


module.exports = router;