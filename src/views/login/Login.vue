<template>
   <div class="main">
     <div class="backIndex" @click="$router.replace({name:'home'})">返回首页</div>
     <div class="content" :class="{up:isFous}">
       <div class="logo">
         <img src="../../assets/logo.png" alt="">
       </div>
       <div v-show="type==1">
       <div class="list">
         <div class="item">
           <p>账号</p>
           <input type="text" @focus="isFous=true" @blur="isFous=false" placeholder="请输入账号" v-model="account">
         </div>
         <div class="item">
           <p>密码</p>
           <input type="password" @focus="isFous=true" @blur="isFous=false" placeholder="请输入密码" v-model="pw">
         </div>
       </div>
       <p class="type" @click="type=2">短信验证码登录</p>
       </div>
       <div v-show="type==2">
       <div class="list">
         <div class="item">
           <p>手机号</p>
           <input type="number" @focus="isFous=true" @blur="isFous=false" placeholder="请输入账号" v-model="account">
         </div>
         <div class="item">
           <p>验证码</p>
           <input class="codeInput" type="number" @focus="isFous=true" @blur="isFous=false" placeholder="验证码" v-model="codeNum">
           <div class="code" :class="{grey:code}" @click="takeCode">{{codeTxt}}</div>
         </div>
       </div>
       <p class="type" @click="type=1">账号密码登录</p>
       </div>
       <div class="btn" :class="{upBtn:isFous}" @click="login">
         <div  class="btntext">登录</div>
         <div class="shai"></div>
       </div>
       <p class="visit" @click="$router.replace({name:'home'})">游客浏览</p>
       <p class="register" v-show="isFous">
         <span><router-link :to="{ path: '/Register', query: { type: 1}}">注册账号</router-link> </span>
         <span><router-link :to="{ path: '/Register', query: { type: 2}}">找回密码</router-link> </span>
       </p>
     </div>
     <div class="foot" :class="{upFoot:isFous}">
       <div class="cho">
         <span><router-link :to="{ path: '/Register', query: { type: 1}}">注册账号</router-link> </span>
         <span><router-link :to="{ path: '/Register', query: { type: 2}}">找回密码</router-link></span>
       </div>
       <p>登录即代表阅读并同意
         <span @click="$router.push({name:'News',query:{id:22}})">服务协议</span>

         与
         <span @click="$router.push({name:'News',query:{id:55}})">隐私协议</span>
       </p>
     </div>
   </div>
</template>

<script>
    import { Toast } from 'mand-mobile';
    export default {
        name: "Login",
        data(){
            return{
                account:'',
                pw:'',
                isFous:false,
                type:1,
                codeTxt:'发送验证码',
                code:false,
                codeNum:'',
                hideLogo:true
            }
        },
        created(){
          this.getNavigator()
        },
        methods:{
            //获取设备信息
            getNavigator(){
                console.log(navigator.userAgent)
                let agent = navigator.userAgent
                if(agent.includes('iPad')){
                    return  this.hideLogo=false
                }else {
                    return  this.hideLogo=true
                }
            },
            takeCode(){
                let time =60;
                if(!this.code){
                   this.code=true;
                   this.getCode();
                   let interval= setInterval(()=>{
                        time--;
                        this.codeTxt='重新发送'+time+'s';
                        if(time<1){
                            this.codeTxt='发送验证码';
                            this.code=false;
                            clearInterval(interval)
                        }
                    },1000)
                }
            },
            //获取验证码
            async getCode(){
                let res = await this.$api.get('/getCode?t='+Date.now(),{
                    params:{
                        phone:this.account
                    }
                })
                let {success} =res.data
                console.log(res)
                if(!success){
                    Toast.info('发送错误，请重新获取！');
                    this.code=true;
                    this.codeTxt='发送验证码';
                    return
                }
            },
            //账号密码登录
            async pwLogin(){
                let phone = this.account
                if(phone.length<1) return Toast.info('请输入账号')
                let password = this.pw
                if(password.length<1) return Toast.info('请输入密码')
                let res = await this.$api.post('/login',{
                    phone,password
                })
                let { success, data } = res.data
                if(!success) return Toast.info('登录错误，请重新登录')
                let userInfo={
                    phoneNum:phone,
                    uid: data.uid
                }
                this.$store.commit('SET_USERINFO',userInfo)
                this.$router.push({
                    path:'/User',
                })
            },
            //验证码登录
            async codeLogin(){
                let phone = this.account
                if(phone.length<1) return Toast.info('请输入账号')
                let code = this.codeNum
                if(code.length<1) return Toast.info('请输入验证码')
                let res = await this.$api.post('/loginByCode',{
                    phone,code
                })
                let { success ,data} = res.data
                if(!success) return Toast.info('登录错误，请重新登录')
                let userInfo={
                    phoneNum:phone,
                    uid: data.uid
                }
                this.$store.commit('SET_USERINFO',userInfo)
                this.$router.push({
                    path:'/User',
                })
            },
            login(ev){
                if(this.type==1){
                    this.pwLogin()
                }else {
                    this.codeLogin()
                }
                const dom = ev.currentTarget
                 dom.classList.add('bringbring');
                setTimeout(()=> dom.classList.remove('bringbring'),600)
            }
        }
    }
</script>

<style scoped lang="scss">
  .backIndex{
    position: fixed;
    top: 40px;
    left: 40px;
    font-size: 30px;
    color: #333;
  }
  @media (min-width: 760px){
    .logo{
      display: none;
    }
    .up{
      height: auto;
      flex-grow: 0;
      //transform: translateY(-380px);
      transition: 0.5s;
    }
  }
  @media (max-width: 760px) {
    .up{
      height: auto;
      flex-grow: 0;
      transform: translateY(-380px);
      transition: 0.5s;
    }
  }
  .main{
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .content{
    height: 0;
    flex-grow: 1;
    width: 550px;
    margin: 0 auto;
    transform: translateY(0);
    transition: 0.5s;
    display: flex;
    flex-direction: column;
  }

  .logo{
     width: 254px;
     height: 180px;
     margin: 120px auto 0;
     img{
       width: 100%;
       height: 100%;
     }
  }
  .list{
    width: 550px;
    margin: 120px auto 0;
    .item{
      margin-bottom: 40px;
      display: flex;
      align-items: center;
      height: 120px;
      border-radius: 62px;
      background: rgba(238,238,238,0.6);
      p{
        margin-left: 60px;
        margin-right: 52px;
        font-size:32px;
        color: #666;
        font-weight: bold;
        width: 102px;
      }
      input{
        margin-right: 60px;
        line-height: 60px;
        text-align: left;
        font-size: 32px;
        color: #333;
        width: 0;
        flex-grow: 1;
        border: none;
        background: none
      }
      .codeInput{
        margin-right: 30px;
      }
      .code{
        margin-right: 60px;
        font-size: 24px;
        color: #333;
      }
      .grey{
        color: #999;
      }
    }
  }
  .type{
    margin-left: 60px;
    color:rgba(52,204,255,1);
    font-size: 24px;
  }
  .btn{
    margin-top: 100px;
    height: 120px;
    border-radius: 60px;
    background: #FF3434;
    color: #fff;
    font-weight: bold;
    font-size: 32px;
    text-align: center;
    line-height: 120px;
    transition: 0.5s;
    position: relative;
    overflow: hidden;
  }
  .upBtn{
    margin-top: 40px;
    transition: 0.5s;
  }

  .foot{
    text-align: center;
    flex-grow: 0;
    display: block;
    height: auto;
    .cho{
      font-size:24px;
      font-weight:bold;
      color:rgba(102,102,102,1);
      width: 352px;
      margin: 0 auto 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 1;
      a{
        color:rgba(102,102,102,1);
      }
    }
    p{
      font-size:24px;
      color:rgba(102,102,102,1);
      margin-bottom: 40px;
      line-height: 1;
      display: block;
      span{
        color: #34CCFF;
      }
    }
  }
  .register{
    font-size:24px;
    font-weight:bold;
    color:rgba(102,102,102,1);
    line-height:24px;
    width: 352px;
    margin: 20px auto 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 1;
    a{
      color:rgba(102,102,102,1);
    }

  }
  .upFoot{
    display: none;
  }

  .bringbring{
    .btntext{
      position: absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
      z-index: 9;
    }
    .shai{
      z-index: 7;
      display: block;
      position: absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
      width: 70px;
      height: 70px;
      border-radius: 50%;
      opacity: 0;
      animation: bb 500ms linear;
      animation-iteration-count: 1;
      background: rgba(255, 232, 167, 0.28);
    }
  }


  @keyframes  bb {
      0%{
        opacity: 1;
      }
      100%{

        background: rgba(221, 16, 3, 0.72);
        width: 1000px;
        height: 1000px
      }
  }
  .visit{
    line-height: 2;
    text-align: center;
    color:#333
  }
</style>
