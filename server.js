const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const config = require("./webpack.config.js");
const compiler = webpack(config); // 结合现有的配置文件可以随时进行编译

const app = express();

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  })
);

app.listen(3000, () => {
  console.log("server is running at 3000 port");
});
