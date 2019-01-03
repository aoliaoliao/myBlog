首先我们知道一点，项目在被webpack打包之后会生成一个static文件夹`a/static`,该文件夹存放所有的静态资源。

在开发过程中也有一个static文件夹`b/static`，这个文件夹下的内容会被全部拷贝进`a/static`，webpack 不会对`b/static`中的内容进行任何处理。

为什么会是这样？webpack 为什么不会对`b/static`中的内容做处理，而又为什么会是`b/static`这个文件夹？

这里有两个链接，可以解释上述问题：

[静态资源介绍](https://hq5544.github.io/vue-webpack/static.html)

[copy-webpack-plugin插件](https://github.com/webpack-contrib/copy-webpack-plugin)


---

### webpack 为什么不会对`b/static`中的内容做处理。

在webpack打包的过程中，所有vue 组件中的 `template`和 `style` 都由 `vue-html-loader` 和 `css-loader` 这两个包进行处理， 其中牵涉到的静态资源 URL 都被当做 **依赖模块**来处理。根据这两个包的相关配置会生成我们打包后看到的结果。比如我们最常见的情况是，如果一个图片如果size过小，会被进行base64处理，否则会在名称后面加上一段`hash`值方便缓存等。

这些也是webpack**一切都是模块**思想的体现。

而在webapck处理静态资源的时候有一个例外，那就是`相对跟目录的 URL`。接下来的内容引用自上述链接：

 - `相对跟目录的 URL`，例如，/assets/logo.png 完全不会被 webpack 处理。
 - `相对路径`，例如，./assets/logo.png 将会被解析成依赖模块。它们将会被基于 webpack 输出配置所自动生成的 URL 所代替。
 - `无前缀 URL`，例如，assets/logo.png 将会被视为相对路径，并且变成 ./assets/logo.png。
 - `带有 ~ 前缀的 URL` 将会被视为依赖模块的请求，类似于 `require('some-module/image.png')`。如果你想要让 webpack 将它作为模块处理，可以使用这个前缀。例如，如果你想要用 assets 作为 alias，你需要使用 <img src="~assets/logo.png"> 来确保`alias` 可以使用。

上述内容解释了为什么 `b/static`文件夹中的内容不被处理。



### 为什么会是`b/static`这个文件夹？

关于这个问题，看几个 vue-cli 中的相关配置：
```javascript
// config/index.js
build: {
    // ...
    assetsRoot: path.resolve( __dirname, '../MyWeb' ),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    // ...
}


// build/utils.js
exports.assetsPath = function ( _path ) {
  const assetsSubDirectory = process.env.NODE_ENV === 'development'
    ? config.dev.assetsSubDirectory : config.build.assetsSubDirectory

  return path.posix.join( assetsSubDirectory, _path )
}


// build/webpack.prod.conf.js
output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath( 'js/[name].[chunkhash].js' ),
    chunkFilename: utils.assetsPath( 'js/[id].[chunkhash].js' )
},
new CopyWebpackPlugin( [ {
    from: path.resolve( __dirname, '../static' ),
    to: config.build.assetsSubDirectory,
    ignore: [ '.*' ]
} ] )

```

在第一段代码中`assetsSubDirectory`的值定义了打包后所有的静态资源都放到`static`文件夹中。

第三段代码中的`output`规定了输出文件的位置在`MyWeb/static/js`文件夹中

第三段代码中`CopyWebpackPlugin`表示的是一个webpack插件，其功能是复制并粘贴文件，这里的`from`和`to`将开发环境的`b/static`和生产环境的`a/static`关联了起来。

这几段代码说明了，为什么是 `static` 文件夹。当然，如果你的项目有需要可以随意更改相关配置。




**<p style="color:red">上述内容中有一个问题没搞清楚，为什么相对跟目录的 URL不会被webpack处理？？？？？？？？？？？？</p>** 






