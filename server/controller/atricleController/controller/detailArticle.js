const path = require('path')
const articleModel = require("../../../Dao").Article;
const userModel = require("../../../Dao").User;
const CommentModel = require("../../../Dao").Comment;
const { formatResponse } = require("../../../utils");
const { staticNetPrefix } = require('../../../conf')['gloableConst']

const articleAttributes = ['id', 'author', 'name', 'updatedAt', 'articleAddress']
const userAttributes = ['nickName', 'avatar', 'signature']
// const commentAttributes = ['userId', 'userName', 'parentCommentId', 'text', 'updatedAt']


function readArticleStream(path) {
    let stream = fs.createReadStream(path, {
        encoding: 'utf8',
        start: 0,
        end: 64 * 1024
    })
}

function setQueryOption() {
    return {
        attributes: articleAttributes,
        include: [
            { model: userModel, as: 'articleAuthor', attributes: userAttributes }
        ]
    }
}

function queryArticleById(id) {
    return articleModel.findById(id, setQueryOption()).then(result => {
        console.log('result', result)
        return result.dataValues
    }).catch(err => {
        console.log('err', err)
        return false
    })
}


module.exports = async function(req, res, next) {
    const { id } = req.query
    if ( !id ){
      res.send(formatResponse(0, '未获取到文章ID'))
      return
    }
    let result = await queryArticleById( id )
    
}