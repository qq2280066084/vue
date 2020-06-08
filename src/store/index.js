import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {
      nickName: null,
      phoneNum: null,
      realName: null,
      uid: null,
      userPic: null,
    },
    acPhone: '',
  },
  // 获取
  getters: {
    GET_USERINFO(state) {
      return state.userInfo;
    },
  },
  // 修改
  mutations: {
    logout(state) {
      state.userInfo = {};
      window.location.reload();
    },
    SET_USERINFO(state, newUser) {
      for (const v in newUser) {
        state.userInfo[v] = newUser[v];
      }
    },
    RESET_USERINFO(state) {
      state.userInfo = {
        nickName: null,
        phoneNum: null,
        realName: null,
        uid: null,
        userPic: null,
      };
    },
    updateAcPhone(state, r) {
      state.acPhone = r;
    },
  },
  actions: {

  },
});
