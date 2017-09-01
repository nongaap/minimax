const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const VENDOR_LIBS = ['react', 'react-dom'];

module.exports = {
  entry: {
    tictactoe: './frontendsrc/index.js',
    fourbyfour: './frontendsrc/indexFourbyfour.js',
    vendor: VENDOR_LIBS,
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
  },
  module: {
    rules: [
      {
        use: ['react-hot-loader', 'babel-loader'],
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
        test: /(\.css|\.scss)$/,
      },
      {
        test: /\.(png|jpg|jpeg|ico|gif|svg|woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader?name=[name].[ext]',
      },
    ],
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      excludeChunks: ['fourbyfour'],
      favicon: 'frontendsrc/assets/images/favicon.ico',
      template: 'frontendsrc/index.html',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      excludeChunks: ['tictactoe'],
      favicon: 'frontendsrc/assets/images/favicon.ico',
      template: 'frontendsrc/index.html',
      filename: 'fourbyfour.html',
    }),
  ],
};
