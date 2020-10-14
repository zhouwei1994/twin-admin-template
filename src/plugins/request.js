import axios from "axios";
import {
  contentType,
  invalidCode,
  messageDuration,
  noPermissionCode,
  requestTimeout,
  successCode,
  tokenName,
} from "@/config/config";
import { Loading, Message } from "element-ui";
import store from "@/store";
import { destroyTwin } from "@/plugins/twinConfig";
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: requestTimeout,
  headers: {
    "Content-Type": contentType,
  },
});
let loadingInstance;
service.interceptors.request.use(
  (config) => {
    if (store.state.userInfo && store.state.userInfo[tokenName]) {
      config.headers[tokenName] = store.state.userInfo[tokenName];
    }
    if (config.load) {
      loadingInstance = Loading.service();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const errorMsg = (message) => {
  return Message({
    message: message,
    type: "error",
    duration: messageDuration,
  });
};

service.interceptors.response.use(
  (response) => {
    if (loadingInstance) {
      loadingInstance.close();
    }
    const { data, config } = response;
    const { code, msg } = data;
    if (code == successCode) {
      return data;
    } else {
      switch (code) {
        case invalidCode:
          errorMsg(msg || `后端接口${code}异常`);
          store.commit("emptyUserInfo");
          destroyTwin();
          break;
        case noPermissionCode:
          break;
        default:
          errorMsg(msg || `后端接口${code}异常`);
          break;
      }
      return Promise.reject(
        "请求异常拦截:" + JSON.stringify({ url: config.url, code, msg }) ||
          "Error"
      );
    }
  },
  (error) => {
    if (loadingInstance) {
      // loadingInstance.close();
    }
    /*网络连接过程异常处理*/
    let { message } = error;
    switch (message) {
      case "Network Error":
        message = "后端接口连接异常";
        break;
      case "timeout":
        message = "后端接口请求超时";
        break;
      case "Request failed with status code":
        message = "后端接口" + message.substr(message.length - 3) + "异常";
        break;
    }
    errorMsg(message || "后端接口未知异常");
    return Promise.reject(error);
  }
);
export default service;
