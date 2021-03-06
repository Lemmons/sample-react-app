const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path') 
const webpack = require('webpack');


module.exports = {
  entry: [
    './src/index.js',
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: [ path.resolve(__dirname, 'assets') ],
    progress: true,
    host: '0.0.0.0',
    port: 80,
    watchOptions: {
        poll: 500
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([ { from: 'assets', to: 'assets' } ]),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html')
    }),
    new FaviconsWebpackPlugin('./assets/logo.png'),
    new webpack.NamedModulesPlugin()
  ],
};
