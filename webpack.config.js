const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        index: "./src/index.tsx"
    },
    mode: "development",
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            compilerOptions: { noEmit: false },
                        }
                    }],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
        ],
    },
    plugins: [
        ...getHtmlPlugins(["index"]),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
        publicPath: "/",
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'), // Serve static files from "dist"
        },
        port: 3000, // Specify a port
        open: true, // Automatically open the browser
        hot: true, // Enable Hot Module Replacement
        historyApiFallback: true, // Serve index.html for SPA routes
    },
};

function getHtmlPlugins(chunks) {
    return chunks.map(
        (chunk) =>
            new HTMLPlugin({
                title: "Dropbox",
                filename: `${chunk}.html`,
                chunks: [chunk],
                template: path.resolve(__dirname, "index.html"),
            })
    );
}