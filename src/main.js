import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueLazyload from 'vue-lazyload';
import Axios from 'axios';
import mandMobile from 'mand-mobile'; // Vue mandMobile组件全量引入
import 'mand-mobile/lib-vw/mand-mobile.css'; // Vue mandMobile组件全量引入
import VueClipboard from 'vue-clipboard2';
Vue.config.productionTip = false;
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';
Vue.use(VueClipboard);
Vue.use(Viewer);
Vue.use(VueLazyload);
Vue.use(mandMobile); // Vue mandMobile组件全量引入
import Vconsole from 'vconsole';
// const vs = new Vconsole();   //手机端调试窗口

Vue.prototype.$api = Axios.create({
  baseURL: 'https://api.1775.net.cn',
  // baseURL: 'http://test.1775.top',
  // baseURL: 'http://127.0.0.1:7002',
});

import vcCard from './components/vcCard';
import FastLogin from './components/FastLogin';
import Navigation from '@/components/Navigation.vue';
import BrandOpt from './components/BrandOpt';
import mbrandPicker  from './components/mbrandPicker';

//  组件
Vue.component('mbrandPicker', mbrandPicker)
Vue.component('VcCard',vcCard)
Vue.component('FastLogin',FastLogin)
Vue.component('Navigation',Navigation)
Vue.component('BrandOpt',BrandOpt)


Vue.mixin({
  filters: {
    mobilePic(path) {
      try{
        const _tem = path.split('/');
        _tem.splice(-1, 0, 'm');

        return _tem.join('/');
      }catch (e) {
      }
    },
    coverPic(path){
      try{
        const _tem = path.split('/');
          _tem.splice(-1, 0, 'm');
        return _tem.join('/')
      }catch (e) {
      }
    },
    getYear:(value)=>{
      let time = new Date(value)
      let year = time.getFullYear()
      // console.log(year)
      //返回的时间格式，可自定义
      return year
    },
  },
})



const app = {
  // Application Constructor
  initialize() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

  onDeviceReady() {
    new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  },
};



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');



app.initialize();
