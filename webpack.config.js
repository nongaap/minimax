const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const VENDOR_LIBS = ['react', 'react-dom'];

module.exports = {
  entry: {
    bundle: './frontendsrc/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        use: ['react-hot-loader', 'babel-loader'],
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
        test: /(\.css|\.scss)$/
      }
    ]
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        secure: false
      }
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: 'frontendsrc/index.html'
    })
  ]
};
