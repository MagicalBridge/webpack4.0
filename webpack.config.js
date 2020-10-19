// webpack 是使用node写出来的，因此 node 写法
let path = require('path');
module.exports = {
  mode: 'development', // development 开发模式  production 生产模式
  entry: './src/index.js', // 入口
  output: {
    filename: 'bundle.js', // 打包后的文件名称
    path: path.resolve(__dirname, 'dist'),
  }
}