module.exports = {
  entry: './main.js',

  mode: 'development',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env' ],
          },
        },
      },
      {
        test: /\.css$/,
        use: {
          // loader: 'css-loader',
          loader: require.resolve('./mycss-loader.js'),
        },
      },
    ],
  },

  optimization: {
    minimize: false,
  },
}
