const fs = require("fs");
const path = require('path')

function createControllerModel() {
    let controllerModel = {}
    const controllerPath = __dirname + '/controller'
    let allFiles = fs.readdirSync(controllerPath)

    allFiles.filter(file => {
            return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js')
        })
        .forEach(file => {
            const model = require(path.posix.join(controllerPath, file))
            const name = file.slice(0, -3)
            controllerModel[name] = model
        })
    return controllerModel
}

module.exports = createControllerModel()