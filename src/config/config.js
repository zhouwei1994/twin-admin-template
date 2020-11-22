module.exports = {
  // 部署时的URL
  publicPath: "/vue2Admin/",
  // 生产环境构建文件的目录名
  outputDir: "dist",
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: "static",
  //标题 （包括初次加载雪花屏的标题 页面的标题 浏览器的标题）
  title: "双生布局",
  //是否显示logo，不显示时设置false
  logo: "https://cn.vuejs.org/images/logo.png",
  // 简介
  introduction: "一款后台管理多种布局的框架",
  //token名称
  tokenName: "token",
  //token存储位置localStorage sessionStorage cookie
  storage: "localStorage",
  //配后端数据的接收方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
  contentType: "application/json;charset=UTF-8",
  //消息框消失时间
  messageDuration: 3000,
  //最长请求时间
  requestTimeout: 10000,
  //操作正常code
  successCode: 200,
  //登录失效code
  invalidCode: 402,
  //无权限code
  noPermissionCode: 401,
  //设置生产环境是否屏蔽f12等开发组工具快捷键
  shieldF12: false,
};
