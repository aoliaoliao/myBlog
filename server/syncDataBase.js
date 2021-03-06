var minimist = require('minimist');


var args = minimist(process.argv.slice(2), {
    boolean: ['force'],
    string: ['env']
});
let isForce = args.force // 强制更新，会删除所有的历史记录
let tables = args['_'] || [] // 需要被更新的数据表
let env = args.env // 环境变量 [ 'development', 'production' ]
process.env.NODE_ENV = env
const database = require('./Dao')

// 使用格式： node syncDataBase.js --force=true --env=development Moment Comment
console.log('args', args)

if (tables.length > 0) {
    // 获取Sequelize的实例
    const queryInterface = database.sequelize.getQueryInterface();

    tables.forEach(v => {
        // 查询该表所有的外键关系
        let allConstraint = []

        queryInterface.getForeignKeyReferencesForTable(v).then(res => {
            res.forEach(textrow => {
                // 删除指定表的指定约束
                // queryInterface.removeConstraint(v, textrow.constraintName)
                allConstraint.push(queryInterface.removeConstraint(v, textrow.constraintName).then(res => {
                    return res
                }))
            })
            Promise.all(allConstraint).then(res => {
                database[v].sync({
                    force: isForce,
                    alter: true, // 改变表格以适合模型。
                    logging: true
                })
            })
        })


    })
} else {
  database.sequelize.sync({
    force: isForce,
    logging: true
  })
}