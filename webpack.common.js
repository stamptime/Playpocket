const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry:{
      popup: './src/popup.jsx',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
      },

      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'images',
        },
      },

      {

        test: /\.css$/i,
        use: [ 'style-loader', 'css-loader'],
        
      }

    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template:'./src/popup.html',
      filename: 'popup.html'
    }),
    new CopyPlugin({
      patterns: [{from:'./public'}]
    }),
  ]

};