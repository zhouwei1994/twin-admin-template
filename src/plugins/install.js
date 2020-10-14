import { messageDuration } from "@/config/config";
import { Message, MessageBox, Notification } from "element-ui";
import api from "@/api";

const install = (Vue) => {
  /* 全局API */
  Vue.prototype.$api = api;
  /* 全局Message */
  Vue.prototype.$baseMessage = (message, type) => {
    Message({
      offset: 60,
      showClose: true,
      message: message,
      type: type,
      dangerouslyUseHTMLString: true,
      duration: messageDuration,
    });
  };

  /* 全局Alert */
  Vue.prototype.$baseAlert = (content, title, callback) => {
    MessageBox.alert(content, title || "温馨提示", {
      confirmButtonText: "确定",
      dangerouslyUseHTMLString: true,
      callback: (action) => {
        if (callback) {
          callback(action);
        }
      },
    });
  };

  /* 全局Confirm */
  Vue.prototype.$baseConfirm = (content, title, callback1, callback2) => {
    MessageBox.confirm(content, title || "温馨提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      closeOnClickModal: false,
      type: "warning",
    })
      .then(() => {
        if (callback1) {
          callback1();
        }
      })
      .catch(() => {
        if (callback2) {
          callback2();
        }
      });
  };

  /* 全局Notification */
  Vue.prototype.$baseNotify = (message, title, type, position) => {
    Notification({
      title: title,
      message: message,
      position: position || "top-right",
      type: type || "success",
      duration: messageDuration,
    });
  };
};

export default install;
