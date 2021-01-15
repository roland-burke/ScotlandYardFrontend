module.exports = {
  publicPath: "/ScotlandYard",
  devServer: {
    proxy: "http://localhost:9000/init"
  },
  transpileDependencies: ["vuetify"]
};
