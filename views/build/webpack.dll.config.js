var path = require("path");
var webpack = require("webpack");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const config = require('../config')

module.exports = {
    entry: {
        vendor: ['vue/dist/vue.esm.js', 'vuex', 'vue-router', 'axios', 'vue-lazyload']
    },
    output: {
        // path: path.join(rootPath, 'dist/site'),
        path: config.build.assetsRoot,
        filename: 'dll/dll.[name].js',
        library: "[name]_[hash]"
    },
    plugins: [
        // new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DllPlugin({
            // path: path.join(rootPath, "dist/site", "[name]-manifest.json"),
            path: config.build.assetsRoot + '/dll/manifest.[name].json',
            name: "[name]_[hash]"
        }),
        // new OptimizeCSSAssetsPlugin({}),
        // new UglifyJsPlugin({
        //     uglifyOptions: {
        //         compress: {
        //             warnings: false
        //         }
        //     },
        //     sourceMap: config.build.productionSourceMap,
        //     parallel: true
        // }),
    ]
}
