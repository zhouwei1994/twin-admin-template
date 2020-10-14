import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import '@/styles/element-variables.scss'
import install from "@/plugins/install";
import store from "@/store";
// F12禁用
import "@/plugins/f12";
// 全局组件
import ElxImgbox from "@/components/upload-image/ElxImgbox";
import ElxImgboxPlugin from "@/components/upload-image/ElxImgboxPlugin";

Vue.use(install);
// 自动启用插件
Vue.use(ElxImgboxPlugin);
Vue.config.productionTip = false
Vue.use(ElementUI, {
  size: "small",
});
new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
Vue.component("image-upload", ElxImgbox);
