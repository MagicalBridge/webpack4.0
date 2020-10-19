// webpack 是使用node写出来的，因此 node 写法
let path = require('path');
module.exports = {
  devServer: { // 开发服务器配置
    port: 8080, // 端口
    progress: true, // 进度条
    contentBase: './build', // 基于哪一个文件夹启动服务
    compress: true, // 启动压缩
    open: true, // 是否自动打开浏览器
  },
  mode: 'development', // development 开发模式  production 生产模式
  entry: './src/index.js', // 入口
  output: {
    filename: 'bundle.js', // 打包后的文件名称
    path: path.resolve(__dirname, 'build'),
  }
}