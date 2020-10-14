import * as qiniu from "qiniu-js";
import { qiniuUpload } from "@/api/modules/admin";
import { Message } from "element-ui";
import { messageDuration } from "@/config/config";
//文件名称随机数
function randomChar(l, url = "") {
  const x = "0123456789qwertyuioplkjhgfdsazxcvbnm";
  let tmp = "";
  let time = new Date();
  for (let i = 0; i < l; i++) {
    tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
  }
  return "file/" + url + time.getTime() + tmp;
}
function getWidthHeight(file, callback) {
  if (file.url) {
    let images = new Image();
    images.src = file;
    images.onload = function () {
      callback(images.width, images.height);
    };
    images.onerror = function () { 
      callback(100, 100);
    }
  } else {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      let images = new Image();
      images.src = e.target.result;
      images.onload = function () {
        callback(images.width, images.height);
      };
      images.onerror = function () {
        callback(100, 100);
      }
    };
    reader.onerror = function () {
      callback(100, 100);
    }
  }
}
let allowUpload = true;
export default function (options) {
  if (options.files && options.files.length > 0) {
    if (!allowUpload) {
      return;
    }
    allowUpload = false;
    qiniuUpload().then((data) => {
      let qiniuData = data.data;
      let imgs = new Array();
      let len = options.files.length;
      let config = {
        //表示是否使用 cdn 加速域名
        useCdnDomain: true,
        //qiniu.region.z0: 代表华东区域
        // qiniu.region.z1: 代表华北区域
        // qiniu.region.z2: 代表华南区域
        // qiniu.region.na0: 代表北美区域
        // qiniu.region.as0: 代表东南亚区域
        region: qiniu.region.z2,
        //是否禁用日志报告
        // disableStatisticsReport: false
      };
      options.uploadStart && options.uploadStart();
      recursive(0);
      //递归上传图片
      function recursive(i) {
        //上传状态
        let uploadState = false;
        let imgData = {};
        let putExtra = {
          //文件原文件名
          fname: options.files[i].name || "",
          // 用来放置自定义变量
          params: {},
          // 用来限制上传文件类型 ,限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
          mimeType: [] || null,
        };
        //文件上传配置
        let observable = qiniu.upload(
          options.files[i],
          randomChar(8, qiniuData.folderPath),
          qiniuData.token,
          putExtra,
          config
        );
        if (options.files[i].type.indexOf("image") >= 0) {
          getWidthHeight(options.files[i], (width, height) => {
            imgData.width = width;
            imgData.height = height;
            if (uploadState) {
              imgs.push(imgData);
              //图片上传完成
              if (i < len - 1) {
                recursive(i + 1);
              } else {
                setTimeout(() => {
                  allowUpload = true;
                }, 400);
                options.complete && options.complete();
                options.success && options.success(imgs);
              }
            } else {
              uploadState = true;
            }
          });
        } else {
          uploadState = true;
        }
        //文件开始上传
        observable.subscribe({
          next(res) {
            //图片上传进度
            console.log("图片上传进度", res.total.percent);
            options.progress &&
              options.progress({
                ...options.files[i],
                index: i,
                progress: parseInt(res.total.percent),
              });
          },
          error(err) {
            setTimeout(() => {
              allowUpload = true;
            }, 400);
            options.complete && options.complete();
            //图片报错
            console.log(err);
          },
          complete(res) {
            imgData.url = qiniuData.visitPrefix + "/" + res.key;
            if (uploadState) {
              imgs.push(imgData);
              console.log("------------111", i, len);
              //图片上传完成
              if (i < len - 1) {
                recursive(i + 1);
              } else {
                setTimeout(() => {
                  allowUpload = true;
                }, 400);
                options.complete && options.complete();
                options.success && options.success(imgs);
              }
            } else {
              uploadState = true;
            }
          },
        });
      }
    });
  } else {
    Message({
      offset: 60,
      showClose: true,
      message: "请先选择上传文件",
      type: "error",
      dangerouslyUseHTMLString: true,
      duration: messageDuration,
    });
  }
}
