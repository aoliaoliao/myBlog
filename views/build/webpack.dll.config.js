var path = require("path");
var webpack = require("webpack");
// const config = require('../config')
const rootPath = path.resolve(__dirname, '../');
const isPro = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        vendor: ['vue/dist/vue.esm.js', 'vuex', 'vue-router', 'axios', 'vue-lazyload']
    },
    output: {
        path: path.join(rootPath, 'dist/site'),
        filename: 'dll_[name].js',
        library: "[name]_[hash]"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(rootPath, "dist/site", "[name]-manifest.json"),
            name: "[name]_[hash]"
        })
    ]
}
