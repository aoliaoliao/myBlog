const path = require('path')
const articletModel = require("../../../Dao").Articles;
const userModel = require("../../../Dao").Users;
const CommentModel = require("../../../Dao").Comments;
const { formatResponse } = require("../../../utils");
const { staticNetPrefix } = require('../../../conf')['gloableConst']


const articleAttributes = ['id', 'author', 'name', 'summary', 'summaryImage', 'updatedAt']
const userAttributes = ['nickName', 'avatar', 'signature']

function createArticleOption(limit, offset) {
    return {
        attributes: articleAttributes,
        limit: limit,
        offset: offset,
        order: [
            ['updatedAt', 'DESC']
        ],
        include: [
            { model: userModel, as: 'articleAuthor', attributes: userAttributes }
        ]
    }
}

async function listAllArticle(option) {
    return articletModel.findAndCount(option).then(result => {
        console.log('result', result)
        let rows = result.rows;
        rows = rows.map(v => {
            let row = v.dataValues
            row.summaryImage = staticNetPrefix + row.summaryImage.split(path.sep).join('/')
            return row
        })
        return result
    }).catch(err => {
        console.log('err', err)
    })
}


async function listArticleContent(limit = 10, offset = 0) {
    let end = false
    limit = +limit
    offset = +offset

    let findOption = createArticleOption(limit, offset)

    try {
        let result = await listAllArticle(findOption)
        let { rows, count } = result
        if (count < limit + offset) {
            end = true
        }
        return {
            end,
            list: rows
        }
    } catch (error) {
        console.log('error', error)
        return false
    }
}



module.exports = async function(req, res, next) {
    const { num, start } = req.query
    let rt = await listArticleContent(num, start)
    if (rt) {
        res.send(formatResponse(1, rt))
    } else {
        res.send(formatResponse(0, '查询错误，请重试'))
    }

}