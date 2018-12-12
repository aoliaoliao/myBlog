const momentModel = require("../../../Dao").Moment;
const userModel = require("../../../Dao").User;
const CommentModel = require("../../../Dao").Comment;
const fs = require("fs");
const fsPromises = require("fs").promises
const { formatResponse } = require("../../../utils");
const { momentConst, staticPublicPath } = require("../../../conf")["gloableConst"];
const userId = "0120f580-f92a-11e8-8db7-791c9005fcff";

async function createMomentContent(limit = 10, offset = 0) {
    // let momentContent = new momentContent()
    let end = false
    let momentContent = {}
    momentModel.findAll({
        attributes: ['id', 'userId', 'text', 'imgs', 'video', 'updatedAt'],
        limit: +limit,
        offset: +offset,
        order: [
            ['updatedAt', 'DESC']
        ],
        include: [
            { model: userModel, as: 'momentAuthor', attributes: ['nickName', 'avatar', 'signature', 'id'] },
            {
                model: CommentModel,
                as: 'momentComments',
                attributes: ['userId', 'parentCommentId', 'text', 'id', 'updatedAt'],
                include: [{
                    model: userModel,
                    as: 'commentAuthor',
                    attributes: ['nickName', 'id']
                }]
            },
        ]
    }).then(result => {
        console.log('result', result)
        // let { rows, count } = result
        // if (offset + limit >= count) {
        //     end = true
        // }
        // rows.forEach(row => {

        // })

    })
}

module.exports = async function(req, res, next) {
    const { num, start } = req.query
    createMomentContent(num, start)
}