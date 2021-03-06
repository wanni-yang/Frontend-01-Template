module.exports = {
    entry: "./main.js",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [['@babel/plugin-transform-react-jsx', { pragma: 'create' }]]
                    }
                }

            },
            {
                test:/\.toyvue/,
                use:{
                    loader:require.resolve('./myloader.js') //将myloader变成有效的webpack loader
                }
            }
        ]
    },
    mode: "development",
    optimization: {
        minimize: false
    }
}