<template>
    <div class="down">
          <span>您当前使用微信打开，无法直接安装 <i class="iconfont icon-_youshangjiaoyindao" style="font-size: 50px;"></i>  <br> 请点击右上角选择在浏览器中打开</span>
          <div class="logo"><img :src="d1" alt=""></div>
          <h1> - 广西人自己的二手车网站 - </h1>
          <button><a href="https://m.1775.net.cn/1775client.apk"><i class="iconfont icon-anzhuo"></i> 安卓下载</a>  </button>
      <button> <a href="https://apps.apple.com/cn/app/1775%E4%BA%8C%E6%89%8B%E8%BD%A6/id1476931651"> <i class="iconfont icon-ios"></i> 苹果下载</a></button>
    </div>
</template>

<script>
import d1 from '@/assets/d1.jpg';

export default {
  name: 'download',
  data() {
    return {
      d1,
      isWx: false,
    };
  },
  create() {
    const browser = {
      versions: (function () {
        const u = navigator.userAgent; const
          app = navigator.appVersion;
        return { // 移动终端浏览器版本信息
          trident: u.indexOf('Trident') > -1, // IE内核
          presto: u.indexOf('Presto') > -1, // opera内核
          webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
          mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
          android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或uc浏览器
          iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
          iPad: u.indexOf('iPad') > -1, // 是否iPad
          webApp: u.indexOf('Safari') == -1, // 是否web应该程序，没有头部与底部
        };
      }()),
      language: (navigator.browserLanguage || navigator.language).toLowerCase(),
    };
    if (browser.versions.mobile) { // 判断是否是移动设备打开。browser代码在下面
      const ua = navigator.userAgent.toLowerCase();// 获取判断用的对象
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        // 在微信中打开
        this.isWx = true;
      }
      if (ua.match(/WeiBo/i) == 'weibo') {
        // 在新浪微博客户端打开
      }
      if (ua.match(/QQ/i) == 'qq') {
        // 在QQ空间打开
      }
      if (browser.versions.ios) {
        // 是否在IOS浏览器打开
      }
      if (browser.versions.android) {
        // 是否在安卓浏览器打开
      }
    } else {
    }
  },
};
</script>

<style scoped>
     .down{
       height: 100%;
       background: -webkit-linear-gradient(top, #ff6156, #ff2716);
       padding-top: 20vh;
     }
  .logo{
    width: 25vw;
    height: 25vw;
    border: 1px solid #fff;
    margin: 0 auto 50px;
  }
  .logo img{
    width: 100%;
  }
  h1{
    text-align: center;
    font-size: 18px;
    color:#fff
  }
  button{
    width: 80vw;
    line-height: 12vw;
    border: 1px solid #fff;
    border-radius: 7vw ;
    background: none;
    font-weight: 600;
    color:#fff;
    margin: 20px auto;
    display: block;
  }
  a{
    display: block;
    color:inherit;
  }
     span{
       font-size: 14px;
       position: fixed;
       top:5px;
       right: 5px;
       color:#fff
     }
</style>
