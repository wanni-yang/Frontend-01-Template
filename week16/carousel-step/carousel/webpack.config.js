const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = {
  title: 'carousel',
  filename: 'index.html',
  template:'./src/index.html',
  inject:'body'
}
module.exports = {
  entry: './src/main.js',
  output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [[
              "@babel/plugin-transform-react-jsx",
              { pragma: "create" }
            ]]
          }
        }
      },
      {
        test: /\.css$/,
        use:{loader:require.resolve('./src/css-loader.js')}
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin(HtmlWebpackPluginConfig)],
  mode: "development",
  optimization: {
    minimize: false
  }
}