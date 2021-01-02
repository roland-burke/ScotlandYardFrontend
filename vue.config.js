// vue.config.js
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/production-sub-path/'
    : '/',
    devServer: {
          proxy: 'http://localhost:9000/init',
      }
  }