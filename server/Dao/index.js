/* 
 *  根据sequelize建立数据库和其中的表
 */
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const dbConfig = require(path.join(__dirname, '..', 'conf'))['database'][env]
const database = {}
const basename = path.basename(__filename)
const sequelize = new Sequelize(dbConfig)
// 测试是否连接成功
sequelize.authenticate().then(
    () => console.log('Connection has been established successfully')
).catch((err) => {
    console.error('Unable to connect to the database:', err);
    throw err
})

fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
    })
    .forEach(file => {
        const model = sequelize['import'](path.join(__dirname, file))
        database[model.name] = model
    })

Object.keys(database).forEach(modelName => {
    if (database[modelName].associate) {
        database[modelName].associate(database);
    }
});

database.sequelize = sequelize
database.Sequelize = Sequelize

module.exports = database