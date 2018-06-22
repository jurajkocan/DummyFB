// @ts-check

import { resolve } from 'path';

const config = {
    context: __dirname,
    entry: {
        login: "./src/frontend/pages/security/LoginClient.tsx",
        app: "./src/frontend/pages/RenderApplicationClient.tsx"
    },
    target: "web",
    mode: "development",
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
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: "ts-loader?configFile=tsconfig.json",
            }
        ]
    },
    // plugins: [
    //     new CopyWebpackPlugin([
    //         { from: './lib/files/images', to: 'images' }
    //     ])
    // ]
};

module.exports = config;
