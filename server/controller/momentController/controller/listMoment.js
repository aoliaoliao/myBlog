const path = require('path')
const { URL } = require('url')
const Sequelize = require('sequelize')
const { decodedToken } = require("../../../utils/token")
const database = require("../../../Dao")
const momentModel = require("../../../Dao").Moments;
// const userModel = require("../../../Dao").Users;
// const CommentModel = require("../../../Dao").Comments;
// const LikeModel = require("../../../Dao").Votes;
const { staticNetPrefix } = require('../../../conf')['gloableConst']

// const momentAttributes = ['id', 'userId', 'text', 'imgs', 'video', 'updatedAt']
// const userAttributes = ['nickName', 'avatar', 'signature', 'id']
// const commentAttributes = ['userId', 'userName', 'parentCommentId', 'text', 'id', 'updatedAt']
// const likeAttributes = [Sequelize.fn("COUNT", Sequelize.col("likeAttributes.momentId")), 'likes']

const queryMoment_bak = `
SELECT
	Moment.*, momentAuthor.nickName AS 'momentAuthor.nickName',
	momentAuthor.avatar AS 'momentAuthor.avatar',
	momentAuthor.signature AS 'momentAuthor.signature',
	momentAuthor.id AS 'momentAuthor.id',
	momentComments.userId AS 'momentComments.userId',
	momentComments.userName AS 'momentComments.userName',
	momentComments.parentCommentId AS 'momentComments.parentCommentId',
	momentComments.text AS 'momentComments.text',
	momentComments.id AS 'momentComments.id',
	momentComments.updatedAt AS 'momentComments.updatedAt'
FROM
	(
		SELECT
			Moments.id,
			Moments.userId,
			Moments.text,
			Moments.imgs,
			Moments.video,
			Moments.updatedAt
		FROM
			Moments
		ORDER BY
			Moments.updatedAt DESC
		LIMIT 0,
		10
	) AS Moment
LEFT OUTER JOIN Users AS momentAuthor ON Moment.userId = momentAuthor.id
LEFT OUTER JOIN (
	SELECT Comments.*, @commentNum :=	IF (@momentId = momentId, @commentNum + 1, 1) AS row_number,
	@momentId := momentId AS moment
FROM
	Comments
GROUP BY
  Comments.momentId,
	Comments.id
HAVING
	row_number <= 2
ORDER BY
	updatedAt DESC
) AS momentComments ON Moment.id = momentComments.momentId
ORDER BY
	Moment.updatedAt DESC
`


const queryMoment = 'SELECT' +
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
function fixOffset(oldCount, newCount) {
    if (oldCount === 0) {
        return 0
    }
    let offset = newCount - oldCount // 偏移量
    return offset
}

async function findAllMoment(option) {

    return database.sequelize.query(queryMoment, {
        replacements: option,
        nest: true
    }).then(result => {
        let rows = result.map(v => {
            let row = $blog.formatDBResult(v)
            row.imgs = row.imgs.length > 0 ? row.imgs.split(',').map(v => new URL( v.split(path.sep).join('/') , staticNetPrefix )) : []
            row.like = row.like || 0
            if ( !row.momentComments.id ) {
              row.momentComments = undefined
            }
            if ( !row.momentLikes.userId ) {
              row.momentLikes = undefined
            }
            return row
        })
        return rows
    }).catch(err => {
        console.log(err)
    })
}


async function createTransaction(){
  return database.sequelize.transaction().then( t => {
    database.sequelize.set( {
      commentNum: '',
      momentId: ''
    }, { transaction: t })
    return database.sequelize.query(queryMoment, {
      raw: true,
      type: Sequelize.QueryTypes.RAW,
      nest: true
    } , { transaction: t }).then( res => {
      console.log( 'database.sequelize.query', res )
    })
  } )

  // let a = await database.sequelize.set( {
  //   commentNum: '',
  //   momentId: ''
  // }, {
  //   transaction: t
  // }).then( res => {
  //   console.log('database.sequelize.set', res )
  // })
  // console.log('database.sequelize.set', a )
}









async function countMoment(opiton) {
    return momentModel.count(opiton).then(res => {
        return res
    }).catch(err => {})
}


async function listMomentContent(limit = 10, offset = 0, count = 0, userId = '') {
    // let momentContent = new momentContent()
    let end = false
    limit = +limit
    offset = +offset
    count = +count

    try {
        let total = await countMoment()

        offset = offset + fixOffset(count, total)

        let findOption = { limit, offset, userId }

        let list = await findAllMoment(findOption)

        // let list = createTransaction( )

        if (list === undefined) {
            return false
        }
        if (total <= limit + offset) {
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
    const {
        num,
        start,
        count
    } = req.query
    const token = req.get('authorization')

    if (token) {
        const userId = decodedToken(token).userId

        let rt = await listMomentContent(num, start, count, userId)
        if (rt) {
            res.send($blog.formatResponse(1, rt))
        } else {
            res.send($blog.formatResponse(0, '查询错误，请重试'))
        }
    } else {
        res.status(401).send('invalid token')
    }

}