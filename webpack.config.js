const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin') // html模板
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
var vueLoaderPlugin = require('vue-loader/lib/plugin')
const devMode = process.argv.indexOf('--mode=production') === -1

// const os = require('os')
// const HappyPack = require('happypack')
// const happyTreadPool = HappyPack.ThreadPool({size: os.cpus().length})

module.exports = {
  // entry: ['@babel/polyfill', path.resolve(__dirname, './src/main.js')],
  entry: {
    main: path.resolve(__dirname, './src/main.js')
  },
  output: {
    // filename: 'output.js',
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, './dist'),
    chunkFilename: 'js/[name].[hash:8].js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js',
      '@': path.resolve(__dirname, './src'),
      'assets': path.resolve(__dirname, './src/assets')
    },
    extensions: ['*', '.js', '.json', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            options: {
              publicPath: './dist/css',
              hmr: devMode
            }
          },
          // 'vue-style-loader', 
          // 'style-loader',
          // MiniCssExtractPlugin.loader, 
          'css-loader', 
          'postcss-loader'
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            options: {
              publicPath: './dist/css',
              hmr: devMode
            }
          },
          // 'vue-style-loader',
          // 'style-loader',
          // 拆分css
          // MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.jpe?g|png|gif$/i,
        use: [
          {
            loader: 'url-laoder',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: 'img/[name].[hash:8].[ext]',
              },
            },
          },
        ],
      },
      {
        test: /\.js$/,
        use: [
          {
              loader: 'babel-loader',
              options: {
                  presets: ['@babel/preset-env']
              },
          },
          // {
          //   loader: 'happypack/loader?id=happyBabel'
          // }
        ],
        exclude: /node_modeule/
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new vueLoaderPlugin(),
    // new HappyPack({
    //   id: 'happyBabel',
    //   loaders: [
    //     {
    //       loader: 'babel-loader',
    //       options: {
    //         presets: [
    //           ['@babel/preset-env']
    //         ],
    //         cacheDirectory: true
    //       }
    //     }
    //   ],
    //   threadPool: happyTreadPool
    // })
  ]
}
