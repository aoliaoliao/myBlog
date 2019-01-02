const path = require("path");
const fs = require("fs");
const articleModel = require("../../../Dao").Article;
const userModel = require("../../../Dao").User;
const { formatResponse, formatDBResult } = require("../../../utils");

const articleAttributes = [
    "id",
    "author",
    "name",
    "updatedAt",
    "articleAddress",
];
const userAttributes = ["nickName", "avatar", "signature"];
// const commentAttributes = ['userId', 'userName', 'parentCommentId', 'text', 'updatedAt']

function readArticleStream(path, func) {
    let content = "";
    let fReadStream = fs.createReadStream(path, {
        encoding: "utf8",
        start: 0,
        end: 32 * 1024,
    });

    fReadStream.on("data", chunk => {
        if (chunk) {
            content += chunk;
        }
    });

    fReadStream.on("close", () => {
        func(content);
    });

    return content;
}

function setQueryOption() {
    return {
        attributes: articleAttributes,
        include: [
            { model: userModel, as: "articleAuthor", attributes: userAttributes },
        ],
    };
}

function queryArticleById(id) {
    return articleModel
        .findById(id, setQueryOption())
        .then(result => {
            const tmp = formatDBResult(result);
            return tmp;
        })
        .catch(err => {
            console.log("err", err);
            return false;
        });
}

module.exports = async function(req, res, next) {
    const { id } = req.query;
    if (!id) {
        res.send(formatResponse(0, "未获取到文章ID"));
        return;
    }

    let result = await queryArticleById(id);

    if (result) {
        function setResponse(rt) {
            result.article = rt;
            delete result.articleAddress;
            res.send(formatResponse(1, result));
        }
        readArticleStream(result.articleAddress, setResponse);
    } else {
        res.send(formatResponse(0, "未找到相关文章"));
    }
};