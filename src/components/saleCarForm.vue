<template>
<div>
  <div >
    <div class="information">
      <div>
        <div>卖车城市</div>
        <div class="box1">
          <div class="city"><input type="text" placeholder="输入您的爱车所在地"></div>

        </div>
      </div>
      <!--<div>
        <div>车辆牌照</div>

        <div class="box1">
          <div class="brand">
              <keyboard-license-plate ref="keyboard" v-model="brand"/>
&lt;!&ndash;            <div>鲁</div>&ndash;&gt;
&lt;!&ndash;            <div class="iconfont icon-xiala"></div>&ndash;&gt;
          </div>
&lt;!&ndash;          <div class="brand" style="margin-left: 1.6vw">&ndash;&gt;
&lt;!&ndash;            <div>M</div>&ndash;&gt;
&lt;!&ndash;            <div class="iconfont icon-xiala"></div>&ndash;&gt;
&lt;!&ndash;          </div>&ndash;&gt;
        </div>
      </div>-->
      <div>
        <div>品牌车系</div>
        <div class="box1" @click="showBrand=true">
          <div class="make">{{brandInfo.name||'请选择品牌车系'}}</div>
          <div class="iconfont icon-arrow_right"></div>
        </div>
      </div>
      <div>
        <div>上牌时间</div>
        <div class="box1">
          <div class="time" @click="isDatePickerShow = true">{{showDate?showDate :'请选择上牌时间'}}</div>
          <div class="iconfont icon-arrow_right"></div>
        </div>
      </div>
      <div>
        <div>行驶里程</div>
        <div class="box1">
          <div class="mileage"><input style="border:none;text-align: right;" placeholder="输入公里数" v-model="carInfo.mileage" type="text"></div>
          <div class="kilometre">万公里</div>
        </div>
      </div>
      <div>
        <div>车况自评</div>
      </div>
      <div style="height: 80px;">
         <textarea class="desc" v-model="carInfo.desc" placeholder="请填写您的车辆情况"></textarea>
      </div>
    </div>
    <div class="photo" v-if="false">
      <div>
        <div class="text">车辆照片</div>
        <div class="text1">（选填）</div>
      </div>
      <div>
        <div class="text2">发布车辆照片，可增加曝光度，让您的爱车卖的更快（1775将自动为您遮挡号牌）</div>
      </div>
      <div>
        <div class="add">
          <div class="iconfont icon-tianjia"></div>
          <div class="text3">添加照片</div>
        </div>
      </div>
      <div>
        <div class="exhibition">
          <div class="text4">最佳拍摄角度</div>
          <div>
            <div>
              <div class="photo1"></div>
              <div class="text5">左前车身45°</div>
            </div>
            <div>
              <div class="photo1"></div>
              <div class="text5">右后车身45°</div>
            </div>
            <div>
              <div class="photo1"></div>
              <div class="text5">中控台</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="procedure">
      <div>发布流程</div>
      <div>
        <div>
          <div class="circular"><i class="iconfont icon-tijiao-"></i></div>
          <div class="text6">信息提交</div>
        </div>
        <div></div>
        <div>
          <div class="circular"><i class="iconfont icon-dianhua"></i></div>
          <div class="text6">客服确认</div>
        </div>
        <div></div>
        <div>
          <div class="circular"><i class="iconfont icon-chepai"></i></div>
          <div class="text6">车辆上架</div>
        </div>
      </div>
    </div>
    <div class="bottom" @click="submit" v-if="$store.state.userInfo.uid">预约卖车</div>
    <div class="bottom" @click="$router.push({name:'verify'})" v-else>下一步</div>
  </div>
    <md-date-picker
            v-model="isDatePickerShow"
            ref="datePicker"
            today-text="今天"
            :max-date="new Date()"
            @change="brandDateChange"
            @confirm="brandDateConfirm"
    ></md-date-picker>
  <md-popup
    v-model="showBrand"
    position="right"
  >
    <Brand @change="getBrand"></Brand>
  </md-popup>
</div>
</template>

<script>
import { Toast } from 'mand-mobile';
import Brand from '@/components/BrandOpt';

export default {
  name: 'information1',
  components: {
    Brand,
  },
  data() {
    return {
      brandInfo: {
        name: '',
        value: '',
      },
      showBrand: false,
      isDatePickerShow: false,
      showDate: '',
      carInfo: {
        uid: '',
        brandId: '',
        brandDate: '', // 上牌日期
        mileage: '',
        brandAddress: '',
        carPath: '',
        orderPrice: '',
        finalPrice: '',
        lowPrice: '',
        isPass: '',
      },
    };
  },
  methods: {
    getBrand(res) {
      console.log(res);
      this.brandInfo = res;
      this.showBrand = false;
      this.carInfo.brandId = res.value;
    },
    Return() {
      // 跳转界面
      this.$router.push({ name: 'maiche' });
    },
    brandDateChange() {

    },
    brandDateConfirm(columnsValue) {
      const mon = `${columnsValue[1].value}`.padStart(2, '0');
      const day = `${columnsValue[2].value}`.padStart(2, '0');
      const _d = `${columnsValue[0].value}-${mon}-${day} 00:00:00`;
      console.log(_d);
      this.showDate = `${columnsValue[0].value}-${mon}-${day}`;
      const _t = new Date(_d).getTime();
      console.log(_t);
      this.carInfo.brandDate = _t;
    },
    // 提交
    async submit() {
      this.carInfo.uid = this.$store.state.userInfo.uid;
      const res = await this.Api.ClentSellVehicle(this.carInfo);
      const { success, data } = res.data;
      if (success) {
        Toast.failed('提交成功');
      } else {
        Toast.failed('提交失败');
      }
    },
  },
};
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
    height: vw(144);
    display: flex;
    background-color: #fff;
    font-size: vw(50);
    position: relative;
    border-bottom: 3px solid #FAFAFA;
  }
  .icon-xiangzuo{
    font-weight: bold;
    color: #F85D00;
    position: absolute;
    left:vw(45);
    line-height: 3.5;
  }
  /*内容*/
  .main{
    height: 0;
    flex-grow: 1;
    overflow: scroll;
  }
  .information{

    background-color: #fff;
  }
  .information>div{
    height: vw(167);
    border-bottom: 3px solid #FAFAFA;
    display: flex;
    justify-content:space-between;
    margin-left: vw(60);
  }
  .information>div>div:first-child{
    line-height: 3.5;
  }
  .box1{
    display: flex;
    margin-right: vw(60);
  }
  .city{
    font-size: 14px;
    line-height: 3.5;
  }
  .icon-arrow_right{
    font-size: 14px;
    line-height: 3.7;
    margin-left: vw(20);
    color: #727272;
  }
  .brand{
    display: flex;
    font-size: 14px;
    line-height: 3.5;
  }
  .icon-xiala{
    font-size: 14px;
    line-height: 3.7;
    margin-left: vw(20);
    color: #727272;
  }
  .make{
    font-size: 14px;
    line-height: 3.5;
    color: #727272;
  }
  .time{
    font-size: 14px;
    line-height: 3.5;
    color: #727272;
  }
  .mileage{
    font-size: 14px;
    line-height: 3.5;
    color: #727272;
  }
  .kilometre{
    font-size: 14px;
    line-height: 3.5;
    margin-left: vw(20);
  }
  .travel{
    font-size: 14px;
    line-height: 3.5;
    color: #727272;
  }
  .photo{
    height: vw(1065);
    background-color: #fff;
    margin-top: vw(30);
  }
  .photo>div{
    width: vw(990);
    margin: 0 auto;
    display: flex;
  }
  .text{
    margin-top: vw(50);
  }
  .text1{
    margin-top: vw(50);
    margin-left: vw(10);
    color:  #727272;
  }
  .text2{
    font-size: 14px;
    color: #727272;
    margin-top: vw(40);
  }
  .add{
    width: vw(210);
    height: vw(210);
    background-color: #F6F9F8;
    margin-top: vw(40);
  }
  .icon-tianjia{
    font-size: 30px;
    color: #727272;
    text-align: center;
    padding-top: vw(30);
  }
  .text3{
    text-align: center;
    font-size: 12px;
    color: #727272;
  }
  .exhibition{
    width: vw(990);
    height: vw(437);
    background-color: #F6F9F8;
    margin-top: vw(50);
  }
  .text4{
    margin-top: vw(30);
    margin-left: vw(30);
    color: #727272;
  }
  .exhibition>div:last-child{
    width: vw(920);
    height: vw(280);
    margin: 0 auto;
    padding-top: vw(45);
    display: flex;
    justify-content: space-between;
  }
  .exhibition>div:last-child>div{
    display: flex;
    flex-wrap: wrap;
  }
  .photo1{
    width: vw(300);
    height: vw(200);
    background-color: #000;
  }
  .text5{
    width: vw(300);
    text-align: center;
    line-height: 2;
    color: #727272;
  }
  .procedure{
    background-color: #F6F9F8;
    padding-bottom: 10px;
  }
  .procedure>div:first-child{
    margin-top: vw(95);
    color: #727272;
    text-align: center;
  }
  .procedure>div:last-child{
    width: vw(920);
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding-top: vw(70);
  }
  .circular{
    width: vw(140);
    height: vw(140);
    line-height: vw(140);
    background-color: #EEE;
    text-align: center;
    border-radius: 50%;
  }
  .circular>div{
    text-align: center;
    font-size: 25px;
    color: #727272;
    line-height: 2;
  }
  .text6{
    font-size: 12px;
    line-height: 2;
    color: #727272;
  }
  .bottom{
    height: vw(150);
    background-color: #ff7d04;
    text-align: center;
    color: white;
    line-height: 3;
    width: 100%;
  }
  .desc{
    border: 1px solid #818181;
    padding:5px;
    width: 85vw;
    margin:0 auto
  }
</style>
