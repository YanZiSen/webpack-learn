'use strict'

const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const glob = require('glob')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
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
        filename: '[name]_[chunkhash:8].js',//占位符
    },
    module: {
        rules: [
            {
                test: /\.js/,
                use: 'babel-loader'
            },
            {
                test: /\.styl/,
                use: [
                    MiniCssExtractPlugin.loader,
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
                    },
                    'stylus-loader',
                ]
            },
            {
                test: /\.(jpg|png|gif|jpeg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        filename: '[name]_[hash:8].[ext]',
                        limit: 10240, // 10k打包成base64
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name:'[name]_[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp:/\.css$/,
            cssProcessor: require('cssnano')
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module: 'react',
                    entry: 'https://cdn.bootcss.com/react/16.8.6/cjs/react.production.min.js',
                    global: 'React'
                },
                {
                    module: 'react-dom',
                    entry: 'https://cdn.bootcss.com/react-dom/16.9.0-alpha.0/cjs/react-dom-server.browser.production.min.js',
                    global: 'ReactDOM'
                }
            ]
        })
    ].concat(webpackPlugins),
    mode: 'production'
}