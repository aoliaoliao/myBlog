const database = require('./Dao')

database.sequelize.sync({
    force: true,
    logging: true
})