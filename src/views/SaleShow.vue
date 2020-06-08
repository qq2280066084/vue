<template>
  <div class="main">
    <div class="top">
      我要卖车
    </div>
    <div class="show">
      <md-scroll-view
        :scrolling-x="false"
        :scrolling-y="true"
        auto-reflow
      >
        <div class="banner"></div>


        <div class="content">
          <div class="process">
            <div class="item">
              <div class="img"></div>
              <div class="name">平台展示</div>
            </div>
            <div class="itemRi0"></div>
            <div class="item">
              <div class="img"></div>
              <div class="name">匹配买家</div>
            </div>
            <div class="itemRi0"></div>
            <div class="item">
              <div class="img"></div>
              <div class="name">专员沟通</div>
            </div>
            <div class="itemRi0"></div>
            <div class="item">
              <div class="img"></div>
              <div class="name">签约交易</div>
            </div>
          </div>
          <div class="saleNum">
            <div class="num">{{num}}</div>
            <div class="txt">辆车成功在1775实体车商卖出</div>
          </div>
          <div class="saleBtn" @click="$router.push({name:'SaleCar'})">我要卖车</div>
          <div class="saleItem" v-for="item in myInfos" :key="item.id">
            <!-- 用户自己发布的卖车信息 -->
            <div class="data">
              <div class="add">{{item.area | getArea}}</div>
              <div class="time">{{item.addTime | getTime}}</div>
            </div>
            <div class="txt">
             {{item.brandName}}
            </div>
            <!-- 此处轮播 -->
<!--            <div class="tips">-->
<!--              <md-swiper-->
<!--                :default-index="1"-->
<!--                :dragable="false"-->
<!--                :autoplay="3000"-->
<!--                :has-dots="false"-->
<!--                transition="slideY">-->
<!--                <md-swiper-item :key="$index" v-for="(item, $index) in simple">-->
<!--                  <a href="javascript:void(0)"-->
<!--                     class="banner-item">红冠马车业 138****5555 查看过</a>-->
<!--                </md-swiper-item>-->
<!--              </md-swiper>-->
<!--            </div>-->
          </div>
          <div class="seek">
            <div class="title">
              <div>商家求车</div>
              <md-icon name="arrow-right"></md-icon>
            </div>
            <div class="list">
              <div class="item" v-for="item in infos" :key="item.id">
                {{item.txt}}，车源信息详情请联系{{item.lxPhone}}
              </div>
            </div>
          </div>
          <div class="doubt">
            <div class="title">卖车问答</div>
            <div class="list">
              <div class="ditem" :class="{showMore:item.click}" v-for="(item,key) in list" :key="key" @click="item.click=!item.click">
                <div class="question">
                  <div class="left">
                    <div class="icon"></div>
                    <div class="txt">{{item.qus}}</div>
                  </div>
                  <md-icon name="arrow-down"></md-icon>
                </div>
                <div class="answer" v-html="item.answer"></div>
              </div>
            </div>
          </div>
        </div>

      </md-scroll-view>
    </div>
    <Navigation></Navigation>
  </div>
</template>

<script>
    import Navigation from "../components/Navigation";
    export default {
        name: "SaleShow",
        components: {
            Navigation
        },
        data() {
            return {
               list:[
                   {
                       qus:'1775卖车模式是什么？',
                       answer:'借助1775全国的网络为车主找寻意向最强的买家，上门验车，即时报价，立即打款',
                       click:false,
                   },
                   {
                       qus:'为什么选择在1775卖车？',
                       answer:'1.价格高：1775全国超过270个城市的买家网络，最高帮您多卖25%</br>' +
                           '2.卖的快：最快当天预约，当天成交，当天付款</br>' +
                           '3.透明交易：买卖交易面对面，中间环节无干扰</br>',
                       click:false,
                   },
                   {
                       qus:'在1775卖车个人信息是否安全？',
                       answer:'1775将对您的个人信息进行全程保密，确保安全信息不泄露',
                       click:false,
                   },
                   {
                       qus:'通过哪里可以找到1775卖车？',
                       answer:'登录1775二手车APP或官网www.1775.net.cn预约卖车</br>' +
                           '（支持自主或电话预约服务）',
                       click:false,
                   }
                   ],
                simple:['','',''],
                infos:[],
                myInfos:[],
            }
        },
        created(){
          this.getInfos();
          console.log(this.$store.state.userInfo.phoneNum)
          if(this.$store.state.userInfo.phoneNum){
              this.getMyInfos()
          }
        },
        filters:{
            getTime:value=>{
                let time = new Date(value);
                let year = time.getFullYear();
                let mouth = time.getMonth()+1;
                if(mouth<10) mouth = '0' + mputh;
                let day = time.getDate();
                if(day<10) day ='0' + day;
                let hour = time.getHours();
                if(hour<10) hour= '0' + hour;
                let min = time.getMinutes();
                if(min<10) min = '0' + min;
                return `${year}/${mouth}/${day}  ${hour}:${min}`
            },
            getArea:value=>{
                return value.replace(/\市.*/,'')
            }
        },
        methods: {
            async getInfos(){
                this.$toast.loading('1775加载中...');
                const res = await this.$api.get('/carSource/findInfos',{
                    params:{
                        page:1,
                        limit:5
                    }
                });
                const { success, info, data, num } = res.data;
                if( !success ){
                    this.$toast.info(info,2000);
                }else {
                    this.infos = data;
                    this.num = num;
                }
                this.$toast.hide();
            },
            async getMyInfos(){
                this.$toast.loading('1775加载中...');
                const res = await this.$api.get('/carSource/getMyInfos',{
                    params: {
                        accountId: this.$store.state.userInfo.phoneNum,
                    }
                })
                const { success, info, data } = res.data;
                if(!success) {
                    this.$toast.info(info,2000);
                }else {
                    this.myInfos = data;
                }
                this.$toast.hide();
            }
        },
    }
</script>

<style lang="scss" scoped>
  .mian {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    background: #fff;
  }

  input::placeholder {
    color: #999;
  }

  .top {
    height: 96px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    color: #333;
    font-weight: bold;
  }

  .show {
    height: 0;
    flex-grow: 1;
  }

  .banner {
    height: 376px;
    background: url("../assets/banner.png") no-repeat center center;
    background-size: 100% 376px;
  }

  .process {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 50px;
    margin-top: 40px;

    .item {
      text-align: center;

      .img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: url("../assets/icon_1.png") no-repeat center center;
        background-size: 80px 80px;
        margin: 0 auto;
      }

      .name {
        font-size: 24px;
        color: #333;
        line-height: 1;
        margin-top: 20px;
      }
    }

    .itemRi0 {
      width: 28px;
      height: 20px;
      background: url("../assets/icon_5.png") no-repeat center center;
      background-size: 28px 20px;
      margin-bottom: 48px;
    }
  }

  .saleNum {
    padding: 0 24px;
    box-sizing: border-box;
    margin-top: 60px;
    display: flex;
    align-items: flex-end;
    justify-content: center;

    .num {
      color: #FF4C4C;
      font-size: 60px;
      line-height: 60px;
      margin-right: 40px;
    }

    .txt {
      font-size: 28px;
      color: #333;
    }
  }

  .saleBtn {
    width: 610px;
    height: 80px;
    border-radius: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 80px auto 40px;
    background: linear-gradient(206deg, rgba(255, 131, 131, 1) 0%, rgba(255, 76, 76, 1) 100%);
    font-size: 32px;
    color: #fff;
  }

  .saleItem {
    width: 702px;
    box-sizing: border-box;
    padding: 26px 20px;
    border-radius: 16px;
    margin: 0 auto 20px;
    background: #f7f7f7;

    .data {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .add, .time {
        font-size: 28px;
        color: #999;
        line-height: 1;
      }
    }

    .txt {
      font-size: 28px;
      color: #333;
      line-height: 42px;
      margin-top: 26px;
    }

    .tips {
      margin-top: 35px;
      color: #999;
      font-size: 24px;
      height: 30px;
      a{
        color: #999;
      }
    }
  }

  .seek {
    border-top: 24px solid #f7f7f7;
    box-sizing: border-box;
    padding: 40px 24px 0;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 40px;

      div {
        font-size: 32px;
        font-weight: bold;
        color: #333;
      }

      i {
        font-size: 20px;
        font-weight: bold;
        color: #999;
      }
    }

    .list {
      .item {
        font-size: 28px;
        color: #333;
        line-height: 42px;
        padding-bottom: 40px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        margin-top: 40px;
      }

      .item:last-child {
        border-bottom: none;
      }
    }
  }

  .doubt {
    border-top: 24px solid #f7f7f7;

    .title {
      font-size: 32px;
      padding: 0 24px;
      font-weight: bold;
      color: #333;
      height: 120px;
      display: flex;
      align-items: center;
    }

    .ditem {
      .question {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        width: 702px;
        padding: 30px 0;
        margin: 0 auto;
        .left {
          display: flex;
          align-items: flex-start;
          width: 90%;

          .icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: url("../assets/icon_6.png") no-repeat center center;
            background-size: 40px 40px;
            margin-right: 20px;
          }

          .txt {
            font-size: 28px;
            color: #333;
            line-height: 1.5;
            width: 0;
            flex-grow: 1;
          }
        }
        i {
          font-size: 28px;
          color: #999;
          font-weight: bold;
          transform: rotate(0deg);
          /*transition: 0.5s;*/
        }

      }
      .answer {
        display: none;
        background: #f7f7f7;
        padding: 14px 38px 14px 83px;
        font-size: 24px;
        color: #333;
        line-height: 36px;
      }
    }
    .ditem.showMore{
      .question{
        i{
          transform: rotate(-180deg);
          /*transition: 0.5s;*/
        }
      }
      .answer{
        display: block;
      }
    }
  }
</style>
