<template>

  <div style="height: 100%">
    <keep-alive >     <!--使用keep-alive会将页面缓存-->
      <router-view  v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>

</template>

<script>
export default {
  mounted() {
    //
    const script = document.createElement('script');
    const CNZZ_ID = 1278208848;
    script.src = `https://s4.cnzz.com/z_stat.php?id=${CNZZ_ID}&web_id=${CNZZ_ID}`;
    script.language = 'JavaScript';
    document.body.appendChild(script);
    // let startX; let startY;
    //
    // document.addEventListener('touchstart', (e) => {
    //   startX = e.touchList[0].pageX;
    //   startY = e.touchList[0].pageY;
    // });
    //
    // document.addEventListener('touchmove', (e) => {
    //   const moveX = e.touchList[0].pageX;
    //   const moveY = e.touchList[0].pageY;
    //
    //   if (Math.abs(moveX - startX) > Math.abs(moveY - startY)) {
    //     e.preventDefault();
    //   }
    // });
    this.getWxConfig()
  },
  methods:{
    async getWxConfig(){
      const url = location.href.split('#')[0]
      const params = {
         url : url,
         debug: false,
         jsApiList: ['updateTimelineShareData', 'updateAppMessageShareData','onMenuShareWeibo','onMenuShareAppMessage'],
      }
      let  res = await this.$api.post('/wx/getwxconfig',params)
      console.log(res.data)
      const { success,data } = res.data
      if(success){
        try{
          wx.config({
            ...data
          });
        }catch (e) {

        }

      }


    }
  },
  watch: {
    $route: {
      handler(to, from) {
        setTimeout(() => { // 避免首次获取不到window._czc
          if (window._czc) {
            const { location } = window;
            const contentUrl = location.pathname + location.hash;
            const refererUrl = '/';
            // 用于发送某个URL的PV统计请求，
            window._czc.push(['_trackPageview', contentUrl, refererUrl]);
          }
        }, 300);
      },
      immediate: true, // 首次进入页面即执行
    },
  },
};

</script>
<style lang="scss">
  @function vw($px){
    @return $px/1080*100vw;
  }
  body,html{
    width: 100%;
    height: 100%;
  }
  *{
    padding: 0;
    margin: 0;
    list-style: none;
    box-sizing: border-box;
  }
  html{
    font-size: 16px;
  }

  body{

  }

</style>
