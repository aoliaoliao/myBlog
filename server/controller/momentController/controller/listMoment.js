const path = require('path')
const momentModel = require("../../../Dao").Moment;
const userModel = require("../../../Dao").User;
const CommentModel = require("../../../Dao").Comment;
const { formatResponse } = require("../../../utils");
const { staticNetPrefix } = require('../../../conf')['gloableConst']

const momentAttributes = ['id', 'userId', 'text', 'imgs', 'video', 'updatedAt']
const userAttributes = ['nickName', 'avatar', 'signature', 'id']
const commentAttributes = ['userId', 'userName', 'parentCommentId', 'text', 'id', 'updatedAt']
// const commentUserAttributes = ['nickName']

function createMomentOption(limit, offset) {
    return {
        attributes: momentAttributes,
        limit: limit,
        offset: offset,
        order: [
            ['updatedAt', 'DESC']
        ],
        include: [
            { model: userModel, as: 'momentAuthor', attributes: userAttributes },
            {
                model: CommentModel,
                as: 'momentComments',
                attributes: commentAttributes,
                // include: [{
                //     model: userModel,
                //     as: 'commentAuthor',
                //     attributes: commentUserAttributes
                // }]
            },
        ]
    }
}


async function findAllMoment(option) {
    return momentModel.findAll(option).then(result => {
        let rows = result.map(v => {
            let row = v.dataValues
            // let { momentAuthor, momentComments } = row
            // momentAuthor = momentAuthor.dataValues
            // momentComments = momentComments.map(mc => mc.dataValues)
            row.imgs = row.imgs.split(',').map(v => staticNetPrefix + v.split(path.sep).join('/'))
            return row
        })
        return rows
    }).catch(err => {

    })
}

async function countMoment(opiton) {
    return momentModel.count(opiton).then(res => {
        return res
    }).catch(err => {})
}


async function listMomentContent(limit = 10, offset = 0) {
    // let momentContent = new momentContent()
    let end = false
    limit = +limit
    offset = +offset

    let findOption = createMomentOption(limit, offset)

    try {
        // let list = await findAllMoment(findOption)
        // let total = await countMoment()
        let [list, total] = await Promise.all([findAllMoment(findOption), countMoment()])
        if (total < limit + offset) {
            end = true
        }
        return {
            end,
            list
        }
    } catch (error) {
        console.log('error', error)
        return false
    }
}

module.exports = async function(req, res, next) {
    const { num, start } = req.query
    let rt = await listMomentContent(num, start)
    if (rt) {
        res.send(formatResponse(1, rt))
    } else {
        res.send(formatResponse(0, '查询错误，请重试'))
    }

}