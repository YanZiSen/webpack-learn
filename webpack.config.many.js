'use strict'

const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: {
        index: './src/index.js',
        search: './src/search.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',//占位符
    },
    module: {
        rules: [
            {
                test: /\.js/,
                use: 'babel-loader'
            },
            {
                test: /\.styl/,
                use: ['style-loader','css-loader','stylus-loader']
            },
            {
                test: /\.(jpg|png|gif|jpeg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240, // 10k打包成base64
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    mode: 'development',
    devServer: {
        contentBase: './dist', // server 的根目录
        hot: true
    }
}