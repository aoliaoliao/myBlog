const userModel = require("../../../Dao").Users

 async function findUserById ( id = '' ) {
  if ( !id ) {
    return Promise.reject( {
      message: '查询条件不可为空'
    })
  }

  return userModel.findById(id).then(result => {
    return result
  }).catch(err => {
    return err
  })
}

module.exports = {
  findUserById
}