const database = require('./Dao')
var minimist = require('minimist');
var args = minimist(process.argv.slice(2));

let force = args.force || false

database.sequelize.sync({
    force: force,
    logging: true
})