/**
 * @copyright zhouwei 465081029@qq.com
 * @description 管理员自己相关的API
 */
import request from "@/plugins/request";
import md5 from "md5";
// 管理员登录
export async function login(data) {
  return request({
    url: "/authority/v1/admin_login",
    method: "post",
    data: {
      username: data.username,
      password: md5(data.password),
    },
  });
}
// 管理员退出登录
export function logout() {
  return request({
    url: "/authority/v1/admin_logout",
    method: "get",
  });
}
// 管理员获取菜单权限
export function getRouterList() {
  return request({
    url: "/authority/v1/user_authority",
    method: "get",
  });
}
// 管理员修改个人信息
export async function modifyPersonalInfo(data) {
  let httpData = data;
  if (data.password) {
    httpData.password = md5(data.password);
  }
  return request({
    url: "/authority/v1/modify_personal_info",
    method: "POST",
    data: httpData,
  });
}
// 管理员获取个人信息
export async function getPersonalInfo() {
  return request({
    url: "/authority/v1/get_personal_info",
    method: "GET",
  });
}
// 管理员获取七牛云的图片
export async function getQiniuImagesList(data) {
  return request({
    url: "/authority/v1/qiniu_images_list",
    method: "POST",
    data,
  });
}
// 七牛云上传图片
export async function qiniuUpload() {
  return request({
    url: "/common/v1/qn_manage_upload",
    method: "GET",
  });
}
