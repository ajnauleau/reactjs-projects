var webpack = require("webpack")
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
var MiniCssExtractPlugin = require("mini-css-extract-plugin")
var path = require("path")

process.noDeprecation = true

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "dist/assets"),
        filename: "bundle.js",
        publicPath: "assets",
        sourceMapFilename: "bundle.map"
    },
    devtool: "#source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                query: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it uses publicPath in webpackOptions.output
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
    ],
}
