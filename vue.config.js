module.exports = {
  publicPath: "/",
  devServer: {
    proxy: "http://localhost:9000/init"
  },
  transpileDependencies: ["vuetify"]
};
