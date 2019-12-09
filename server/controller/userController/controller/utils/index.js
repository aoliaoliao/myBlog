const userModel = require('../../../../Dao').Users

export const findUserById = async (query = {}) => {
  if (query) {
    return Promise.reject({
      message: '查询条件不可为空'
    })
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
