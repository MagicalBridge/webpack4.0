const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require('webpack');

module.exports = {
  mode: "development",
  // entry: 标识的是项目的入口文件
  entry: {
    main: "./src/index.js",
    sub: "./src/index.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"), // 打包之后的文件的输出目录
    publicPath: 'https://www.bestpay.com'
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
            outputPath: "images/" // 这里即使我使用了这个  outputPath 选项 url-loader 也不会移动图片
          }
        }
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 接收一个template 属性 指定一个模板
      template: path.resolve(__dirname, "src/index.html"),
    }),
    // 这个在新版本中使用 是作为一个对象被解构出来的
    new CleanWebpackPlugin(),
    // 显示进程
    new webpack.ProgressPlugin(),
  ]
};
