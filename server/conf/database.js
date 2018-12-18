module.exports = {
    development: {
        host: '47.101.150.40',
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
        }
        // logging:function(){
        // },
        // benchmark: true
    },
    test: {
        host: 'localhost',
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
        }
        // logging:function(){
        // },
        // benchmark: true
    },
    production: {
        host: 'localhost',
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
        }
        // logging:function(){
        // },
        // benchmark: true
    },
}