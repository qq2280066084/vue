<template>
  <!--参数 性能-->
    <div class="box">
      <div class="head">
        <p class="iconfont icon-xiangzuo" @click="goOff">返回</p>
        <h4  v-for="(item,index) of head" :key="index" @click="aaa(index)" :class=" aa==index?'addClass':'cheng'">{{item.name}}</h4>
        <p></p>
      </div>
      <!--// 主体部分 分为两个主体 一个是性能参数的 一个是完整配图的 利用z-index 和定位实现切换的效果-->
      <div class="main">
        <!--// 车辆信息-->
        <div class="main-title">
          <p>{{carData.title||''}}</p>
        </div>
        <!--性能参数的  分为七个部分  公用样式title 是每个部分的小标题  dis 是flex布局的样式 是里面的部分的详细分析-->
        <div class="main1" v-show="m1">
          <!--性能参数的第一部分 性能分析-->
          <div class="main1-two">
            <div class="title">
              <p class="iconfont icon-baogao-copy"></p><span>性能分析</span>
              <div class="location1"></div>
            </div>
            <div class="two-bottom">
              <!--<img src="../assets/content/modeo02.jpg" alt="">-->
            </div>
          </div>
          <!--性能参数的第二部分  空间-->
          <div class="main1-three">
            <div class="title"><p class="iconfont icon-ego-box"></p><span>空间</span>
              <div class="location"></div>
            </div>
            <div class="three-bottom">
              <!--左边的部分-->
              <div class="three-bottom-left">
                <div class="bottom-left-top">
                  <img src="../assets/content/kongjian1.png" alt="">
                  <p>长：4515mm 宽：1725mm</p>
                  <p>高： 1445mm</p>
                </div>
                <div class="bottom-left-bottom">
                  <p>
                    <span class="iconfont icon-chemen"></span>车门数:4  <span class="iconfont icon-typecar124"></span>座椅数：5
                  </p>
                </div>
              </div>
              <!--右边的部分-->
              <div class="three-bottom-right">
                <div class="bottom-right-top">
                  <img src="../assets/content/kongjian2.png" alt="">
                  <p>前轮距： 1475mm</p>
                </div>
                <div class="bottom-right-center">
                  <img src="../assets/content/kongjian3.png" alt="">
                  <p>后轮距： 1475mm</p>
                </div>
                <div class="bottom-right-bottom">
                  <img src="../assets/content/kongjian4.png" alt="">
                  <p>轮距： 2600mm</p>
                </div>
              </div>
            </div>
          </div>
          <!--性能参数的第三部分 耗油-->
          <div class="main1-four">
            <div class="title"><p class="iconfont icon-xinxinicon"></p><span>耗油</span>
              <div class="location"></div>
            </div>
            <ul class="four-bottom">
              <li class="dis" v-for="(item , index) of haoyou" :key="index">
                <p>{{item.name}}</p><span>{{item.age}}</span>
              </li>
            </ul>
          </div>
          <!--性能参数的第四部分  动力-->
          <div class="main1-five">
            <div class="title"><p class="iconfont icon-shezhi1"></p><span>动力</span>
              <div class="location"></div>
            </div>
            <ul class="four-bottom">
              <li class="dis" v-for="(item , index) of dongli" :key="index">
                <p>{{item.name}}</p><span>{{item.age}}</span>
              </li>
            </ul>
          </div>
          <!--性能参数的第五部分  操控-->
          <div class="main1-six">
            <div class="title"><p class="iconfont icon-jiasucaokong"></p><span>操控</span>
              <div class="location"></div>
            </div>
            <ul class="four-bottom">
              <li class="dis" v-for="(item , index) of caokong" :key="index">
                <p>{{item.name}}</p><span>{{item.age}}</span>
              </li>
            </ul>
          </div>
          <!--性能参数的第六部分  安全-->
          <div class="main1-seven">
            <div class="title"><p class="iconfont icon-anquan"></p><span>安全</span>
              <div class="location"></div>
            </div>
            <ul class="four-bottom">
              <li class="dis" v-for="(item , index) of anquan" :key="index">
                <p>{{item.name}}</p><p>{{item.age}}</p>
              </li>
            </ul>
          </div>
        </div>
        <!--完整配图   分为十一个部分  公用样式title2 是每个部分的小标题  dis 是flex布局的样式 是里面的部分的详细分析-->
    <!--    <div class="main2" v-show="m2">
          &lt;!&ndash;完整配图d  第一部分 基本信息&ndash;&gt;
          <div class="main2-box">
            <div class="title2">
              <p>基本信息</p>
              <p>·<span>标配</span></p>
            </div>
            <ul class="bottom">
              <li class="dis" v-for="(item , index) of jiben" :key="index">
                <p>{{item.name}}</p><span>{{item.age}}</span>
              </li>
            </ul>
          </div>
          &lt;!&ndash;完整配图d  第二部分 发动机参数&ndash;&gt;
          <div class="main2-box">
            <div class="title2">
              <p>发动机参数</p>
              <p>·<span>标配</span></p>
            </div>
            <ul class="bottom">
              <li class="dis" v-for="(item , index) of fadong" :key="index">
                <p>{{item.name}}</p><span>{{item.age}}</span>
              </li>
            </ul>
          </div>
          &lt;!&ndash;完整配图d  第三部分 车身参数&ndash;&gt;
          <div class="main2-box">
            <div class="title2">
              <p>车身参数</p>
              <p>·<span>标配</span></p>
            </div>
            <ul class="bottom">
              <li class="dis" v-for="(item , index) of cheshen" :key="index">
                <p>{{item.name}}</p><span>{{item.age}}</span>
              </li>
            </ul>
          </div>
          &lt;!&ndash;完整配图d  第四部分 变速箱/底盘参数&ndash;&gt;
          <div class="main2-box">
            <div class="title2">
              <p>变速箱/底盘参数</p>
              <p>·<span>标配</span></p>
            </div>
            <ul class="bottom">
              <li class="dis" v-for="(item , index) of biansu" :key="index">
                <p>{{item.name}}</p><span>{{item.age}}</span>
              </li>
            </ul>
          </div>
          &lt;!&ndash;完整配图d  第五部分 安全配置&ndash;&gt;
          <div class="main2-box">
            <div class="title2">
              <p>安全配置</p>
              <p>·<span>标配</span></p>
            </div>
            <ul class="bottom">
              <li class="dis" v-for="(item , index) of anquan2" :key="index">
                <p>{{item.name}}</p><p>{{item.age}}</p>
              </li>
            </ul>
          </div>
          &lt;!&ndash;完整配图d  第六部分 控制/辅助配置&ndash;&gt;
          <div class="main2-box">
            <div class="title2">
              <p>控制/辅助配置</p>
              <p>·<span>标配</span></p>
            </div>
            <ul class="bottom">
              <li class="dis" v-for="(item , index) of fuzhu" :key="index">
                <p>{{item.name}}</p><p>{{item.age}}</p>
              </li>
            </ul>
          </div>
          &lt;!&ndash;完整配图d  第七部分 车轮制动参数&ndash;&gt;
          <div class="main2-box">
            <div class="title2">
              <p>车轮制动参数</p>
              <p>·<span>标配</span></p>
            </div>
            <ul class="bottom">
              <li class="dis" v-for="(item , index) of zhidong" :key="index">
                <p>{{item.name}}</p><span>{{item.age}}</span>
              </li>
            </ul>
          </div>
          &lt;!&ndash;完整配图d  第八部分 车窗/玻璃/雨刷&ndash;&gt;
          <div class="main2-box">
            <div class="title2">
              <p>车窗/玻璃/雨刷</p>
              <p>·<span>标配</span></p>
            </div>
            <ul class="bottom">
              <li class="dis" v-for="(item , index) of boli" :key="index">
                <p>{{item.name}}</p><p>{{item.age}}</p>
              </li>
            </ul>
          </div>
          &lt;!&ndash;完整配图d  第九部分 后视镜/后备箱/外观套件&ndash;&gt;
          <div class="main2-box">
            <div class="title2">
              <p>后视镜/后备箱/外观套件</p>
              <p>·<span>标配</span></p>
            </div>
            <ul class="bottom">
              <li class="dis" v-for="(item , index) of waiguan" :key="index">
                <p>{{item.name}}</p><p>{{item.age}}</p>
              </li>
            </ul>
          </div>
          &lt;!&ndash;完整配图d  第十部分 方向盘/座椅&ndash;&gt;
          <div class="main2-box">
            <div class="title2">
              <p>方向盘/座椅</p>
              <p>·<span>标配</span></p>
            </div>
            <ul class="bottom">
              <li class="dis" v-for="(item , index) of fangxiang" :key="index">
                <p>{{item.name}}</p><p>{{item.age}}</p>
              </li>
            </ul>
          </div>
          &lt;!&ndash;完整配图d  第十一部分 多媒体配置/空调/冰箱 &ndash;&gt;
          <div class="main2-box">
            <div class="title2">
              <p>多媒体配置/空调/冰箱</p>
              <p>·<span>标配</span></p>
            </div>
            <ul class="bottom">
              <li class="dis" v-for="(item , index) of meiti" :key="index">
                <p>{{item.name}}</p><p>{{item.age}}</p>
              </li>
            </ul>
          </div>
        </div>-->
        <div class="main2" v-show="m2" v-html="carData.mobilePz">

        </div>
      </div>
      <div class="footer">
        在线咨询
      </div>
    </div>
</template>

<script>
export default {
  name: 'parameter',
  data() {
    return {
      carData: {
        title: '',
      },
      head: [
        // { name: '性能参数' },
        { name: '完整配置' },
      ],
      // 头部导航的样式的切换的参数
      aa: 0,
      // m1 m2用来点击导航时的判断main1 main2 是否显示 的一个切换效果
      m1: false,
      m2: true,
      // 下面 四个是性能参数列表渲染出来的
      // 耗油 的
      haoyou: [
        { name: '工信部综合耗油(L/100km)', age: '7.6' },
        { name: '最高时速(km/h)', age: '175' },
        { name: '官方百公里加速(km/h)', age: '13.5' },
      ],
      // 动力的
      dongli: [
        { name: '动力形式', age: '汽油' },
        { name: '排量(ml)', age: '1485' },
        { name: '最大功率(kW)', age: '83' },
        { name: '最大功率转速(rpm)', age: '6000' },
        { name: '最大扭矩(N.m)', age: '141' },
        { name: '最大扭矩转速(rpm)', age: '4000' },
      ],
      // 操控的
      caokong: [
        { name: '后悬挂类型', age: '双连杆独立悬架' },
        { name: '前轮胎规格', age: '185/65 R14' },
        { name: '后轮胎规格', age: '185/65 R14' },
      ],
      // 安全的
      anquan: [
        { name: '驾驶员气囊', age: '·' },
        { name: '副驾驶气囊', age: '·' },
      ],

      // 完整配图部分的
      // 基本信息
      jiben: [
        { name: '款代', age: '第2代' },
        { name: '车身结构', age: '4门 5座 轿车-三厢车' },
        { name: '上市时间', age: '2015-04-02' },
        { name: '停产时间', age: '2016-12-31' },
        { name: '整车质保', age: '三年或10万公里' },
        { name: '工信部综合耗油(L/100km)', age: '7.6' },
        { name: '最高时速(km/h)', age: '175' },
        { name: '官方百公里加速(km/h)', age: '13.5' },
        { name: '车身颜色', age: '白色' },
      ],

      // 发动机参数
      fadong: [
        { name: '发动机', age: '1.5L 113马力 L4' },
        { name: '发动机型号', age: 'L2B' },
        { name: '排气量(ml)', age: '1485' },
        { name: '发动机类型', age: '自然吸气' },
        { name: '气缸排列形式', age: 'L型' },
        { name: '气缸数', age: '4' },
        { name: '每缸气门数', age: '4' },
        { name: '燃油喷射类型', age: '多点电喷' },
        { name: '气门技术', age: 'D-VVT' },
        { name: '凸轮轴形式', age: '双顶置凸轮轴' },
        { name: '最大马力(Ps)', age: '113' },
        { name: '最大功率(kW)', age: '83' },
        { name: '最大功率转速(rpm)', age: '6000' },
        { name: '最大扭矩(N.m)', age: '141' },
        { name: '最大扭矩转速(rpm)', age: '4000' },
        { name: '缸体材质', age: '铸铁' },
        { name: '缸盖材质', age: '铝合金' },
        { name: '动力形式', age: '汽油' },
        { name: '环保标准', age: '欧5' },
        { name: '燃油标号(#)', age: '93(京92)' },
      ],

      // 车身参数
      cheshen: [
        { name: '长(mm)', age: '4515' },
        { name: '宽(mm)', age: '1725' },
        { name: '高(mm)', age: '1445' },
        { name: '轴距(mm)', age: '2600' },
        { name: '前轮距(mm)', age: '1475' },
        { name: '后轮距(mm)', age: '1475' },
        { name: '座椅数(mm)', age: '5' },
        { name: '车身形式', age: '轿车-三厢车' },
        { name: '行李箱容积(L)', age: '405' },
        { name: '油箱容积(L)', age: '60' },
        { name: '整备质量(kg)', age: '1230' },
      ],

      // 变速箱/底盘参数
      biansu: [
        { name: '变速箱', age: '6档手自一体' },
        { name: '档位个数', age: '6' },
        { name: '变速箱类型', age: 'AT自动' },
        { name: '驱动方式', age: '前置前动' },
        { name: '四动形式', age: '前驱' },
        { name: '前悬挂类型', age: '麦弗迅式独立悬架' },
        { name: '后悬挂类型', age: '双连杆独立悬架' },
        { name: '助力类型', age: '机械液压' },
        { name: '车体结构', age: '承载式车身' },
      ],
      // 安全配置
      anquan2: [
        { name: '车内中控锁', age: '·' },
        { name: '驾驶员气囊', age: '·' },
        { name: '副驾驶气囊', age: '·' },
        { name: '安全带未系提示', age: '·' },
        { name: '儿童座椅接口', age: '·' },
        { name: '遥控钥匙', age: '·' },
        { name: '发动机防盗系统', age: '·' },
      ],
      // 操控/辅助配置
      fuzhu: [
        { name: 'ABS防抱死系统', age: '·' },
        { name: 'EBD/CBC等制动力分配...', age: '·' },
      ],
      // 车轮制动参数
      zhidong: [
        { name: '前制动类型', age: '通风盘' },
        { name: '后制动类型', age: '实心盘' },
        { name: '驻车制动类型', age: '手刹' },
        { name: '前轮胎规格', age: '185/65 R14' },
        { name: '后轮胎规格', age: '185/65 R14' },
        { name: '备胎类型', age: '非全尺寸' },
        { name: '轮毂材质', age: '钢' },
      ],
      // 车身/玻璃雨刷
      boli: [
        { name: '电动车窗', age: '·' },
        { name: '主驾驶位遮阳板化妆镜', age: '·' },
        { name: '副驾驶位遮阳板化妆镜', age: '·' },
        { name: '远灯光类型', age: '卤素' },
        { name: '大灯高度调整', age: '·' },
      ],
      // 后视镜/后备箱/外观套件
      waiguan: [
        { name: '内后视镜手动防炫目', age: '·' },
        { name: '后视镜电动调节', age: '·' },
      ],
      // 方向盘/座椅
      fangxiang: [
        { name: '方向盘手动上下调节', age: '·' },
        { name: '主座椅前后调节', age: '·' },
        { name: '主座椅靠背调节', age: '·' },
        { name: '副座椅前后调节', age: '·' },
        { name: '副座椅靠背调节', age: '·' },
        { name: '后排座椅比例放倒', age: '·' },
        { name: '方向盘调节方向', age: '·' },
        { name: '座椅高低可调', age: '·' },
        { name: '前排中央扶手', age: '·' },
        { name: '第二排座椅放倒', age: '·' },
      ],
      // 多媒体配置/空调/冰箱
      meiti: [
        { name: '行车电脑形式屏', age: '·' },
        { name: '扬声器数量', age: '6-7' },
        { name: 'USB接口', age: '·' },
        { name: 'AUX/IPOD接口', age: '·' },
        { name: '蓝牙/车载电话', age: '·' },
      ],
    };
  },
  created() {
    console.log(this.$route.params);
    this.carData = this.$route.params;
    console.log(this.carData.mobilePz);
  },
  methods: {
    aaa(index) {
      this.aa = index;
      if (index === 1) {
        this.m1 = false;
        this.m2 = true;
      } else {
        this.m1 = true;
        this.m2 = false;
      }
      document.querySelector('.main').scrollTop = 0;
    },
    // 点击 头部的返回上一级
    goOff() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped lang="scss">
  //响应式函数
  @function vw($px){
  @return $px/1080*100vw;
  }
  //通用样式
    *{
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      list-style: none;
    }
  .box{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: #333;
  }
  //头部
    .head{
      height: vw(110);
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 vw(30);
    }
  .main{
    height: 0;
    flex: 1;
    overflow: scroll;
    background-color: #f6faf6;
    font-size: vw(35);
    position: relative;
  }
  .footer{
    height: vw(100);
    text-align: center;
    line-height: vw(100);
    background: linear-gradient( to right ,#fc9600 ,#fa8700 ,#fb7e00,#f77300,#f76800,#f86000);
    color: #fff;
  }
  /* 设置滚动条的样式 */
  ::-webkit-scrollbar {
    width: vw(10);
    height: 0;
  }
  /* 滚动槽 */
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 vw(6) rgba(0,0,0,0.3);
    border-radius: vw(10);
  }
  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    border-radius: vw(10);
    background: rgba(0,0,0,0.1);
    -webkit-box-shadow: inset 0 0 vw(6) rgba(0,0,0,0.5);
  }
  ::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(255,0,0,0.4);
  }

  // 头部
  .head>p{
    color: #F85C2F;
    width: vw(300);
  }
  .head>h4{
    flex: 1;
    text-align: center;
    height: vw(110);
    line-height: vw(110);
  }
  //头部导航的样式的切换
  .cheng{
    color: #999;
  }
  .addClass{
    color: #444;
    border-bottom: vw(5) solid #f75e00;
  }
  //主体 公用样式 flex 布局的标题
  .dis{
    padding: vw(40) 0;
    margin:0 vw(40);
    border-bottom: vw(5) solid #eaedec;
    color: #999;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .dis>p:nth-of-type(2){
    color: #222;
    font-size: vw(35);
    font-weight: bold;
  }
  .dis span{
    color: #333;
  }
  .title{
    font-size: vw(45);
    font-weight: bold;
    line-height: vw(150);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  // 这里面的图标
  .title>p{
    margin-right: vw(20);
  }
  .title2{
    background-color: #fff;
    font-size: vw(45);
    font-weight: bold;
    padding: vw(40) ;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title2>p>span{
    font-weight: normal;
    font-size: vw(35);
    color: #999;
    margin-left: vw(10);
  }
  /*.main1{
    display: none;
  }*/
  //性能参数de
  .main1>div{
    background-color: #fff;
    margin-bottom: vw(30);
    padding-bottom:vw(50) ;
  }
  // 主体 第一部分的 车辆的名称
  .main-title{
    margin: vw(20) vw(30);
    padding: vw(70) 0;
    text-align: center;
    border-radius: vw(20);
    background-color: #fff;
    font-size: vw(40);
    font-weight: bold;
    color: #222;
    box-shadow: 0 0 vw(20) #999;
  }
  // 性能参数的性能分析 的下面的图片 暂时用一张图片代替
  .two-bottom{
    width: 100%;
    height: vw(530);
  }
  .two-bottom>img{
    width: 100%;
    height: 100%;
  }

  // 空间部分的
  .three-bottom{
    text-align: center;
    display: flex;
    justify-content: space-between;
  }
  .three-bottom-left{
    width: vw(650);
    border-top: vw(5) solid #f1f1f1;
    border-bottom: vw(5) solid #f1f1f1;
    border-right: vw(5) solid #f1f1f1;
  }
  .three-bottom-right{
    flex: 1;
    border-top: vw(5) solid #f1f1f1;
    border-bottom: vw(5) solid #f1f1f1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .bottom-left-top{
    margin: 0 auto;
    text-align: center;
    padding: vw(200) 0 vw(140);
    position: relative;
  }
  // 高的定位
  .bottom-left-top>p:nth-of-type(2){
    position: absolute;
    top:vw(150);
    left:vw(250);
  }
  .bottom-left-bottom{
    height: vw(320);
    line-height: vw(320);
    border-top: vw(5) solid #f1f1f1;
  }
  // 图标 车门
  .bottom-left-bottom>p>.iconfont{
    margin: 0 vw(20);
  }
  // 图片的大小
  .bottom-left-top>img{
    width: vw(450);
  }
  .three-bottom-right img{
    width: vw(200);
    padding: vw(30) 0;
  }
  .bottom-right-bottom img{
    width: vw(300);
  }

  // 空间的 右边的相关样式
  .bottom-right-center{
    border-top: vw(5) solid #f1f1f1;
  }
  .bottom-right-bottom{
    height: vw(320);
    border-top: vw(5) solid #f1f1f1;
  }
  // 完整配图部分的
  .main2{
    width: 100%;
    position: absolute;
    top:vw(250);
    left: 0;
    z-index: 3;
  }

  // 每个标题的背后的小投影
  .title>div{
    height: vw(20);
    opacity: 0.3;
  }
  .location1{
    width: vw(250);
    background-color: #feddde;
    position: absolute;
    top:vw(80);
    left: 38%;
  }
  .location{
    width: vw(150);
    position: absolute;
    top:vw(70);
    left: 43%;
  }
  .main1-three .location{
    background-color: #cce5fc;
  }
  .main1-four .location{
    background-color: #ffe8a1;
  }
  .main1-five .location{
    background-color: #d6fdb9;
  }
  .main1-six .location{
    background-color: #d2cff7;
  }
  .main1-seven .location{
    background-color: #cce5f8;
  }
  // 里面的有部分的右边 是用p标签的（字体颜色加粗），有的是span标签
  // 单独控制右边p标签的其中两个让其中字体的大小和span标签的一样
  .main2>div:nth-of-type(8) .dis:nth-of-type(4)>p:nth-of-type(2){
    font-weight: normal;
    font-size: vw(35);
    color: #999;
  }
  .main2>div:nth-of-type(11) .dis:nth-of-type(2)>p:nth-of-type(2){
    font-weight: normal;
    font-size: vw(35);
    color: #999;
  }


</style>
