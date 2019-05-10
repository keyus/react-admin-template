const {
    override,
    addBabelPlugin,
    fixBabelImports,
    disableEsLint,
    addWebpackAlias,
} = require('customize-cra');
const path = require("path");
const zip = require("./zip");

//build 之后打包插件
class DoneZipPlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        compiler.hooks.done.tap('DoneZipPlugin', () => {
            setTimeout(()=>{
                zip.startZip();
            },50)
        });
    }
}

const zipPlugin = config => {
    if(process.env.NODE_ENV === 'production'){
        config.plugins.push(new DoneZipPlugin())
    }
    return config;
}
module.exports = {
    webpack: override(
        addBabelPlugin('@babel/plugin-proposal-optional-chaining'),
        fixBabelImports('antd', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: 'css',
        }),
        disableEsLint(),
        addWebpackAlias({
            ["@com"]: path.resolve(__dirname, "src/components/"),
            ["@api"]: path.resolve(__dirname, "src/api/"),
            ["@util"]: path.resolve(__dirname, "src/util/"),
            ["@config"]: path.resolve(__dirname, "src/config/"),
            ["@http$"]: path.resolve(__dirname, "src/util/http.js"),
            ["@history$"]: path.resolve(__dirname, "src/util/history.js"),
            ["@view"]: path.resolve(__dirname, "src/view/"),
            ["@store"]: path.resolve(__dirname, "src/store/"),
            ["@action"]: path.resolve(__dirname, "src/store/action/"),
            ["@assets"]: path.resolve(__dirname, "src/assets/"),
            ["@scss"]: path.resolve(__dirname, "src/scss/"),
            ["@img"]: path.resolve(__dirname, "src/img/"),
        }),
        zipPlugin,              //如build之后不需要压缩，请注释
    ),
    devServer: function (configs) {
        return function(proxy, allowedHost) {
            const config = configs(proxy, allowedHost);
            config.proxy = {
                '/api/': {
                    target: 'http://192.168.1.1',
                    pathRewrite: { '^/api': '' }
                }
            };
            return config;
        };
    },
};
