/**
 * @copyright zhouwei 465081029@qq.com
 * @description 自动根据modules文件下js去注册全局变量
 */
const files = require.context("./modules", false, /\.js$/);
const modules = {};

files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.js)/g, "")] = files(key);
});
export default modules;
