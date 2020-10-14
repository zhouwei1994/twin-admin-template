// const path = require("path");
const Webpack = require("webpack");
const {
    title,
    publicPath,
    assetsDir,
    outputDir,
} = require("./src/config/config");
process.env.VUE_APP_TITLE = title || "双生布局";
module.exports = {
    publicPath,
    assetsDir,
    outputDir,
    runtimeCompiler: true,
    configureWebpack(config) {
        return {
            // resolve: {
            //     alias: {
            //         "@": path.join(__dirname, "src"),
            //         "^": path.join(__dirname, "src/components"),
            //     },
            // },
            plugins: [
                new Webpack.ProvidePlugin({
                    echarts: "echarts",
                    "window.echarts": "echarts",
                    maptalks: "maptalks",
                    "window.maptalks": "maptalks",
                }),
            ],
        };
    },
    css: {
        requireModuleExtension: true,
        sourceMap: true,
        loaderOptions: {
            scss: {
                // scss-loader 10.0 该怎么写
                // additionalData: `@import "@/styles/variable.scss";`, // scss-loader 9.0
                // prependData: `@import "@/styles/variable.scss";`, // scss-loader 8.0
                // data: `@import "@/styles/variable.scss";`, // scss-loader 7.0
            }
        }
    }
}