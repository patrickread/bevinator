const path = require('path')
const webpack = require('webpack')

const APP_ASSETS_PATH = path.join(__dirname, 'src/assets');

module.exports = {
  devtool: 'source-map',

  entry: [
    './src/index.jsx'
  ],

  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: APP_ASSETS_PATH,
    alias: {

    }
  },

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],

  module: {
    loaders: [
      { test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/ },
      { test: /\.js?$/,
        loader: 'babel',
        exclude: /node_modules/ },
      { test: /\.less?$/,
        loader: 'style!css!less',
        include: path.join(__dirname, 'src', 'assets', 'css') },
      {
        test: /\.css$/,
        loader: 'style-loader'
      },
      { test: /\.css?$/,
        loader: 'css',
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
