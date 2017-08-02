 var path = require('path');
 var webpack = require('webpack');
 let HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
     entry: './src/app.js',
     output: {
         path: path.resolve(__dirname, 'build'),
         filename: 'app.bundle.js'
     },
     plugins: [new HtmlWebpackPlugin()],
     module: {
         loaders: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015', 'react']
                 }
             }
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };
