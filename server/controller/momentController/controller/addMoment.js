const momentModel = require("../../../Dao").Moment;
const formidable = require("formidable");
const fs = require("fs");
const fsPromises = require("fs").promises
const { formatResponse } = require("../../../utils");
const { momentConst, staticPublicPath } = require("../../../conf")["gloableConst"];
const userId = "0120f580-f92a-11e8-8db7-791c9005fcff";

// 请求内容的验证
function validateMoment(moment) {
    let isValidate = true;
    let message = "";
    const text = moment.text || "";
    const imgs = moment.imgs || [];
    const video = moment.video;

    if (text.length === 0 && imgs.length === 0) {
        isValidate = false
        message = '动态内容不允许为空'
    } else if (text.length > momentConst.textMaxLength) {
        isValidate = false;
        message = "字数需在200字以内";
    } else if (imgs.length > momentConst.imgMaxCount) {
        isValidate = false;
        message = "最多上传九张图片";
    } else if (video) {}

    imgs.some(img => {
        let right_mime = !momentConst.imgMIMeTypes.includes(img.type)
        if (right_mime) {
            isValidate = false
            message = `只接受${momentConst.imgMIMeTypes.join(' ')}类型的图片`
        }
        return right_mime
    })

    return { isValidate, message };
}

// 图片存储的目标位置
async function createTargetDir() {
    const date = new Date();
    targetDir = `${staticPublicPath}/${date.getFullYear()}_${date.getMonth() +
    1}/${date.getDate()}`;

    if (!fs.existsSync(targetDir)) {
        // const mkdir = utils.promisify(fs.mkdir);
        let dirErr = await fsPromises.mkdir(targetDir, {
            recursive: true,
        });
        if (dirErr) {
            targetDir = `${staticPublicPath}`
            console.log(` ${date} : moment: createTargetDir: 新建文件夹出错 : ${err}`)
        }
    }
    return targetDir;
}

// 格式化新增moment的请求
async function formatRequest(req) {
    const form = new formidable.IncomingForm();
    form.uploadDir = await createTargetDir();
    form.keepExtensions = true;
    form.multiples = true;
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) {
                reject(err)
            }
            const text = fields.text;
            const imgs = Array.isArray(files.imgs) ? files.imgs : files.imgs ? [files.imgs] : [];
            resolve({ text, imgs })
        })
    })
}

module.exports = async function(req, res, next) {
    let content = { imgs: [], text: '' }
    try {
        content = await formatRequest(req)
    } catch (error) {
        res.send(formatRequest(0, error))
        return
    }

    const localImgs = content.imgs.map(img => img.path);
    let valid = validateMoment(content);
    if (!valid.isValidate) {
        res.send(formatResponse(0, valid.message));
        // 删除已储存的图片
        localImgs.forEach(img => {
            fsPromises.unlink(img)
        })
        return;
    }

    momentModel.create({
            text: content.text,
            userId: userId,
            imgs: localImgs.join(","),
        })
        .then(rt => {
            res.send(formatResponse(1, "发表成功"));
        })
        .catch(err => {
            res.send(formatResponse(0, err));
        });

}