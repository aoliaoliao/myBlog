const articleController = require('../controller/atricleController')

module.exports = [{
        method: 'get',
        path: '/',
        handler: articleController.listArticle,
    },
    {
        method: 'get',
        path: '/list',
        handler: articleController.listArticle
    },
    {
        method: 'get',
        path: '/content',
        handler: articleController.detailArticle
    },
    {
        /*
         * 获取文章的首屏内容，包括作者信息，可供首屏展示的文章内容
         * @param<id>: string  文章ID
         */
        method: 'get',
        path: '/content',
        handler: articleController.detailArticle
    },
    {
        /*
         * 获取文章的评论
         * @param<id>: string 文章ID
         * @param<start>: int 查询的起始位置
         * @param<num>: int 查询的数量·
         */
        method: 'get',
        path: '/comments',
        handler: articleController.detailArticle
    },

    {
        method: 'post',
        path: '/create',
        handler: articleController.addArticle,
        meta: {
            token: true
        }
    }
]