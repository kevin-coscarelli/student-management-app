const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const fs = require('fs')

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    devtool: "source-map",
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(jpg|jpeg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ]
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        configFile: "tsconfig.webpack.json"
                    }
                }]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: {
        compress: true,
        port: 9000,
        hot: true,
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, './'),
        },
        server: {
            type: 'https',
            options: {
                key: fs.readFileSync('../keys/server.key'),
                cert: fs.readFileSync('../keys/server.crt'),
            },
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        new webpack.ProvidePlugin({
            React: 'react'
        }),
    ],
}
