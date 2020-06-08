<template>
    <div class="main">
      <TopNav :title="$route.query.type==1?'注册账号':'找回密码'"></TopNav>
      <div class="content">
          <div class="title">
            {{$route.query.type==1?'用手机号码注册账号':'请输入您绑定的手机号'}}
          </div>
          <p class="tips" v-show="$route.query.type==1">注册即代表阅读并同意
            <span @click="$router.push({name:'News',query:{id:22}})">服务协议 </span>
            和 <span @click="$router.push({name:'News',query:{id:23}})">隐私政策</span> </p>
          <div class="input">
            <input type="text" maxlength="11" v-model="tel" placeholder="请输入您的手机号码">
          </div>
<!--          <router-link :to="{path:'/Verification',query: { tel:tel }}">-->
            <div class="btn" @click="checkTel()">下一步</div>
<!--          </router-link>-->

      </div>
    </div>
</template>

<script>
    import TopNav from "../../components/TopNav";
    import { Toast } from 'mand-mobile';
    export default {
        name: "Register",
        data(){
            return{
                title:'注册账号',
                tel:''
            }
        },
       components:{
           TopNav
       },
       created() {

       },
        methods:{
            checkTel(){
                let tel = this.tel
                if(tel.length<11){
                    Toast.info('请输入正确的手机号码')
                }else {
                    this.$router.push({
                        path:'/Verification',
                        query:{
                            tel:tel,
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
  .input{
    width: 550px;
    margin: 140px auto 0;
    padding: 20px 0;
    border-bottom: 1px solid rgba(0,0,0,0.1);

    input{
      width: 100%;
      font-size: 32px;
      color: #333;
      text-align: center;
      border: none;
      background: none;
    }
    input::placeholder{
      color: #999;
    }
  }
  .btn{
    margin: 160px auto 0;
    width: 550px;
    height: 80px;
    border-radius: 60px;
    color: #fff;
    font-size:28px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:bold;
    background: #FF3434;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
