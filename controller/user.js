const userModel = require( "../Dao" ).User
const {
  formatResponse
} = require( "../utils" )

let fields = {} // 该表所具有的字段
userModel.describe().then( res => {
  fields = res
  console.log( res )
} )

function validateName() {
  if ( typeof value === 'undefined' ) {
    return {
      msg: '不能为空'
    }
  }
}




function validateUser( user ) {

}



module.exports = {
  validateUser( req, res, next ) {
    let body = req.body
    validateUser( body )
  },
  // 新增单个用户
  addUser( req, res, next ) {
    let body = req.body

    userModel.create( body ).then( rt => {

    } ).catch( err => {
      console.log( err )

    } )
  },

  // 批量新增用户
  branchAddUser( req, res, next ) {
    let body = req.body
    userModel.bulkCreate( body, {
      logging: true
    } ).then( rt => {
      res.send( formatResponse( 1, rt ) )
    } ).catch( err => {
      console.log( err )
      res.send( formatResponse( 1, rt ) )
    } )
  },

  listUser( req, res, next ) {
    let query = req.query;
    userModel.findAll( {
      where: query
    } ).then( results => {
      const rt = []
      results.forEach( result => {
        rt.push( result.dataValues )
      } );
      res.send( formatResponse( 1, rt ) )
    } ).catch( err => {
      console.log( err )
      res.send( formatResponse( 0, '查询错误' ) )
    } )
  },
  detailUser( req, res, next ) {

  }

};