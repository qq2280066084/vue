<template>
  <!--汽车列表-->

  <div class="car_ul">
    <div class="car_li" v-for="item in listData" :key="item.id"  >
      <div class="li_main">
         <!--<div class="main_imgBox" :style="{background:`url(${mobilePic(item.attachments[0].path)}) center center`,backgroundSize:'cover',}">-->
         <div class="main_imgBox" >
           <div class="hot_pic">
              <div class="lie2-1-1">
                 <div class="lie2-1-1-1">
                   <!--<i class="iconfont icon-fire"><span>超值</span></i>-->
                 </div>
<!--                 <div class="lie2-1-1-2"><i class="iconfont icon-sanjiaoright"></i></div>-->
              </div>
           </div>
           <img  v-lazy="mobilePic(item.cover)" alt="" @click="content(item)">
         </div>
        <div class="main_textBox">
          <p class="text_title" @click="content(item)">{{item.title}}</p>
          <p class="text_infoe1">{{new Date(item.brandDate).getFullYear()}} / {{item.mileage || 0}}万公里 / {{item.carLocation || '' | shortCity}}</p>
          <p class="text_infoe2">{{item.onlinePrice}}万</p>
          <p class="text_lowpay" v-if="item.lowPay"><span><span>一成购</span></span>{{parseFloat(item.onlinePrice/10).toFixed(2)}}万 月供{{parseInt(item.onlinePrice*0.9*10000/24)}}元</p>
        </div>
        <div class="shop_container" v-if="listType===1">
          <!--<i class="iconfont icon-gouwuche4"></i>-->
        </div>
      </div>
      <div class="li_foot">
        <!--<div v-if="listType===1" class="foot_look" @click.stop="">找相似</div>-->
        <div class="foot_picContainer">
          <div class="foot_line"></div>
          <!--<p class="foot_pic"><span></span></p>-->
          <p class="foot_pic"><span>1775优选</span></p>
        </div>
      </div>
    </div>
    <template v-if="listData.length==0">
      <h1 class="notFound">1775 暂时还没发现这款车哦</h1>
    </template>
  </div>
</template>

<script>
export default {
  name: 'carList',
  props: {
    listData: {
      type: Array,
      default: () => [],
    },
    listType: {
      type: Number,
      default: 0,
    },
  },
  created() {
    setTimeout(() => {
      console.log(this.listData);
    }, 1000);
  },
  methods: {
    mobilePic(path) {
      const _tem = path.split('/');
      _tem.splice(-1, 0, 'm');
      return _tem.join('/');
    },
    content(item) {
      // 跳转界面
      this.$router.push({ name: 'content', query: { id: item.id } });
      // 把流量记录添加到本地历史记录当中
      const _now = window.localStorage.getItem('history');
      const _arr = _now ? JSON.parse(_now) : [];
      if (!_arr.find(r => r.id == item.id)) _arr.push(item);
      window.localStorage.setItem('history', JSON.stringify(_arr));

      this.$emit('onclick', 0);
    },
  },
  filters: {
    shortCity(r) {
      if (r.includes('广西壮族自治区')) {
        return r.split('广西壮族自治区')[1];
      }
      if (!r) {
        return '南宁';
      }
    },
  },
};
</script>

<style scoped lang="scss">
  @function vw($px){
    @return $px/1080*100vw
  }
.notFound{
  line-height: 100px;
  text-align: center;
  color:#666
}
  .car_ul{
    width: 100%;
    background: #fafafa;
    div{
      box-sizing: border-box;
    }
    .car_li{
      background: #fff;
      margin-top: vw(14);
      width: 100%;
      height: vw(391);
      padding: vw(41) vw(41) vw(22);
      position: relative;
      .li_main{
        width: 100%;
        height: vw(248);
        position: relative;
        display: flex;
        .main_imgBox{
          width: vw(371);
          height: vw(248);
          img{
            width: 100%;
            height: 100%;
            min-width: vw(371);
            min-height: vw(248);
          }
          .hot_pic{
            position: absolute;
            top: 0;
            left: 0;
            .lie2-1-1{
              width: 100%;
              height: vw(260);
              position: relative;
              background: url("../assets/lunbotu/b.jpg") no-repeat;
              background-size: cover;
              .lie2-1-1-1{
                display: flex;
                position: absolute;
                top: vw(-40);
                left: vw(-10);
                i{
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  position: relative;
                  font-size: vw(85);
                  color:#F45644;
                }
                span{
                  position: absolute;
                  transform: scale(0.7);
                  font-size: vw(25);
                  color:#fff;
                  flex-shrink: 0;
                }
              }
              .lie2-1-1-2{
                width: vw(65);
                height: vw(65);
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                bottom: vw(15);
                left: vw(20);
                border-radius: 50%;
                background-color: dimgray;
                opacity: 0.7;
                i{
                  position: absolute;
                  font-size: vw(10);
                  color: #fff;
                  opacity: 1;
                }
              }
            }
          }
        }
        .main_textBox{
          width: 0;
          flex-grow: 1;
          margin-left: vw(20);
          p{
            display: block;
            width: 100%;
          }
          p.text_title{
            height: vw(104);
            font-size: vw(38);
            color: #333;
            padding: vw(5) 0;
            line-height: vw(47);
            overflow: hidden;
          }
          p.text_infoe1{
            height: vw(48);
            font-size: vw(28);
            color: #838383;
            line-height: vw(48);
          }
          p.text_infoe2{
            height: vw(48);
            font-size: vw(34);
            line-height: vw(48);
            font-weight: bold;
            color: #1b1b1b;
          }
          p.text_lowpay{
            height: vw(42);
            font-size: vw(34);
            color: #ff4e00;
            font-weight: bold;
            &>span{
              width: vw(105);
              height: vw(42);
              background: #f97421;
              color: #fff;
              font-size: vw(24);
              text-align: center;
              line-height: vw(40);
              border-radius: vw(5);
              display: flex;
               justify-content: center;
              float:left;
              align-items: center;
              span{
                display:block;
                width: vw(105);
                transform: scale(.9);
                font-weight: normal;
                line-height: vw(40);
              }
              margin-right: vw(16);
            }
          }
        }
      }
      .li_foot{
        position: relative;
        .foot_look{
          width: vw(118);
          height: vw(56);
          background: #f2f2f2;
          border-radius: 0 vw(28) vw(28) 0;
          font-size: vw(22);
          line-height: vw(56);
          margin-top: vw(24);
          float: left;
          position: absolute;
          transform: translateX(vw(-41));
        }
        .foot_picContainer{
          float: left;
          padding-left: vw(400);
          .foot_line{
            width: vw(612);
            height: 1px;
            background: #eee;
            margin: vw(19) 0;
          }
          .foot_pic{
            height: vw(41);
            border: 1px solid #e0c189;
            border-radius: vw(5);
            color: #e0c189;
            font-size: vw(24);
            line-height: vw(41);
            float: left;
            text-align: center;
            margin-right: vw(14);
            span{
              display:inline-block;
              transform: scale(.8);
            }
          }
        }
      }
      .shop_container{
        position: absolute;
        top: vw(122);
        right: vw(10);
      }
    }
  }


  /*汽车列表*/
  /*.lie{
    width: 100%;
    !*height: vw(8640);*!
    background-color:#F4F4F4 ;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .lie1{
    margin-top: vw(14);
    width: 100%;
    height: vw(390);
    background-color:#FFF;
  }
  .lie2{
    width: 100%;
    height: vw(390);
    padding: vw(40) vw(40) vw(22);
    !*margin: vw(20) auto;*!
    display: flex;
    justify-content: space-between;
  }
  .lie2-1{
    width: vw(390);
    height: vw(248);
  }

  .lie2-2{
    width: vw(580);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .lie2-2-1{
    width: 100%;
    height: vw(100);
    font-size: vw(40);
  }
  .lie2-2-2{
    width: 100%;
    height: vw(42);
    font-size: vw(32);
    color: #959595;
    display: flex;
    align-items: center;
  }
  .lie2-2-3{
    width: 100%;
    height: vw(40);
    font-size: vw(40);
    font-weight: bold;
    display: flex;
    align-items: center;
  }
  .lie2-2-4{
    width: 100%;
    height: vw(40);
    display: flex;
    justify-content: space-between;
  }
  .lie2-2-4-1{
    width: vw(120);
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;;
    background-color: #F56C1C;
    border-radius: vw(3);
    line-height: vw(40);
    flex-shrink: 0;
  }
  .lie2-2-4-1 span{
    transform: scale(0.7);
    font-size: vw(20);
    color: white;
    flex-shrink: 0;
  }
  .lie2-2-4-2{
    display: flex;
    align-items: center;
    font-size: vw(30);
    font-weight: bold;
    color: #E1630C;
  }
  .lie2-2-5{
    width: 100%;
    height: vw(2);
    border-bottom:1px solid #F4F4F4;
  }
  .lie2-2-6{
    width: 100%;
    height: vw(45);
    border: vw(2) solid #D6CDA4;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    position: relative;
  }
  .lie2-2-6-1{
    transform: scale(0.8);
    font-size: vw(25);
    color: #DFC28A;
    line-height: vw(45);
    position: absolute;
    left: vw(10);

  }

  .lie2-2-6-2{
    transform: scale(0.7);
    font-size: 1vw;
    color: #DFC28A;
    font-weight: bold;
    line-height: vw(45);
    position: absolute;
    left: vw(30);
  }

  .lie2-2-6-3{
    width: vw(4);
    height: vw(25);
    border-left:vw(2) solid #DFC28A;
    line-height: vw(45);
    position: absolute;
    left: vw(250);
  }
  .lie2-2-6-4{
    transform: scale(0.7);
    font-size: vw(25);
    color: #DFC28A;
    font-weight: bold;
    line-height: vw(45);
    position: absolute;
    left: vw(250);
  }

  .lie2-2-6-5{
    transform: scale(0.7);
    font-size: vw(25);
    color: #DFC28A;
    font-weight: bold;
    line-height: vw(45);
    position: absolute;
    left: vw(380);
  }*/
</style>
