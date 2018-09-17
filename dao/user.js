import {
  pool
} from './commons'


let sql = {
  insert: 'inset into user set ?',
  insertAll: 'insert into user values ',
  delete: '',
  select: '',
  update: ''
}

export default {
  addUser: function ( value, callback ) {
    let id = 1232132131
    value = {
      id,
      ...value
    }
    pool.query( sql.insert, value, ( err, results, fields ) => {
      if ( err ) throw err
      // 插入成功
      callback()
    } )
  },
  addUsers: function ( values, callback ) {
    values = values.map( v => {

    } )
  },
  deleteUser: function () {

  },
  deleteUsers: function () {

  },
  updateUser: function () {

  },
  updateUsers: function () {

  },
  selectAll: function () {

  },
  selectUsersById: function () {

  },
  selectUsersByNick: function () {

  },
  selectUsersByLink: function () {

  }
}