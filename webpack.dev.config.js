const path = require('path')
const webpack = require('webpack')

const APP_ASSETS_PATH = path.join(__dirname, 'src/assets');

module.exports = {
  devtool: 'eval',

  entry: [
    'webpack-hot-middleware/client',
    './src/index.jsx'
  ],

  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: APP_ASSETS_PATH,
    alias: {
      // below, list global/mixin files to be imported VIA less (See naming solution/reasoning at https://github.com/webpack/less-loader/issues/32)
      "lesshat.less":         APP_ASSETS_PATH + '/css/lesshat.less',
      "functions.less":       APP_ASSETS_PATH + '/css/functions.less'
    }
  },

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      { test: /\.js?$/,
        loader: 'babel',
        exclude: path.join(__dirname, 'node_modules') },
      { test: /\.less?$/,
        loader: 'style!css!less',
        include: path.join(__dirname, 'src', 'assets', 'css') },
      {
        test: /\.css$/,
        loader: 'style-loader'
      },
      { test: /\.css?$/,
        loader: 'css-loader',
        include: path.join(__dirname, 'src', 'assets', 'css') },
      { test: /\.png$/,
        loader: 'file' },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file'},
      {
        test: /node_modules[\\\/]auth0-lock[\\\/].*\.js$/,
        loaders: [
          'transform-loader/cacheable?brfs',
          'transform-loader/cacheable?packageify'
        ]
      },
      {
        test: /node_modules[\\\/]auth0-lock[\\\/].*\.ejs$/,
        loader: 'transform-loader/cacheable?ejsify'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
}
