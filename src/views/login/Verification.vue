<template>
    <div class="main">
      <TopNav :title="title"></TopNav>
      <div class="content">
          <div class="title">
            请输入您收到的验证码
          </div>
          <p class="tips">已向手机 <span>+86 {{$route.query.tel}}</span>发送验证码 </p>
          <div class="codeInput">
            <p>
              <span>{{code.slice(0,1)}}</span>
              <span>{{code.slice(1,2)}}</span>
              <span>{{code.slice(2,3)}}</span>
              <span>{{code.slice(3,4)}}</span>
              <span>{{code.slice(4,5)}}</span>
              <span>{{code.slice(5,6)}}</span>
            </p>
            <input type="number" maxlength="6" v-model="code" @input="change">
          </div>
          <!--  一开始不显示，20s之后显示  -->
          <p class="received" v-show="noCode" @click="getCode">未收到验证码</p>
          <!-- 点击未收到验证码之后显示，可重新发送 -->
          <p class="time" @click="getCodeAgain" >重新发送验证码{{time}}</p>
          <!-- 重新发送短信之后，显示3s -->
          <div class="btn" v-show="tips">已经重发验证码请注意查收</div>
      </div>
    </div>
</template>

<script>
    import TopNav from "../../components/TopNav";
    import { Toast } from 'mand-mobile';
    export default {
        name: "Verification",
        data(){
            return{
                title:'注册账号',
                code:'',
                time:'60s',
                codeAgain:false,
                noCode:false,
                tips:false
            }
        },
       components:{
           TopNav
       },
       watch:{

       },
        created(){
          this.getCodeAgain()
          this.getTips()
        },
       mounted() {
         // console.log(this.code)
       },
       methods:{
         //获取验证码
         async getCode(){
             let res = await this.$api.get('/getCode?t='+Date.now(),{
                params:{
                    phone:this.$route.query.tel
                }
             })
             let {success} =res.data
            // console.log(res)
             if(!success){
                 Toast.info('发送错误，请重新获取！')
                 this.noCode=true
                 return
             }
         },
         //  未收到验证码提示
         getTips(){
             let time =20
             let inter = setInterval(()=>{
                 time--;
                 if(time<1){
                     clearInterval(inter);
                     this.noCode=true
                 }
             },1000)
         },
         //重新获取倒计时
         getCodeAgain(){
             this.time='60s'
             let times = 60
             if(!this.codeAgain){
                 this.codeAgain=true
                 this.getCode()
                 let interval = setInterval(()=>{
                     times--;
                     this.time=times+'s';
                     if(times<1){
                         clearInterval(interval);
                         this.time='60s'
                         this.codeAgain=false
                         return
                     }
                 },1000)
             }

         },
         //监听输入框输入
         change(){
           // console.log(this.code.length)
            let code = this.code
            if(code.length==6){
               this.check()
            }
         },
         // 验证码确认
         async check(){
             let res = await this.$api.post('/user/verifyCode',{
                 phone:this.$route.query.tel,
                 code:this.code
             })
             let {success} = res.data
             if(!success){
                 Toast.info('验证码错误，请重新获取！')
                 return
             }else {
                 this.$router.push({
                     path:'/PassWord',
                     query:{
                         phone:this.$route.query.tel,
                         code:this.code,
                         type:this.$route.query.type
                     }
                 })
             }
         }
       }
    }
</script>

<style scoped lang="scss">
  .main{
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .content{
    padding: 0 32px;
  }
  .title{
    margin-top: 80px;
    font-size: 60px;
    color: #333;
    letter-spacing: 2px;
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:600;
    line-height: 1;
  }
  .tips{
    font-size: 28px;
    color: #666;
    line-height: 1;
    margin-top: 40px;
    span{
      color:#34CCFF ;
    }
  }
  .codeInput{
    width: 500px;
    margin: 72px auto 0;
    position: relative;
    height: 140px;
    p{
      height: 140px;
      line-height: 140px;
      font-size:60px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:bold;
      display: flex;
      align-items: center;
      justify-content: space-around;
      span{
        display: block;
        height: 140px;
        width: 40px;
        border-bottom: 1px solid rgba(0,0,0,0.1);
      }
    }
    input{
      position: absolute;
      width: 550px;
      height: 140px;
      opacity: 0;
      z-index: 1;
      top: 0;
      left: 0;
    }
  }
  .received{
    margin-top:38px;
    line-height: 1;
    font-size: 28px;
    color:#34CCFF ;
  }
  .time{
    margin-top: 52px;
    color: #999;
    font-size: 28px;
    line-height: 1;
  }
  .btn{
    width: 440px;
    height: 80px;
    margin: 24px auto;
    background: rgba(0,0,0,0.2);
    color: #fff;
    font-size: 28px;
    text-align: center;
    line-height: 80px;
  }
</style>
