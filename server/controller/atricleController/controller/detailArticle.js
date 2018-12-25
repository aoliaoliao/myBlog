const path = require('path')
const momentModel = require("../../../Dao").Article;
const userModel = require("../../../Dao").User;
const CommentModel = require("../../../Dao").Comment;
const { formatResponse } = require("../../../utils");
const { staticNetPrefix } = require('../../../conf')['gloableConst']

module.exports = async function(req, res, next) {
    const { num, start } = req.query
    // let rt = await listMomentContent(num, start)
    // if (rt) {
    //     res.send(formatResponse(1, rt))
    // } else {
    //     res.send(formatResponse(0, '查询错误，请重试'))
    // }

}