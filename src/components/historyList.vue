<template>
    <div class="car_ul">
        <div class="car_li" :key="item.id"  @click="content(item.id)">
            <div class="li_main">
                <div class="main_imgBox">
                    <img v-if="item.attachments[0] && item.attachments[0].path" :src="item.attachments[0].path|mobilePic" alt="">
                    <div class="hot_pic">
                        <div class="lie2-1-1">
                            <div class="lie2-1-1-1"></div>
                            <!--                 <div class="lie2-1-1-2"><i class="iconfont icon-sanjiaoright"></i></div>-->
                        </div>
                    </div>
                </div>
                <div class="main_textBox">
                    <p class="text_title">{{item.title}}</p>
                    <p class="text_infoe1">{{new Date(item.brandDate).getFullYear()}} / {{item.mileage || 0}}万公里 / {{item.carLocation || '汽车地址'}}</p>
                    <p class="text_infoe2">{{item.onlinePrice}}万</p>
                    <p class="text_lowpay" v-if="item.lowPay"><span><span>一成购</span></span>{{parseFloat(item.onlinePrice/10).toFixed(2)}}万 月供{{parseInt(item.onlinePrice*0.9*10000/24)}}元</p>
                </div>
                <div class="shop_container" v-if="listType===1"><i class="iconfont icon-gouwuche4"></i></div>
            </div>
            <div class="li_foot">
                <div class="foot_look">{{item.area}}{{item.address}}</div>
                <div class="foot_picContainer" @click.stop="">
                    <div class="foot_line"></div>
                    <p class="foot_pic"><a :href="`tel:${item.lxPhoen}`">拨打电话</a></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'carList',
  props: {
    listData: {
      type: Array,
    },
    listType: {
      type: Number,
      default: 0,
    },
  },
  created() {
    const _arr = window.localStorage.getItem('history');
    if (_arr) this.listData = JSON.parse(_arr);
  },
  methods: {
    content(id) {
      // 跳转界面
      this.$router.push({ name: 'content', query: { id } });
      this.$emit('onclick', 0);
    },
  },
};
</script>

<style scoped lang="scss">
    @function vw($px){
        @return $px/1080*100vw
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
                .main_imgBox{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: vw(371);
                    height: vw(248);
                    img{
                        width: 100%;
                        height: 100%;
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
                    width: 100%;
                    padding-left: vw(400);
                    p{
                        display: block;
                        width: 100%;
                    }
                    p.text_title{
                        height: vw(104);
                        font-size: vw(40);
                        color: #333;
                        padding: vw(5) 0;
                        line-height: vw(47);
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
                    width: vw(380);
                    height: vw(56);
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
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
                        /*border: 1px solid #e0c189;*/
                        border-radius: vw(5);
                        color: #e0c189;
                        font-size: vw(41);
                        line-height: vw(41);
                        float: right;
                        text-align: center;
                        margin-right: vw(14);
                        span{
                            display:inline-block;
                            transform: scale(.8);
                        }
                      a{
                        color: #e0c189;
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
</style>
