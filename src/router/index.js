import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      keepAlive: true,
    },
  },{   //登录
    path: '/Login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue'),
  },{   //注册
    path: '/Register',
    name: 'Register',
    component: () => import('@/views/login/Register.vue'),
  },{   //验证码
    path: '/Verification',
    name: 'Verification',
    component: () => import('@/views/login/Verification.vue'),
  },{   //验证密码
    path: '/PassWord',
    name: 'PassWord',
    component: () => import('@/views/login/PassWord.vue'),
  },{   //买车列表
    path: '/List',
    name: 'List',
    component: () => import('@/views/List.vue'),
    meta: {
      keepAlive: true,
    },
  },{
    path: '/Content',
    name: 'Content',
    component: () => import('@/views/Content.vue')
  },
  {
    // 子页的性能参数
    path: '/parameter',
    name: 'parameter',
    component: () => import('@/views/Parameter.vue'),
  },
  {
    path: '/Company',
    name: 'Company',
    component: () => import('@/views/Company.vue'),
    meta: {
      keepAlive: true,
    },
  },
  {
    path: '/Shop',
    name: 'Shop',
    component: () => import('@/views/Company.vue'),
    meta: {
      keepAlive: true,
    },
  },
  {
    path: '/User',
    name: 'User',
    component: () => import('@/views/user/index.vue')
  },
  {
    path: '/collect',
    name: 'collect',
    component: () => import('@/views/user/collect.vue'),
    meta: {
      keepAlive: true,
    },
  },
  {
    // 历史
    path: '/history',
    name: 'history',
    component: () => import('@/views/user/history.vue'),
  },
  { // for test
    path: '/fastLogin',
    name:'fastLogin',
    component: () => import('@/components/FastLogin.vue')

  },{
    path: '/carList',
    name: 'carList',
    component: () => import('@/views/user/carList.vue')
  },
  {
    path: '/News',
    name:'News',
    component: () => import('@/views/News.vue')
  },
  {
    path: '/Sale',
    name:'Sale',
    component: () => import('@/views/Maiche.vue')
  },
  {
    path:'/SaleCar',
    name:'SaleCar',
    component: () => import('@/views/Sale.vue')
  },
  {
    path:'/SaleShow',
    name:'SaleShow',
    component: () => import('@/views/SaleShow.vue')
  },
  {
    path: '/download',
    name: 'download',
    component: () => import('@/views/download/download.vue'),
  },
  {
    path: '/bd',
    name: 'bd',
    component: () => import('@/views/download/bd.vue'),
  },{
    path: '/around',
    name: 'around',
    component: () => import('@/views/around/index.vue'),
  },{
    path: '/AroundDetail',
    name: 'AroundDetail',
    component: () => import('@/views/around/shopInfo.vue'),
  },{
    path: '/AroundShop',
    name: 'AroundShop',
    component: () => import('@/views/around/shop.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
