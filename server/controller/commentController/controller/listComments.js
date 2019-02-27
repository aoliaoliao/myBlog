const CommentModel = require("../../../Dao").Comments;
const { formatResponse, formatDBResult } = require("../../../utils");

const commentAttributes = [
    "userId",
    "userName",
    "articleId",
    "momentId",
    "parentCommentId",
    "text",
    "id",
    "createdAt",
];

const commentParentAttribute = ["id", "userId", "userName"];

CommentModel.belongsTo(CommentModel, {
    as: "parentComment",
    foreignKey: "parentCommentId",
});

// 设置查询对象中的where条件
function setFindWhere(articleId, momentId) {
    const where = {};
    if (momentId) {
        where.momentId = momentId;
    } else if (articleId) {
        where.articleId = articleId;
    }
    return where;
}

function createCommentOption(limit, offset, where) {
    return {
        attributes: commentAttributes,
        limit: limit,
        offset: offset,
        order: [
            ["createdAt", "DESC"]
        ],
        include: [{
            model: CommentModel,
            as: "parentComment",
            attributes: commentParentAttribute,
            // on: {
            //     '$CommentModel.parentCommentId$': { $col: 'parentComment.id' },
            // }
        }, ],
        where,
    };
}

// 对查询结果的格式化，尤其是父子关系的评论
function formatQueryResult(results) {
    // let commentUser = {}
    const comments = [];
    results.forEach(result => {
        let data = formatDBResult(result);

        if (data && data.parentComment) {
            data.parentCommentUserName = data.parentComment.userName;
            data.parentCommentUserId = data.parentComment.userId;
            delete data.parentComment;
        }

        // if (!dataValues.parentCommentId) {
        //     commentUser[dataValues.id] = {
        //         userName: dataValues.userName,
        //         userId: dataValues.userId
        //     }
        // } else {
        //     dataValues.parentCommentUserName = commentUser[dataValues.parentCommentId].userName
        //     dataValues.parentCommentUserId = commentUser[dataValues.parentCommentId].userId
        // }
        comments.push(data);
    });
    return comments;
}

async function listComments(option) {
    return CommentModel.findAndCount(option)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = async function(req, res, next) {
    let end = false;
    const { num, start, articleId = "", momentId = "" } = req.body;
    const where = setFindWhere(articleId, momentId);
    try {
        const result = await listComments(createCommentOption(num, start, where));
        const list = formatQueryResult(result.rows);

        if (result.count < num + start) {
            end = true;
        }
        res.send(
            formatResponse(1, {
                end,
                list,
            })
        );
    } catch (error) {
        res.send(formatResponse(0, "查询错误，请重试"));
    }
};