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
          loader: "url-loader",
          options: {
            // 占位符
            name: "[name].[ext]", // 这个配置说明 使用原来的文件名称+后缀名
            outputPath:'images/', // 这里即使我使用了这个  outputPath 选项 url-loader 也不会移动图片 
            limit:2048
          }
        }
      }
    ]
  },
  output: {
    filename: "boundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
