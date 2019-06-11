const path = require('path')
const { URL } = require('url');
const articleModel = require("../../../Dao").Articles;
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
    return articleModel.findAll(option).then(result => {
        let rows = result || [];
        rows = rows.map(v => {
            let row = v.dataValues
            // row.summaryImage = staticNetPrefix + row.summaryImage.split(path.sep).join('/')
            row.summaryImage = new URL( row.summaryImage.split(path.sep).join('/') , staticNetPrefix )
            return row
        })
        return result
    }).catch(err => {
        console.log('err', err)
    })
}

// 文章总数量
async function totalArticles(opiton) {
    return articleModel.count(opiton).then(res => {
        return res
    }).catch(err => {})
}

// 每次查询的时候修正偏移量，防止分页的时候可能出现的数据重复
function fixOffset(oldCount, newCount) {
    if (oldCount === 0) {
        return 0
    }
    let offset = newCount - oldCount // 偏移量
    return offset
}

async function listArticleContent(limit = 10, offset = 0, count = 0) {
    let end = false
    limit = +limit
    offset = +offset
    count = +count

    let total = await totalArticles()

    offset = offset + fixOffset(count, total)

    let findOption = createArticleOption(limit, offset)

    try {
        let list = await listAllArticle(findOption)

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
    const { num, start } = req.query
    let rt = await listArticleContent(num, start)
    if (rt) {
        res.send(formatResponse(1, rt))
    } else {
        res.send(formatResponse(0, '查询错误，请重试'))
    }

}