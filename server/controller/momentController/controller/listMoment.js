const path = require('path')
const Sequelize = require('sequelize')
const { decodedToken } = require("../../../utils/token")
const database = require("../../../Dao")
const momentModel = require("../../../Dao").Moments;
const userModel = require("../../../Dao").Users;
const CommentModel = require("../../../Dao").Comments;
const LikeModel = require("../../../Dao").Votes;
const { formatResponse, formatDBResult } = require("../../../utils");
const { staticNetPrefix } = require('../../../conf')['gloableConst']

const momentAttributes = ['id', 'userId', 'text', 'imgs', 'video', 'updatedAt']
const userAttributes = ['nickName', 'avatar', 'signature', 'id']
const commentAttributes = ['userId', 'userName', 'parentCommentId', 'text', 'id', 'updatedAt']
const likeAttributes = [Sequelize.fn("COUNT", Sequelize.col("likeAttributes.momentId")), 'likes']

const queryStr = 'SELECT' +
    '`Moment`.*, `momentAuthor`.`nickName` AS `momentAuthor.nickName`,' +
    '`momentAuthor`.`avatar` AS `momentAuthor.avatar`,' +
    '`momentAuthor`.`signature` AS `momentAuthor.signature`,' +
    '`momentAuthor`.`id` AS `momentAuthor.id`,' +
    '`momentComments`.`userId` AS `momentComments.userId`,' +
    '`momentComments`.`userName` AS `momentComments.userName`,' +
    '`momentComments`.`parentCommentId` AS `momentComments.parentCommentId`,' +
    '`momentComments`.`text` AS `momentComments.text`,' +
    '`momentComments`.`id` AS `momentComments.id`,' +
    '`momentComments`.`updatedAt` AS `momentComments.updatedAt`,' +
    '`momentLikes`.`userId` AS `momentLikes.userId`,' +
    'COUNT(`momentLikes`.`id`) AS `momentLikes.likes`,' +
    'COUNT( IF( `momentLikes`.`userId` = :userId, `momentLikes`.`userId`, NULL )  ) as `momentLikes.melike`' +
    'FROM' +
    '(' +
    '  SELECT' +
    '  `Moment`.`id`,' +
    '  `Moment`.`userId`,' +
    '  `Moment`.`text`,' +
    '  `Moment`.`imgs`,' +
    '  `Moment`.`video`,' +
    '  `Moment`.`updatedAt`' +
    'FROM' +
    '  `Moments` AS `Moment`' +
    'ORDER BY' +
    '  `Moment`.`updatedAt` DESC ' +
    'LIMIT :offset ,' +
    ':limit' +
    ') AS `Moment`' +
    'LEFT OUTER JOIN `Users` AS `momentAuthor` ON `Moment`.`userId` = `momentAuthor`.`id`' +
    'LEFT OUTER JOIN `Comments` AS `momentComments` ON `Moment`.`id` = `momentComments`.`momentId`' +
    'LEFT OUTER JOIN `Votes` AS `momentLikes` ON `Moment`.`id` = `momentLikes`.`momentId`' +
    'GROUP BY Moment.id ' +
    'ORDER BY ' +
    '`Moment`.`updatedAt` DESC;'

// 每次查询的时候修正偏移量，防止分页的时候可能出现的数据重复
function fixOffset(option) {

}



async function findAllMoment(option) {
    return database.sequelize.query(queryStr, { replacements: option, type: Sequelize.QueryTypes.SELECT, nest: true }).then(result => {
        let rows = result.map(v => {
            let row = formatDBResult(v)
            row.imgs = row.imgs.split(',').map(v => staticNetPrefix + v.split(path.sep).join('/'))
            row.like = row.like || 0
            return row
        })
        return rows
    }).catch(err => {
        console.log(err)
    })
}

async function countMoment(opiton) {
    return momentModel.count(opiton).then(res => {
        return res
    }).catch(err => {})
}


async function listMomentContent(limit = 10, offset = 0, userId = '') {
    // let momentContent = new momentContent()
    let end = false
    limit = +limit
    offset = +offset

    let findOption = { limit, offset, userId }

    try {
        let total = countMoment()

        let [list, total] = await Promise.all([findAllMoment(findOption), countMoment()])
        if (list === undefined) {
            return false
        }
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
    const token = req.get('authorization')

    if (token) {
        const userId = decodedToken(token).userId

        let rt = await listMomentContent(num, start, userId)
        if (rt) {
            res.send(formatResponse(1, rt))
        } else {
            res.send(formatResponse(0, '查询错误，请重试'))
        }
    } else {
        res.status(401).send('invalid token')
    }

}