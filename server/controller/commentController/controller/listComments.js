const path = require('path')
const userModel = require("../../../Dao").User;
const CommentModel = require("../../../Dao").Comment;
const { formatResponse } = require("../../../utils");

const commentAttributes = ['userId', 'userName', 'parentCommentId', 'text', 'id', 'updatedAt']
const userAttributes = ['nickName', 'avatar', 'signature', 'id']


function createCommentOption(limit, offset) {
    return {
        attributes: commentAttributes,
        limit: limit,
        offset: offset,
        order: [
            ['updatedAt', 'ASC']
        ],
        where: {

        },
        include: [
            { model: userModel, as: 'commentAuthor', attributes: userAttributes },
        ]
    }
}


function formatQueryResult(results) {

}

function findTheseComments() {
    CommentModel.findAll(option).then(result => {
        // let rows = result.map(v => {
        //     let row = v.dataValues
        // })
        return formatQueryResult(rows)
    }).catch(err => {})
}



async function listComments() {
    return CommentModel.findAll(option).then(result => {
        // let rows = result.map(v => {
        //     let row = v.dataValues
        // })
        return formatQueryResult(rows)
    }).catch(err => {})
}


module.exports = async function(req, res, next) {
    // type ：0 文章的评论, 1：动态的评论 
    const { num, start, type, id } = req.query
    let rt = await listComments(num, start)
    if (rt) {
        res.send(formatResponse(1, rt))
    } else {
        res.send(formatResponse(0, '查询错误，请重试'))
    }

}