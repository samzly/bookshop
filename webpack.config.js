const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');


module.exports = {
    mode: 'production',
    performance: {
        maxAssetSize: 5000000,
        maxEntrypointSize: 5000000,
    },
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        clean: true,
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        port: 777,
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            filename: 'index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(s[ac]ss|css)$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true,
                        },
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                        }
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'files/[name].[ext]',
                        }
                    },
                ],
            },
        ],
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin(),
        ],
        minimize: true,
    }
}