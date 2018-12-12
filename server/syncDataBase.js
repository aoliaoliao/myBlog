const database = require('./Dao')
var minimist = require('minimist');
var args = minimist(process.argv.slice(2));

let isForce = false

if (args.force === 'true') {
    isForce = true
} else {
    isForce = false
}

database.sequelize.sync({
    force: isForce,
    logging: true
})