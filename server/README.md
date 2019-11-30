暂时不能新建数据库，只能在已有的数据库中进行表的同步

数据库文件配置存放在`/conf/database.js`

更新全部数据：`node syncDataBase.js --force=true --env=development`

更新指定数据表：`node syncDataBase.js --force=true --env=development 数据表1 数据表2 `


