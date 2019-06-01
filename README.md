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

3、如何使用 npm script 来简化我们的操作

我们在 package.json 里面 在 script 里面添加 "build":"webpack" 添加相关命令
之后使用 npm run build 就能够达到同样的效果。

我们说一下 webpack-cli 的作用就是帮助我们识别 webpack 这个命令 和 npx webpack 这个命令

4、介绍打包信息

```bash
Hash: 16d2d129eeadac8072f5  // 本地打包的唯一的hash值
Version: webpack 4.32.2 // 版本指的是 使用的webpack的
Time: 106ms  // 本次打包使用的时间
Built at: 2019-05-25 19:27:35 //
     Asset       Size  Chunks             Chunk Names
boundle.js  962 bytes       0  [emitted]  main
Entrypoint main = boundle.js // 输出的  boundle.js
[0] ./src/index.js 56 bytes {0} [built]


WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/

'mode'选项尚未设置，webpack将回退到此值的'production'。将“mode”选项设置为“development”或“production”以启用每个环境的默认值。您还可以将其设置为“无”以禁用任何默认行为。

```

这里需要注意一个点 如果我们不进行，mode 配置就会出现上述的错误，但是 webpack 默认的配置就是 production
这样打包出来的代码是 压缩过的，如果我们启用 development 那么打包出来的代码就是 未被压缩的代码。

### webpack 核心概念

1、loader 是什么？ --> 模块解析器

```js
module: {
  rules: [
    {
      test: /\.jpe?g$/,
      use: {
        loader: "file-loader"
      }
    }
  ];
}
```

这里有两个小的知识点，一个是 正则中的问好表示可有可无 第二是 test 可以接收一个数组

我在 index.js 中引入了一个 图片 然后使用了 file-loader 进行了图片的打包 本身 webpack
天生就知道如何打包 js 文件 但是并不知道如何处理图片这种静态资源文件 webpack 会将这总图片文件
移动到你的目标文件夹中，移动之后 会返回给我们一个值，这就是 file-loader 底层做的事情。

通过上面的这个例子 loader 就是一种打包的方案。

2.如何对图片的打包做额外的配置

比如我们打包完成之后并不想改变图片的名称。
在配置的 loader 的时候 我们可以增加额外的参数 这些参数我们可以放在
options 这个配置项里面

```js
module: {
  rules: [
    {
      test: /\.jpe?g$/,
      use: {
        loader: "file-loader",
        options: {
          name:[name].[ext]
        }
      }
    }
  ];
}
```

name:[name].[ext] 这个占位符的使用 输出的意思是 使用原始文件的文件名和后缀.

现在我们又想将我们的图片打包之后放在了 imgges 文件夹下面 需要再增加一个配置
module: {
rules: [
{
test: /\.jpe?g\$/,
use: {
loader: "file-loader",
options: {
name:[name].[ext],
outputPath:'images/'
},
}
}
];
}

url-loader 在打包的时候并不会将图片 移动而是将图片 转换成一个 base64 的图片
直接放在我们的 boundle.js 里面

但是这种使用是不合理的。

如果一个图片非常小, 1-2 kb 使用 base64 非常的合适，不要单独发送一个 http 请求
如果这个图片非常大的话 我们就放在 dist 目录下面 其实这个地方可以做一个配置 limit

如果拥有这个字段意思就是 如果我们的图片的大小 多于 2048 个字节的话 就和 file-loader 执行
一样的操作

```js
module: {
  rules: [
    {
      test: /\.jpe?g$/,
      use: {
        loader: "url-loader",
        options: {
          name:[name].[ext],
          outputPath:'images/',
          limit:2048
        },
      }
    }
  ];
}
```

css-loader 和 style-loader 这两个 loader 是处理 css 必须要的

```js
module: {
  rules: [
    {
      test: /\.css$/,
      use: ["style-loader", "css-loader"]
    }
  ];
}
```

css loader 的作用是 分析css 内容 做一些合并的工作。
style-loader  作用是 将我们的 样式挂载到我们的 head 标签上面 

sass less stylus 

我们想使用sass 安装 sass 和 node-sass


### webpack 的 plugin 

1、为了方便生成html 我们和对于html 模板进行配置 
html-webpack-plugin 会在打包之后自动生成一个html文件并把打包生成的js自动引入到这个html 文件中
从这里我们可以看到 plugin 可以在webpack 运行在某一个时刻的时候帮你我们增加一些事情。


2、如果我们想要清空之前打包的文件。
使用了 clean-weppack-plugin

### 学习配置entry 和 output
我们可以在入口文件中添加两个入口,分别对应两个打包文件打包生成的
文件都会放进html模板里面

还有一个需求 如果我们想要将打包好的js文件放入cdn 中  html 提供给服务端 
这个时候我们需要将引入的 js 的路径变成 一个绝对cdn 路径。这个时候 我们需要对于
需要在output 里面做一些配置工作


### 学习sourceMap
1.其实这是一种映射关系,当我们代码写错的时候, 如果不可以sourceMap
那么报错会在最终的 打包的终态文件夹下面报错，但是实际上我们想要的是在
我们书写的那个文件中定位，这样才能方便寻找。

在 配置中添加   devtool:'none', 这一个配置是关闭 这个sourceMap
devtool:'source-map', 添加这个 可以进行定位
这个配置在 react脚手架中看到的比较多。


一般来说 最佳实践是：在生产环境我们是禁止使用 source-map的
如果非得要使用我们可以使用 cheap-mudule-source-map
开发环境我们使用 cheap-mudule-eval-source-map









