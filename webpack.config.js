const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js"
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            // 占位符
            name: "[name].[ext]", // 这个配置说明 使用原来的文件名称+后缀名
            outputPath:'images/'
          }
        }
      }
    ]
  },
  output: {
    filename: "[name].[hash:8].js",
    path: path.resolve(__dirname, "dist")
  }
};
