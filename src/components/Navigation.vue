<template>
  <div class="navigation">
    <router-link class="item" :to="{path:'/'}">
      <div class="icon home"></div>
      <div class="title">首页</div>
    </router-link>
    <router-link class="item" :class="{hover:num==1}" :to="{path:'/List'}">
      <div class="icon buy"></div>
      <div class="title">我要买车</div>
    </router-link>
    <router-link class="item" :to="{path:'/SaleShow'}">
      <div class="icon sale"></div>
      <div class="title">我要卖车</div>
    </router-link>
    <router-link class="item" :class="{hover:num==3}" :to="{path:'/around'}">
      <div class="icon around"></div>
      <div class="title">同城服务</div>
    </router-link>
    <router-link class="item" :to="{path:'/User'}">
      <div class="icon my"></div>
      <div class="title">我的</div>
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'Navigation',
  data() {
    return {
      a: true, // 判断是否手动触发滚动事件与图标top值得改变
      sdsc: false, // 判断是否手动触发监听事件
      again: false,
    };
  },
  props: {
    adc: { type: Number },
    num: {type: Number}
  },
  methods: {
    // shoppingCart() {
    //   // 跳转界面
    //   this.$router.push({ name: 'shoppingCart' });
    // },
    // maicvg() {
    //   // 跳转界面
    //   this.$router.push({ name: 'mail' });
    // },
    // 导航标签的颜色转换
    ent(i,ev) {

      console.log(ev)
      for(const dom of document.querySelectorAll('.tab1')){
       // dom.style = ""
      }
      if (i === 'my') {
        this.$router.replace({ name: 'User' });
       // document.querySelectorAll('.nav')[3].style.color= '#ff6600'
      }
      if (i === 3) this.$router.replace({ name: 'around' });
      // if (i === 3) this.$router.push({ name: 'shoppingCart' });
      if (i === 'sellcar'){
        this.$router.replace({ name: 'SaleShow' });
      //  document.querySelectorAll('.nav')[2].style.color= '#ff6600'
      }
      if (i === 'maiche'){
        this.$router.replace({ name: 'List' });
       // document.querySelectorAll('.nav')[1].style.color= '#ff6600'
      }
      if (i === 'home') {

        this.$emit('aaa');
        this.$router.push({
          path:'/'
        });
      }

    },

  },
  watch: {
    // 保存挂载之前的数据
    // adc(news, old) {
    //   console.log('news',news)
    //   if (old === null) { this.$router.push({ name: 'index' }); }
    //   if (news > 0) {
    //
    //     // document.querySelector('.tab1-').style.display = 'none';
    //     // document.querySelector('.ic').style.display = 'flex';
    //   }
    //   document.querySelector('.tab').children[news].classList.add('col');
    // },
  },
};
</script>

<style scoped lang="scss">
  @function vw($px){
    @return $px/1080*100vw
  }
  .navigation{
    height: 96px;
    background: #fff;
    display: flex;
    align-items: center;
    border-top: 1px solid rgba(0,0,0,0.1);
    .item{
      flex: 1;
      text-align: center;
      height: 96px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      .icon{
        width: 44px;
        height: 44px;
      }
      .home{
        background: url('../assets/nav/icon_2.png') no-repeat center center;
        background-size: 100% auto;
      }
      .buy{
        background: url('../assets/nav/icon_4.png') no-repeat center center;
        background-size: 100% auto;
      }
      .sale{
        background: url('../assets/nav/icon_6.png') no-repeat center center;
        background-size: 100% auto;
      }
      .around{
        background: url('../assets/nav/icon_10.png') no-repeat center center;
        background-size: 100% auto;
      }
      .my{
        background: url('../assets/nav/icon_8.png') no-repeat center center;
        background-size: 100% auto;
      }
      .title{
        margin-top: 8px;
        font-size: 20px;
        color: #999;
      }
    }
    .router-link-exact-active,.hover{
      .home{
        background: url('../assets/nav/icon_1.png') no-repeat center center;
        background-size: 100% auto;
      }
      .buy{
        background: url('../assets/nav/icon_3.png') no-repeat center center;
        background-size: 100% auto;
      }
      .sale{
        background: url('../assets/nav/icon_5.png') no-repeat center center;
        background-size: 100% auto;
      }
      .around{
        background: url('../assets/nav/icon_9.png') no-repeat center center;
        background-size: 100% auto;
      }
      .my{
        background: url('../assets/nav/icon_7.png') no-repeat center center;
        background-size: 100% auto;
      }
      .title{
        color: #FF4C4C;
      }
    }
  }


</style>
