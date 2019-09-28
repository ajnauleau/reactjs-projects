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
                        loader: MiniCssExtractPlugin.loader
                    },

                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            modules: true,
                            localIdentName: "[local]___[hash:base64:5]"
                        }
                    },

                    {
                        loader: 'postcss-loader',
                        options: {
                            options: {},
                        }
                    }
                ]
            },
        ]
    },
    target: "node",
    plugins: [
        new MiniCssExtractPlugin()
    ],
}
