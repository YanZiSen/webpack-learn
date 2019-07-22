'use strict'
const path = require('path')
module.exports = {
    entry: './src/index.js',//  打包入口, 单页应用为字符串，多页应用为object(key,value(path))形式
    output: {
        path: path.join(__dirname,'dist'),
        filename: 'bundle.js' // 文件名
    },
    mode: 'production', // 环境设置，production,development,none
    module: { // 用于webpack的加强，是一个函数，接受文件源代码，输出处理过后的内容
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader','stylus-loader'], // 从右向左进行解析
            }
        ]
    },
    // plugins: [ // 用于构建过程的优化，文件分割，文件提取，环境变量注入
    //     new WebpackHtml();
    // ]
}