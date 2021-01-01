// vue.config.js
module.exports = {
    // options...
    devServer: {
          proxy: 'http://localhost:9000/init',
      }
  }