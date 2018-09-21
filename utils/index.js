module.exports = {
  /* 
   *   生成响应的数据格式
   *   @status： 响应状态 0：失败，1：成功
   *   @result： 响应内容 
   *  */
  formatResponse( status, result, ...otherRes ) {
    let response = {
      cd: status
    }
    let other = {}

    if ( response.cd ) {
      response.rt = result
    } else {
      response.msg = result
    }

    otherRes.forEach( v => Object.assign( other, v ) )

    return {
      ...response,
      ...other
    }
  }
}