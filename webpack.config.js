const path = require('path');

module.exports = {
  entry: './index.js',
  mode: "production", //development
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'printBigChar.min.js',
    library: 'printBigChar',  //库名字, 取名叫printBigChar, 可以直接调用，比如window.printBigChar
    libraryTarget: 'umd',     //输出library规范代码, umd是兼容amd和cmd的
    umdNamedDefine: true,     //会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define
    libraryExport: "default", // 对外暴露default属性，就可以直接调用default里的属性
    globalObject: 'this'      // 定义全局变量,兼容node和浏览器运行，避免出现"window is not defined"的情况
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre', // 在执行编译之前去执行eslint-loader检查代码规范，有报错就不执行编译
        exclude: /node_modules/,
        use: "eslint-loader"
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};