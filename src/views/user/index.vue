<template>
  <div class="main">
    <div class="login">
      <div class="policy">
         <router-link :to="{name:'News',query:{id:23}}">《用户协议与隐私政策》</router-link>
        <span class="signOut" @click="goOut" v-show="$store.state.userInfo.phoneNum"></span>
      </div>
      <!-- 未登录  -->
      <div class="loginItem" v-show="!$store.state.userInfo.phoneNum">
        <div class="tip">
          欢迎来到1775
        </div>
        <router-link :to="{path:'/Login'}">
          <div class="loginbtn">
            登录账号
          </div>
        </router-link>
      </div>
      <div class="loginItem" v-show="$store.state.userInfo.phoneNum">
        <div class="tip">
          Hi {{$store.state.userInfo.phoneNum}}
        </div>
        <div class="items">
          <div class="item" @click="$router.push({path:'/collect'})">
            <div class="icon collect"></div>
            <div class="txt">收藏</div>
          </div>
          <div class="item" @click="$router.push({path:'/history'})">
            <div class="icon record"></div>
            <div class="txt">浏览记录</div>
          </div>
        </div>
      </div>
    </div>


    <div class="content">
      <div class="title">猜你喜欢</div>
      <div class="list">
        <div class="nolist" v-show="!carList">
          <img src="../../assets/g_logo.png" alt="">
          <div class="noTips">
            还没推荐哦，<router-link :to="{path:'/Login'}"> <span>登录</span></router-link> 查看精选车辆
          </div>
        </div>
        <md-scroll-view
          :auto-reflow="true"
          :scrolling-x="false"
          :scrolling-y="true"
          class="scrollZone"
          ref="scrollView"
        >
          <vcCard class="card" v-for="data in carList" :key="data.id" :car-data="data"></vcCard>

        </md-scroll-view>
      </div>
    </div>
    <!--    <div class="top">-->
    <!--      <span>我的</span>-->
    <!--      <div class="iconfont icon-fankui"></div>-->
    <!--    </div>-->
    <!--    <div @scroll="fn" class="content">-->
    <!--      <div class="start">-->
    <!--        <div class="news">-->
    <!--          <div class="iconfont icon-fankui"></div>-->
    <!--        </div>-->
    <!--        <div>-->
    <!--          <div @click="fn1" class="headportrait"></div>-->
    <!--          <div @click="register" class="register" v-if="!$store.state.userInfo.phoneNum">-->
    <!--            <div>点击登录</div>-->
    <!--            <div>车源推荐更精准</div>-->
    <!--          </div>-->
    <!--          <div class="register" v-else>-->
    <!--            <div>{{$store.state.userInfo.phoneNum}}</div>-->
    <!--            <div>您好！欢迎回到1775二手车网</div>-->
    <!--          </div>-->

    <!--        </div>-->
    <!--        <div @click="mybehavior" id="behavior">-->
    <!--          <div>-->
    <!--            <div>0</div>-->
    <!--            <div>购物车</div>-->
    <!--          </div>-->
    <!--          <div @click="$router.push({ path: '/history' })">-->
    <!--            <div>{{historyCount}}</div>-->
    <!--            <div>浏览历史</div>-->
    <!--          </div>-->
    <!--          <div>-->
    <!--            <div>0</div>-->
    <!--            <div>我的订阅</div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="contre">-->
    <!--        <div @click="treasure" id="behaviortwo">-->
    <!--          <div>-->
    <!--            <div class="circular"></div>-->
    <!--            <div>我买的车</div>-->
    <!--          </div>-->
    <!--          <div>-->
    <!--            <div class="circular"></div>-->
    <!--            <div>我的分期</div>-->
    <!--          </div>-->
    <!--          <div>-->
    <!--            <div class="circular"></div>-->
    <!--            <div>我的合同</div>-->
    <!--          </div>-->
    <!--          <div>-->
    <!--            <div class="circular"></div>-->
    <!--            <div>买车宝典</div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <ul>-->
    <!--          <li @click="goOut" v-if="$store.state.userInfo.uid">-->
    <!--            <div>退出</div>-->
    <!--          </li>-->
    <!--        </ul>-->
    <!--      </div>-->

    <!--    </div>-->
    <!--   -->

    <!--底部tab-->
    <Navigation :adc="qwe"></Navigation>
  </div>
</template>

<script>
    import Navigation from '@/components/Navigation.vue';
    // import vcCard from "../../components/vcCard";

    export default {
        name: 'user/index',
        components: {
            Navigation,
        },
        computed: {
            historyCount() {
                let _arr = window.localStorage.getItem('history');
                _arr = _arr ? JSON.parse(_arr) : [];
                return _arr.length;
            },
        },
        data() {
            return {
                a: '',
                tgp: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                jps: [],
                notes: [
                    '雪弗兰 科鲁兹三厢2018款1.5 自动 320先锋天窗版',
                    '奥迪 A 6 L 2018款2.0 T 自动 35 TFSI 30周年时尚型',
                    '丰田凯美瑞2018款2.5自动 G 豪华版',
                    '别克凯越2018款1.3自动 15 N 精英型',
                    '宝马5系2018款2.0丁自动 530 Li 领先型 M 运动套装...',
                    '大众朗逸三厢 2017 款 1.6自动风尚版',
                    '日产天籁2016款2.0自动 XL 舒适版改款',
                    '别克君越2018款2.0丁自动28 T 精英型',
                    '别克君威2017款2.0丁自动28 T 尊贵型',
                    '本田 CR - V 2017款1.5 T 自动240 TURBO 豪华版四驱',
                    '大众帕萨特2017款1.8丁自动330 TS 噂荣版',
                    '大众迈腾2019款2.0丁自动330 TSI 领先型',
                ],
                kilometre: [
                    '1.8万公里', '1.8万公里', '1.0万公里', '0.1万公里',
                    '0.7万公里', '0.7万公里', '1.6万公里', '0.3万公里',
                    '1.3万公里', '0.9万公里', '0.5万公里',
                ],
                cabin: [
                    '华中仓', '华中仓', '华东仓', '华东仓', '西南仓', '华中仓',
                    '华北仓', '华北仓', '华北仓', '华南仓', '华东仓', '华中仓'],
                qwe: 1,
                carList:[] ,   // 猜你喜欢列表
            };
        },
        created() {
            console.log(this.$store.state)
            this.getHomeCarList()
        },
        methods: {
            fn1() {

            },
            // 退出登录
            goOut() {
                this.$store.commit('logout');
            },
            //获取猜你喜欢内容
            async getHomeCarList(){
              let res = await this.$api.post('/vc/getHomeCarList')
              let {success,data} = res.data
                if(!success) return false
               return this.carList = data
            },

            // 导航跳转
            comeon(i, a) {
                i[a].classList.add('col');
            },
            fn() {
                const sp = document.querySelector('.content').scrollTop;
                const change = document.querySelector('.top');
                const ged = change.clientHeight;
                if (sp > ged) {
                    change.style.opacity = '1';
                } else {
                    change.style.opacity = '0';
                }
            },
            register() {
                this.$router.push({path: '/Login'});
            },
            mybehavior(e) {
                const b = e.target;
                const c = e.target.parentNode;
                const d = document.getElementById('behavior').children;
                for (let i = 0; i < d.length; i++) {
                    if ((b === d[i] || c === d[i]) && i === 0) ;
                    if ((b === d[i] || c === d[i]) && i === 1) this.$router.push({path: '/history'});
                    if ((b === d[i] || c === d[i]) && i === 2) this.$router.push({path: '/subscribe'});
                }
            },
            treasure(e) {
                this.$toast.info('即将开通')
            },
            lucky(e) {
                const b = e.target;
                const f = e.currentTarget;
                const c = e.target.parentNode;
                const d = document.querySelectorAll('.contre>ul');
                if (f === d[0]) ;
                if (f === d[1]) ;
                if (f === d[2]) {
                    const e = d[2].children;
                    for (let i = 0; i < e.length; i++) {
                        if ((b === e[i] || c === e[i]) && i === 0) this.$router.push({path: '/suggest'});
                        if ((b === e[i] || c === e[i]) && i === 1) this.$router.push({path: '/help'});
                        if ((b === e[i] || c === e[i]) && i === 2) this.$router.push({path: '/set'});
                    }
                }
            },
        },
        mounted() {
            // 页面刷新之后更新回组件加载前的版本
            this.qwe = 4;
        },
    };
</script>

<style lang="scss" scoped>
  .main {
    background: #fff;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .login {
    height: 500px;
    background: #f0f0f0;
    position: relative;
    background: url("../../assets/new_bg.png") no-repeat center center;
    background-size: cover;
    overflow: hidden;

    .policy {
      position: absolute;
      top: 40px;
      right: 32px;
      color: #fff;
      font-size: 32px;
      line-height: 1;
      display: flex;
      align-items: center;
a{
  text-decoration: none;
  color:#fff

}
      span {
        display: block;
        width: 36px;
        height: 36px;
        background: url("../../assets/out.png") no-repeat center center;
        background-size: 36px 36px;
        margin-left: 20px;
      }
    }

    .loginItem {
      padding: 0 44px;
      margin-top: 185px;

      .tip {
        font-size: 48px;
        color: #fff;
        font-weight: bold;
        letter-spacing: 2px;
        line-height: 1;
      }

      .loginbtn {
        margin: 72px auto 0;
        width: 214px;
        height: 72px;
        box-sizing: border-box;
        border-radius: 16px;
        border: 1px solid #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        color: #fff;
      }

      .items {
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-top: 72px;

        .item {
          text-align: center;
          flex: 1;
          position: relative;

          .icon {
            width: 48px;
            height: 48px;
            margin: 0 auto;
          }

          .collect {
            background: url("../../assets/star.png") no-repeat no-repeat center left;
            background-size: 48px 48px;
          }

          .record {
            background: url("../../assets/record.png") no-repeat no-repeat;
            background-size: 48px 48px;
          }

          .txt {
            font-size: 28px;
            color: #fff;
            line-height: 1;
            margin-top: 16px;
          }
        }

        .item:first-child::after {
          content: '';
          width: 2px;
          height: 40px;
          position: absolute;
          right: 0;
          top: 50%;
          /*background: #fff;*/
          transform: translateY(-50%);
        }
      }
    }
  }

  .title {
    font-size: 36px;
    color: #333;
    line-height: 1;
    padding: 0 22px;
    font-weight: bold;
    float: left;
    background: #fff;
    border-radius: 40px 40px 0 0;
    padding-top: 68px;
    margin-top: -60px;
    position: relative;
    z-index: 9;
    margin-bottom: 40px;
  }

  .content {
    height: 0;
    flex-grow: 1;
    background: #fff;
    display: flex;
    flex-direction: column;
    .nolist{
      margin-top: 200px;
      text-align: center;
      img{
        width: 254px;
        height: 180px;
        margin: 0 auto;
      }
      .noTips{
        margin-top: 80px;
        font-size: 28px;
        color: #999;
        span{
          color: #34CCFF;
        }
      }
    }
    .list {
      height: 0;
      flex-grow: 1;
      overflow: hidden;

      .card {
        padding: 40px 22px;
        margin: 0;
        width: auto;
        height: auto;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }
      .card:first-child{
        padding-top: 0;
      }
    }
  }

</style>
