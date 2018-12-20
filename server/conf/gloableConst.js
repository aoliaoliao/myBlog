const env = process.env.NODE_ENV || 'development'

const staticNetPrefix = env.trim() === 'production' ? 'http://localhost:3000/' : 'http://localhost:3000/'

module.exports = {
    staticPublicPath: 'static', // 静态资源的本地目录
    staticNetPrefix: staticNetPrefix, // 静态资源的网络前缀
    momentConst: {
        textMaxLength: 200,
        imgMaxCount: 9,
        imgMIMeTypes: ['image/png', 'image/jpeg'],
    }
}