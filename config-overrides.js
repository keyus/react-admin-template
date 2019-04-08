const {
    override,
    fixBabelImports,
    disableEsLint,
    addWebpackAlias,
} = require('customize-cra');
const path = require("path");

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
    }),
    disableEsLint(),
    addWebpackAlias({
        ["@com"]: path.resolve(__dirname, "src/components/"),
        ["@util"]: path.resolve(__dirname, "src/util/"),
        ["@view"]: path.resolve(__dirname, "src/view/"),
        ["@store"]: path.resolve(__dirname, "src/store/"),
        ["@action"]: path.resolve(__dirname, "src/store/action/"),
        ["@assets"]: path.resolve(__dirname, "src/assets/"),
        ["@scss"]: path.resolve(__dirname, "src/scss/"),
        ["@img"]: path.resolve(__dirname, "src/img/"),
    })
);
