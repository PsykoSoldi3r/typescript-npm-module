const path = require("path");
const DtsBundlePlugin = require("webpack-dts-bundle").default;

module.exports = {
    entry: "./index.ts",
    output: {
        filename: "Broadcast.js",
        path: path.resolve( __dirname, "dist" ),
    },
    resolve: {
        extensions: [".js", ".ts"],
        modules: [
            path.resolve("./src"),
            path.resolve("./node_modules")
        ]
    },
    module:{
        rules:[{
            test: /\.ts?/,
            exclude: /node_modules/,
            enforce: "pre",
            use: {
                loader: "tslint-loader",
                options: {
                    emitErrors: false
                }
            }
        },{
            test: /\.ts?/,
            loader: "ts-loader",
            exclude: /node_modules/
        }]
    },
    plugins:[
        new DtsBundlePlugin({
            name: "Broadcast",
            main: path.resolve( __dirname, "./dist/**/*.d.ts"),
            out: path.resolve( __dirname, "./index.d.ts"),
            verbose: true,
            removeSource: true
        })
    ]
};
