const path = require("path");
const DtsBundlePlugin = require("webpack-dts-bundle").default;

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "index.js",
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
            exclude: [
                /node_modules/,
                path.resolve( __dirname, "src/__test__/")
            ],
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
            exclude: [
                /node_modules/,
                path.resolve( __dirname, "src/__test__/")
            ]
        }]
    },
    plugins:[
        new DtsBundlePlugin({
            name: "@psykosoldi3r/typescript-npm-module",
            main: path.resolve( __dirname, "./dist/**/*.d.ts"),
            out: path.resolve( __dirname, "./dist/index.d.ts"),
            removeSource: true
        })
    ]
};
