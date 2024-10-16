const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
  ? '/<repository-name>/' // 替换为你的仓库名
  : '/',
  transpileDependencies: true,
  configureWebpack: {
    devtool: 'source-map'
  }, 
})
