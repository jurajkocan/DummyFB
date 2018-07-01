// @ts-check

import { resolve } from "path";
const Webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

const config = {
    context: __dirname,
    entry: {
        login: "./src/frontend/pages/security/LoginClient.tsx",
        app: "./src/frontend/pages/RenderApplicationClient.tsx"
    },
    target: "web",
    mode: "production",
    output: {
        path: resolve(__dirname, "public"),
        filename: "[name].js",
        publicPath: "/"
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            {
                exclude: /node_modules/,
                use: "ts-loader?configFile=tsconfig.json"
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([{ from: "./src/server/images", to: "images" }]),
        new UglifyJSPlugin(),
        new Webpack.DefinePlugin({
            "process.env.NODE_ENV": '"production"'
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.ts$|\.tsx$|\.html$/,
            threshold: 10240,
            minRatio: 0
        })
    ]
};

module.exports = config;
