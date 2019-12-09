module.exports = {
  development: {
    host: '101.132.139.198',
    // host: 'localhost',
    username: 'mysql-admin',
    password: '(blogMysql888)',
    database: 'blog-dev',
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
    }
    // logging:function(){
    // },
    // benchmark: true
  },
  test: {
    host: '101.132.139.198',
    username: 'mysql-admin',
    password: '(blogMysql888)',
    database: 'blog-pro',
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
    host: '101.132.139.198',
    username: 'mysql-admin',
    password: '(blogMysql888)',
    database: 'blog-pro',
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
    }
    // logging:function(){
    // },
    // benchmark: true
  }
}
