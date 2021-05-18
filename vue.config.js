
module.exports = {
    lintOnSave: false,
    publicPath: "./",
    devServer: {
        open: process.platform === 'vue',
        proxy: { // 设置代理
            '/requestApi/*': {
                // target: 'http://study.hnedu123.cn:8084/',
                // target: 'http://172.18.0.31:8084',
                target: 'http://study.hnedu123.cn:8084',
                changeOrigin: true,
                pathRewrite: {
                    '^/requestApi': 'http://study.hnedu123.cn:8084'
                }
            },
            '/fileApi': {
                target: 'wj.hnedu123.cn:9099',
                changeOrigin: true,
                pathRewrite: {
                    '^/fileApi': 'wj.hnedu123.cn:9099'
                }
            },
        },
        disableHostCheck: true
    },
  
    // 第三方插件配置
    pluginOptions: {
        // ...
    }
}