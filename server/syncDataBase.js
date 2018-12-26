var minimist = require('minimist');
var args = minimist(process.argv.slice(2), {
    boolean: ['force']
});

let isForce = args.force
let tables = args['_']
let env = args.env

process.env.NODE_ENV = env

const database = require('./Dao')

if (tables) {
    // 获取Sequelize的实例
    const queryInterface = database.sequelize.getQueryInterface();

    tables.forEach(v => {
        // 查询该表所有的外键关系
        queryInterface.getForeignKeyReferencesForTable(v).then(res => {
            res.forEach(textrow => {
                // 删除指定表的指定约束
                queryInterface.removeConstraint(v, textrow.constraintName)
            })
        })
        database[v].sync({
            force: isForce,
            alter: true,
            logging: true
        })
    })
} else {
    database.sequelize.sync({
        force: isForce,
        logging: true
    })
}