/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
const pathToPhaser = path.join(__dirname, "/node_modules/phaser/");
const phaser = path.join(pathToPhaser, "dist/phaser.js");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const CopyPlugin = require("copy-webpack-plugin");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.ts",

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },

    module: {
        rules: [
            { test: /\.ts$/, loader: "ts-loader", exclude: "/node_modules/" },
            {
                test: /phaser\.js$/,
                loader: 'expose-loader',
                options: {
                    exposes: { globalName: 'Phaser', override: true },
                },
            }
        ]
    },

    plugins: [
        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src/assets'),
                to: path.resolve(__dirname, 'dist/assets')
            }],
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],

    performance: {
        maxEntrypointSize: 900000,
        maxAssetSize: 900000
    },

    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        publicPath: "/dist/",
        host: "127.0.0.1",
        port: 8080,
        open: true
    },

    resolve: {
        extensions: [".ts", ".js"],
        alias: {
            phaser: phaser
        }
    }
};
