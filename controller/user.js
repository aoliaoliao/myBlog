const user_db = require( '../dao' ).user

function validName( name ) {
  return true
}

function validAge( age ) {
  return true
}


module.exports = {
  addUser( req, res, next ) {
    // 做数据检查
    const name = '王二'
    const age = 33

    // 如果数据不全
    if ( !validName( name ) ) {
      res.send( {
        cd: 0,
        msg: '名字不符合规则'
      } )
      return;
    }
    if ( !validAge( age ) ) {
      res.send( {
        cd: 0,
        msg: '年龄不符合规则'
      } )
      return;
    }
    // 数据检查通过，插入数据库
    user_db.created( {} )
      .then( results => res.send( {
        cd: 1
      } ) )
      .catch( err => {
        res.send( {
          cd: 0,
          msg: '数据插入失败'
        } )
        console.log( err )
      } )
  }
}