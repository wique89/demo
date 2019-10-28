'use strict'

 
const htmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
    /**
     * You will need to set publicPath if you plan to deploy your site under a sub path,
     * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then publicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     * Detail: https://cli.vuejs.org/config/#publicpath
     */
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    devServer: {
        port: 10000,
        clientLogLevel: 'warning',
        //https: true,       
        proxy: {
            // '/runtime': {
            //     target: 'http://hpc.ai-research.cn:18002/runtime',
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/runtime': ''
            //     }
            // },
            '/runtime': {
                target: 'http://afr.duiopen.com/runtime',
                changeOrigin: true,
                pathRewrite: {
                    '^/runtime': ''
                }
            },
            '/polls': {
                target: 'http://222.92.255.181:29801/polls',
                changeOrigin: true,
                pathRewrite: {
                    '^/polls': ''
                }
            }

        }
    },
    configureWebpack: {
        // plugins:  
        //     [
        //         new htmlWebpackPlugin({
        //             template: './public/index.html',
        //             filename: 'index-[hash].html',
        //             inject: 'head',
        //             inlineSource: '.(js|css|jpg|png|gif|woff|ttf)'
        //         }),
        //         new HtmlWebpackInlineSourcePlugin()
        //     ] 
      }
    
}
