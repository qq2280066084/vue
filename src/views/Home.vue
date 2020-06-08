<template>
  <div class="main">
    <md-scroll-view
      class="scrollZone"
      ref="scrollView"
      :scrolling-x="false"
      @refreshing="$_onRefresh"
      :auto-reflow="true"
    >
      <md-scroll-view-refresh
        slot="refresh"
        slot-scope="{ scrollTop, isRefreshActive, isRefreshing }"
        :scroll-top="scrollTop"
        :is-refreshing="isRefreshing"
        :is-refresh-active="isRefreshActive"
      ></md-scroll-view-refresh>
    <!--搜索导航-->
    <div class="topZone">
      <div class="searchbox">
        <div class="search">
        <p v-show="searchTxt.length<1">
          <md-icon
            name="search"
            size="lg"
          ></md-icon>
          搜索你想要的车
        </p>
        <input :class="{op:searchTxt.length>0,focus:isfocus}" @focus="isfocus=true" @blur="isfocus=false" type="text" v-model="searchTxt">
        </div>
        <div class="searchBtn" @click="$router.push({name:'List',query:{title:searchTxt,fromHome:1}})">搜索</div>
      </div>
      <md-swiper
        ref="swiper"
        :is-prevent="false"
        :useNative-driver="false"
      >
        <md-swiper-item :key="$index" v-for="(item, $index) in swiperImg" @click.native="toNews(item.id)">
              <div class="swiperList"   :style="{ background:`url('${item.img}?=${$index}') center center no-repeat`,  backgroundSize:'cover' }" ></div>
        </md-swiper-item>
      </md-swiper>
    </div>



    <!--内容-->
    <div  class="center cct">

        <!--筛选栏-->
<!--        <div class="shai">-->
<!--          <div class="row">-->
<!--            <div class="shai2-1" @click="$router.push({name:'List',query:{onlinePriceMax:5}})"><span>5万以下</span></div>-->
<!--            <div class="shai2-1" @click="$router.push({name:'List',query:{onlinePriceMax:10,onlinePriceMin:5}})"><span>5万-10万</span></div>-->
<!--            <div class="shai2-1"  @click="$router.push({name:'List',query:{onlinePriceMax:15,onlinePriceMin:10}})"><span>10-15万</span></div>-->
<!--            <div class="shai2-1"  @click="$router.push({name:'List',query:{onlinePriceMin:15}})"><span>15万以上</span></div>-->
<!--          </div>-->
<!--          <div class="row">-->
<!--            <div class="shai2-1"  @click="$router.push({name:'List',query:{typeStr:'SUV'}})"><span>SUV</span></div>-->
<!--            <div class="shai2-1" @click="$router.push({name:'List',query:{typeStr:'MPV'}})"><span>MPV</span></div>-->
<!--            <div class="shai2-1" @click="$router.push({name:'List',query:{typeStr:'三厢'}})"><span>三厢轿车</span></div>-->
<!--            <div class="shai2-1" @click="$router.push({name:'List',query:{typeStr:'两厢'}})"><span>两厢轿车</span></div>-->
<!--          </div>-->
<!--        </div>-->
    <div class="choItem">
      <div class="lable" @click="turnListPage('brandId', '8')">
        <div class="icon icon-1"></div>
        <div class="title">大众</div>
      </div>
      <div class="lable" @click="turnListPage('brandId', '8')">
        <div class="icon icon-2"></div>
        <div class="title">本田</div>
      </div>
      <div class="lable"  @click="turnListPage('brandId', '127')">
        <div class="icon icon-3"></div>
        <div class="title">别克</div>
      </div>
      <div class="lable" @click="turnListPage('brandId', '7')">
        <div class="icon icon-4"></div>
        <div class="title">丰田</div>
      </div>
      <div class="lable" @click="turnListPage('brandId', '3')">
        <div class="icon icon-5"></div>
        <div class="title">宝马</div>
      </div>
      <div class="lable" @click="turnListPage('brandId', '2')">
        <div class="icon icon-6"></div>
        <div class="title">奔驰</div>
      </div>
      <div class="lable" @click="turnListPage('brandId', '9')">
        <div class="icon icon-7"></div>
        <div class="title">奥迪</div>
      </div>
      <div class="lable" @click="turnListPage('brandId', '13')">
        <div class="icon icon-8"></div>
        <div class="title">现代</div>
      </div>
      <div class="line"></div>
    </div>
    <div class="aroundItem">
        <div class="lable" v-for="item in menu" :key="item.id"
          @click="$router.push({path:'/around',query:{type:item.id}})">
          <div class="icon" :style="item.url?{background:`url(${item.url}) no-repeat center center`,backgroundSize:`90% auto`}:{}"></div>
          <div class="title">{{item.name}}</div>
        </div>
    </div>
      <div class="line32"></div>
      <!-- 每日好车推荐 -->
      <div class="mt mt32">
           <b>每日好车推荐</b>
           <span> <b>{{nowStep}}</b> /{{tadayCars.length}}</span>
         </div>
        <!--  每日好车-->
      <div class="everyDay">
        <md-swiper
          @after-change="afterChange"
          :autoplay="5000"
          :is-prevent="false"
          ref="carSwiper">
          <md-swiper-item v-for="(item,keys) in tadayCars" :key="keys">
             <div class="ncarList">
                <VcCard class="bs" v-for="tag in item.list" :key="tag.id" :carData="tag"></VcCard>
             </div>
          </md-swiper-item>
        </md-swiper>
      </div>
      <!-- 同城 -->
      <div class="stitle">
        <div class="title">同城服务</div>
        <div class="show-more" @click="$router.push({path:'/around'})">查看更多</div>
      </div>
      <div class="service">
        <div class="lable" v-for="item in goodsList" :key="item.id"
         @click="$router.push({path:'/AroundDetail',query:{id:item.id}}) "
        >
          <div class="pic" :style="item.cover? {background:`url(${item.cover}) no-repeat center center`,backgroundSize: `auto 100%` }:{background:`#f7f7f7`}"></div>
          <div class="title" v-if="item.shop">{{item.shop.name}}</div>
          <div class="name">{{item.name}}</div>
          <div class="price">￥{{item.price}}</div>
        </div>
      </div>



      <div class="mt">
        <b>猜你喜欢</b>
      </div>
      <div class="ncarList">
        <VcCard class="bottomBorder" v-for="item in carList" :key="item.id" :carData="item"></VcCard>
      </div>
      <!--查找更多-->
      <div class="cha">
        <div class="cha1">
          <span @click="$router.push({name:'List'})">查找更多车源</span>
        </div>
      </div>

      <!--客服ke-->
      <div class="ke" style="opacity: 0;" @click="register">
        <i class="iconfont icon-tongyong-lianxikefutubiao"></i>
        <span>客服</span>
      </div>

    </div>

    </md-scroll-view>

    <!--底部tab-->
    <Navigation v-on:aaa="ddd" v-bind:adc="qwe"></Navigation>
    <md-dialog
      title="1775用户协议及隐私政策"
      :closable="false"
      layout="column"
      v-model="privcyBox"
      :btns="actDialog.btns"
    >
      您在使用1775产品或服务前，请认真阅读并充分理解相关法律条款、平台规则及用户隐私政策（可在“我的>隐私权政策”中查找并阅读）。当您点击同意，并开始使用产品或服务，即表示您已经理解并同意该条款，该条款将构成对您具有法律约束力的法律文件。
      用户隐私政策主要包含以下内容：
      1.个人信息（手机号、姓名、身份证明、面部识别特征、车辆、位置等）的收集、保存、使用与共享。
      2.设备权限（位置、通讯录、麦克风、相机等）的调用。

    </md-dialog>

  </div>
</template>
<script>
  // 组件链接名称 组件链接
  import { Toast } from 'mand-mobile';
  import Navigation from '@/components/Navigation.vue';
  export default {
    name: 'index',
    data() {
      return {
        actDialog:{
          btns: [
            {
              text: '同意并进入',
              handler:this.handlerOk
            },
          ],
        },
        privcyBox:false,
        searchTxt:'',
        isfocus:false,
        qwe: 0,
        a: true,
        b: '1',
        carListData: [],
        swiperImg:[
        ],
        searchOpt: {
          displacement: '', // 排量
          mileage: 0, // 里程
          brandDate: 1500000000, // 上牌时间
          gearBox: 1, // 变速箱，1手动 2自动
          onlinePriceMin: 0, // 最小价格
          onlinePriceMax: 0, // 最大价格
          carType: '', // 车型
          title: '', // 标题关键字
        },
        st: 0,
        isRefreshing: false,
        nowStep:1,
        carList:[ ],   //新的车辆列表
        tadayCars:[
            {
                brand:{
                    paifang:''
                }
            }
        ], //今日推荐车辆
        goodsList:[],
        menu:[], //周边分类
      };
    },
    created() {
      // this.getList();
      this.getCarList();
      this.getToadyCars()
      this.getSlider()
      this.checkInit(); // 检测是否是第一次进入app
      this.getGoods();
      this.getTypeList()
    },

    methods: {
       // 获取周边分类
      async getTypeList(){
        const res = await this.$api.get('/getShopType')
        const { data, success, info } = res.data
        if(!success) return this.$toast.info(info,1000)
        this.menu = data
      },
       // 获取周边随机商品
       async getGoods(){
         const res = await this.$api.get('/goods/randomGoods')
         const { success, data } = res.data
         if(!success) return console.log('查询失败')
         this.goodsList = data
       },




       checkInit(){
          const firStart = window.localStorage.getItem('firStart');
          if(!firStart){
           // this.privcyBox = true;
          }
       },
      handlerOk(){
        window.localStorage.setItem('firStart',1)
        this.privcyBox = false;
      },
      async $_onRefresh() {
        // this.getList();
        this.isRefreshing = true;
        await this.getCarList();
        await this.getToadyCars();
        this.isRefreshing = false;
        this.$refs.scrollView.finishRefresh()
      },
      getList() {
        this.isRefreshing = true;
        this.Api.findVehicleList({ onlineState: 1 }).then((res) => {
          this.isRefreshing = false;
          console.log(res);
          const { data, success } = res.data;
          this.$refs.scrollView.reflowScroller();
          this.$refs.scrollView.finishRefresh();
          if (success) {
            this.carListData = data.list;
          } else {
            Toast.info('获取列表失败');
          }
        }).catch((e) => {
          console.log(e);
        });
      },
      //  猜你喜欢列表
      async getCarList(){
          let res = await  this.$api.post('/vc/getHomeCarList')
          let {success,data} = res.data
          if(!success) return Toast.info('获取列表失败')
          return this.carList= data
      },
      //  今日推荐列表
      async getToadyCars(){
        let res = await this.$api.post('/vc/getToadyCars')
        let {success,data} = res.data
        if(!success) return Toast.info('获取列表失败')
        return  this.tadayCars = data
      },
      // 导航跳转
      valuation() {
        // 跳转界面
        this.$router.push({ name: 'valuation' });
      },
      index() {
        // 跳转界面
        this.$router.push({ name: 'index' });
      },
      city() {
        // 跳转界面
        this.$router.push({ name: 'city2' });
      },
      hu() {
        // 跳转界面
        this.$router.push({ name: 'mail' });
      },
      yichenggou() {
        // 跳转界面
        this.$router.push({ name: 'yicheng' });
      },
      mail() {
        // 跳转界面
        this.$router.push({ name: 'mail' });
      },
      nav(ev) {
        // 获取节点t
        const cl = document.querySelector('.box-').clientHeight;// 获取自身高度
        const sl = ev.target.scrollTop;// 获取内容框的滚动高度值
        const bx = document.querySelector('.box-');
        const b1 = document.querySelector('.box1-1-');
        const b2 = document.querySelector('.icon-xiaoxi');
        const b3 = document.querySelector('.box1-1-2-2-1');
        const ke = document.querySelector('.ke');
        // 当sl节点的值大于cl节点的值时触发 更改以下节点的样式

        this.st = sl;
        if (sl > cl) {
          bx.style.opacity = '1';
          b1.style.backgroundColor = '#cbcbcb';
          b1.style.opacity = '0.5';
          b2.style.color = '#000';
          b3.style.color = '#000';
        } else {
          bx.style.opacity = '0';
          b1.style.backgroundColor = '#fff';
          b1.style.opacity = '1';
          b2.style.color = '#fff';
          b3.style.color = '#fff';
        }
        if (sl > 400) {
          // ke.style.opacity = '1';
        } else {
          // ke.style.opacity = '0';
        }
        if (this.sdsc) return false;
        // 获取两个i标签的图标的节点
        const op = document.querySelector('.op');
        const po = document.querySelector('.po');
        // 当滚动高度在0~900之间时op节点与po节点的图标top值发生改变 起到更换效果
        if (sl >= 0 && sl < 900) {
          op.style.top = '27%';
          po.style.top = '100%';
        } else {
          op.style.top = '-50%';
          po.style.top = '23%';
        }
      },
      ddd() {
        const a1 = document.querySelector('.tab1-');// 获取首页导航标签图标的节点
        const op = document.querySelector('.op');// 获取op图标的节点
        const po = document.querySelector('.po');// 获取po图标的节点
        const ic = document.querySelector('.ic');// 获取第二个的首页的样式
        const o = getComputedStyle(a1, null).getPropertyValue('display');// 获取a1节点的display的值
        const centDom = document.querySelector('.cct');// 获取首页内容框的节点 可以直接获取到首页的节点
        // 更改两个不一样的首页的样式，一个显示一个隐藏
        a1.style.display = 'flex';
        ic.style.display = 'none';
        // 阻止nav函数内部执行
        // this.sdsc = true;
        if (o == 'flex' && this.a) {
          // 满足条件将更改op节点与po节点的top的值 起到更换的i标签内的图标更换
          op.style.top = '-50%';
          po.style.top = '23%';
          centDom.scrollTop = 900;// 滚动值赋予值为900(首页内容框的滚动条)
          this.a = !this.a;// 取a的相反值
        } else {
          op.style.top = '27%';
          po.style.top = '100%';
          centDom.scrollTop = 0;// 滚动值赋予值为0(首页内容框的滚动条)
          this.a = !this.a;
        }
        // 允许nav函数内部执行
        // this.sdsc =false
      },
      content() {
        // 跳转界面
        this.$router.push({ name: 'content' });
      },
      scenario() {
        // 跳转界面
        this.$router.push({ name: 'scenario' });
      },
      register() {
        // 跳转界面
        this.$router.push({ name: 'register' });
      },
      maiche() {
        // 跳转界面
        this.$router.push({ name: 'maiche' });
      },
      search() {
        // 跳转界面
        this.$router.push({ name: 'search' });
      },
      news() {
        // 跳转界面
        this.$router.push({ name: 'news' });
      },
      turnListPage(key, value) {

        // 按品牌筛选
        if (key === 'brandId') {
          this.searchOpt.brand = value;
          this.$router.push({ name: 'List', query: { brandId: this.searchOpt.brand } });
        }
      },
      toNews(id){
         console.log('hjererere')
        if(id){
          this.$router.push({ name: 'Company', query: { companyId:id} })
        }
      },
      beforeChange(from,to){
        console.log('before')
        console.log(from);
        console.log(to)
      },
      afterChange(from,to){
        this.nowStep = to+1
      },
      async getSlider(){
            const res = await this.$api.post('/home/getSliders');
            const { success,data } = res.data;
            this.swiperImg = data.map(r=> ({ img:r.img+'?r='+Date.now(),id:r.id }))
      }

    },

    // 绑定组件 组件名：组件链接名称
    components: {
      Navigation,
    },
    mounted() {
      // 页面刷新之后更新回组件加载前的版本
      this.qwe = 0;
    },
    deactivated() {
      const st = this.$refs.scrollView.getOffsets();

      sessionStorage.setItem('homescrollTop', st.top);
    },
    activated() {
      const st = sessionStorage.getItem('homescrollTop');

      // this.$refs.scrollView.scrollTo(0, parseInt(st));
      if (parseInt(st) > 0) {
        setTimeout(() => this.$refs.scrollView.scrollTo(0, parseInt(st), false), 100);
      }

      // this.$refs.scrollView.scrollTop = 1000;
      //  this.$refs.scrollView.scrollTo(0, 1000, false);
      // this.$refs.ct.scrollTop = st;
    },

  };
</script>

<style scoped lang="scss">

  /* 新的样式 */
   .choItem{
     margin-top: 48px;
     padding: 0 72px;
     background: #ffff;
     display: flex;
     align-items: center;
     flex-wrap: wrap;
     .lable{
       margin-top: 40px;
       text-align: center;
       margin-right: 95px;
       .icon{
         width: 80px;
         height: 80px;
       }
       .title{
         font-size:28px;
         font-family:PingFangSC-Regular,PingFang SC;
         color:#333;
         line-height: 1;
         margin-top: 12px;
       }

       .icon-1{
         background:url("../assets/chebiao/2.png") no-repeat center center;
         background-size: 90% auto ;
       }
       .icon-2{
         background:url("../assets/chebiao/4.png") no-repeat center center;
         background-size: 90% auto ;
       }
       .icon-3{
         background:url("../assets/chebiao/1.png") no-repeat center center;
         background-size: 90% auto ;
       }
       .icon-4{
         background:url("../assets/chebiao/3.png") no-repeat center center;
         background-size: 90% auto ;
       }
       .icon-5{
         background:url("../assets/chebiao/6.png") no-repeat center center;
         background-size: 90% auto ;
       }
       .icon-6{
         background:url("../assets/chebiao/7.png") no-repeat center center;
         background-size: 90% auto ;
       }
       .icon-7{
         background:url("../assets/chebiao/5.png") no-repeat center center;
         background-size: 90% auto ;
       }
       .icon-8{
         background:url("../assets/chebiao/8.png") no-repeat center center;
         background-size: 90% auto ;
       }
     }
     .lable:nth-child(4n+4){
       margin-right: 0;
     }
     .line{
       width: 100%;
       height: 1px;
       margin-top: 40px;
       background: #e6e6e6;
     }
   }
   .aroundItem{
     margin-top: 0;
     padding: 0 32px 40px;
     background: #ffff;
     display: flex;
     align-items: center;
     flex-wrap: wrap;
     .lable{
       width: 96px;
       text-align: center;
       margin-right: 48px;
       margin-top: 40px;
       .icon{
         width: 72px;
         height: 72px;
         margin: 0 auto;
       }
       .title{
         font-size: 24px;
         font-family:PingFangSC-Regular,PingFang SC;
         color:#333;
         margin-top: 16px;
         line-height: 1;
       }
     }
     .lable:nth-child(5n+5){
       margin-right: 0;
     }
   }
   .line32{
     height: 32px;
     background: #f7f7f7;
   }
   .stitle{
     box-sizing: border-box;
     padding: 0 34px;
     height: 118px;
     display: flex;
     align-items: center;
     justify-content: space-between;
     .title{
       font-size:36px;
       font-family:PingFangSC-Semibold,PingFang SC;
       font-weight:600;
       color:rgba(51,51,51,1);
     }
     .show-more{
       font-size:28px;
       font-family:PingFangSC-Regular,PingFang SC;
       font-weight:400;
       color:rgba(153,153,153,1);
     }
   }
   .service{
     box-sizing: border-box;
     padding: 0 27px;
     display: flex;
     flex-wrap: wrap;
     .lable{
       box-sizing: border-box;
       width: 338px;
       height: 432px;
       padding: 22px 22px 14px;
       border-radius: 16px;
       background:rgba(255,255,255,1);
       box-shadow:0px 4px 20px 0px rgba(0,0,0,0.08);
       margin-right: 20px;
       margin-bottom: 16px;
       position: relative;
       .pic{
         box-sizing: border-box;
         height: 194px;
         background: #999;
         border: 1px solid #f7f7f7;
       }
       .title{
         font-size:24px;
         font-family:PingFangSC-Regular,PingFang SC;
         line-height: 1;
         color: #999;
         overflow: hidden;
         text-overflow: ellipsis;
         white-space: nowrap;
         margin-top: 16px;
       }
       .name{
         font-size:32px;
         font-family:PingFangSC-Medium,PingFang SC;
         font-weight: bold;
         color: #333;
         line-height: 1.5;
         margin-top: 12px;
         text-overflow: -o-ellipsis-lastline;
         overflow: hidden;
         text-overflow: ellipsis;
         display: -webkit-box;
         -webkit-line-clamp: 2;
         line-clamp: 2;
         -webkit-box-orient: vertical
       }
       .price{
         font-size:34px;
         font-family:PingFangSC-Medium,PingFang SC;
         line-height: 40px;
         font-weight: bold;
         color: #D52002;
         margin-top: 16px;
         position: absolute;
         left: 22px;
         bottom: 14px;
       }
     }
     .lable:nth-child(2n+2){
       margin-right: 0;
     }
   }
  /* 新的样式结束 */


  .br{
    border: 1px solid #000;
    box-sizing: border-box;
  }
  @function vw($px){
    @return $px/1080*100vw
  }
  a {text-decoration: none}
  *{
    flex-shrink: 0;
  }
  .bos{
    display: flex;
    height: 100%;
    flex-direction: column;
  }

  /*内容*/
  .cct{

  }

  .box{
    display: flex;
    width: 100%;
    height: vw(600);
    position: relative;
    flex-direction: column;
    overflow: hidden;
  }
  /*轮播样式*/
  .box-1{
    width: 100vw;
    height: 100%;
    /*box-shadow: inset ;*/
    background-image: url("../assets/lunbotu/a.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }

  .box-2{
    width: 100vw;
    height: vw(600);
    background-image: url("../assets/lunbotu/b.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }
  .box-3{
    width: 100vw;
    height: vw(600);
    background-image: url("../assets/lunbotu/c.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }
  .box-1::after,.box-2::after,.box-3::after{
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background:linear-gradient(180deg,rgba(0,0,0,0.4) 0%,rgba(0,0,0,0.2) 25%,rgba(0,0,0,0.1) 100%);

  }
  .van-swipe{
    width: 100vw;
    height: vw(600);
  }



  .box-{
    width: 100%;
    height: vw(140);
    position: absolute;
    background-color: #fff;
    transition: opacity 500ms;
  }
  .box1-1{
    display: flex;
    height: vw(110);
    justify-content: space-around;
    align-items: center;
    margin-top: vw(15);

  }

  .box1-1-1{
    width: vw(910);
    height: vw(110);
    display: flex;
    align-items: center;
    position: relative;
  }
  .box1-1-{
    width: vw(910);
    height: vw(110);
    transition: opacity 1s;
    border-radius: vw(10);
    position: absolute;
    z-index: -1;
  }

  .box1-1-1-1{
    margin-left: vw(35);
  }
  .box1-1-1-1 span{
    font-size: 12px;
    color: #5A5A5A;
  }
  .box1-1-1-2{
    margin-left: vw(15);
    transform: scale(0.7);
  }
  .box1-1-1-2 i{
    font-size: 10px;
  }
  .box1-1-1-3{
    width: 1px;
    height: vw(40);
    border-left: 1px solid #B6B6B6;
    margin-left: vw(20);
  }
  .box1-1-1-4{
    margin-left: vw(20);
  }
  .box1-1-1-4 i{
    font-size: vw(50);
    color: #B8B8B8;
  }
  .box1-1-1-5{
    margin-left: vw(25);
  }
  .box1-1-1-5 span{
    font-size: vw(35);
    color: #B8B8B8;
  }


  .box1-1-2{
    width: vw(75);
    height: vw(100);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
  }
  .box1-1-2-1{
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
  }
  .box1-1-2-1 i{
    font-size: vw(50);
    color: #fff;
  }
  .box1-1-2-2{
    width: 120%;
    height: 50%;
    display: flex;
    justify-content: center;
    transform: scale(0.7);
  }
  .box1-1-2-2 span{
    font-size: vw(1);
    color: #fff;
  }

  .box2{
    width: 100%;
    display: flex;
    height: vw(62);
    position: absolute;
    top: vw(140);
  }
  .box2-1{
    margin-left: vw(20);
    width: vw(105);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .box2-1 span{
    font-size: vw(1);
    color: #fff;
    opacity: 0.7;
  }
  .box2-2{
    display: flex;
    width: vw(965);
    height: 100%;
    justify-content: space-between;
  }
  .box2-2-1{
    width: vw(300);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .box2-2-1-1{
    width: vw(300);
    height: 100%;
    border-radius: vw(30);
    background-color: #CBCBCB;
    opacity: 0.4;
    position: absolute;
  }
  .box2-2-3{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .box2-2-1 span{
    font-size: vw(30);
    color: #fff;
  }
  .box2-2-2{
    width: vw(160);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .box2-2-2-1{
    width: vw(160);
    height: 100%;
    position: absolute;
    opacity: 0.4;
    background-color: #CBCBCB;
    border-radius: vw(30);
  }
  .box2-2-2 span{
    font-size: vw(30);
    color: #fff;
  }

  /*副导航*/
  .fu{
    display: flex;
    height: vw(230);
    width: 100%;
    flex-direction: column;
    margin-top: vw(40);
    justify-content: space-between;
  }
  .fu1{
    display: flex;
    height: vw(200);
    justify-content: space-between;
    padding:0 vw(50)
  }
  .fu2{
    width: vw(200);
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
  }
  .fu3{
    width: 100%;
    height: vw(130);
    display: flex;

    justify-content: center;
  }
  .fu2-1{
    width: vw(130);
    height: vw(130);
    border-radius: 50%;
    background: -webkit-linear-gradient(left, #FF522B , #FC8412); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #FF522B , #FC8412); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #FF522B , #FC8412); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #FF522B , #FC8412); /* 标准的语法 */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .fu2-3{
    background: -webkit-linear-gradient(left, #7EC74A , #B4DA6E);
    background: -o-linear-gradient(right, #7EC74A , #B4DA6E);
    background: -moz-linear-gradient(right, #7EC74A , #B4DA6E);
    background: linear-gradient(to right, #7EC74A , #B4DA6E);
  }
  .fu2-4{
    background: -webkit-linear-gradient(left, #FDB000, #FFDD37);
    background: -o-linear-gradient(right, #FDB000, #FFDD37);
    background: -moz-linear-gradient(right, #FDB000, #FFDD37);
    background: linear-gradient(to right, #FDB000, #FFDD37);
  }
  .fu2-5{
    background: -webkit-linear-gradient(left, #8451F1, #B888FD);
    background: -o-linear-gradient(right, #8451F1, #B888FD);
    background: -moz-linear-gradient(right, #8451F1, #B888FD);
    background: linear-gradient(to right, #8451F1, #B888FD);
  }
  .fu2-6{
    background: -webkit-linear-gradient(left, #FC6B2A, #FDAC44);
    background: -o-linear-gradient(right,#FC6B2A, #FDAC44);
    background: -moz-linear-gradient(right, #FC6B2A, #FDAC44);
    background: linear-gradient(to right, #FC6B2A, #FDAC44);
  }
  .fu2-7{
    background: -webkit-linear-gradient(left, #524F65, #7F7A99);
    background: -o-linear-gradient(right,#524F65, #7F7A99);
    background: -moz-linear-gradient(right, #524F65, #7F7A99);
    background: linear-gradient(to right, #524F65, #7F7A99);
  }
  .fu2-8{
    background: -webkit-linear-gradient(left, #EF121C, #FB5A5B);
    background: -o-linear-gradient(right,#EF121C, #FB5A5B);
    background: -moz-linear-gradient(right, #EF121C, #FB5A5B);
    background: linear-gradient(to right, #EF121C, #FB5A5B);
  }
  .fu2-9{
    background: -webkit-linear-gradient(left, #FD4C04, #FE8031);
    background: -o-linear-gradient(right,#FD4C04, #FE8031);
    background: -moz-linear-gradient(right, #FD4C04, #FE8031);
    background: linear-gradient(to right, #FD4C04, #FE8031);
  }
  .fu2-1-1{
    transform: scale(0.8);
  }
  .fu2-1-1 span{
    font-size: 10px;
    color: #FFFCE9;
  }
  .fu2-1-2 span{
    font-style: italic;
    color: #F2F2F3;
    font-size: vw(50);
    font-weight: bold;
  }
  .fu2-1-2 i{
    font-size: 25px;
    color: #FFFCE9;
  }
  .fu2-2{
    width: 100%;
    height: vw(40);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .fu2-2 span{
    font-size: vw(30);
    color: black;
  }

  /*热卖标签*/
  .re{
    display: flex;
    width: 100%;
    height: vw(135);
    margin-top: vw(50);
    justify-content: center;
  }
  .re1{
    height: 100%;
    width: vw(965);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom:1px solid #D3D3D3;
  }
  .re2{
    font-size: vw(50);
    font-weight: bold;
  }
  .re3{
    font-size: vw(35);
    color: #D3D3D3;
  }

  /*筛选栏*/
  .shai{
    width: 100%;
    margin-top: 88px;
    .row{
      flex-wrap: wrap;
      justify-content: space-around;
      display: flex;
      margin-bottom: 30px;
    }
  }
  .shai1{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .shai2{
    display: flex;
    justify-content: space-between;
  }
  .shai2-1{
    width: vw(180);
    height: 100%;
    display: flex;
    font-size: 28px;
    justify-content: center;
    align-items: center;

  }

  .shai2-1 span{
    font-size: 24px;
  }

  /*牌子筛选*/
  .pai{

    width: 100%;

    justify-content: center;
    border-bottom: 1px solid rgba(0,0,0,.1);
    padding-bottom: 30px;

  }

  .pai2{
    height: vw(60);
    display: flex;
    justify-content: space-around;
    margin-bottom: 30px;
  }
  .pai2-1{
    width: vw(160);
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .pai2-2{
    width: vw(60);
    height: vw(60);
    background:url("../assets/chebiao/1.png") no-repeat;
    background-size:cover;
  }
  .pai2-4{
    width: vw(60);
    height: vw(60);
    background:url("../assets/chebiao/2.png") no-repeat;
    background-size:cover;
  }
  .pai2-5{
    width: vw(60);
    height: vw(60);
    background:url("../assets/chebiao/3.png") no-repeat;
    background-size:cover;
  }
  .pai2-6{
    width: vw(60);
    height: vw(60);
    background:url("../assets/chebiao/4.png") no-repeat;
    background-size:cover;
  }
  .pai2-7{
    width: vw(60);
    height: vw(60);
    background:url("../assets/chebiao/5.png") no-repeat;
    background-size:cover;
  }
  .pai2-8{
    width: vw(60);
    height: vw(60);
    background:url("../assets/chebiao/6.png") no-repeat;
    background-size:cover;
  }
  .pai2-9{
    width: vw(60);
    height: vw(60);
    background:url("../assets/chebiao/7.png") no-repeat;
    background-size:cover;
  }
  .pai2-10{
    width: vw(60);
    height: vw(60);
    border-radius: 50%;
    background-color:#EEEEEE;
    background-size:cover;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pai2-3{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pai2-3 span{
    font-size: 24px;
  }

  /*淘好车*/
  .tao{
    display: flex;
    height: vw(240);
    width: 100%;
    justify-content: center;
    margin-top: vw(50);
  }
  .tao1{
    width: vw(1000);
    height: 100%;
    display: flex;
    background-color: #F8F8F8;
    border-radius: vw(10);
    justify-content: space-evenly;
  }
  .tao2{
    width: vw(170);
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
  }
  .tao2-1 span{
    font-size: 12px;
    font-weight: bold;
  }
  .tao2-2 span{
    font-size: 12px;
    color: #D86E2D;
  }
  .tao2-3 span{
    font-size: 12px;
  }
  .tao3{
    width: vw(710);
    height: 100%;
    display: flex;
    justify-content: space-between;
  }
  .tao3-1{
    width: vw(205);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  .tao4{
    width: 100%;
    height: vw(125);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tao4-1{
    width: vw(190);
    height: vw(110);
  }
  .tao4-2{
    background: url("../assets/taohao/1.jpg") no-repeat;
    background-size: cover;
  }
  .tao4-2-1{
    width: vw(54);
    height: vw(63);
    position: absolute;
    top: 0;
    left: 0;
    border-radius: vw(10);
  }
  .tao4-2-1-1{
    width: 100%;
    height: 60%;
    transform: scale(0.5);
    color: #fff;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tao4-2-1-2{
    width: 100%;
    height: 40%;
    transform: scale(0.3);
    color: #fff;
    display: flex;
    justify-content: center;align-items: center;
  }
  .tao4-2-2{
    background: -webkit-linear-gradient(left top, #FABA39 , #F5D041); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(bottom right, #FABA39 , #F5D041); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(bottom right, #FABA39 , #F5D041); /* Firefox 3.6 - 15 */
    background: linear-gradient(to bottom right, #FABA39 , #F5D041); /* 标准的语法 */
  }
  .tao4-2-3{
    background: -webkit-linear-gradient(left top, #B5BABB , #C4C7C9); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(bottom right, #B5BABB , #C4C7C9); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(bottom right, #B5BABB , #C4C7C9); /* Firefox 3.6 - 15 */
    background: linear-gradient(to bottom right, #B5BABB , #C4C7C9); /* 标准的语法 */
  }
  .tao4-2-4{
    background: -webkit-linear-gradient(left top, #CB914C , #D5A578); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(bottom right, #CB914C , #D5A578); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(bottom right,#CB914C , #D5A578); /* Firefox 3.6 - 15 */
    background: linear-gradient(to bottom right, #CB914C , #D5A578); /* 标准的语法 */
  }

  .tao4-3{
    background: url("../assets/taohao/2.jpg") no-repeat;
    background-size: cover;
  }
  .tao4-4{
    background: url("../assets/taohao/3.jpg") no-repeat;
    background-size: cover;
  }
  .tao5{
    display: flex;
    justify-content: center;
    align-items: center;
    transform: scale(0.8);
  }
  .tao5 span{
    font-size: 12px;
    color: #9B9B9B;
  }

  /*侃车tv*/
  .kan{
    display: flex;
    width: 100%;
    height: vw(430);
    justify-content: center;
    margin-top: vw(20);
  }
  .kan1{
    width: vw(1000);
    height: 100%;
    display: flex;
    justify-content: space-between;
  }
  .kan2{
    width: vw(485);
    height: 100%;
    background-color: #EEEEEE;
    border-radius: vw(10);
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .kan2-1{
    width: vw(350);
    height: vw(105);
    position: absolute;
    top: vw(55);
    left: vw(50);
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
  .kan2-2{
    display: flex;
    align-items: center;
  }
  .kan2-2 span{
    font-size: vw(45);
    font-weight: bold;
  }
  .kan2-3{
    display: flex;
    align-items: center;
  }
  .kan2-3 span{
    font-size: vw(30);
    color: #DF6F29;
  }
  .kan2-4{
    width: vw(40);
    height: vw(40);
    border-radius: 50%;
    background-color: #F75000;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: vw(15);
  }

  .kan2-4 i{
    transform: scale(0.5);
    color: white;
  }
  .kan3{
    width: 100%;
    height: vw(210);
    position: absolute;
    bottom: vw(20);
  }
  .kan3-1{
    width: vw(440);
    height: 100%;
    margin: 0 auto;
    background: url("../assets/lunbotu/g.jpg") no-repeat;
    background-size: cover;
  }
  .kan3-2{
    width: vw(440);
    height: 100%;
    margin: 0 auto;
    background: url("../assets/lunbotu/b.jpg") no-repeat;
    background-size: cover;
    border-radius: vw(15);
  }

  /*特价te*/
  .te{
    width: 100%;
    height: vw(280);
    margin-top: vw(20);
    display: flex;
    justify-content: center;
  }
  .te1{
    width:  vw(1000);
    height: 100%;
    display: flex;
    position: relative;
  }
  .te2{
    flex: 1;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
  .te2-1{
    width: 100%;
    height: vw(42);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #E66309;
    font-weight: bold;
    font-size: 13px;
  }
  .te2-2{
    width: 100%;
    height: vw(35);
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    align-items: center;
    color: #BEBEBE;
    transform: scale(0.7);
  }
  .te2-3{
    width: 100%;
    height: vw(135);
    background: url(../assets/taohao/1.jpg) no-repeat;
    background-size: cover;
  }
  .te2-4{
    width: 100%;
    height: vw(135);
    background: url(../assets/taohao/2.jpg) no-repeat;
    background-size: cover;
  }
  .te2-5{
    width: 100%;
    height: vw(135);
    background: url(../assets/taohao/3.jpg) no-repeat;
    background-size: cover;
  }
  .te2-6{
    width: 100%;
    height: vw(135);
    background: url(../assets/taohao/4.jpg) no-repeat;
    background-size: cover;
  }

  .te3{
    width: vw(2);
    height: vw(235);
    border-left: vw(1) solid #F2F2F2;
    position: absolute;
    left:vw(250);
    top: vw(20);
  }
  .te4{
    width: vw(2);
    height: vw(235);
    border-left: vw(1) solid #F2F2F2;
    position: absolute;
    left:vw(500);
    top: vw(20);
  }
  .te5{
    width: vw(2);
    height: vw(235);
    border-left: vw(1) solid #F2F2F2;
    position: absolute;
    left:vw(750);
    top: vw(20);
  }

  /*底部导航bu*/
  .bu{
    width: 100%;
    height: vw(160);
    background-color:#F9F9F9;
    position: relative;
  }
  .bu1{
    width: 100%;
    height: vw(135);
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-between;
  }
  .bu2{
    width: vw(250);
    height: 100%;
    border-radius: 0 vw(20) 0 0;
    background-color: #fff;
    display: flex;
    justify-content: space-evenly;

    flex-direction: column;
  }
  .bu2-1{
    width: 100%;
    height: vw(50);
    font-size: 12px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .buyi{
    border-bottom: 3px solid #F47B01;
    font-weight: bold;
  }

  .bu2-2{
    width: 100%;
    height: vw(30);
    font-size: 12px;
    color:#ADADAD;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .bu3{
    width: vw(250);
    height: 100%;
    border-radius: vw(20) vw(20) 0 0;
    background-color: #fff;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
  }
  .bu3-1{
    width: 100%;
    height: vw(50);
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .bu3-2{
    width: 100%;
    height: vw(30);
    font-size: 12px;
    color:#ADADAD;
    display: flex;
    justify-content: center;
    align-items: center;
  }


  /*查找更多*/
  .cha{
    width: 100%;
    height: vw(280);
    display: flex;
    align-items: center;
    justify-content: center;

  }
  .cha1{
    width: vw(520);
    height: vw(120);
    border: 1px solid #A68761;
    border-radius: vw(10);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cha1 span{
    font-size: vw(40);
    color: #CF691A;
  }

  .ke{
    width: vw(140);
    height: vw(140);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    border-radius: 50%;
    background-color: #fff;
    position: fixed;
    bottom: vw(180);
    right: vw(40);
    box-shadow: vw(0.2) vw(5) vw(40) vw(3) #cbcbcb;
    transition: opacity 200ms;
  }
  .ke i{
    font-size: vw(70);
    color:#fd7b00;
  }
  .ke span{
    font-size: vw(20);
    color: #fd7b00;
  }



  // by dixon
  .topZone{
    background: $mainColor;
    height: 412px;
    position: relative;
    /*搜索栏*/
    .searchbox  {
      width:100%;
      height:72px;
      position: absolute;
      z-index: 999;
      left:0;
      bottom:-36px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .search{
        width: 0;
        flex-grow: 1;
        height: 72px;
        padding:0 32px;
        display: flex;
        align-items: center;
        position: relative;
        overflow: hidden;
        border-radius:36px;
        overflow: hidden;
        background:rgba(255,255,255,1);
        margin-left: 24px;
        box-shadow:0px 4px 20px 0px rgba(0,0,0,0.08);
        p{
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          font-size: 28px;
          color: #999;
          i{
            padding: 0;
            flex-grow: 0;
            display: block;
            width: 34px;
            height: 34px;
            text-align: center;
            line-height: 34px;
            margin-right: 10px;
            margin-top: 6px;
            margin-left: 0;
            font-size: 34px;
            background: none;
          }
        }
        input{
          width: 100%;
          height:72px;
          position: absolute;
          top: 0;
          left: 0;
          background:rgba(255,255,255,1);
          color:#333;
          text-align: left;
          line-height: 72px;
          font-size: 28px;
          border: none;
          opacity: 0;
          box-sizing: border-box;
          padding: 0 28px;
          &::-webkit-input-placeholder{
            color:#fff;
            font-size: 28px;
          }
        }
        input.op,input.focus{
          opacity: 1;
        }
      }
      .searchBtn{
        font-size: 32px;
        color: #fff;
        margin: 0 32px;
        width: 156px;
        height: 72px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #FF3434;
        color: #fff;
        border-radius: 36px;
        box-shadow:0px 4px 20px 0px rgba(255,52,52,0.2);
      }
    }
  }
  .scrollZone{
    height: 0;
    flex-grow: 1;
  }

  .mt{
    height:118px;
    line-height: 118px;
    padding:0 34px;
    font-size: 36px;
    span{
      font-size: 30px;
      float:right;
      b{
        font-size: 36px;
      }
    }
  }
  .mt32{
    margin-top: 32px;
  }
.everyDay{
  height: 800px;
}
.bs{
  box-shadow:0px 4px 20px 0px rgba(0,0,0,0.08);
  border-radius:16px;
}
  .bottomBorder{
    width: 100% !important;
    height: auto !important;
    padding: 40px 24px !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 0!important;
  }

   >>> .md-swiper-indicators {
    background: #000;
     bottom:10vw
  }

  .swiperList{
    height: 412px;
  }
</style>
