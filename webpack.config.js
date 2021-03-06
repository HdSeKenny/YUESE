const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const outputDirectory = 'dist/build'

module.exports = {
  entry: ['babel-polyfill', './src/client/index.js'],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        // Stylus LOADER
        // Reference: https://github.com/
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          use: ['raw-loader', 'stylus-loader'],
        })
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  devServer: {
    port: 9000,
    // open: true,
    stats: {
      modules: false,
      cached: false,
      colors: true,
      chunks: false
    },
    proxy: {
      // '/api': 'http://localhost:8080'
    }
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),

    // Reference: https://github.com/webpack/extract-text-webpack-plugin
    // Extract css files
    // Disabled when in test mode or not in build mode
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: false
    }),

    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    })
  ]
}
