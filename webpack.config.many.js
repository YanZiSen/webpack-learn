'use strict'

const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const glob = require('glob')
const setMPA = () => {
    const entry = {}
    const webpackPlugins = []
    const entryFiles = glob.sync(path.join(__dirname,'/src/*/index.js'))
    console.log(entryFiles)
    entryFiles.map(filePath => {
        let match = filePath.match(/src\/(.*)\/index\.js/)
        let fileName = match && match[1]
        console.log(fileName)
        entry[fileName] = filePath
        webpackPlugins.push(new HtmlWebpackPlugin({
            template: path.join(__dirname, `src/${fileName}/index.html`),
            chunks: [fileName],
            filename: `${fileName}.html`,
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }))
    })
    return {entry, webpackPlugins}
}
let {entry, webpackPlugins} = setMPA()
module.exports = {
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',//占位符
    },
    module: {
        rules: [
            {
                test: /\.js/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        // babel 报错 The code generator has deoptimised ... as it exceeds the max of 500KB.的解决方案
                        // query: {compact: false},
                        // exclude: /node_modules/
                    }
                }]
            },
            {
                test: /\.styl/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
                                })
                            ]
                        }
                    },
                    // {
                    //     loader: 'px2rem-loader',
                    //     options: {
                    //         remPrecision: 8,
                    //         remUnit: 75
                    //     }
                    // },
                    'stylus-loader'
                ]
            },
            {
                test: /\.css/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
                                })
                            ]
                        }
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remPrecision: 8,
                            remUnit: 75
                        }
                    }
                ]
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
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin()
    ].concat(webpackPlugins),
    mode: 'development',
    devServer: {
        contentBase: './dist', // server 的根目录
        hot: true
    },
    devtool: 'source-map'
}