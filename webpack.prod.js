const path = require('path')
const Webpack = require('webpack')
const WebpackConfig = require('./webpack.config') 
const WebpackMerge = require('webpack-merge') //  合并配置
const CopyWebpackPlugin = require('copy-webpack-plugin') // 拷贝静态资源
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 压缩js

// webpack mode设置production的时候会自动压缩js代码。原则上不需要引入uglifyjs-webpack-plugin进行重复工作。
// 但是optimize-css-assets-webpack-plugin压缩css的同时会破坏原有的js压缩，所以这里我们引入uglifyjs进行压缩


module.exports = WebpackMerge(WebpackConfig, {
    mdoe: 'production',
    devtool: 'cheap-module-source-map',
    plugins: [
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, './public'),
            to: path.resolve(__dirname, './dist')

        }])
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCssAssetsPlugin({})
        ],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                libs: {
                    name: 'chunk-libs',
                    test: /[\\/]name_modules[\\/]/,
                    priority: 10,
                    chunks: 'initial'
                }
            }
        }
    }
})