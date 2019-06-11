/*
 *  根据sequelize建立数据库和其中的表
 */
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const NODE_ENV = ( process.env.NODE_ENV || '' ).trim()
const env = NODE_ENV === 'production' ? 'production' : 'development'
const dbConfig = require(path.join(__dirname, '..', 'conf'))['database']
const database = {}
const basename = path.basename(__filename)
const sequelize = new Sequelize(dbConfig[env])
// const sequelize = new Sequelize(dbConfig['production'])

console.log( 'env.split', env.split('') )

// 测试是否连接成功
sequelize
    .authenticate()
    .then((res) => console.log('Connection has been established successfully',res ))
    .catch(err => {
        console.error('Unable to connect to the database:', err)
        throw err
    })

fs.readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
        )
    })
    .forEach(file => {
        const model = sequelize['import'](path.join(__dirname, file))
        database[model.name] = model
    })

Object.keys(database).forEach(modelName => {
    if (database[modelName].associate) {
        database[modelName].associate(database)
    }
})

database.sequelize = sequelize
database.Sequelize = Sequelize

module.exports = database