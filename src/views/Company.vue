<template>
    <div class="main">
      <div class="tag">
        <md-icon
          name="arrow-left"
          size="lg"
          @click="$router.go(-1)"
        ></md-icon>
        <div class="title">车行主页</div>
        <span class="share" v-if="evn!=='wechat'" @click="showaction=true"></span>
        <md-tip v-else content="点击上面的三个小圆点即可分享" placement="bottom"><span class="share"></span></md-tip>

      </div>
      <div class="content">
        <md-scroll-view
          class="scrollZone"
          ref="scrollView"
          :scrolling-x="false"
          :auto-reflow="true"
        >

        <div class="shop">
          <div class="left">
            <div class="pic" :style="companyData.picPath?{background:`url(${companyData.picPath}) no-repeat center center`,backgroundSize:`cover`}:''">

            </div>
          </div>
          <div class="right">
            <div class="name">
              <div class="title">{{companyData.companyName}}</div>
              <!-- 已审查添加checked类 -->
              <span class="checked"></span>
            </div>
            <div class="data">
              库存{{carList.length}}辆 <i>|</i> {{companyData.lxName}}{{companyData.lxPhone}}
            </div>
            <div class="lable">
              {{companyData.area}}{{companyData.address | filterAddress }}
            </div>
          </div>
        </div>
        <div class="list">
<!--          <router-link :to="{path:'/carList',query: {carList:carList,companyId:companyData.id}}">-->
          <div class="title">
            <div class="name">
              全部车辆
            </div>
<!--            <span>-->
<!--              {{carList.length}}辆-->
<!--               <md-icon-->
<!--                 name="arrow-right"-->
<!--                 size="lg"-->
<!--               ></md-icon>-->
<!--            </span>-->
          </div>
<!--          </router-link>-->
          <div class="items">
            <vcCard class="item" v-for="data in carList" :key="data.id" :carData="data"></vcCard>
          </div>
        </div>
        <div class="show" v-show="hide">
          <div class="title">
            风采展示
          </div>
          <md-scroll-view
            class="scrollZone"
            ref="scrollView"
            :scrolling-x="true"
            :scrolling-y="false"
            :auto-reflow="true"
          >
          <div class="groud">
              <div v-for="(data,keys) in otherPic" :key="keys" class="showImg"
              :style="data?{background: `url(${data}) no-repeat center center`,backgroundSize:`cover`}:''"></div>
          </div>
          </md-scroll-view>
        </div>
<!--        <div class="baseData">-->
<!--          <div class="title">基本信息</div>-->
<!--          <div class="info">-->
<!--            <div class="item">-->
<!--              <div v-show="sell"> 拥有销售：20人 <i></i></div> 联系电话：<span>{{companyData.lxPhone}}</span>-->
<!--            </div>-->
<!--            <div class="item">-->
<!--              详细地址：-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
        </md-scroll-view>
      </div>

      <md-action-sheet
        v-model="showaction"
        :title="'分享'"
        cancel-text="取消"
        :options="shareOptions"
        @selected="$_selected"
      ></md-action-sheet>
    </div>
</template>

<script>
import { Toast } from 'mand-mobile';
import noact from '../assets/noact.jpg';
import vcCard from "../components/vcCard";

export default {
  name: 'Company',
  data() {
    return {
      evn: '',
      showaction:false,
      shareOptions:[],
      companyData: {},
      sell:false,
      carList: [],
      noact,
      otherPic: [],
      acPhone: '',
        hide:false
    };
  },
  components:{
      vcCard
  },

  created() {
    // if (!this.$route.query.companyId) {
    //   Toast.failed('当前的公司id不正确，请稍后重试');
    //   this.$router.replace({ name: 'index' });
    //   return false;
    // }
      if(this.$route.query.companyId)  this.getCompanyInfo();
    if (this.$route.query.phone) {
      this.acPhone = this.$route.query.phone;
      this.$store.commit('updateAcPhone', this.$route.query.phone);
    }

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

    // 根据环境决定 分享菜单
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
         value = value.replace(/\D.*市/ ,'')
         return value
     },
  },
  watch: {
    $route(to, from) {
      // if (!this.$route.query.companyId) {
        //   Toast.failed('当前的公司id不正确，请稍后重试');
        //   this.$router.replace({ name: 'index' });
        //   return false;
        // }
       // console.log('公司详情！',this.$route.query.companyId)
       // if(this.$route.query.companyId)  this.getCompanyInfo();
    },
  },
  beforeDestroy() {
    // this.companyData = {};
    // this.carList = [];
    // this.noact = noact;
    // this.otherPic = [];
  },
    activated(){
        this.getCompanyInfo();
    },
  methods: {
    $_selected(item){
      if(this.evn === 'web'){
        if(item.value == 1){
          const _shareText = `欢迎访问${ this.companyData.companyName}的车辆列表
              \n  共有 ${this.carList.length} 辆车在售
              \n 【欢迎访问】http://api.1775.net.cn/redir?ctrl=Company&url=${location.href}` ;
          this.$copyText(_shareText).then( (e)=> {
            this.$toast.info('复制成功')
          })
        }
      }


      if(this.evn === 'cordova'){

         const title = `欢迎访问${ this.companyData.companyName}  - 1775.top`; // 分享标题
         const contactInfo =  `共有 ${this.carList.length} 辆车在售`;// 分享描述
        const _url = `http://m.1775.top/#/shop?companyId=${this.companyData.id}`

        if(item.value ==  1){ // 分享朋友圈
          Wechat.share({
            message: {
              title,
              description: contactInfo,
              thumb: this.companyData.logo ? this.companyData.logo : 'https://m.1775.net.cn/mlogo.jpg',
              mediaTagName: 'TEST-TAG-001',
              messageExt: '这是第三方带的测试字段',
              messageAction: '<action>dotalist</action>',
              media: {
                type: Wechat.Type.WEBPAGE,
                webpageUrl: _url
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
              title,
              description: contactInfo,
              thumb: this.companyData.logo ? this.companyData.logo : 'https://m.1775.net.cn/mlogo.jpg',
              mediaTagName: 'TEST-TAG-001',
              messageExt: '这是第三方带的测试字段',
              messageAction: '<action>dotalist</action>',
              media: {
                type: Wechat.Type.WEBPAGE,
                webpageUrl: _url
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
          const _shareText = ` 车辆: ${this.carData.title}
              \n 【上牌时间】${this.bb[0].name}
              \n 【行驶里程】${this.bb[1].age}
              \n 【好车链接】http://api.1775.net.cn/redir?ctrl=Content&url=${location.href}` ;
          this.$copyText(_shareText).then( (e)=> {
            this.$toast.info('复制成功')
          })
        }
      }

    },
    $_onRefresh(index) {
      // async data
    },
    mobilePic(path) {
      const _tem = path.split('/');
      _tem.splice(-1, 0, 'm');
      return _tem.join('/');
    },
    async getCarList() {
      this.$toast.loading('1775加载中...');

      const res = await this.$api.post('/vehicle/getCarByCompanyId', {
          companyId: this.$route.query.companyId
      });
      const { success, data } = res.data;
      if (success) {
        this.carList = data;
          this.$toast.hide();
          // 小程序流程
        try {
          wx.miniProgram.postMessage({ data: { carList: data, companyData: this.companyData, page: 'company' } });
        } catch (e) {

        }
        // 公众号流程
        try{

          wx.ready(()=>{
            console.log('wechat is ok')
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            wx.updateAppMessageShareData({
              title: `欢迎访问${ this.companyData.companyName}的车辆列表`, // 分享标题
              desc: `共有 ${this.carList.length} 辆车在售`, // 分享描述
              link: `http://api.1775.net.cn/redir?ctrl=Company&url=${location.href}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: this.companyData.picPath ? this.companyData.picPath:'', // 分享图标
              success: function () {
                // 设置成功
                console.log('设置成功')

              }
            })


            wx.updateTimelineShareData({
              title: `欢迎访问${ this.companyData.companyName}的车辆列表`, // 分享标题
              link: `http://api.1775.net.cn/redir?ctrl=Company&url=${location.href}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: this.companyData.picPath ? this.companyData.picPath:'', // 分享图标
              success: function () {
                // 设置成功
              }
            })
          });
        }catch (e) {

        }
      }
    },
    async getCompanyInfo() {
      this.$toast.loading('1775加载中...');
      let  _res = await this.$api.post('/getCompanyInfo',{
          companyId: this.$route.query.companyId
      });
      this.$toast.hide()

      if (_res.data.success) {
        this.companyData = _res.data.data;

        // 0310 如果遇到有传参的phon 还有  lxName就先保留

        if (this.$route.query.phone)  window.sessionStorage.setItem(`company_${ this.companyData.id}_phone`,this.$route.query.phone)
        if (this.$route.query.lxname)  window.sessionStorage.setItem(`company_${ this.companyData.id}_lxname`,this.$route.query.lxname)

        // 如果是在session中有当前公司的联系电话就用
        const _acphone = window.sessionStorage.getItem(`company_${ this.companyData.id}_phone`);
        const _lxname = window.sessionStorage.getItem(`company_${ this.companyData.id}_lxname`);


        if(_acphone)  this.companyData.lxPhone = _acphone
        if(_lxname)  this.companyData.lxName = _lxname

        this.otherPic = _res.data.data.otherPic && _res.data.data.otherPic != 'NULL' ? _res.data.data.otherPic.split(',') : '';
        await this.getCarList();


        this.$toast.hide();
      } else {
        this.$toast.hide();
        this.$toast.failed('加载错误重新加载');
        this.$router.go(-1);
      }

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
};
</script>

<style scoped lang="scss">
  .main{
    background: rgb(247,247,247);
    display: flex;
    flex-direction: column;
  }
  .tag{
    box-sizing: border-box;
    height: 96px;
    position: relative;
    padding: 0 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    i{
      font-size: 28px;
      color: #333;
      font-weight: bold;
    }
    span{
      display: block;
      width: 40px;
      height: 40px;
      background: url("../assets/share.png") no-repeat center center;
      background-size: 40px;
    }
    .title{
      width: 60%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 20%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 36px;
      font-weight: bold;
      color: #333;
    }
  }
  .content{
    height: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .shop{
    padding: 40px 32px;
    display: flex;
    .left{
      width: 160px;
      height: 160px;
      margin-right: 40px;
      .pic{
        width: 160px;
        height: 160px;
        border-radius: 50%;
        background: url("../assets/avt.png") no-repeat center center;
        background-size: cover;
      }
    }
    .right{
      width: 0;
      flex-grow: 1;
      min-height: 160px;
      position: relative;
      .name{
        display: flex;
        align-items: flex-start;
        .title{
          font-size: 40px;
          color: #333;
          line-height: 50px;
          font-weight: bold;
          max-width: 60%;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        span{
          display: block;
          width: 118px;
          height: 40px;
          margin-left: 16px;
          background: url("../assets/lable_no.png") no-repeat center center;
          background-size: 118px 40px;
          margin-top: 10px;
        }
        span.checked{
          background: url("../assets/lable.png") no-repeat center center;
          background-size: 118px 40px;
        }
      }
      .data{
        display: flex;
        align-items: center;
        margin-top: 40px;
        font-size: 24px;
        line-height: 1;
        color: #999;
        i{
          display: block;
          width: 40px;
          height: 20px;
          text-align: center;
          line-height: 20px;
        }
      }
      .lable{
        margin-top: 20px;
        font-size: 28px;
        color: #666;
        line-height: 1.2;
      }
    }
  }
  .list{
    margin-top: 40px;
    padding: 0 32px;
    .title{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .name{
        font-size: 32px;
        font-weight: bold;
        line-height: 1;
        color: #333;
      }
      span{
        font-size: 24px;
        color: #999;
        i{
          margin-left: 4px;
          font-size: 20px!important;
          color: #999;
        }
      }
    }
    .items{
      margin-top: 40px;
    }
    .item{
      background: #fff;
      border-radius: 16px;
    }
  }
  .show{
    margin-top: 80px;
    .title{
      padding: 0 32px;
      font-size: 32px;
      color: #333;
      font-weight: bold;
      line-height: 1;
    }
    .groud{
      display: flex;
      align-items: center;
      margin-top: 40px;
      .showImg{
        background: #666;
        width: 240px;
        height: 160px;
        border-radius: 8px;
        border: 1px solid rgba(0,0,0,0.1);
        margin-right: 16px;
      }
      .showImg:first-child{
        margin-left: 32px;
      }
    }
  }
  .baseData{
    padding: 0 32px;
    margin-top: 80px;
    .title{
      font-size: 32px;
      color: #333;
      font-weight: bold;
      line-height: 1;
    }
    .info{
      margin-top: 44px;
      margin-bottom: 24px;
      .item{
        display: flex;
        font-size: 28px;
        color: #666;
        line-height: 1;
        margin-bottom: 20px;
        i{
          display: block;
          width: 40px;
          height: 20px;
        }
        span{
          color: #D52002;
        }
      }
      .item:last-child{
        line-height: 1.5;
      }
    }

  }
</style>
