### webpack4.0

this is webpack4.0 learning git

### webpack 搭建环境

webpack 本质上是用 node 构建的模块打包工具
初始化启动目录结构 npm init

1、安装 webpack 有两种方式

第一种: 全局安装  
 `sudo npm install webpack webpack-cli -g`

安装成功之后使用 `webpack -v` 能够查看版本号

这种安装的方式 是有一些弊端的。

第二种：项目中安装

`npm install webpack webpack-cli --save-dev`
`npm install webpack webpack-cli -D`

以上两种写法是等价的

安装完成之后我们尝试使用 `webpack -v` 去查看版本号 发现 `command not found: webpack` 这是因为
执行 webpack -v 的时候会默认的向全局寻找 webpack 但是我们全局没有 webpack

我们可以使用 npx 来达成同样的目标 `npx webpack -v` 4.32.2
npx 这个命令会帮助我们在当前项目的 `node_modules` 里面寻找我们的 weback 模块

我们如果想要安装指定版本的 webpack 怎么操作呢？

首先我们使用 `npm info` 来查看 webpack 的相关的包的信息

`npm info webpack` 查看出来的 3.0 版本的最后是 3.12

2、webpack 的配置文件
webpack4.0 版本中又增加了很多的默认的配置。
webpack 中的配置文件的名称是 `webpack.config.js`

当我们在项目中使用 npx webpack 的时候并不知道去打包什么内容，就会去找配置文件


3、如何使用npm script 来简化我们的操作

我们在 package.json 里面 在script 里面添加 "build":"webpack" 添加相关命令
之后使用npm run build 就能够达到同样的效果。
