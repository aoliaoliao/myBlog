const articleController = require('../controller/atricleController')

module.exports = [{
        method: 'get',
        path: '/',
        handler: articleController.listArticle,
    },
    {
        /**
         * 获取文章列表
         * @param { number } start - 查询的起始位置
         * @param { number } num - 查询的数量·
         */
        method: 'get',
        path: '/list',
        handler: articleController.listArticle
    },
    {
        /**
         * 获取文章的首屏内容，包括作者信息，可供首屏展示的文章内容
         * @param { string } id - 文章ID
         */
        method: 'get',
        path: '/content',
        handler: articleController.detailArticle
    },
    {
        /**
         * 获取文章的评论
         * @param { string } id - 文章ID
         * @param { number } start - 查询的起始位置
         * @param { number } num - 查询的数量·
         */
        method: 'get',
        path: '/comments',
        handler: articleController.detailArticle
    },

    {
        /**
         * 新建文章，FormData, 表单提交
         * @param { string } name - 文章标题
         * @param { string } author - 文章作者
         * @param { string } summary - 文章简介
         * @param { file } articleAddress - 文章的文本文件
         * @param { file } summaryImage - 文章的缩略图文件
         * @param { number } [isPrivate=1] - 是否仅自己可见,1：是，0：否,
         * @param { number } [isComment=1] - 是否允许评论， 1：是，0：否,
         */
        method: 'post',
        path: '/create',
        handler: articleController.addArticle,
        meta: {
            token: true
        }
    }
]