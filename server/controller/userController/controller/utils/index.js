const userModel = require('../../../../Dao').Users

const findUserById = async (query = {}) => {
  if (Object.keys(query).length) {
    return Promise.reject(new Error('查询条件不可为空'))
  }

  return userModel
    .findById(query)
    .then(result => {
      return result
    })
    .catch(err => {
      return err
    })
}

export default {
  findUserById
}
