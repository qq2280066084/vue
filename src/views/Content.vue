<template>
  <div class="box">
    <!--头部-->
    <div class="head" v-show="dd3">
      <div class="head-top">
        <div class="head-top-left " @click="goOff">
          <md-icon name="arrow-left" style="color:#fff"></md-icon>
        </div>
        <ul class="head-top-right">
          <li v-if="evn === 'wechat'">  <md-tip content="点击上面的三个小圆点即可分享" placement="bottom"><p class="iconfont icon-fenxiang1"></p>     </md-tip></li>
          <li v-else @click="fn7"><p class="iconfont icon-fenxiang1"></p></li>
        </ul>
      </div>

    </div>
    <!--主体部分-->
    <div class="main" >

      <md-scroll-view
        ref="scrollView0"
        :scrolling-x="false"
        :scrolling-y="true"
        @scroll="aaa"
        auto-reflow
        @refreshing="$_onRefresh(0)"
      >

        <!--banner-->
        <div class="banner" >
          <!--右边的 参数、检测报告的定位-->
          <div class="location1" @click="hrefone(carData)" v-if="false">
            <p class="iconfont icon-canshu"></p>
            <span>参数配置</span>
          </div>
          <div class="location2" @click="hreftwo"  v-if="false">
            <p class="iconfont icon-baogao-copy"></p>
            <span>检测报告</span>
          </div>
          <!--里面的小导航-->
          <div class="head-top">
            <div class="head-top-left" @click="goOff">
              <md-icon name="arrow-left" style="color:#fff"></md-icon>
            </div>
            <ul class="head-top-right">
              <!--<li><p class="iconfont icon-xiaoxi"></p></li>-->
              <!--<li><p class="iconfont icon-duibi1" ></p></li>-->
              <!--<li><p class="iconfont icon-gouwuche4"></p><h4 class="add">{{Add}}</h4></li>-->
<!--              <li @click="fn7"><p class="iconfont icon-fenxiang1"></p></li>-->

              <li v-if="evn === 'wechat'">  <md-tip content="点击上面的三个小圆点即可分享" placement="bottom"><p class="iconfont icon-fenxiang1"></p>     </md-tip></li>
              <li v-else @click="fn7"><p class="iconfont icon-fenxiang1"></p></li>

            </ul>
          </div>
          <!-- 里面的图片切换的数字跟着切-->
          <!--          <div class="location3" slot="indicator"> {{ current + 1 }}/<span>4</span></div>-->
          <div class="location3" slot="indicator"> {{ current + 1 }}/<span>{{carData.attachments.length}}</span></div>
          <div class="banner-main"  >
            <md-swiper
              ref="swiper"
              @after-change="afterChange"
              :is-prevent="false"
              :useNative-driver="false"

            >
              <md-swiper-item
                v-for="(item,index) in slider"
                :key="item.path"
              >
<!--                <div :style="{-->
<!--                   background:`url(${mobilePic(item.path)}) center center`,-->
<!--                   width:'100%',-->
<!--                   height:`100%`,-->
<!--                   backgroundSize:'cover'-->
<!--                }"></div>-->
                <img :src="mobilePic(item.path)" v-if="index===0" @click="showView(index)"  :key="item.path"  style="width:100%;height:100%;object-fit: cover" alt="">
                <img v-lazy="mobilePic(item.path)" v-else @click="showView(index)"  :key="item.path"  style="width:100%;height:100%;object-fit: cover" alt="">
              </md-swiper-item>
            </md-swiper>

          </div>
        </div>
        <div class="new-content">
          <div class="left">
            <div class="price">{{carData.onlinePrice}}</div>
            <div class="title">{{carData.title}}</div>
            <div class="data"></div>
          </div>
          <div class="right">
            <div class="collect" :class="{ active:collect }" @click="doCollect">
              收藏
            </div>
          </div>
        </div>


        <!--标题共用样式 title 和颜色公用 hui 以及某些上下边框 bd bd2为上边框-->
        <!--车辆档案部分-->
        <div class="archives">
          <!--标题样式和后面的标题共用  灰色样式hui公用-->
          <div class="title" id="hd1">
            <p>车辆档案 <span class="updateTime" v-if="carData.updateTime">更新时间：{{carData.updateTime|filterTime}}</span> </p><span class="hui">编号：{{carData.id}}</span>
          </div>
          <div class="archives-box bd">
            <ul class="archives-center hui">
              <li v-for="(item,index) of bb" :key="index">
                <span>{{item.name}}</span>
                <p>{{item.age}}</p>
              </li>
            </ul>
            <!--功能配置 todo-->
            <!--<ul class="archives-bottom hui bd2">
              <li v-for="(item,index) of bb2" :key="index">
                <p class="iconfont" v-bind:class="item.age"></p>
                <span>{{item.name}}</span>
              </li>
            </ul>-->
          </div>
          <p class="more" @click="hrefone(carData)">查看详细参数配置 <span> ></span></p>
        </div>

        <!--服务点部分-->
        <div class="serve">
          <div class="title">
            <p>服务点</p>
            <span class="hui">购车顾问提供上门服务</span>
          </div>
          <div class="serve-position bd2"  @click="$router.push({path:'/Company',query:{companyId:companyData.id}})">
            <!--            <img src="../../assets/content/2.jpg" alt="">-->
            <h3><span>{{companyData.companyName}}</span> <span> ></span></h3>
            <p class="hui "><span>{{companyData.area}}{{companyData.address | filterAddress}}</span> <!--<span> 1.3km</span>--></p>
          </div>
        </div>

        <!--车辆描述-->
        <div v-if="carData.carDescribe">
          <div class="title"><p>车辆描述</p></div>
          <div style="line-height: 1.5;">
            {{carData.carDescribe}}
          </div>
        </div>
        <!--车辆实拍  -->
   <!--     <div class="shipai">
          <div class="title">
            <p>车辆实拍</p>
            <span></span>
          </div>
          <div class="shipai-box bd2" id="imagelist" v-viewer>
            <div class="shipai-main" v-for="(item,index) in carData.attachments" :key="item.id">

              <img v-lazy="mobilePic(item.path)" :class="index"  v-if="item.path">
              &lt;!&ndash;              <p class="black"><span class="hui">左前：</span>车头及车身部件完好无损，漆面无明显瑕疵</p>&ndash;&gt;
            </div>
            &lt;!&ndash;<div class="shipai-main">
              <img src="../../assets/content/2.jpg" alt="">
              <p class="black"><span class="hui">右后：</span>车尾及车身部件完好无损，漆面无明显瑕疵</p>
            </div>
            <div class="shipai-main">
              <img src="../../assets/content/3.jpg" alt="">
              <p class="black"><span class="hui">前排：</span>内饰干净整洁无磨损。</p>
            </div>
            <div class="shipai-main">
              <img src="../../assets/content/4.jpg" alt="">
              <p class="black"><span class="hui">中控台：</span>内饰干净整洁无磨损。</p>
            </div>
            <div class="shipai-main">
              <img src="../../assets/content/5.jpg" alt="">
              <p class="black"><span class="hui">后排：</span>内饰干净整洁无磨损。</p>
            </div>
            <div class="shipai-main">
              <img src="../../assets/content/4.jpg" alt="">
              <p class="black"><span class="hui">后备箱：</span>内饰干净整洁无磨损。</p>
            </div>
            <div class="shipai-main">
              <img src="../../assets/content/3.jpg" alt="">
              <p class="black"><span class="hui">发动机舱：</span>发动机变速箱无漏油漏水，工况正常。</p>
            </div>&ndash;&gt;
          </div>
        </div>-->
        <!--相似推荐-->
        <div class="recommend" v-if="false">
          <div class="title">
            <p>相似推荐</p>
            <span></span>
          </div>
        </div>
        <!--点击回到顶部的按钮 这里的-->
        <div class="gotop iconfont icon-xiangshang1" @click="fn5"></div>


      </md-scroll-view>
    </div>
    <!-- 分享表单 -->
    <md-popup v-model="makeOrder">
      <div class="formList">
        <div class="item">
          <div class="name">分享人名字</div>
          <div class="input">
            <input type="text" v-model="orderData.name">
          </div>
        </div>
        <div class="item">
          <div class="name">分享人号码</div>
          <div class="input">
            <input type="number" v-model="orderData.phone">
          </div>
        </div>
        <div class="formbtn" @click="formShare">确认分享</div>
      </div>
    </md-popup>

    <!--尾部-->
    <div class="footer">
      <div class="footer-left">
        <div @click="fn6">
          <a class="nb" :href="`tel:${acPhone?acPhone:companyData.lxPhone}`">
            <p class="iconfont icon-dianhua">联系电话</p>
            {{acPhone?acPhone:companyData.lxPhone}}
          </a>
        </div>
        <!--<div @click="fn4">-->
        <!--<p class="iconfont icon-50"></p>-->
        <!--我要实物-->
        <!--</div>-->
      </div>
      <div class="footer-right">
        <p @click="book">
          立即预约
        </p>
        <p>
          <a :href="`tel:${acPhone?acPhone:companyData.lxPhone}`">
            咨询车况
          </a>
        </p>
      </div>
    </div>


    <!--点击弹出层-->

    <md-action-sheet
      v-model="showaction"
      :title="'分享'"
      cancel-text="取消"
      :options="shareOptions"
      @selected="$_selected"
      @cancel="$_cancel"
    ></md-action-sheet>

    <!--预约弹层-->
    <md-popup v-model="showYY">
      <div class="YY">
        <h1> 立即预约尽享优惠</h1>

        <md-field>
          <md-input-item
            title="手机号码"
            type="phone"
            v-model="yy.phone"
            placeholder="输入您的联系电话"
          ></md-input-item>
          <md-input-item
            title="验证码"
            type="phone"
            v-model="yy.code"
            placeholder="输入验证码"
          >
            <button slot="right" @click="getCode">{{yytxt}}</button>
          </md-input-item>
        </md-field>
        <md-button @click="doYY">立即预约</md-button>
      </div>
    </md-popup>
    <div style="display: none" id="pz" v-html="pzData.mobilePz"></div>
    <!-- 没登录的情况下弹出登录信息 -->
    <md-landscape v-model="showFastLogin" full-screen>
      <FastLogin @codeLogin="codeLogin" :carData="carData"></FastLogin>
    </md-landscape>
<!--    图片viewer-->
    <md-image-viewer
      v-model="isViewerShow"
      :list="slider.map(r=> mobilePic(r.path))"
      :has-dots="true"
      :initial-index="viewerIndex">
    </md-image-viewer>
  </div>
</template>

<script>
  import { Toast } from 'mand-mobile';
  export default {
    name: 'Content',
    data() {
      return {
        evn: '',
        isViewerShow:false,
        viewerIndex:0,
        showFastLogin:false,
        slider:[],
        sysAppIds: null,
        yytxt: '立即获取',
        showYY: false,
        yy: {
          phone: '',
          code: '',
        },
        carData: {
          attachments: [],
        },
        pzData: {},
        companyData: {},
        aa: [// 导航的
          { name: '车辆' },
          { name: '档案' },
          { name: '检测' },
          { name: '维保' },
          { name: '车图' },
          { name: '推荐' },
        ],
        bb: [ // 车辆档案的 里程表 上牌时间...
          { name: '', age: '' },
          { name: '表里里程', age: '' },
          { name: '排放标准', age: '' },
          { name: '颜色', age: '' },
          { name: '自然吸气', age: '' },
          { name: '提车时间', age: '' },
        ],
        bb2: [ // 车辆档案的 胎压检测 ，车载蓝牙...
          { name: '胎压监测', age: 'icon-saomiaojiancechazhao' },
          { name: '发动机启停', age: 'icon-qiting' },
          { name: '上坡辅助', age: 'icon-qiche1' },
          { name: '车载蓝牙', age: 'icon-lanya' },
        ],
        bb3: [ // 车辆检测的检测项数
          { name: '事故排查', age: '132', icon: 'icon-dui4' },
          { name: '轻微碰撞', age: '32', icon: 'icon-dui4' },
          { name: '易损部件', age: '6', icon: 'icon-dui4' },
          { name: '常用功能', age: '100', icon: 'icon-dui4' },
          { name: '启动检测', age: '11', icon: 'icon-dui4' },
          { name: '外部内饰骨架', age: '161', icon: 'icon-dui4' },
          { name: '漆面检测', age: '52', icon: 'icon-dui4' },
        ],
        bb4: [ // 认证服务的标题 下面的第一部分
          { name: '30天包退', age: 'icon-tuihuo' },
          { name: '一年保修', age: 'icon-baoxiu' },
          { name: '315项排查', age: 'icon-anquanpaicha' },
          { name: '全国联保', age: 'icon-lianbao' },
        ],
        // 用来判断导航的样式跟着切换以及点击的时候跟着切换
        cc: 0,
        // 车辆检测 下面弥暇修复里面的 小导航的切换
        xiufu: ['外观件', '内饰件', '骨架件'],
        // 弥暇修复的小导航的切换用的参数
        xx: 0,
        // 绑定判断认证服务的点击切换的
        ff: 0,
        dd: false,
        dd2: false,
        // 导航是否显示的判断
        dd3: false,
        // 弹出层的绑定是否显示
        dd4: false, // 蒙层的
        dd5: true, // 弹出的内容的价钱栏price(全国购和服务)
        dd6: false,
        dd7: false,
        // <!--点击购物车的时候，已经加入购物车的提示弹窗-->
        dd8: false,
        // Add 头部导航条的购物车的数量
        Add: 0,
        // 点击头部导航条 分享按钮的弹层
        dd9: false,
        // 点击认证服务的服务咨询的弹出层
        dd10: false,
        current: 0, // 引入的组件轮播 第一部分的 右边的图片的张数的变化
        current2: 0, // 引入的组件轮播 这是在车辆检测部分的左右切换图片 右边的图片的张数的变化
        count: 60,
        originPrice: 0,
        visitId: null,
        acPhone: '',
        pl: '',
        collect: false,
        showaction:false,
        shareOptions:[],
        utype:0,
        // 预约弹窗
        makeOrder:false,
        orderData:{}
      };
    },
    created() {
      this.getCarInfo();
      if (this.$route.query.phone) this.acPhone = this.$route.query.phone;
      this.findUserCar()
      // 判断是微信环境 还是网页环境   还是app环境
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
         this.evn = 'wechat'
      } else {
        try{
          if(cordova){
            this.evn = 'cordova'
          }else{
            this.evn = 'web'
          }
        }catch (e) {
          this.evn = 'web'
        }
      }
      console.log(this.evn)
      if(this.evn == 'cordova'){
        this.shareOptions= [
          {
            label: '分享给朋友',
            value: 0,
          },
          {
            label: '分享到朋友圈',
            value: 1,
          },
          {
            label: '复制链接分享',
            value: 3,
          },
        ]
      }

      if(this.evn === 'web'){
        this.shareOptions= [
          {
            label: '复制链接分享',
            value: 1,
          },
        ]
      }





    },
    filters:{
      filterAddress:value=>{
        try{
          _res = value.replace(/\D.*市/ ,'')
          return _res
        } catch (e) {
          return  value
        }

      },
      filterTime:value=>{
        if(value){
          const date = new Date(value)
          const y = date.getFullYear()
          const m = date.getMonth()+1
          const d = date.getDate()
          return `${y}-${m}-${d}`
        }
      }
    },
    mounted() {
      this.addVistRecordForIn();
      // const gallery = new Viewer(document.getElementById('imagelist'));
      // 未登录的时候每五秒弹出一个登录框
      //   setTimeout(()=>this.checkLogin(),5000)
    },
    methods: {
      showView(index){
         this.isViewerShow =true;
          this.viewerIndex = index;
      },
       book(){
          this.checkLogin()
      },
      $_selected(item){
        console.log('选择了',item)
        const  contactInfo  = `
              \n 【上牌时间】${this.bb[0].name}
              \n 【行驶里程】${this.bb[1].age}
              `
        // wechat
        if(this.evn === 'cordova'){
          if(item.value ==  1){ // 分享朋友圈
            Wechat.share({
              message: {
                title: `${this.carData.title} - 1775.top `,
                description: contactInfo,
                thumb: this.companyData.logo ? this.companyData.logo : 'https://m.1775.net.cn/mlogo.jpg',
                mediaTagName: 'TEST-TAG-001',
                messageExt: '这是第三方带的测试字段',
                messageAction: '<action>dotalist</action>',
                media: {
                  type: Wechat.Type.WEBPAGE,
                  webpageUrl: `http://m.1775.net.cn/#/Content?id=${this.carData.id}`,
                },
              },
              scene: Wechat.Scene.TIMELINE, // share to Timeline
            }, () => {
              this.$toast.success('分享成功');
            }, (reason) => {
              //   alert(`Failed: ${reason}`);
              this.$toast.failed(reason);
            });

          }

          if( item.value == 0){  // 分享给朋友
            Wechat.share({
              message: {
                title: `${this.carData.title} - 1775.top `,
                description: contactInfo,
                thumb: this.companyData.logo ? this.companyData.logo : 'https://m.1775.net.cn/mlogo.jpg',
                mediaTagName: 'TEST-TAG-001',
                messageExt: '这是第三方带的测试字段',
                messageAction: '<action>dotalist</action>',
                media: {
                  type: Wechat.Type.WEBPAGE,
                  webpageUrl: `http://m.1775.net.cn/#/Content?id=${this.carData.id}`,
                },
              },
              scene: Wechat.Scene.SESSION, // share to Timeline
            }, () => {
              this.$toast.success('分享成功');
            }, (reason) => {
              //   alert(`Failed: ${reason}`);
              this.$toast.failed(reason);
            });
          }

          if( item.value == 3){
            // baseURL = ''
            let baseUrl = location.href
            // 如果在分享的时候填了分享人的表单
            if(this.orderData){
             baseUrl = `http://m.1775.top/#/content?id=${this.$route.query.id}&phone=${this.orderData.phone}&lxname=${this.orderData.name}`
            }
            console.log('+++++'+location)
            const _shareText = ` 车辆: ${this.carData.title}
              \n 【上牌时间】${this.bb[0].name}
              \n 【行驶里程】${this.bb[1].age}
              \n 【好车链接】http://api.1775.net.cn/redir?ctrl=Content&url=${baseUrl}` ;
            this.$copyText(_shareText).then( (e)=> {
              this.$toast.info('复制成功')
            })
          }
        }

        // web
        if(this.evn === 'web'){
          if(item.value == 1){
            let baseUrl = location.href
            // 如果在分享的时候填了分享人的表单
            if(this.orderData.name){
              baseUrl = `http://m.1775.top/#/content?id=${this.$route.query.id}&phone=${this.orderData.phone}&lxname=${this.orderData.name}`
            }
            console.log('触发的是这个',baseUrl)
            const _shareText = ` 车辆: ${this.carData.title}
              \n 【上牌时间】${this.bb[0].name}
              \n 【行驶里程】${this.bb[1].age}
              \n 【好车链接】http://api.1775.net.cn/redir?ctrl=Content&url=${baseUrl}` ;
            this.$copyText(_shareText).then( (e)=> {
              this.$toast.info('复制成功')
            })
          }
        }




      },
      $_cancel(){

      },
      afterChange(from,to){
            this.current = to
        },
      async checkLogin(){ // 测试是否需要弹出登录提醒
          if(!this.$store.state.userInfo.phoneNum) return  this.showFastLogin = true
          this.utype = 2
         let res = await  this.addBusiness()
          console.log('checkLogin',res)
          if(res)  this.$toast.succeed('预约成功，商家将尽快与您联系')

      },
      // 验证码登录
      async codeLogin(phoneNum,code,carIds){
          console.log(carIds)
          let res = await this.$api.post('/manySubscribe',{
              phoneNum,code,carIds
          })
          let { success,data} = res.data
          if(!success) return Toast.info('登录错误，请重新登录')
          let userInfo={
              phoneNum:phoneNum,
              uid: data.userInfo[0].uid
          }
          this.showFastLogin=false
          this.$store.commit('SET_USERINFO',userInfo)
          this.utype = 2
          setTimeout(()=>this.addBusiness(),1000)
           this.$toast.succeed('预约成功，商家将尽快与您联系')
      },
      onError() {
        Toast.succeed('复制失败');
      },
      onCopy() {
        Toast.succeed('复制成功');
      },
      async doYY() {
        const res = await this.$api.post('/manySubscribe', {
          carIds: `${this.$route.query.id}`,
          phoneNum: this.yy.phone,
          code: this.yy.code,
        });
        const { success, data } = res.data;
        if (success) {
          Toast.succeed('预约成功,商家1个小时内联系您');
          this.showYY = false;
        } else {
          Toast.info('请重新尝试提交');
        }
      },
      // 添加用户访问日记
      async addVistRecordForIn() {
        if (!this.$store.state.userInfo.uid) return false;
        const res = await this.$api.post('/c/visit/visitRecord', {
          clientId: this.$store.state.userInfo.uid,
          type: 1,
          carId: this.$route.query.id,
        });
        const { success, data } = res.data;
        if (success) {
          this.visitId = data.id;
        }
      },
      async addVistRecordForOut() {
        if (!this.visitId) return false;
        const res = await this.$api.post('/c/visit/visitRecord', {
          clientId: this.$store.state.userInfo.uid,
          type: 2,
          carId: this.$route.query.id,
          id: this.visitId,
        });
      },
      getInitTimer() {
        this.count = 60;
        this.getSecond();
      },
      getSecond() {
        if (this.count == 0) {
          this.yytxt = '重新获取';
          return false;
        }
        setTimeout(() => {
          this.yytxt = `${this.count}s`;
          this.count--;
          this.getSecond();
        }, 1000);
      },
      // 获取验证码
      getCode() {
        this.Api.getCode({ phone: this.yy.phone,t:Date.now() }).then((res) => {
          if (res.data.success) {
            Toast.succeed('发送成功');
            this.getInitTimer();
          } else {
            Toast.info(res.data.info);
          }
        });
      },
      $_onRefresh(index) {
        // async data
        setTimeout(() => {
          this[`list${index}`] += 5;
          this.$refs[`scrollView${index}`].finishRefresh();
        }, 2000);
      },
      mobilePic(path) {
        try{
          const _tem = path.split('/');
          _tem.splice(-1, 0, 'm');
          return _tem.join('/');
        }catch (e) {
          console.log('error',e)
        }

      },
      // 获取公司信息
      async getCompanyInfo(){
        let  _res = await this.$api.post('/getCompanyInfo',{
            companyId: this.carData.companyId
        });
        this.companyData = _res.data.data;
        // 0310 如果遇到有传参的phon 还有  lxName就先保留

        if (this.$route.query.phone)  window.sessionStorage.setItem(`company_${ this.carData.companyId}_phone`,this.$route.query.phone)
        if (this.$route.query.lxname)  window.sessionStorage.setItem(`company_${ this.carData.companyId}_lxname`,this.$route.query.lxname)

        // 如果是在session中有当前公司的联系电话就用
        const _acphone = window.sessionStorage.getItem(`company_${ this.carData.companyId}_phone`);
        const _lxname = window.sessionStorage.getItem(`company_${ this.carData.companyId}_lxname`);

        if(_acphone)  this.acPhone = _acphone


        this.addBusiness()

        this.sysAppIds = `【上牌时间】${this.bb[0].name}  \n【行驶里程】${this.bb[1].age} \n【车辆详情】https://m.1775.net.cn/#/content?id=${this.$route.query.id}
              `;

        console.log('here here here here')
        try { // 小程序的流程
          wx.miniProgram.postMessage({ data: { carData: this.carData, companyData: this.companyData, page: 'ct' } });
        } catch (e) {

        }

        //微信流程
        try {
          wx.ready(()=>{
            console.log('wechat is ok')
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            wx.updateAppMessageShareData({
              title: this.carData.title, // 分享标题
              desc: `【上牌时间】${this.bb[0].name}  行驶里程】${this.bb[1].age} `, // 分享描述
              link: `http://api.1775.net.cn/redir?ctrl=Content&url=${location.href}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: this.slider[0].path, // 分享图标
              success: function () {
                // 设置成功
                console.log('设置成功')

              }
            })


            wx.updateTimelineShareData({
              title: this.carData.title, // 分享标题
              link: `http://api.1775.net.cn/redir?ctrl=Content&url=${location.href}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: this.slider[0].path, // 分享图标
              success: function () {
                // 设置成功
              }
            })
          });
        }catch (e) {
          console.log('wechat config is not ok',e)
        }
      },
      // 获取车辆信息
      async getCarInfo() {
        Toast.loading('1775正在加载中');
        const res = await  this.$api.get('/getVehicleInfoApp',{
            params:{
                id: this.$route.query.id
            }
        });
        const { success, data } = res.data;
        console.log('res',res.data)
        Toast.hide();
        if (success) {
          this.carData = data
          this.slider = this.carData.attachments
          this.setInfo(this.carData);
          this.getPz();
          this.getCompanyInfo();

        } else {
          Toast.info('获取车辆信息失败');
        }

      },
      setInfo(va) {
        this.bb = [];
        this.bb.push(
          {
            name: `${new Date(va.brandDate).getFullYear()}年${new Date(va.brandDate).getMonth() + 1}月上牌`,
            age: `${(new Date().getFullYear() - new Date(va.brandDate).getFullYear()) * 12 + ((new Date().getMonth() - new Date(va.brandDate).getMonth()))}个月`,
          },
          { name: '表里里程', age: `${va.mileage}万公里` },
          { name: '变速箱', age: `${va.gearBox === 1 ? '自动' : '手动'}档` },
          { name: '颜色', age: va.carColor },
          { name: '排量', age: va.displacement },
          { name: '过户次数', age: `${va.transferCount ? va.transferCount : 0}次` },
        );
      },
      // 添加商机
      async addBusiness(){
            const companyId = this.companyData.id;
            const phoneNum = this.$store.state.userInfo.phoneNum;
            const carId = this.carData.id;
            const cid = this.$store.state.userInfo.uid;
            const type = this.utype
            const res = await this.$api.post('/bus/client/addBusiness', {
                companyId,phoneNum,carId,cid,type
            });
            const { success } = res.data;
            return success
        },
      // 函数  随着滚动条的滚动头部的导航的样式跟着切换
      isElementInViewport(el) {
        // 获取元素是否在可视区域
        const rect = el.getBoundingClientRect();
        // console.log(rect)
        return (
          rect.top >= 0
          && rect.left >= 0
          && rect.bottom
          <= (window.innerHeight || document.documentElement.clientHeight)
          && rect.right
          <= (window.innerWidth || document.documentElement.clientWidth)
        );
      },
      async getPz() {
        if (this.carData.brand.mobilePz) {
          this.pzData = this.carData.brand;
          this.$nextTick(() => {
            try {
            this.originPrice = document.querySelector('.chek-peizhi').querySelector('tr:nth-child(2)').querySelector('td').innerHTML;
            const _pl = document.querySelector('#pz > div > table > tbody > tr:nth-child(8) > td').innerHTML.split(' ')[0];

              if (_pl.endsWith('L') || _pl.endsWith('T')) this.bb[4].age = _pl;
            } catch (e) {

            }
          });
        }
      },
      // 导航的进出效果
      aaa({ scrollLeft, scrollTop }) {
        const top = scrollTop;
        const doms = document.querySelector('.main');
        // console.log(e.target.scrollTop);
        // 判断头部是否显示
        if (top > 20) {
          this.dd3 = true;
          document.querySelector('.head').style.zIndex = 9;
        } else {
          this.dd3 = false;
        }
        if (top === 0) {
          document.querySelector('.banner>.head-top').style.opacity = 1;
          document.querySelector('.head').style.opacity = 0;
        }
        if (top === 20) {
          document.querySelector('.banner>.head-top').style.opacity = 0.8;
          document.querySelector('.head').style.opacity = 0.3;
        }
        if (top === 30) {
          document.querySelector('.banner>.head-top').style.opacity = 0.4;
          document.querySelector('.head').style.opacity = 0.5;
        }
        if (top >= 50 && top <= 70) {
          document.querySelector('.banner>.head-top').style.opacity = 0.1;
          document.querySelector('.head').style.opacity = 0.8;
        }
        if (top >= 70) {
          document.querySelector('.banner>.head-top').style.opacity = 0;
          document.querySelector('.head').style.opacity = 1;
          document.querySelector('.head>.head-top').style.opacity = 0.5;
        }
        if (top >= 80) {
          document.querySelector('.head>.head-top').style.opacity = 1;
        }
        // 用来判断 导航条的样式跟着滚动条的高度而跟着跳样式
        // 获取节点 下面会用到绑定cc的值

        const d0 = document.querySelector('.price');
        const d1 = document.querySelector('.archives');
        const d2 = document.querySelector('.testing');
        const d3 = document.querySelector('.record');
        const d4 = document.querySelector('.shipai');
        const d5 = document.querySelector('.recommend');

        // 剩下的节点也要获取
        /* const d6 = document.querySelector('.answers');
        const d7 = document.querySelector('.serve');
        const d8 = document.querySelector('.confirm'); */


        /* if (this.isElementInViewport(d0)) {
          this.cc = 0;
          console.log(0);
        } else if (this.isElementInViewport(d1)) {
          this.cc = 1;
          console.log(1);
        } else if (this.isElementInViewport(d2)) {
          this.cc = 2;
          console.log('223213213213213123');
        } else if (this.isElementInViewport(d3)) {
          this.cc = 3;
          console.log(3);
        } else if (this.isElementInViewport(d4)) {
          this.cc = 4;
          console.log(4);
        } else if (this.isElementInViewport(d5)) {
          this.cc = 5;
          console.log(5);
        } */
        /* if (doms.scrollTop < 445) {
          this.cc = 0;
        }
        if (doms.scrollTop < 1280 && doms.scrollTop > 445) {
          this.cc = 1;
        } */

        // 当滚动条出现到一定的高度时 返回顶部的按钮出现
        const dd = document.querySelector('.gotop');
        if (doms.scrollTop > 1200) {
          dd.style.display = 'block';
        } else {
          dd.style.display = 'none';
        }
      },
      // 头部导航条的点击跳转到指定位置
      bbb(bbb) {
        // 利用伪锚点来跳转  绑定的cc值作为判断条件
        this.cc = bbb;
        // 获取.main下面的子节点，子节点到父节点的垂直高度，点击时再赋值到父节点的scroll的值
        const doms = document.querySelector('.main');
        const doms2 = document.querySelector('.archives').offsetTop;
        const doms3 = document.querySelector('.testing').offsetTop;
        const doms4 = document.querySelector('.record').offsetTop;
        const doms5 = document.querySelector('.shipai').offsetTop;
        const doms6 = document.querySelector('.recommend').offsetTop;
        const aa = document.querySelector('.head').offsetHeight;
        if (bbb === 0) {
          doms.scrollTop = 0;
        }
        if (bbb === 1) {
          doms.scrollTop = doms2 - aa - 10;
        }
        if (bbb === 2) {
          doms.scrollTop = doms3 - aa - 10;
        }
        if (bbb === 3) {
          doms.scrollTop = doms4 - aa - 10;
        }
        if (bbb === 4) {
          doms.scrollTop = doms5 - aa - 10;
        }
        if (bbb === 5) {
          doms.scrollTop = doms6 - aa - 10;
        }
      },
      ccc() {

      },
      //  车辆检测 弥暇修复的小导航切换
      qiehuan(xxx) {
        this.xx = xxx;
      },
      // 认证服务的导航的切换
      qiehuan2(fff) {
        this.ff = fff;
      },

      // 点击弹出层的 价钱栏price
      // 点击全国购弹出的内容的价钱栏price(全国购和服务)
      fn1() {
        this.dd4 = true;
        this.dd5 = true;
      },
      fn2() {
        this.dd4 = true;
        this.dd6 = true;
      },
      // 点击蒙层或者X弹出层隐藏了
      fn3() {
        this.dd4 = false;
        this.dd5 = false;
        this.dd6 = false;
        this.dd7 = false;
        this.dd9 = false;
        this.dd10 = false;
      },
      // 点击 价钱栏price 的抢优惠的弹出层
      fn4() {
        return false;
        this.dd7 = true;
        this.dd4 = true;
      },
      // 点击向上按钮返回到顶部
      fn5() {
        const doms = document.querySelector('.main');
        doms.scrollTop = 0;
        doms.style.transition = '2s';
      },
      fn6() {
        return false;
        // 弹出提示 的节点
        const tan = document.querySelector('.tanchu');
        const tishi = document.querySelector('.tishi');
        tan.style.display = 'flex';
        tishi.style.display = 'flex';
        // 购物车上的数字加一
        if (this.Add === 0) {
          this.Add = this.Add + 1;
          const add = document.querySelectorAll('.add');
          add[0].style.display = 'block';
          add[1].style.display = 'block';
        }
        // 2秒之后自动消失
        setTimeout(() => {
          tan.style.display = 'none';
          tishi.style.display = 'none';
        }, 2000);
      },
      // 点击头部导航的分享按钮
      fn7() {
        // this.showaction =  true
        this.makeOrder = true
      },
      formShare(){
        if(this.orderData){
          if(this.orderData.name){
            if(!this.orderData.phone){
               return this.$toast.info('请填写完整的分享人信息')
            }
          }
          if(this.orderData.phone){
            let reg = /^1[2,3,4,5,6,7,8,9][0-9]{9}$/;
            if (!reg.test(this.orderData.phone)) return this.$toast.info('请填写正确的手机号')
            if(!this.orderData.name){
              return this.$toast.info('请填写完整的分享人信息')
            }
          }
        }
        this.makeOrder = false
        this.showaction =  true
      },

      // 点击分享弹窗的确定之后

      fn8() {
        this.dd4 = true;
        this.dd10 = true;
      },
      // 引入的滑动轮播图的函数
      onChange(index) {
        this.current = index;
      },
      onChange2(index) {
        this.current2 = index;
      },
      // 点击页面之间的切换
      // 点击头部banner 的右边的参数配置的跳转 以及车辆档案的详细参数
      hrefone() {
        this.$router.push({ name: 'parameter', params: { ...this.carData, ...this.pzData } });
      },
      // 点击头部banner 的右边检测报告的跳转
      hreftwo() {
        this.$router.push({ path: '/testing' });
      },
      // 问答精选的跳转
      hrefthree() {
        this.$router.push({ path: '/answers' });
      },
      // 车辆检测的跳转 传递参数 index 值 用来跳转页面后跳到相关的内容
      hreffour(hh) {
        this.$router.push({
          path: '/testing',
          query: { index: hh },
        });
      },
      // 车辆检测的跳转 直接点击查看详细报告的跳转 传递的参数 index 值为0
      hreffour2() {
        this.$router.push({
          path: '/testing',
          query: { index: 0 },
        });
      },
      // 维保记录的跳转
      hreffive() {
        this.$router.push({ path: '/record' });
      },
      // 认证服务的跳转
      hrefsix() {
        this.$router.push({ path: '/confirm' });
      },
      // 价钱的price 的一成首付的跳转
      hrefseven() {
        this.$router.push({ path: '/tages' });
      },
      hrefeight() {
        this.$router.push({ path: '/aftersale' });
      },

      // 点击返回上一级
      goOff() {
        this.$router.back();
      },
      //
      clicks() {
        this.$router.go(0);
      },
      // 收藏
      async doCollect(){
        const uid = this.$store.state.userInfo.uid
        if(!uid) return  this.$toast.info('请登录后再进行收藏', 1000)
        const cid = this.carData.id
        this.$toast.loading('正在收藏...')
        if(this.collect){ //已经收藏则取消
          const _data = await this.$api.post('/userDelCar',{uid,cid})
          const { success, info } = _data.data
          this.$toast.hide()
          if(success) this.collect = false
          this.$toast.info(info,1000)
        }else { // 未收藏则收藏
          const _data = await this.$api.post('/userCollectCar',{uid,cid})
          const { success,info } = _data.data
          this.$toast.hide()
          if(success) this.collect = true
          this.$toast.info(info,1000)
          this.utype = 1
          this.addBusiness()
        }
      },
      async findUserCar(){
        const uid = this.$store.state.userInfo.uid
        if(!uid) return this.collect = false
        const cid = this.$route.query.id
        const _data = await this.$api.post('/findUserCar',{ uid, cid })
        const { success } = _data.data
        if(success) return this.collect = true
        this.collect = false
      }
    },
    beforeDestroy() {
      this.addVistRecordForOut();
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
    font-size: vw(35);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #333;
    overflow: hidden;
  }
  .head{
    width: 100%;

    background-color: #fff;
    padding: 0 vw(50);
    position: fixed;
    top:0;
    left: 0;
    opacity: 0;
    transition: opacity 1s;
  }
  .main{
    width: 100%;
    height: 0;
    overflow: scroll;
    flex: 1;
  }
  .footer{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .new-content{
    padding: vw(40) 0!important;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .left{
      padding: 0 0 0 vw(24);
      flex-grow: 1;
      .price{
        color: #FF4C4C;
        font-size: vw(48);
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight: bold;
      }
      .price::before{
        content: '￥';
        color: #FF4C4C;
        font-size: vw(32);
        font-family:PingFangSC-Regular,PingFang SC;
      }
      .price::after{
        content: '万元';
        color: #FF4C4C;
        font-size: vw(28);
        font-family:PingFangSC-Regular,PingFang SC;
      }
      .title{
        color: #333;
        font-size:vw(36);
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:600;
        line-height: 1.5;
        margin-top: vw(30);
        height: auto;
      }
      .data{
        color: #999;
        margin-top: vw(28);
        font-size: vw(24);
        font-family:PingFangSC-Regular,PingFang SC;
      }
    }
    .right{
      padding: vw(58) vw(42) 0 vw(34)!important;
      .collect{
        padding-top: vw(48);
        background: url("data:image/png;base64,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") no-repeat center top;
        background-size: vw(40) vw(36);
        color: #999;
        font-size: vw(20);
        font-family:PingFangSC-Regular,PingFang SC;
      }
      .collect.active{
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAABWpJREFUaAXtmltsVEUYx+c73VpgG4m0Bu8t0XAxPkjbbSFxdYkp2i4mhmCCKInxAd4NGkVN+qBiQnwzMfGGYnixRrxEkaZok63A7lYbiTFNhaiIF7BG0IVa2e74/045y+np7Nmze3ab3WknmZy5fPPN/OabOTPnzAgx7+Z7QKseoEJoZCh0I+Q3CqJWkcncjnAj/JXwVyDtHzzPwY8ifExI2SeCwQEaGEgjrSAn29vbUH4TCi3H8zo8r4W/Bv6iWY+Uf+D5DeJDoq5uPw0OnkTYk/MELNesiYh0+nFovBfe8KR5SmhMGMYu0dT0MvX2/udWTkYi9eLChR3oyIcgd4ubrCMvA/iDqGc3xeNfOPJmRF2BZTh8tZiYeAmN2DqjZGEJx0VNzQ406ENVMVg0Cku+As8jqHhHtE/U1j5Ghw+fyaUkJzCs2iImJz9FI5bmKlxE+hti2bLtsPYkl4VVA+L8+ddQxyNF6FIXIToDi0cpkRhSCSiBZUdHJ2DfR4F6VSFfaUT7RWPjg2J8nADbC9gNvvSpC6cwxDcB+qAzewYwYFsB+yUE65zCJYxbc21dCXU6VU3A0mFKJpP2jGnAmEsNmK9fQaDJLlTF4ZOivr4VK8WYxTD9jSvlHo1gmfEmkUq9xQHLZS18aemxhpqVr8fTMO7GfP6cYS5bOJ1+UQ86BYWUWTYTGHP3Hoh1KET1SJIyJNvauhhmysJSbtaDzJXCZCS5bVutGB4+jfXwKlfx6s88i03PUjKHcybzWfXzeCLoNmDZdk+iegi1M/AqPVg8UBCtNLD9WulBVBcRAEu5QheavBxSLudlaVFeQX0EFl3eaekD5UoyJ4EnXLtEp0yif/kt/b1OTK4sUo7yW3rEVUinTKIRtvDcARbCBNbzo189Mg8Zort7AFY+rc7XKvVXkUjEDOrpyQDrPa3QVDBEvUQkp9bhQGCvSkarNCnfZh4TmI4cSSCsPAbRApqtOzQ0nAU2oWpqdmIum0cgWkBaEERpnEI8bUWzW0scdH0HYNPsVqYWTylfB1t2c5UFvgT3BKBPaQHKEEQ/4uThKTvPNGD8rP4TQlvgdRjaF3FEuxnHLGdzApudgrUKzx67UFWGDeMZOno07mz7NAtnM6PRF2DlGUeN2fxKDxB9LOLx3apmZs+WnJnmFYRU6hDSq+2v5iBuAazHUjvuZOJ4TmDOlGvXLsHdjhi+qG7leMU7vugSDEac89bebldgFgT09YAeBHSzvWAFhk9gGt6BA/Df3dqmnsO2Ehgav4hAoBPKfrYlV1aQlx/D6MwHy43OC8xCgD6OeRFG8ATHK8oRjQI2jCX1By/t8gTMinAV6CexcCFDH/OieJZkvgbsndhJed4seQZmAIrFfsNiHsbwNk/TZwkqVzV92EXdBdiCvuULAjah4/G/RXNzF3r2nVwtKXs60R7R0rIBb+NUoXXlfUu7KcSp+k7kPwfvS49bHY48/lnxJD71lJsKh6wy6ruhuHC6EUvWXmgPKmsoVSJfXpXyYcB+5Eelb2CuHJa+DY8P4G/meMkd/zs3jPvNT1ifyguew6r60OvfigULQniZleMmwSdi8eJQKWC57SUBZkW4s/yXiEajCPbA81zz6/ha8LMimbyP+vvP+VVmlS/JkLaUWU/c11yP+5r7EOcL5MU4vgC+BTun/mIKu5UpmYXtlWD49WG9Xo00vqRamCOKYVe3uhyw3JCyALNiQJ/CxiACS+1CVHJaHsfT4Hms8evM/Xse4WKzyzKknY0x719nMm9iWbnBmWfGpz5MHi2XVe11zgowVyi7uurE2Nh2QD+AqHWRZgTLzbuioeFVOnBg7pxT2y0wH57vAX898D950H6jXRVd8gAAAABJRU5ErkJggg==") no-repeat center top;
        background-size: vw(40) vw(36);
        color: rgb(255,52,52);
      }
    }
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
  //头部开始
  //头部的上面部分
  .head-top{
    width: 100%;
    height: vw(150);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .head>.head-top{
    opacity: 0;
  }
  .head-top-right{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  //上面的图标样式
  .head-top-left{
    color: #FC4B02;
    font-weight: bold;
    width: vw(100);
    height: vw(100);
    border-radius: 50%;
    background: rgba(0,0,0,.7);
    line-height: vw(100);
    text-align: center;
  }
  .head-top-right p{
    color: #666;
    font-size: vw(50);
    margin-left: vw(50);
  }
  .head-top-right li{
    position: relative;
  }
  //头部的下面部分（导航）
  .head-bottom{
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .head-bottom>li{
    flex: 1;
    text-align: center;
    height: vw(110);
  }
  // 头部导航的 购物车的图标 当点击底部购物车的时候是加入购物车，图标上边会显示数量
  .add{
    display: none;
    width: vw(50);
    height: vw(50);
    text-align: center;
    line-height: vw(50);
    border-radius: 50%;
    background-color:red;
    color: #fff;
    position: absolute;
    top:vw(-10);
    left:vw(80);
    transform: scale(0.8);
  }
  // 导航条点击切换的字体颜色的样式
  .addClass{
    color: #FC4B02;
    border-bottom: vw(5) solid #FC4B02;
  }
  .YY{
    width: 80vw;
    padding:40px 20px;
    background: #fff;
  }
  //主体部分
  .main{
    background-color: #F8F8F8;
  }
  .scroll-view-container>div{
    background-color: #fff;
    margin-bottom: vw(20);
  }
  //主体部分的有一个内边距
  .scroll-view-container>div>div{
    padding: vw(40);
  }
  // 相似推荐的内边距改小
  .scroll-view-container>div>div:nth-last-of-type(1){
    padding: vw(28);
  }
  // 头部图片的 右边的定位不给内边距
  .scroll-view-container>div> .location3,.main>div> .location2,.main>div> .location1{
    padding: 0 vw(50);
  }
  //轮播图的不给内边距 ,外边距
  .scroll-view-container>div:nth-of-type(1){
    margin: 0;
  }
  .scroll-view-container>div:nth-of-type(1)>.banner-main{
    padding: 0;
  }
  //主体部分的轮播图部分 暂时定为一张图
  .banner{
    position: relative;
  }
  .banner-main{
    height: vw(550);
  }
  .banner-main img{
    width: 100%;
    height: vw(550);
  }
  //小标题定位
  .banner>.head-top{
    z-index: 9;
    padding: 0 vw(50);
    position:fixed;
    top:0;
    left: 0;
  }
  .banner>.head-top>.iconfont{
    color: #fff;
  }
  .banner>.head-top p{
    color: #fff;
  }
  //右边de小定位
  .location1{
    text-align: center;
    color: #fff;
    position: absolute;
    top:vw(120);
    right: 0;
    z-index: 9;
  }
  .location2{
    text-align: center;
    color: #fff;
    position: absolute;
    top:vw(250);
    right: 0;
    z-index: 9;
  }
  // 图片切换的数字跟着切换 以及图片的总数
  .location3{
    height: vw(60);
    line-height: vw(60);
    display: flex;
    align-content: center;
    border-radius: vw(30);
    background-color: #4a4a4a;
    opacity: 0.9;
    color: #fff;
    position: absolute;
    top:vw(380);
    right: vw(40);
    z-index: 6;
  }
  //价钱栏及其车辆的付款方式
  .price-top{
    position: relative;
    height: vw(110);
  }
  //价钱的和上面banner轮播图衔接没有内外边距
  .scroll-view-container>div:nth-of-type(2){
    padding: 0;
    margin: 0 0 vw(20) 0;
  }
  //价钱的上面部分的不给内边距
  .scroll-view-container>div:nth-of-type(2) .price-top{
    padding: 0;
  }
  .price-left{
    font-size: vw(30);
    padding-left: vw(40);
    padding-top:vw(20);
    width: vw(800);
    height: vw(120);
    //line-height: vw(50);
    background: linear-gradient(to left top ,#FF4E03 ,#FA4606 ,#F90F01);
  }
  //价钱的下面的p标签
  .price-left>p{
    color: #fff;
  }
  .price-left>p>span{
    font-size: vw(60);
  }
  .price-left>span{
    color: #FFA47F;
    font-size: vw(25);
  }
  //价钱右边的样式 定位
  .price-right{
    position: absolute;
    top:0;
    right: 0;
    color: #fff;
    text-align: center;
    width: vw(320);
    height: vw(120);
    background: linear-gradient(to left top ,#FC8925,#FA962D ,#FEB52B);
    clip-path: polygon(10% 0,100% 0,100% 100%,0% 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .price-right>i{
    font-size: vw(50);
  }
  .price-right>p{
    font-size: vw(30);
    font-weight: bold;
  }
  .updateTime{
    font-size: vw(30);
    margin-left: vw(10);
    color: #999;
    font-style: normal;
    font-weight: normal;
  }
  //价钱的车辆名称部分
  .price-bottom-one{
    width: 100%;
    //padding: vw(30) 0;
    //line-height: vw(50);
  }
  .price-bottom-one>h5{
    color: #000;
    font-size: 34px;
    font-weight: 400;
  }
  .price-bottom-one>span{
    margin-top: vw(40);
    display: inline-block;
    padding:vw(10) vw(15);
    color: #3bbc7f;
    border-radius: vw(5);
    margin-right: vw(20);
    border: 1px solid #3bbc7f;
  }

  //首付或者月供
  .price-bottom-one>div{
    margin: vw(50) 0;
    height: vw(80);
    line-height: vw(80);
    background-color:#FFF5EF;
    color: #C0733A;
    font-size: vw(50);
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  // 车辆的信息大标题的颜色
  .price h5{
    color: #333;
  }
  //价钱的付款后的全国购部分
  .price-bottom-two{
    width: 100%;
  }
  .price-bottom-two>div{
    width: 100%;
    height: vw(60);
    line-height: vw(60);
    display: flex;
    font-size: vw(50);
    align-items: center;
  }
  //左边的全国购字体
  .price-bottom-two>div>p:nth-of-type(1){
    width: vw(150);
    color: #999;
    font-size: vw(40);
  }
  .price-bottom-two>div:nth-of-type(1){
    margin-bottom: vw(50);
  }
  .price-bottom-two>div>h6{
    color: #666;
  }
  .price-bottom-two>div>h6:nth-of-type(1){
    flex: 1;
  }
  //图标
  .price-bottom-two>div>span{
    display: inline-block;
    width: vw(50);
    height: vw(50);
    line-height: vw(50);
    text-align: center;
    margin-right: vw(10);
    color: green;
  }
  .price-bottom-two>div:nth-of-type(1)>span{
    color: #FE4E00;
    border: vw(2) solid #FE4E00;
    border-radius: 50%;
  }

  //标题共用样式 title  title2和颜色公用 hui 以及某些上下边框 bd bd2为上边框  更多信息的样式more
  .title{
    width: 100%;
    height: vw(120);
    //font-size: vw(50);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title>p{
    font-weight: bold;
    font-size: vw(40);
  }
  .title2{
    width: 100%;
    height: vw(120);
    //font-size: vw(50);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  //部分title加上边框
  .main>div>.title{
    border-left:vw(5) solid #FB5B00;
  }
  //主体的第二个div内边距
  .hui{
    color: #666;
  }
  .shen{
    color: #242424;
  }
  .bd{
    border-bottom: vw(1) solid #F3F3F3;
    border-top: vw(1) solid #F3F3F3;
  }
  .bd2{
    border-top: vw(1) solid #F3F3F3;
  }
  .more{
    text-align: center;
    height: vw(120);
    line-height: vw(120);
  }
  .more>span{
    color: #EE691F;
  }
  //车辆档案
  .archives-center{
    padding-bottom: vw(50);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  .archives-center>li{
    flex-shrink: 0;
    width: vw(320);
    text-align: center;
    line-height: vw(70);
    margin-top: vw(50);
  }
  .archives-center>li>p{
    color: #333;
    font-size: vw(45);
  }

  //档案的下面部分
  .archives-bottom{
    padding: vw(50) 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .archives-bottom>li{
    text-align: center;
    font-size: vw(40);
  }
  //图标
  .archives-bottom>li>p{
    margin-bottom: vw(40);
    font-size: vw(60);
  }

  //问答精选部分
  .answers-bottom{
    line-height: vw(80);
  }
  .answers-bottom>p{
    color: #000;
    white-space: nowrap;/*让文字强制一行显示*/
    overflow: hidden;/*溢出隐藏*/
    text-overflow:ellipsis;/*以省略号形式显示*/
  }
  .answers-bottom>p>span{
    font-size: vw(40);
    display: inline-block;
    width: vw(50);
    height: vw(50);
    line-height: vw(50);
    background-color: #EE691F;
    color: #fff;
    text-align: center;
    margin-right: vw(50);
  }
  //服务的定位服务图片暂时给一张图片
  .serve-position{
    width: 100%;
    padding: vw(50);

  }
  //定位图片
  .serve-position>img{
    width: 100%;
    height: vw(300);
  }
  .serve-position>h3{
    margin: vw(30) 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .serve-position>p{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  //车辆检测的部分

  //头像
  .name{
    display: flex;
    align-items: center;
    padding-top: vw(50);
  }
  .name-left{
    width: vw(100);
    height: vw(100);
    border-radius:50%;
    background-color:#ffff20;
    margin-right: vw(30);
  }
  .name-right>p>span:nth-of-type(2){
    display: inline-block;
    padding: vw(10);
    border-radius: vw(10);
    color: #AFBE94;
    background-color: #F4FBEE;
    margin-left: vw(30);
  }
  .name-right>p:nth-of-type(2){
    font-size: vw(40);
  }

  //测试的头部文字
  .testing-main>p{
    line-height: vw(60);
    margin: vw(30) 0;
  }

  .detailed>li>p>span{
    color: #A7CA7B;
  }
  //外观
  .waigua{
    padding: vw(30) 0;
    line-height: vw(80);
    position: relative;
  }
  // 修复部分
  .xiufu{
    line-height: vw(80);
  }
  .xiufu img{
    height: vw(420);
    width: 100%;
  }
  //外观的导航
  .xiufu-sub{
    border: vw(2) solid #F75D00;
    border-radius: vw(10);
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: vw(30);
  }
  .xiufu-sub>li{
    flex: 1;
    padding: vw(20) 0;
    text-align: center;
  }
  .beijing1{
    background-color: #F75D00;
    color: #fff;
  }
  .beijing2{
    color: #F75D00;
    border-left: vw(1) solid #F75D00;
  }
  // 修复的 滑动轮播图 的数字随着图片的切换而切换
  .location4{
    position: absolute;
    top:vw(1000);
    right: vw(50);
    z-index: 9;
    background-color: #f7f7f7;
    width: vw(120);
    text-align: center;
    line-height: vw(60);
    border-radius: vw(30);
  }

  //车辆检测的视频video 暂时用一张图片代替
  .video>img{
    width: 100%;
    height: vw(450);
  }

  //这里的图片暂时图片代替全部大小为宽100% 高 450
  .testing img{
    width: 100%;
    height: vw(450);
  }

  //维保记录部分
  .record-box{
    padding: 0 vw(50);
  }

  //车辆认证服务部分 字体颜色两种 shen2 金色的深色 qian 金色的浅色
  .shen2{
    color:#C0881B;
  }
  .qian{
    color: #E6C18A;
  }
  // 认证服务的导航点击切换后的字体图标颜色
  .shen3{
    color:#e88c00;
  }
  //认证服务的分为两个部分  上面部分和下面部分，这其中里面也是分上下

  //认证服务以及车辆检测的title 的右边服务咨询的边框
  .confirm>.title>span,.testing>.title>span{
    display: block;
    padding: vw(10) vw(20);
    border: vw(2) solid #666;
    border-radius: vw(10);
  }
  .confirm-bottom{
    background-color: #FFFEF7;
  }
  .confirm-top{
    background: linear-gradient(to left top ,#FBEDCD,#F4DBA1,#EED494 );
    border-radius: vw(10);
    padding: vw(30) 0;
    margin-bottom: vw(30);
  }
  .confirm-top>h3{
    text-align: center;
  }
  //flex布局 认证服务的上面导航点击切换的图标部分 和最后面的 退车流程
  .confirm-top>ul,.confirm-bottom-bottom>ul{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .confirm-bottom-bottom>ul{
    justify-content: space-between;
  }
  .confirm-top .iconfont{
    font-size: vw(60);
    margin: vw(10) 0;
    text-align: center;
  }
  /*认证服务的点击切换显示的内容共有四个部分 其中的内容有公用样式的*/
  .confirm-bottom-top{
    text-align: center;
  }
  /*字体小*/
  .confirm-bottom-top>p{
    font-size: vw(25);
  }
  .confirm-bottom-center{
    width: 100%;
  }
  .confirm-bottom-center>ul>li{
    list-style: disc;
    margin-left:vw(50);
  }
  /*15大系统保修 */
  .baoxiu{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
  }
  .baoxiu>li{
    width:vw(250);
  }
  .confirm-bottom-bottom>p{
    padding: vw(30) 0;
  }
  //车辆实拍部分
  .shipai{
    img{
      width: 100%;
      /*height: vw(450);*/
    }
    .shipai-main{
      padding: vw(30) 0;
      font-size: vw(40);
      >p{
        padding: vw(10) 0;
      }
    }
  }
  //这里的图片暂时图片代替全部大小为宽100% 高 450
  // 点击返回顶部的按钮
  .gotop{
    text-align: center;
    line-height: vw(80);
    font-weight: bold;
    width: vw(80);
    height: vw(80);
    border-radius: 50%;
    background-color: #fff;
    border: vw(1) solid #999;
    position: fixed;
    right: vw(50);
    bottom: vw(150);
    opacity: 0.8;
    display: none;
  }
  //底部
  .footer-left{
    flex: 1;
    height: vw(150);
    font-size: vw(30);
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .footer-left>div{
    flex: 1;
    text-align: center;
    color: #666;
  }
  //图标
  .footer .iconfont{
    font-size: vw(50);
  }
  //底部的右边
  .footer-right{
    width: vw(650);
    font-size: vw(48);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .footer-right>p{
    color:#fff;
    flex: 1;
    height: vw(150);
    text-align: center;
    line-height: vw(150);
  }
  .footer-right>p:nth-of-type(1){
    background-color: #FDB400;
  }
  .footer-right>p:nth-of-type(2){
    background-color:#F96300;
  }

  // 弹出层的样式
  .tanchu{
    width: 100%;
    height: 100%;
    transition: 1s;
    position: absolute;
    top:0;
    left: 0;
  }
  // 蒙层样式
  .meng{
    background-color: #666;
    opacity: 0.3;
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left: 0;
  }
  // 全国购的 服务的弹出层的
  .quanguo,.fuwu,.fenxiang{
    width: 100%;
    background-color: #fff;
    padding: 0 vw(40);
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 33;
  }
  // 全国购 服务的底部样式 字体大小 图标 边距
  .dibu{
    display: flex;
    height: vw(800);
    border-top: vw(1) solid #f7f7f7;
    padding-top: vw(20);
  }
  .dibu>span{
    color: #F96300;
    margin-right: vw(20);
  }
  .dibu>div>h6{
    margin-bottom: vw(20);
  }
  .dibu>div>p{
    font-size: vw(25);
    line-height: vw(50);
  }

  // 抢优惠的弹出层
  .qianggou{
    padding-top: vw(50);
    background-color: #fff;
    text-align: center;
    border-radius: vw(20);
    width:vw(800);
    height: vw(400);
    position: absolute;
    top: vw(800);
    left: vw(190);
  }
  // 去掉输入框的边框 字体样式
  .qianggou>input[type="text"]{
    color: #fff;
    border: none;
    width: vw(500);
    background-color:#999;
    margin: vw(20);
    padding: vw(20) vw(10);
  }
  .qianggou input[type="submit"]{
    border: none;
    margin: vw(20);
    width: vw(500);
    padding: vw(20) vw(10);
    background-color: chocolate;
  }
  // 点击购物车的时候，已经加入购物车的提示弹窗
  .tishi{
    padding: vw(20) vw(50);
    text-align: center;
    color: #fff;
    background-color: #666;
    position: absolute;
    top:vw(800);
    left: vw(340);
    z-index: 9;
  }
  // 点击分享按钮的弹出层
  .fenxiang{
    padding: 0;
  }
  .fenxiang2{
    width: 100%;
    background-color: #f7f7f7;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: vw(50) 0;
    box-shadow: 0 0 vw(3) vw(1) #666;
  }
  .fenxiang2>li{
    text-align: center;
  }
  .fenxiang2>li>p{
    width: vw(100);
    height: vw(100);
    text-align: center;
    line-height: vw(100);
    background-color: #fff;
    border-radius: 50%;
    margin-bottom: vw(20);
    font-size: vw(50);
  }
  .fenxiang>p{
    text-align: center;
    padding: vw(30) 0;
  }
  // 点击认证服务的服务咨询的弹出层
  .fuwu{
    width: 60%;
    height: vw(200);
    background-color: #fff;
    text-align: center;
    position: absolute;
    top:vw(800);
    left: 20%;
  }
  .fuwu>p{
    color: #666;
    line-height: vw(100);
  }
  .hujiao{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-top: vw(2) solid #f7f7f7;
  }
  .hujiao>p{
    color: blue;
    flex: 1;
    line-height: vw(100);
    text-align: center;
  }
  .hujiao>p:nth-of-type(1){
    border-right: vw(2) solid #f7f7f7;
  }
   .md-scroll-view{

  }
  a{
    color:#fff
  }
  .nb{
    color:#444;
    font-size: vw(38);
    p.iconfont{
      font-size: vw(36);
      line-height: 1.5;
    }
  }
  // dixon
  .fee{
    font-size: vw(74);
    font-weight: 500;
    color:#ff6600;
    line-height: vw(160);
    span{
      font-size: vw(48);
      color:#999
    }
  }
  .newPrice{
    font-size: vw(24);
  }


   /* 预约表单 */
  .formList{
    padding: 40px 30px;
    border-radius: 10px;
    background: #fff;
    z-index: 9;
    .item{
      display: flex;
      align-items: center;
      margin-bottom: 25px;
      .name{
        padding: 0;
        margin-right: 10px;
        font-size: 28px;
        color: #333;
      }
      .input{
        outline: none;
        border: 1px solid rgba(0,0,0,0.1);
        border-radius: 6px;
        padding:0 10px;
        input{
          outline: none;
          border: none;
          width: 260px;
          height: 50px;
          line-height: 50px;
          font-size: 28px;
          color: #666;
        }
      }
    }
    .item:last-child{
      margin-bottom: 0;
    }
    .formbtn{
      width: 300px;
      height: 60px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      background: #FF3434;
      color: #fff;
    }
  }
</style>
