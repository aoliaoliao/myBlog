const momentModel = require("../../../Dao").Moment;
const userModel = require("../../../Dao").User;
const fs = require("fs");
const fsPromises = require("fs").promises
const { formatResponse } = require("../../../utils");
const { momentConst, staticPublicPath } = require("../../../conf")["gloableConst"];
const userId = "0120f580-f92a-11e8-8db7-791c9005fcff";
// const momentClass = require('../model')

// class momentContent extends momentClass {
//     constructor() {
//         super()
//     }
// }

let momentContent = {}

async function createMomentContent(limit = 10, offset = 0) {
    // let momentContent = new momentContent()
    let end = false
    momentModel.findAndCountAll({
        limit: +limit,
        offset: +offset,
        include: [
            { model: userModel, as: 'User' }
        ]
    }).then(result => {
        console.log('result', result)
        let { rows, count } = result
        if (count < limit) {
            end = true
        }
        rows.forEach(row => {

        })

    })
}

module.exports = async function(req, res, next) {
    const { num, start } = req.query
    createMomentContent(num, start)
}