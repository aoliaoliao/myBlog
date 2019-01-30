const userController = require('../controller/userController')
const { refreshToken } = require('../utils/token')

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
        path: '/refreshToken',
        handler: refreshToken,
    }

]

module.exports = userRouters;