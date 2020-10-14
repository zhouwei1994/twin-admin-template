<template>
  <div :id="'wang-editor' + id" class="wang-editor"></div>
</template>
<script>
import E from "./wangEditor.js";
// import { js } from "js-beautify";
import qiniuUpload from "@/components/qiniuUpload.js";
export default {
  name: "WangEditor",
  props: {
    value: {
      type: String,
      default: function () {
        return "";
      },
    },
  },
  data() {
    return {
      id: new Date().getTime(),
      editor: null,
      images: [],
    };
  },
  watch: {
    value(val) {
      // 设置内容
      this.editor.txt.html(val);
    },
  },
  mounted() {
    let _this = this;
    // 创建编辑器
    this.editor = new E("#wang-editor" + this.id);
    // 自定义菜单配置
    this.editor.customConfig.menus = [
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      "emoticon", // 表情
      "image", // 插入图片
      "table", // 表格
      "video", // 插入视频
      "code", // 插入代码
      "undo", // 撤销
      "redo", // 重复
      "fullScreen", // 全屏
    ];
    // 监听富文本内容变化
    this.editor.customConfig.onchange = function (html) {
      // 监控变化，同步更新到 textarea
      console.log(html);
      if (html == "<p><br></p>") {
        _this.$emit("input", "");
      } else {
        _this.$emit("input", html);
      }
    };
    // 自定义处理粘贴的文本内容
    this.editor.customConfig.pasteTextHandle = function (content) {
      // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
      return content;
      // return content + "<p>在粘贴内容后面追加一行</p>";
    };
    // 自定义图片插入
    this.editor.customConfig.imageClick = function () {
      _this.$elxImgbox({
        limit: 10, // 最多可选择图片数量
        maxSize: 5, // 最大尺寸（M）
        callback: (images) => {
          let html = "";
          images.forEach((item) => {
            html += "<img src='" + item.url + "'/>";
          });
          // 追加内容
          _this.editor.txt.append(html);
        },
      });
    };
    // 代码格式化
    this.editor.customConfig.codeHandle = function (text) {
      return text;
    };
    // 图片上传
    this.editor.customConfig.customUploadImg = function (options) {
      qiniuUpload({
        files: options.files,
        success: (res) => {
          let urls = [];
          res.forEach((item) => {
            urls.push(item.url);
          });
          options.success(urls);
        },
        progress: (res) => {
          options.progress(res.progress);
        },
        complete: () => {
          options.complete();
        },
      });
    };
    // 视频上传
    this.editor.customConfig.customUploadVideo = function (options) {
      qiniuUpload({
        files: options.files,
        success: (res) => {
          let urls = [];
          res.forEach((item) => {
            urls.push(item.url);
          });
          options.success(urls);
        },
        progress: (res) => {
          options.progress(res.progress);
        },
        complete: () => {
          options.complete();
        },
      });
    };
    // 插入链接的校验
    this.editor.customConfig.linkCheck = function (text, link) {
      console.log(text); // 插入的文字
      console.log(link); // 插入的链接

      return true; // 返回 true 表示校验成功
      // return '验证失败' // 返回字符串，即校验失败的提示信息
    };
    // 自定义配置颜色（字体颜色、背景色）
    this.editor.customConfig.colors = [
      "#000000",
      "#eeece0",
      "#1c487f",
      "#4d80bf",
      "#c24f4a",
      "#8baa4a",
      "#7b5ba1",
      "#46acc8",
      "#f9963b",
      "#ffffff",
    ];
    // 表情面板可以有多个 tab ，因此要配置成一个数组。数组每个元素代表一个 tab 的配置
    this.editor.customConfig.emotions = [
      {
        // tab 的标题
        title: "默认",
        // type -> 'emoji' / 'image'
        type: "image",
        // content -> 数组
        content: [
          {
            alt: "[坏笑]",
            src:
              "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/50/pcmoren_huaixiao_org.png",
          },
          {
            alt: "[舔屏]",
            src:
              "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/pcmoren_tian_org.png",
          },
        ],
      },
      {
        // tab 的标题
        title: "emoji",
        // type -> 'emoji' / 'image'
        type: "emoji",
        // content -> 数组
        content: ["😀", "😃", "😄", "😁", "😆"],
      },
    ];
    // 自定义字体
    this.editor.customConfig.fontNames = [
      "宋体",
      "微软雅黑",
      "Arial",
      "Tahoma",
      "Verdana",
    ];
    // 编辑区域的 z-index
    this.editor.customConfig.zIndex = 0;
    // 创建编辑器
    setTimeout(() => {
      this.editor.create();
      if (this.value && typeof this.value == "string") {
        // 设置内容
        this.editor.txt.html(this.value);
      }
    });
    
    // 追加内容
    // this.editor.txt.append("<p>追加的内容</p>");
    // 清空内容
    // this.editor.txt.clear();
  },
  methods: {
    save() {
      // 读取 html
      return this.editor.txt.html();
      // // 读取 text
      // return this.editor.txt.text();
      // // 获取 JSON 格式的内容
      // return this.editor.txt.getJSON();
    },
  },
};
</script>
<style lang="scss">
@import "./../code-prettify/theme7";

.wang-editor {
  background-color: #fff;
}
</style>
