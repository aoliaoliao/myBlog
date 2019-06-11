module.exports = {
    development: {
        host: '47.101.150.40',
        // host: 'localhost',
        username: 'root',
        password: '123456',
        database: 'nodejs',
        port: '3306',
        dialect: 'mysql',
        pool: {
            max: 10,
            idle: 10000,
            evict: 10000,
            acquire: 10000
        },
        timezone: '+08:00',
        define: {
            charset: 'utf8',
            dialectOptions: {
                collate: 'utf8_general_ci'
            }
        },
        // logging:function(){
        // },
        // benchmark: true
    },
    test: {
        host: 'localhost',
        username: 'root',
        password: '123456',
        database: 'blogProduction',
        port: '3306',
        dialect: 'mysql',
        pool: {
            max: 10,
            idle: 10000,
            evict: 10000,
            acquire: 10000
        }
        // logging:function(){
        // },
        // benchmark: true
    },
    production: {
        host: '47.101.150.40',
        username: 'root',
        password: '123456',
        database: 'blogProduction',
        port: '3306',
        dialect: 'mysql',
        pool: {
            max: 10,
            idle: 10000,
            evict: 10000,
            acquire: 10000
        },
        timezone: '+08:00',
        define: {
            charset: 'utf8',
            dialectOptions: {
                collate: 'utf8_general_ci'
            }
        },
        // logging:function(){
        // },
        // benchmark: true
    },
}