const crypto = require('crypto')
const uuidv1 = require('uuid/v1')


module.exports = {
    /* 
     *   生成响应的数据格式
     *   @status： 响应状态 0：失败，1：成功
     *   @result： 响应内容 
     *  */
    formatResponse(status, result, ...otherRes) {
        let response = {
            cd: status
        }
        let other = {}

        if (response.cd) {
            response.rt = result
        } else {
            response.msg = result
        }

        otherRes.forEach(v => Object.assign(other, v))

        return {
            ...response,
            ...other
        }
    },

    /* 
     *   对数据库的查询结果进行格式化
     */
    formatDBResult(data) {
        function getDataValues(value) {
            Object.keys(value).some(key => {
                let has = false
                if (value[key] && value[key].hasOwnProperty('dataValues')) {
                    has = true
                    value[key] = value[key]['dataValues']
                    getDataValues(value[key])
                }
                return has
            })
        }
        if (data.dataValues) {
            getDataValues(data.dataValues)
            return data.dataValues
        }
        return data
    },

    /* 
     * 对密码进行加密处理
     * 
     * */
    cryptoPasswordByMD5(password) {
        let hash = crypto.createHash('md5')
            .update(password)
            .digest('hex');
        return hash
    },

    /* 
     * 生成唯一的UUID
     */
    createUUID() {
        return uuidv1()
    },

    /* 
     * 获取文件的后缀名,包含 . 号
     */
    getFileExt(fileName) {
        const index = fileName.lastIndexOf('.')
        const ext = fileName.slice(index, fileName.length)
        return ext
    },

    /* 
     * 获取文件路径的目录，包含最后一个 \
     */
    getFileDir(fileName) {
        const index = fileName.lastIndexOf('\\')
        const dir = fileName.slice(0, index + 1)
        return dir
    }



}