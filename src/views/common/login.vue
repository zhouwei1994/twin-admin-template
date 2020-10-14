<template>
  <div class="login-container" :style="{backgroundImage: 'url('+ backgroundUrl +')'}">
    <div class="header">
      <div class="page_center">
        <div class="left_info">
          <img :src="logo" />
          <span>{{ title }}</span>
        </div>
        <div class="left_info">欢迎光临{{ title }}后台管理!</div>
      </div>
    </div>
    <div class="login-mask-layer"></div>
    <!-- 默认缓存账号登录 -->
    <div v-if="defaultAccount" class="login-default-content">
      <img
        class="login-avatar"
        :src="avatar"
      />
      <div class="login-nickname">{{ username }}</div>
      <div class="login-default-box">
        <div class="login-input">
          <i class="iconfont icon-mima"></i>
          <input ref="password" :type="visiblePassword ? 'text' : 'password'" v-model="password" placeholder="请输入密码" @keyup.enter="onSubmit"/>
          <i class="iconfont" :class="[visiblePassword ? 'iconfont_visible_eye' : 'iconfont_eye']" @click="visiblePassword = !visiblePassword"></i>
        </div>
        <div class="login-password icon-mimayincang1" :class="{ 'icon-zhuce-mimaxianshi': passwordCheck}" @click="onSubmit">
          <i class="iconfont icon-rightarrow"></i>
        </div>
      </div>
      <div class="login-input-tip">
        <span v-if="passwordTip">{{ passwordTip }}</span>
      </div>
      <div class="other_methods" @click="onOtherAccount">其他账号登录</div>
    </div>
    <!-- 其他账号登录 -->
    <div v-else class="login-content">
      <div class="login-nickname">{{ title }}</div>
      <div class="tip">{{ introduction }}</div>
      <div class="login-input-box">
        <div class="login-input">
          <i class="iconfont icon-yonghu"></i>
          <input type="text" v-model="username" placeholder="请输入账号" />
        </div>
        <div class="login-input-tip">
          <span v-if="usernameTip">{{ usernameTip }}</span>
        </div>
        <div class="login-input">
          <i class="iconfont icon-mima"></i>
          <input :type="visiblePassword ? 'text' : 'password'" v-model="password" placeholder="请输入密码"  @keyup.enter="onSubmit"/>
          <i class="iconfont" :class="[visiblePassword ? 'iconfont_visible_eye' : 'iconfont_eye']" @click="visiblePassword = !visiblePassword"></i>
        </div>
        <div class="login-input-tip">
          <span v-if="passwordTip">{{ passwordTip }}</span>
        </div>
      </div>
      <button class="login-button" :class="{active: usernameCheck && passwordCheck }" @click="onSubmit">登 录</button>
    </div>
  </div>
</template>

<script>
import { title, logo, introduction } from "@/config/config";
let clearTime;
export default {
  name: "Login",
  data() {
    return {
      defaultAccount: false,
      visiblePassword: false,
      avatar: "",
      username: "",
      usernameTip: "",
      usernameCheck: false,
      password: "",
      passwordTip: "",
      passwordCheck: false,
      title, logo,introduction,
      backgroundUrl: process.env.VUE_APP_BASE_API + "/common/v1/wallpaper"
    };
  },
  watch: {
    password(){
      this.passwordTip = "";
      clearTime && clearTimeout(clearTime);
      clearTime = setTimeout(() => {
        this.checkPassword();
      },300);
    },
    username(){
      this.usernameTip = "";
      clearTime && clearTimeout(clearTime);
      clearTime = setTimeout(() => {
        this.checkUsername();
      },300);
    }
  },
  created(){
    let twinLoginAccount = localStorage.getItem("twinLoginAccount");
    if(twinLoginAccount){
      twinLoginAccount = JSON.parse(twinLoginAccount)
      this.avatar = twinLoginAccount.avatar;
      this.username = twinLoginAccount.username;
      this.defaultAccount = true;
    }
  },
  mounted() {
    if(this.defaultAccount){
      this.$refs.password.focus();
    }
    setTimeout(() => {
      this.checkUsername(false);
      this.checkPassword(false);
    },2000);
  },
  methods: {
    onOtherAccount(){
      this.defaultAccount = false;
      this.resetData();
    },
    resetData(){
      this.username = "";
      this.usernameTip = "";
      this.usernameCheck = false;
      this.password = "";
      this.passwordTip = "";
      this.passwordCheck = false;
    },
    checkUsername(tip = true){
      if(this.username == ""){
        if(tip){
          this.usernameTip = "请输入用户名"
        }
        this.usernameCheck = false;
      } else {
        this.usernameTip = ""
        this.usernameCheck = true;
      }
    },
    checkPassword(tip = true){
      if(this.password == ""){
        if(tip){
          this.passwordTip = "请输入密码"
        }
        this.passwordCheck = false;
      } else if(!/\w{6,20}/.test(this.password)){
        if(tip){
          this.passwordTip = "密码格式错误，6-20位字母和数字组合"
        }
        this.passwordCheck = false;
      } else {
        this.passwordTip = ""
        this.passwordCheck = true;
      }
    },
    onSubmit(){
      if(this.usernameCheck && this.passwordCheck || this.defaultAccount && this.passwordCheck){
        this.$api.admin.login({
          username: this.username,
          password: this.password,
        }).then(res => {
          localStorage.setItem("twinLoginAccount", JSON.stringify({
            username: this.username,
            avatar: res.data.avatar
          }));
          this.$emit("loginSuccess", res.data);
          this.resetData();
          const hour = new Date().getHours();
          const thisTime =
            hour < 8
              ? "早上好"
              : hour <= 11
              ? "上午好"
              : hour <= 13
              ? "中午好"
              : hour < 18
              ? "下午好"
              : "晚上好";
          this.$baseNotify(`欢迎登录${title}`, `${thisTime}！`);
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variable.scss";
@keyframes loginAnimation {
  0% {
    transform: translateX(-50%) translateY(-50%) scale(0.6);
    opacity: 0;
  }
  100% {
    transform: translateX(-50%) translateY(-50%) scale(1);
    opacity: 1;
  }
}
@keyframes loginTipAnimation {
  0% {
    transform: translateX(5px);
  }
  33% {
    transform: translateX(-5px);
  }
  66% {
    transform: translateX(5px) ;
  }
  100% {
    transform: translateX(0px);
  }
}
.login-container {
  width: 100%;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  
  &:after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: inherit;
    filter: blur(3px);
    z-index: 1;
  }
  .header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    background-color: rgba($color: #fff, $alpha: 0.2);
    z-index: 3;
    box-sizing: border-box;
    .page_center {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 50px;
      max-width: 1200px;
      padding: 0 10px;
      margin: 0 auto;
    }
    .left_info,
    .right_info {
      display: flex;
      align-items: center;
      color: #fff;
      font-size: 14px;
    }
    .left_info {
      img {
        width: 30px;
        height: 30px;
      }
      span {
        margin-left: 15px;
        color: #fff;
        font-size: 18px;
      }
    }
  }
  .login-mask-layer {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 2;
  }
  .login-default-content, .login-content {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 4;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation-name: loginAnimation;
    animation-duration: 0.6s;
    .tip {
      margin-top: 15px;
      color: #fff;
      font-size: 14px;
    }
    .login-avatar {
      width: 110px;
      height: 110px;
      border-radius: 50%;
      object-fit: cover;
    }
    .login-nickname {
      margin-top: 15px;
      color: #fff;
      font-size: 26px;
    }
    .login-default-box {
      margin-top: 40px;
      display: flex;
      align-items: center;
      .login-password {
        width: 0px;
        opacity: 0;
        overflow: hidden;
        transition: all 0.3s;
        &.login-password-show {
          width: 44px;
          opacity: 1;
        }
        i {
          margin-left: 10px;
          font-size: 25px;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background-color: #eee;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
      }
    }
    .login-input-box {
      margin-top: 40px;
    }
    .login-input {
      height: 40px;
      background-color: #fff;
      width: 280px;
      display: flex;
      align-items: center;
      border-radius: 4px;
      position: relative;
      i {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        position: absolute;
        top: 0;
        left: 0;
        &:last-child {
          right: 0;
          left: inherit;
          cursor: pointer;
        }
      }
      input {
        height: 40px;
        flex: 1;
        width: 0;
        border: 0;
        background-color: #fff;
        padding: 0 36px;
        border-radius: 4px;
      }
    }
    .login-input-tip {
      height: 30px;
      line-height: 30px;
      display: flex;
      span {
        color: #FFF;
        font-size: 12px;
        text-shadow: 0px 0px 0px #fff, 0px 0px 2px #000, 0px 0px 4px #000;
        animation-name: loginTipAnimation;
        animation-duration: 0.4s;
      }
    }
    .login-button {
      margin-top: 30px;
      height: 40px;
      width: 280px;
      border: 0;
      border-radius: 4px;
      background-color: #eee;
      color: #999;
      cursor: pointer;
      &:hover {
        opacity: 0.9;
      }
      &.active {
        background-color: $themeColor;
        color: #fff;
      }
    }
    .other_methods {
      margin-top: 30px;
      color: #fff;
      font-size: 14px;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>