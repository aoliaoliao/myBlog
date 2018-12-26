const userModel = require('"../../../Dao').User
const { formatResponse } = require("../../../utils");

module.exports = async function listUser(req, res, next) {
    let query = req.query
    userModel
        .findAll({
            where: query
        })
        .then(results => {
            const rt = []
            results.forEach(result => {
                rt.push(result.dataValues)
            })
            res.send(formatResponse(1, rt))
        })
        .catch(err => {
            console.log(err)
            res.send(formatResponse(0, '查询错误'))
        })
}