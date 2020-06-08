<template>
  <div class="wrap">
    <!--顶部-->
    <div class="header">
      <div class="city" style="display: flex"   @click="$router.push({name:'city2'})">
        <div style="display: flex;">南宁<div class="iconfont icon-xiangxia2" style="font-size: 12px;line-height: 4;margin-left: 6px;"></div></div>
      </div>
      <div>
        <div>我要卖车</div>
      </div>
      <div>
        <div>卖车记录</div>
      </div>
    </div>
    <!--内容-->
    <div class="main">
      <md-scroll-view
        :scrolling-y="true"
        :scrolling-x="false"
        :auto-reflow="true"
      >
        <div class="picture">
        </div>
        <div class="service">
          <div>
            <div>1480</div>
            <div>辆车成功在1775卖出</div>
          </div>
<!--          <div @click="car">预约卖车</div>-->
          <div  v-if="false">
            <div>免费咨询</div>
            <div @click="price">先估个价</div>
          </div>
        </div>
        <saleCarForm></saleCarForm>
        <div class="guild">
          <div>直卖流程</div>
          <div>
            <div class="procedure">
              <div class="iconfont icon-renwujincheng"></div>
              <div>预约卖车</div>
            </div>
            <div class="right">></div>
            <div class="procedure">
              <div class="iconfont icon-zjbmy"></div>
              <div>匹配买家</div>
            </div>
            <div class="right">></div>
            <div class="procedure">
              <div class="iconfont icon-fukuanshenqing"></div>
              <div>签约付款</div>
            </div>
            <div class="right">></div>
            <div class="procedure">
              <div class="iconfont icon-wancheng"></div>
              <div>交易完成</div>
            </div>
          </div>
          <div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div class="guild1" v-if="false">
          <div class="tag">价格高</div>
          <div class="rectangle"></div>
          <span class="text">1775全国超过270个城市的买家网络最高帮您多卖25%</span>
          <div class="news">
            <div class="news1">
              <div>
                <div>北京</div>
                <div>李先生</div>
                <div>近期成交</div>
              </div>
              <div>
                <div><img src="" alt=""></div>
                <div>
                  <div style="line-height: 1">日产/奇骏/2014款 2.0 自动 XL舒适版前驱</div>
                  <div style="font-size: 14px;color: #999;">2015年 丨 5.97公里</div>
                </div>
              </div>
            </div>
            <div class="news2">
              <div>相比北京本地报价</div>
              <div>
                <div>
                  <div>肇庆</div>
                  <div>报价多25%</div>
                  <div></div>
                </div>
                <div>
                  <div>常德</div>
                  <div>报价多25%</div>
                  <div></div>
                </div>
                <div>
                  <div>惠州</div>
                  <div>报价多25%</div>
                  <div></div>
                </div>
                <div>
                  <div>铁岭</div>
                  <div>报价多25%</div>
                  <div></div>
                </div>
              </div>
            </div>
            <div class="news3" @click="Deal">查看更多成交记录 ></div>
          </div>
          <div class="guild2">
            <div class="rectangle1"></div>
            <div class="text1">
              <span>最快当天预约</span>
              <span>当天成交，当天付款</span>
            </div>
            <div class="picture1"></div>
            <div class="transaction">透明交易</div>
            <div class="rectangle2"></div>
            <div class="text2">
              <span>买卖交易面对面</span>
              <span>中间环节无干扰</span>
            </div>
            <div class="picture2"><img src="" alt=""></div>
          </div>
        </div>
        <div class="questions">
          <div class="tag1">卖车问答</div>
          <div class="answers">
            <div>
              <div class="box" @click="fn1">
                <div class="box1">
                  <div>1</div>
                  <div>1775卖车模式是什么？</div>
                </div>
              </div>
              <div class="box2" v-show="aa">
                <div>借助1775全国的网络为车主找寻意向最强的买家，上门验车，即时报价，立即打款</div>
              </div>
            </div>
            <div>
              <div class="box" @click="fn2">
                <div class="box1">
                  <div>2</div>
                  <div>为什么选择在1775卖车？</div>
                </div>
              </div>
              <div class="box2" v-show="bb">
                <div>1.价格高：1775全国超过270个城市的买家网络，最高帮您多卖25%
                  <div>2.卖的快：最快当天预约，当天成交，当天付款</div>
                  <div>3.透明交易：买卖交易面对面，中间环节无干扰</div>
                </div>
              </div>
            </div>
            <div>
              <div class="box" @click="fn3">
                <div class="box1">
                  <div>3</div>
                  <div>在1775卖车个人信息是否安全？</div>
                </div>
              </div>
              <div class="box2" v-show="cc">
                <div>1775将对您的个人信息进行全程保密，确保安全信息不泄露</div>
              </div>
            </div>
            <div>
              <div class="box" @click="fn4">
                <div class="box1">
                  <div>4</div>
                  <div>通过哪里可以找到1775卖车？</div>
                </div>
              </div>
              <div class="box2" v-show="dd">
                <div>登录1775二手车APP或官网www.1775.net.cn预约卖车
                  <div>（支持自主或电话预约服务）</div></div>
              </div>
            </div>
            <div class="order">预约卖车</div>
          </div>
        </div>
      </md-scroll-view>

    </div>
    <!--底部-->
    <Navigation v-bind:adc="qwe"></Navigation>

  </div>
</template>

<script>
  import saleCarForm from '../components/saleCarForm';
  export default {
  name: 'maichu',
  data() {
    return {

      aa: false,
      bb: false,
      cc: false,
      dd: false,
      qwe:0,
    };
  },
  methods: {

    fn1() {
      if (this.aa) {
        this.aa = false;
      } else {
        this.aa = true;
      }
    },
    fn2() {
      if (this.bb) {
        this.bb = false;
      } else {
        this.bb = true;
      }
    },
    fn3() {
      if (this.cc) {
        this.cc = false;
      } else {
        this.cc = true;
      }
    },
    fn4() {
      if (this.dd) {
        this.dd = false;
      } else {
        this.dd = true;
      }
    },
    city() {
      //跳转界面
      this.$router.push({ name: 'city1' });
    },
    car() {
      //跳转界面
      this.$router.push({ name: 'information1' });
    },
    price(){
      //跳转界面
      this.$router.push({ name: 'valuation1' });
    },
    Deal(){
      //跳转界面
      this.$router.push({ name: 'deal' });
    }
  },
    components:{
      saleCarForm
    },
      mounted() {
          //页面刷新之后更新回组件加载前的版本
          this.qwe=2
      },
}
</script>

<style scoped lang="scss">
  @function vw($px){
    @return $px/1080*100vw
  }
  .wrap{
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #FAFAFA;
  }
  /*顶部*/
  .header{
    height: vw(133);
    display: flex;
    justify-content: space-around;
    background-color: #fff;
  }
  .header>div{
    width: vw(220);
    height: vw(55);
    text-align: center;
    line-height: 3;
  }
  /*内容*/
  .main{
    height: 0;
    flex-grow: 1;
  }
  /*图片*/
  .picture{
    background: url("../assets/maiche/3.jpg") no-repeat;
    background-size:100% 100%;
    width: 100%;
    height: vw(576);
  }
  /*预约卖车+免费咨询+先估个价*/
  .service{
    height: vw(240);
    background-color: #fff;
    position: relative;
  }
  .service>div:nth-child(1){
    width: vw(960);
    height: vw(80);
    display: flex;
    position: absolute;
    top:vw(60);
    left:vw(60);
  }
  .service>div:nth-child(1)>div:first-child{
    font-size: vw(80);
    font-weight: bold;
    color: #F97300;
  }
  .service>div:nth-child(1)>div:last-child{
    margin-left: vw(30);
    line-height: 2.5;
  }
  .service>div:nth-child(2){
    width: vw(960);
    height: vw(135);
    color: white;
    background-color: #F97300;
    text-align: center;
    line-height: 3;
    position: absolute;
    top:vw(180);
    left:vw(60);
  }
  .service>div:nth-child(3){
    width: vw(960);
    height: vw(135);
    position: absolute;
    top:vw(345);
    left:vw(60);
    display: flex;
    justify-content: space-between;
  }
  .service>div:nth-child(3)>div{
    width: vw(460);
    height: vw(135);
    color: #F97300;
    border: 2px solid #F97300;
    text-align: center;
    line-height: 3;
  }
  /*直卖流程*/
  .guild{
    height: vw(785);
    margin-top: vw(30);
    background-color: #fff;
    position: relative;
  }
  .guild>div:nth-child(1){
    font-size: vw(60);
    font-weight: bold;
    width: vw(960);
    position: absolute;
    top: vw(63);
    left:vw(60);
  }
  .guild>div:nth-child(2){
    width: vw(960);
    height: vw(215);
    position: absolute;
    top: vw(213);
    left: vw(60);
    display: flex;
    justify-content: space-between;
  }
  .procedure{
    width: vw(140);
    height: vw(215);
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
  }
  .procedure>div:nth-child(1){
    width: vw(135);
    height: vw(135);
    border-radius: 50%;
    background-color: #F8F8F8;
  }
  .procedure>div:nth-child(2){
    font-size: vw(35);
    color: #AAAAAA;
  }
  .right{
    line-height: 3;
    color: #AAAAAA;
  }
  .iconfont{
    font-size: vw(72);
    line-height: 2;
    text-align: center;
  }
  .guild>div:nth-child(3){
    width: vw(960);
    height: vw(202);
    position: absolute;
    top: vw(463);
    left: vw(60);
  }
  .guild>div:nth-child(3)>div:first-child{
    width: vw(960);
    height: vw(15);
  }
  .guild>div:nth-child(3)>div:last-child{
    width: vw(960);
    height: vw(202);
    background-color: #FDF8EF;
  }
  /*价格高+透明交易*/
  .guild1{
    height: vw(3598);
    margin-top: vw(30);
    position: relative;
  }
  /*价格高*/
  .tag{
    width: vw(200);
    font-size: vw(60);
    font-weight: bold;
    position: absolute;
    top: vw(101);
    left: vw(60);
  }
  .rectangle{
    width: vw(90);
    height: vw(8);
    background-color: #F85D00;
    position: absolute;
    top: vw(204);
    left: vw(60);
  }
  .text{
    width: vw(830);
    font-size: vw(50);
    position: absolute;
    top: vw(282);
    left: vw(60);
  }
  /*近期成交*/
  .news{
    width: vw(960);
    height: vw(915);
    position: relative;
    top: vw(467);
    left: vw(60);
  }
  .news1{
    width: vw(960);
    height: vw(392);
    border-bottom: 1px dashed #E3E5E9;
    border-radius:0 0 10% 10%;
    background-color: #fff;
    position: relative;
  }
  .news1>div:nth-child(1){
    display: flex;
    position: absolute;
    top: vw(60);
    left: vw(62);
  }
  .news1>div:nth-child(1)>div:nth-child(1){
    font-size: vw(30);
    color: #F85D00;
    border: 1px solid #F85D00;
    border-radius:10%;
  }
  .news1>div:nth-child(1)>div:nth-child(1)~div{
    font-weight:500;
    color: #F85D00;
    margin-left: vw(15);
    line-height: 1;
  }
  .news1>div:nth-child(2){
    width: vw(830);
    height: vw(180);
    display: flex;
    position: absolute;
    top: vw(152);
    left: vw(62);
  }
  .news1>div:nth-child(2)>div:nth-child(1){
    width: vw(270);
    height: vw(180);
    border: 1px solid #000;
  }
  .news1>div:nth-child(2)>div:nth-child(2){
    width: vw(530);
    height: vw(180);
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    margin-left: vw(30);
  }
  .news2{
    width: vw(960);
    height: vw(418);
    border-radius:10% 10% 0 0;
    background-color: #fff;
    position: relative;
  }
  .news2>div:nth-child(1){
    color: #AAA;
    position: absolute;
    top: vw(53);
    left: vw(62);
  }
  .news2>div:nth-child(2){
    height: vw(142);
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    justify-content: space-between;
    align-content: space-between;
    top: vw(153);
    left: vw(62);
  }
  .news2>div:nth-child(2)>div{
    display: flex;
  }
  .news2>div:nth-child(2)>div>div:nth-child(1){
    font-size: vw(30);
    color: #AAA;
    border: 1px solid #AAA;
    border-radius:10%;
  }
  .news2>div:nth-child(2)>div>div:nth-child(2){
    color: #AAA;
    margin-left: vw(15);
    line-height: 1;
  }
  .news2>div:nth-child(2)>div>div:nth-child(3){

    width: vw(78);
    height: vw(41);
    margin-left: vw(15);
  }
  .news3{
    width: vw(960);
    height: vw(105);
    color: #D8C6A9;
    background-color: #FDF8EF;
    text-align: center;
    line-height: 2.2;
  }
  /*透明交易*/
  .guild2{
    width: 100%;
    height: vw(2210);
    position: relative;
    top: vw(470);
  }
  .rectangle1{
    width: vw(90);
    height: vw(8);
    background-color: #F85D00;
    position: absolute;
    top: vw(144);
    left: vw(60);
  }
  .text1{
    width: vw(470);
    height: vw(115);
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    top: vw(224);
    left: vw(60);
  }
  .picture1{
    width: 100%;
    height: vw(541);
    background: url("../assets/maiche/1.jpg") no-repeat;
    background-size:100% 100%;
    position: absolute;
    top: vw(419);
  }
  .transaction{
    font-size: vw(60);
    font-weight: bold;
    position: absolute;
    top: vw(1140);
    left: vw(60);
  }
  .rectangle2{
    width: vw(90);
    height: vw(8);
    background-color: #F85D00;
    position: absolute;
    top: vw(1240);
    left: vw(60);
  }
  .text2{
    width: vw(400);
    height: vw(115);
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    top: vw(1328);
    left: vw(60);
  }
  .picture2{
    width: 100%;
    height: vw(677);
    background: url("../assets/maiche/2.jpg") no-repeat;
    background-size:100% 100%;
    position: absolute;
    top: vw(1532);
  }
  /*卖车问答*/
  .questions{
    width: 100%;
    margin-top: vw(30);
    position: relative;
  }
  .tag1{
    font-size: vw(60);
    font-weight: bold;
    position: absolute;
    top: vw(60);
    left: vw(60);
  }
  .answers{
    width: vw(960);
    position: absolute;
    top: vw(183);
    left: vw(60);
  }
  .box{
    width: vw(960);
    height: vw(152);
    border-bottom: 1px solid #F1F1F1;
    position: relative;
  }
  .box1{
    display: flex;
    position: absolute;
    top: vw(47);
  }
  .box1>div:nth-child(1) {
    color: #F85D00;
    font-weight: bold;
  }
  .box1>div:nth-child(2){
    margin-left: vw(30);
  }
  .box2{
    width: vw(960);
    background-color: #F1F1F1;
  }
  .box2>div{
    font-size: 12px;
    width: vw(860);
    margin: 0 auto;
    padding-top: vw(50);
    padding-bottom: vw(50);
    line-height: 2;
  }
  .order{
    width: vw(960);
    height: vw(135);
    text-align: center;
    line-height: 3;
    color: white;
    background-color: #F97300;
    margin-top: vw(60);
    margin-bottom: vw(60);
  }
  /*底部*/
  .footer{
    height: vw(144);
    border: 1px solid #000;
    background-color: #fff;
  }
</style>
