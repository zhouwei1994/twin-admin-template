import Vue from 'vue'
import twin from "twin-layout";
import { title, logo } from "@/config/config";
import { getRouterList } from "@/api/modules/admin";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
let twinLayout = undefined;
// 销毁双生布局
export const destroyTwin = function () {
  // 销毁双生布局
  twinLayout && twinLayout.destroy();
}
export default function () {
  twinLayout = new twin({
    // 字体图标class设置
    iconFontClass: "iconfont",
    // 后台管理名称
    title: title,
    // 后台管理logo
    logo: logo,
    // 用户信息
    userInfo: {
      nickname: store.state.userInfo.nickname, //昵称
      avatar: store.state.userInfo.avatar, //头像
      noticeNum: 8, //消息数
      ...store.state.userInfo
    },
    // 设置背景图片
    // background: [
    //   "http://",
    //   "http://",
    //   "http://",
    // ],
    // 模式是否可以切换
    modeSwitch: true,
    // 默认模式
    // defaultMode: "classic", // 经典模式
    defaultMode: "desktop",  // 桌面模式
    // 可选功能
    // features: ["notice", "language"],
    features: ["notice"],
    // 用户信息下拉菜单
    userMenus: [
      {
        icon: "icon-user", // icon 路由图标 type=iconfont是字体图标的class、type=image是图片地址
        type: "iconfont", // type 路由图标类型  iconfont => 字体图标、image => 图片 
        name: "个人中心",
        onclick: function() {
          twinLayout.$router.push({
            name: "PersonalCenter"
          });
        },
      },
      {
        icon: "icon-tuichu",
        type: "iconfont",
        name: "退出",
        topLine: true,
        onclick: function() {
          store.commit("emptyUserInfo");
          // 销毁双生布局
          destroyTwin();
        },
      },
    ],
    // 路由
    routes: (callbcak) => {
      /*
      * 参数说明
      * hidden  是否是隐藏路由（不显示在菜单桌面）
      * name  路由名称（纯字母数字）  --- 必须唯一，不能重复  --- 必填
      * type  路由类型 component => vue组件或react组件、 iframe => h5链接 --- 必填
      * path  文件路径、打开地址  --- 必填
      * children 子路由 数组类型
      * meta  其他数据
      * meta.title 路由标题 --- 必填
      * meta.iconType 路由图标类型  iconfont => 字体图标、image => 图片 
      * meta.icon 路由图标 iconType=iconfont是字体图标的class、iconType=image是图片地址
      * meta.color iconType=iconfont时的图标颜色（会被主题颜色覆盖）
      * meta.permissions 路由权限["view", "add", "modify", "delete"]分别对应当前路由的查看、添加、修改、删除
      * 
      * 下列属性设置了meta.iconType、meta.icon属性将不生效
      * meta.classicIconType 经典模式的路由图标类型、只对经典模式生效，参数和meta.iconType一样
      * meta.classicIcon  经典模式的路由图标、只对经典模式生效，参数和meta.icon一样
      * meta.desktopIconType 桌面模式的路由图标类型、只对桌面模式生效，参数和meta.iconType一样
      * meta.desktopIcon  桌面模式的路由图标、只对桌面模式生效，参数和meta.icon一样
      */
      // 路由設置
      callbcak([{
        "hidden": false,
        "path": "common/index",
        "name": "Index",
        "type": "component",
        "meta": {
          "title": "首页",
          "icon": "icon-shouye",
          "iconType": "iconfont",
          "permissions": ["view", "add", "modify", "delete"],
          "color": "#ff0000"
        }
      }, {
        "hidden": false,
        "path": "https://www.baidu.com/",
        "name": "Baidu",
        "type": "iframe",
        "meta": {
          "title": "百度一下",
          "icon": "icon-baidu",
          "iconType": "iconfont",
          "permissions": ["view", "add", "modify", "delete"]
        }
      },{
          "path": "/articleManage",
          "meta": {
              "title": "文章管理",
              "icon": "icon-wenzhang-copy"
          },
          "children": [{
              "hidden": false,
              "path": "articleManage/articleList/index",
              "name": "ArticleList",
              "type": "component",
              "meta": {
                  "title": "文章列表",
                  "icon": "icon-wenzhang-copy",
                  "iconType": "iconfont",
                  "permissions": ["view", "add", "modify", "delete"]
              }
          }, {
              "hidden": false,
              "path": "articleManage/classifyList/index",
              "name": "ClassifyList",
              "type": "component",
              "meta": {
                  "title": "文章分类列表",
                  "icon": "icon-fenlei1",
                  "iconType": "iconfont",
                  "permissions": ["view", "add", "modify", "delete"]
              }
          }, {
              "hidden": true,
              "path": "articleManage/articleList/addModify",
              "name": "ArticleAddModify",
              "type": "component",
              "meta": {
                  "title": "添加文章",
                  "icon": "icon-rizhi",
                  "iconType": "iconfont",
                  "permissions": ["view", "add", "modify", "delete"]
              }
            },
          ]
        },
        {
          "path": "/iframeTest",
          "redirect": "noRedirect",
          "meta": {
            "title": "iframe示例",
            "icon": "icon-rizhi"
          },
          "children": [
            {
              "hidden": false,
              "path": "webpage2.html",
              "name": "IframeDemo1",
              "type": "iframe",
              "meta": {
                "title": "iframe示例1",
                "icon": "icon-fuwuqi",
                "iconType": "iconfont",
                "permissions": [
                  "view",
                  "add",
                  "modify",
                  "delete"
                ]
              }
            },
            {
              "hidden": false,
              "path": "webpage.html",
              "name": "IframeTest2",
              "type": "iframe",
              "meta": {
                "title": "iframe示例2",
                "icon": "icon-drxx05",
                "iconType": "iconfont",
                "permissions": [
                  "view",
                  "add",
                  "modify",
                  "delete"
                ]
              }
            }
          ]
        },
        {
          "hidden": true,
          "path": "common/personalCenter",
          "name": "PersonalCenter",
          "type": "component",
          "meta": {
            "title": "个人中心",
            "icon": "icon-yonghu",
            "iconType": "iconfont",
            "permissions": ["view", "add", "modify", "delete"]
          }
        }]);
      // getRouterList().then(res => {
      //   callbcak(res.data);
      // });
    },
    // 消息通知点击事件
    noticeClick: () => {
      MessageBox.alert("请自定义消息弹窗", "提示", {
        confirmButtonText: "确定",
        dangerouslyUseHTMLString: true,
      });
    },
    // 错误信息
    onError(err) {
      window.console.error(err.message);
      if (err.type == "danger") { 
        Message({
          offset: 60,
          showClose: true,
          message: err.message,
          type: "danger",
          dangerouslyUseHTMLString: true,
          duration: 3000,
        });
      }
    }
  });
  // let componentData = {};
  // 窗口关闭
  twin.prototype.windowRemove = () => {
    //注销vue组件
    // componentData[data.el].unmount();
  };
  // 窗口打开
  twin.prototype.windowOpen = (data, event) => {
    if (data.$route.type == "component") {
      let requireUrl = "views/" + data.$route.path + ".vue";
      require([`@/${requireUrl}`], function (page) {
        let pageExtend = Vue.extend(page.default);
        let pageObj = new pageExtend({
          store,
          data: {
            twin: data
          },
          methods: {
            check(name) {
              if (name) {
                if (Array.isArray(name)) {
                  let state = false;
                  name.forEach((item) => {
                    if (this.twin.$route.meta.permissions.includes(item)) {
                      state = true;
                    }
                  });
                  return state;
                } else if (this.twin.$route.meta.permissions.includes(name)) {
                  return true;
                }
              } else {
                return false;
              }
            },
          }
        });
        if (page.default.twinShow) { 
          event.twinShow = page.default.twinShow.bind(pageObj);
        }
        if (page.default.twinHide) {
          event.twinHide = page.default.twinHide.bind(pageObj);
        }
        pageObj.$mount();
        // componentData[data.el] = pageObj;
        data.$element.appendChild(pageObj.$el);
      });
    }
  };
  // 开始创建双生布局
  twinLayout.create(() => {
    // 监听数据方法
    twinLayout.$on("test", (data) => {
      console.log("【twinConfig.js】收到数据", data);
    });

    setTimeout(() => {
      // 发送数据 test方法监听
      twinLayout.$emit("test", {
        name: "【twinConfig.js】发送的数据"
      });
    }, 5000);
  });
}
