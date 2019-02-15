const userController = require('../controller/userController')

const userRouters = [{
        method: 'get',
        path: '/',
        handler: userController.listUser,
        meta: {
            token: true
        }
    },
    {
        method: 'get',
        path: '/list',
        handler: userController.listUser,
        meta: {
            token: true
        }
    },
    {
        method: 'post',
        path: '/create',
        handler: userController.addUser,
        meta: {
            token: true
        }
    },
    {
        method: 'post',
        path: '/login',
        handler: userController.loginUser,
    },
    {
        method: 'get',
        path: '/detail',
        handler: userController.detailUser,
    },
    {
        method: 'get',
        path: '/replaceAccessToken',
        handler: userController.accessToken,
    },
    {
        method: 'get',
        path: '/replaceRefreshToken',
        handler: userController.refreshToken,
        meta: {
            token: true
        }
    }

]

module.exports = userRouters;