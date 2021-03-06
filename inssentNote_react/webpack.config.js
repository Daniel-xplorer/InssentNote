const path = require('path');
const HtmlWebpackPlugin = require("Html-webpack-plugin");

module.exports = {
    entry: path.join(__dirname,'src','index.jsx'),
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        publicPath: '/'
    },
    mode: process.env.NODE_ENV || 'development',
    module: {
        rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
            loader: 'babel-loader',
            options: {
                presets: [['@babel/preset-react', {"runtime": "automatic", "throwIfNamespace": false}], '@babel/preset-env'],
                plugins: [
                    ["@babel/plugin-transform-runtime"]
                ]
            }
            }
        },
        {
            //css modules
            test: /\.css$/,
            use: [
                {
                    loader: "style-loader"
                },
                {
                    loader: "css-loader",
                    options:
                    {
                        modules: {
                            localIdentName: "[local]___[hash:base64:5]"
                        }
                    }
                }
            ]
        },
        {
            //global
            test: /\.gcss$/,
            use: ['style-loader', 'css-loader'],
        },
        ],
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'public', 'index.html'),
        filename: 'index.html'
        })
    ]
}
