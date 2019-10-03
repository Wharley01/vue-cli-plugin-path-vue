// let BrowserSyncPlugin = require('vue-cli-browser-sync-webpack-plugin');
let config = require('./path/project.pconf.json')
// let wp_conf = require('./webpack.base.config')
const PORT = config.PROJECT.port
const HOST = config.PROJECT.host
module.exports = {
  productionSourceMap: false,
  filenameHashing: false,
  chainWebpack: config => {
    config.optimization.splitChunks(false)
  },
  configureWebpack: (config) => {
    config.output.globalObject = "this"
    return {
      entry: {
        server: './src/entry-server.js',
        client: './src/entry-client.js'
      }
    }
  },
  baseUrl: process.env.NODE_ENV === 'production' ? '/dist/' : '/',
  devServer: {
    proxy: {
      '/api': {
        target: config.PROJECT.server
      },
      '/SSE': {
        target: config.PROJECT.server
      },
      '/src/assets/images': {
        target: config.PROJECT.server
      },
      '/path': {
        target: config.PROJECT.server
      }
    },
    port: PORT,
    historyApiFallback: true,
    host: HOST,
    hot: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true,
      ignored: /node_modules/
    }
  },
  pluginOptions: {
    browserSync: {
      host: HOST,
      port: PORT,
      proxy: `http://${HOST}:${PORT}`,
      reload: false,
      open: true
    }
  }
}
