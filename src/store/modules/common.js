exports.state = {
  loadingShow: false,
};
//缓存浏览器的数据名称
const cacheNameList = ["userInfo"];
let clearTime;
exports.mutations = {
  //取出缓存数据（打开APP就取出）
  setCacheData(state) {
    for (let name of cacheNameList) {
      let data = sessionStorage.getItem(name) || localStorage.getItem(name);
      if (data) {
        try {
          data = JSON.parse(data);
        } catch (e) {
          console.log(e);
        }
        state[name] = data;
      }
    }
  },
  //数据加载状态
  setLoadingShow(state, data) {
    if (state.loadingShow) {
      clearTime && clearTimeout(clearTime);
      clearTime = setTimeout(function() {
        state.loadingShow = data;
      }, 300);
    } else {
      state.loadingShow = data;
    }
  },
};
exports.actions = {};
