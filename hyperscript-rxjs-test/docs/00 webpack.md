# 从零开始用`webpack`搭建前端框架

webpack搭建前端框架是现代前端开发的一个基本前提，如果你不熟悉webpack，可以阅读本文，从零搭建一个可运行的Web框架。

> 本文及源代码都在github上，见xp44mm/hyperscript-rxjs-test仓库。

本文虽然很长，但是都是直接复制，粘贴，无需更改的内容。配置好以后，很少改动，请读者耐心跟随操作。

## 先决条件

前端框架`hyperscript-rxjs`是一个js函数库，可以通过node.js的npm包管理器的方法使用它。我们用到`babel`和`webpack`这两个包系列应该是前端必备的工具。测试使用`jest`。

## Basic Setup

First let's create a directory, initialize npm:

```bash
mkdir hyperscript-rxjs-test
cd hyperscript-rxjs-test
npm init -y
```

这个项目完成后的目录大致有如下结构和文件：

```js
D:\XP44MM\HYPERSCRIPT-RXJS-TEST
│  .gitignore
│  babel.config.js
│  index.css
│  index.js
│  package.json
│  prettier.config.js
│  readme.md
│  webpack.common.js
│  webpack.dev.js
│  webpack.prod.js
│  
├─assets
│      favicon.ico
│      index.html
│      
├─css
│          
├─node_modules
│      
└─src

```

1. js源代码位于src目录中
2. 样式表文件位于css目录中
3. 其他资源文件位于assets目录中
4. index.js是代码的根文件，index.css是css的根文件。
5. webpack配置文件
6. babel配置文件

我们重点列出几个重要的配置文件内容，其他内容可以直接参考源代码。

用文本编辑器打开目录中的`package.json`，向其中添加依赖项:

```json
{
  "dependencies": {
    "deep-rxjs": "1.0.12",
    "hyperscript-rxjs": "1.0.14",
    "rxjs": "7.1.0"
  },
  "devDependencies": {
    "@babel/core": "7.14.6",
    "@babel/plugin-proposal-class-properties": "7.14.5",
    "@babel/plugin-proposal-export-default-from": "7.14.5",
    "@babel/plugin-proposal-export-namespace-from": "7.14.5",
    "@babel/plugin-proposal-pipeline-operator": "7.14.5",
    "@babel/preset-env": "7.14.5",
    "@webpack-cli/serve": "1.5.1",
    "babel-loader": "8.2.2",
    "clean-webpack-plugin": "3.0.0",
    "core-js": "3.14.0",
    "css-loader": "5.2.6",
    "html-loader": "2.1.2",
    "html-webpack-plugin": "5.3.1",
    "style-loader": "2.0.0",
    "tslib": "2.3.0",
    "webpack": "5.39.0",
    "webpack-cli": "4.7.2",
    "webpack-dev-server": "3.11.2",
    "webpack-merge": "5.8.0"
  },
  "scripts": {
    "build": "webpack --config webpack.prod.js",
    "start": "webpack serve --config webpack.dev.js"
  },
  "name": "hyperscript-rxjs-test"
}
```

配置webpack，根目录下，`webpack.common.js`

```js
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js', '.json'],
        modules: [path.resolve(__dirname, 'node_modules')],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/[\\/]node_modules[\\/]/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: { babelrc: true },
                    },
                ],
            },
            {
                test: /\.css$/,
                exclude: [/[\\/]node_modules[\\/]/],
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
            },
            {
                test: /\.html$/,
                exclude: [/[\\/]node_modules[\\/]/],
                use: [{ loader: 'html-loader' }],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                exclude: [/[\\/]node_modules[\\/]/],
                type: 'asset',
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: './assets/index.html',
            favicon: './assets/favicon.ico',
        }),
    ],
}
```

根目录下，`webpack.dev.js`

```js
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    output: {
        filename: '[name].[contenthash].js',
    },
    devServer: {
        port: 3000,
        disableHostCheck: true,
        open: true,
    },
})
```

说明一下，`merge`是后来者赢，如果配置对象的属性路径相同，dev文件中的属性会覆盖common文件的属性。

我们用到ES的新特性，需要babel转译，在根目录下添加文件`babel.config.js`

```js
module.exports = function (api) {
    api.cache.using(() => process.env.NODE_ENV)
    let presets = [
        [
            '@babel/preset-env',
            {
                targets: api.env('test') ? { node: 'current' } : { edge: '91' },
                loose: true, // convert from es6 to es5 loosely.
                corejs: 3, //declaring a core-js version
                useBuiltIns: 'entry',
            },
        ],
    ]
    let plugins = [
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-proposal-class-properties',
        ['@babel/plugin-proposal-pipeline-operator', { proposal: 'fsharp' }],
    ]
    return { presets, plugins }
}
```

babel配置文件大部分无需修改，edge浏览器的版本，可以从浏览器的关于页面查看到。

添加一个文件夹，assets，其中添加html的开始模板`index.html`：

```html
<!DOCTYPE html>
<html>
<head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
   <title>hyperscript rxjs test</title>
</head>
<body>
   <div id="root"></div>
</body>
</html>
```

webpack插件不支持模板变量，读者不必尝试在html文件中包含模板变量。

添加一个js代码的入口文件，`index.js`

```js
import { fragment, p } from 'hyperscript-rxjs'
import './index.css'

let elem = p('hello world!')

document.addEventListener('DOMContentLoaded', function () {
    const root = document.getElementById('root')
    let element = elem instanceof Array ? fragment(...elem) : elem
    root.appendChild(element)
})
```

这个程序向模板中id为root的元素添加你编写的元素。这个元素可以很复杂，并且带有交互功能。

## 测试运行

回到命令行窗口，确保路径是在项目文件夹的根目录。安装包

```
npm i
```

安装成功后，要想开发运行程序，请执行

```
npm start
```

稍等片刻，程序会自动打开浏览器，网页标签为`hyperscript rxjs test`，网页内容是`hello world!`

想要退出代码服务，在命令行按ctrl + C，键入y则退出。

## 合理分割代码

现代javascript的好处就是代码模块化，所以我们才会使用`webpack`。我们把框架代码留在主index.js中，具体的元素实现放到其他文件中。新建一个文件夹src，并在其中新建一个文件hello.js：

```js
import { p } from 'hyperscript-rxjs'
export const hello = p('hello world!')
```
修改根目录下的index.js

```js
import { fragment } from 'hyperscript-rxjs'
import { hello as elem } from './src/hello'
import './index.css'

document.addEventListener('DOMContentLoaded', function () {
    const root = document.getElementById('root')
    let element = elem instanceof Array ? fragment(...elem) : elem
    root.appendChild(element)
})
```

这样我们只需要导入root中的内容，就可以做出千变万化的前端网页。

重新测试，看看程序是否正常。

接下来的教程，只需要要修改第二行的文件路径，就可以测试程序。

