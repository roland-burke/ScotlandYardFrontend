module.exports = {
  publicPath: "/ScotlandYard",
  devServer: {
    proxy: "http://localhost:9000/init"
  },
  transpileDependencies: ["vuetify"],
  pwa: {
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true
    }
  }
};
