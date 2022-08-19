const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js', // 打包入口
  module: {
    rules: [
      {
        test: /\.less$/i,
        loader: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.js?$/,
        use: ['babel-loader'],
      },
    ],
  },
  output: { // 打包出口
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist/umd'),
    globalObject: 'this', // 兼容node环境下的window问题
    libraryTarget: 'umd',
    library: 'haha_compoments_video', // 兼容 script引入
    // umdNamedDefine: true, // 如果 output.libraryTarget
    // 设置为umd 而且output.library 也设置了。这个设为true，将为AMD模块命名。
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist/umd'),
    port: 8766,
    host: 'localhost',
    compress: true,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: false, // 删除空白符与换行符
        minifyCSS: true, // 压缩内联css
      },
    }),
  ],
};