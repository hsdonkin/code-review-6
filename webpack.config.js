const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

      module.exports = {
        entry: './src/main.js',
        output: {
          filename: 'bundle.js',
          path: path.resolve(__dirname, 'dist')
      },

      // added this to try and fix the consoles from appearing always at line 1
      devtool: 'eval-source-map',

      // this lets the dev server run
      devServer: {
        contentBase: './dist'
      },

      plugins: [
        new CleanWebpackPlugin(['dist']),
        new Dotenv(),
        new HtmlWebpackPlugin({
          title: 'twonumbers',
          template: './src/index.html',
          inject: 'body'
        })
      ],


      module: {
       rules: [
         {
           test: /\.css$/,
           use: [
             'style-loader',
             'css-loader'
           ]
         },
         {
        test: /\.js$/,
        exclude: /node_modules/,

        loader: "eslint-loader",
        options: {
          // eslint options (if necessary)
        }
      }

       ]
     }
   };
