<template>
  <div id="app">
    <z-login v-if="!userInfo.token" @loginSuccess="onLoginSuccess"></z-login>
  </div>
</template>

<script>
import zLogin from "@/views/common/login.vue";
import twinInit from "@/plugins/twinConfig";
import { mapState, mapMutations } from "vuex";
export default {
  name: "App",
  components: {
    zLogin,
  },
  data(){
    return {
    }
  },
  computed:{
    ...mapState(["userInfo"]),
  },
  created(){
    this.setCacheData();
    if(this.userInfo.token){
      twinInit();
    }
    console.log([
    "                   _ooOoo_",
    "                  o8888888o",
    "                  88\" . \"88",
    "                  (| -_- |)",
    "                  O\\  =  /O",
    "               ____/`---'\\____",
    "             .'  \\\\|     |//  `.",
    "            /  \\\\|||  :  |||//  \\",
    "           /  _||||| -:- |||||-  \\",
    "           |   | \\\\\\  -  /// |   |",
    "           | \\_|  ''\\---/''  |   |",
    "           \\  .-\\__  `-`  ___/-. /",
    "         ___`. .'  /--.--\\  `. . __",
    "      .\"\" '<  `.___\\_<|>_/___.'  >'\"\".",
    "     | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |",
    "     \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /",
    "======`-.____`-.___\\_____/___.-`____.-'======",
    "                   `=---='",
    "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",
    "            佛祖保佑       永无BUG"
    ].join('\n'));
  },
  methods: {
    ...mapMutations(["setUserInfo","setCacheData"]),
    onLoginSuccess(data){
      this.setUserInfo(data);
      twinInit();
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/iconfont.scss";
@import "@/styles/common.scss";
</style>
