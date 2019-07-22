涉及到的命令行
npm install webpack webpack-cli --save-dev
./node_modules/.bin/webpack --conifig ./webpack.config.js
npm i @babel/core @babel/preset-env babel-loader -D -D就是--save-dev
npm i @babel/preset-react react react-dom -D 安装解析rect和rx.js的能力
npm i css-loader style-loader stylus stylus-loader -D #css-loader 在js文件里面引入css的时候会用到，将css文件打包成common.js文件引入，style-loader 将样式插入style标签中
npm i file-loader url-loader -D # file-loader和url-loader使用一个即可，url-loader封装了file-loader，可以设置小图片base64内联
npm i webpackk-dev-server -D
npm i mini-css-extract-plugin -D
npm install cssnano html-webpack-plugin optimize-css-assets-webpack-plugin -D
babelrc 
    presets 代表插件集合
    plugins 一个plugins代表一个功能
    例如
        "plugins":[
            "@babel/proposal-class-properties"
        ]

webpack 文件监听的实现方式
    * 命令行内添加--watch
    * webpack 配置中添加watch key ,value为 true
    * 原理分析，按设置时长轮询文件的最后修改时间，如果文件有改动，放入缓存列表里，然后等待一个时长，统一更新列表里的文件

webpack-dev-server 热更新
    package.json 里加入 webpack-dev-server --open --open指打包完打开浏览器
    webpack.config.js 里加入

文件指纹
    hash 占位符代表项目每次构建生成一次
    chunkhash 模块不同hash不同
    contenthash 文件内容该表hash值才会改变

抽离css
    使用mini-css-extract-plugin插件
    mini-css-extract-plugin 与style-loader冲突，去掉style-loader使用其自带的loader进行分离