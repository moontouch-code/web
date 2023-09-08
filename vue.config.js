const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);
module.exports = {
    productionSourceMap: false,
    filenameHashing:true,
    devServer: {
        port: 8080,
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@assets', resolve('src/assets'))
            .set('@common', resolve('src/assets/common'))
            .set('@h5', resolve('src/assets/h5'))
            .set('@web', resolve('src/assets/web'))
            .set('@components', resolve('src/components'))
            .set('@mixins', resolve('src/mixins'))
            .set('@views', resolve('src/views'))
            .set('@store', resolve('src/store'))
            .set('@utils', resolve('src/utils'))
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'MoonTouch'
                return args
            })
        config
            .module
            .rule("images")
            .test(/\.(jpg|png|gif|webp|jpeg)$/)
            .use("url-loader")
            .loader("url-loader")
            .options({
                limit: 10,
                publicPath: process.env.NODE_ENV === 'production' ? 'https://download.moontouch.io/res/web/img/' : '/img',
                outputPath: 'img',
                name: `[path][name].[ext]`,
            })
            config
            .module
            .rule("fonts")
            .test(/\.(woff|ttf)$/)
            .use("url-loader")
            .loader("url-loader")
            .options({
                limit: 10,
                publicPath: process.env.NODE_ENV === 'production' ? 'https://download.moontouch.io/res/web/font/' : '/font',
                outputPath: 'font',
                name: `[path][name].[ext]`,
            })
            
    },
}