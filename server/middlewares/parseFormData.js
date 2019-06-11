const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const fsPromises = fs.promises;
const { formatResponse } = require("../utils/index.js");
const { staticPublicPath } = require('../conf')['gloableConst']

// 文件暂存路径
async function createTargetDir( req ) {
    const date = new Date()
    // TODO: 在路径中添加用户的ID
    
    // let targetDir =  `${staticPublicPath}/${date.getFullYear()}_${date.getMonth() + 1}/${date.getDate()}/`
    let targetDir = path.join( staticPublicPath, `${date.getFullYear()}_${date.getMonth() + 1}`,`${date.getDate()}` )
    if (!fs.existsSync(targetDir)) {
        try {
            await fsPromises.mkdir(targetDir, {
                recursive: true
            })
        } catch (error) {
            console.log(` ${date} : article: createTargetDir: 新建文件夹出错 : ${error}。
            正确路径应该为：${targetDir},
            当前暂存路径为：${staticPublicPath}
            `)
            targetDir = path.join( staticPublicPath )
        }
    }
    return targetDir
}

async function formatRequest(req) {
    const form = new formidable.IncomingForm()
    form.uploadDir = await createTargetDir( req )
    form.keepExtensions = true
    form.multiples = true
    return new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
            if (err) {
                reject(err)
            }
            resolve({ fields, files })
        })
    })

}

function formatFormDataReq(req, res, next) {
    const contentType = req.headers['content-type']

    if (contentType && contentType.indexOf('multipart/form-data') === 0) {
        formatRequest(req).then(rt => {
            req.formData = rt
            next()
        }).catch(err => {
            console.log('格式化FormData请求出错', err)
            res.send(formatResponse(0, '请求格式出错'))
        })
    } else {
        next()
    }
}



module.exports = formatFormDataReq