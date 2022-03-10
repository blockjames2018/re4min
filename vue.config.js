module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "" : "/",
  devServer: {
    proxy: {
      "/api": {
        target: "http://159.65.65.173:8090/",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  }
};
