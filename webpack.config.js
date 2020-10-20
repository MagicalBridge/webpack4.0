// webpack 是使用node写出来的，因此 node 写法
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development', // development 开发模式  production 生产模式
  entry: './src/index.js', // 入口
  output: {
    filename: 'main.[hash:8].js', // 打包后的文件名称 可以添加hash 
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [ // 数组 放着所有的webpack插件
    new HtmlWebpackPlugin({
      template: './src/index.html', // 指定以哪个文件为模板
      filename: 'index.html', // 打包后的文件也叫做index.html
      minify: {
        removeAttributeQuotes: true, // 去除双引号
        collapseWhitespace: true, // 折叠空行
      },
      hash: true, // hash 防止缓存
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    })
  ],
  module: {
    // 这里面都是一些loader的配置规则
    rules: [ // 规则 css-loader 
      {
        test: /.css$/, 
        use: [
          // {
          //   loader: 'style-loader',
          // },
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /.less$/, 
        use: [
          // {
          //   loader: 'style-loader',
          // },
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader' // 处理 less 文件
        ]
      }
    ]
  }
}