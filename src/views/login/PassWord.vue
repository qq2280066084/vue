<template>
  <div class="main">
    <TopNav :title="title"></TopNav>
    <div class="content">
      <div class="title">
        {{$route.query.type==1? "输入密码完成注册":"输入您的新密码"}}
      </div>
      <p class="tips">密码由英文字母、数字和下划线组成字数在8~20位 </p>
      <div class="passInput">
        <div class="item">
          <i></i>
          <input :type="isPw?'number':'password'" placeholder="请输入您的密码" v-model="pw">
          <i :class="{closeIcon:isPw}" @click="isPw=!isPw" class="icon"></i>
        </div>
        <div class="item">
          <i></i>
          <input placeholder="请确认您的密码" type="password" v-model="pw1">
          <i></i>
        </div>
      </div>
      <!-- 注册 -->
      <div @click="setPw" class="btn" v-show="$route.query.type==1">立即登录</div>
      <!-- 修改密码 -->
      <div @click="changePw" class="btn" v-show="$route.query.type==2">立即登录</div>

    </div>
  </div>
</template>

<script>
    import TopNav from "../../components/TopNav";
    import {Toast} from 'mand-mobile';

    export default {
        name: "PassWord",
        data() {
            return {
                title: '注册账号',
                code: '',
                type: 'password',
                isPw: false,
                pw: '',
                pw1: ''
            }
        },
        components: {
            TopNav
        },
        created() {
            console.log(this.$route.query.code, this.$route.query.phone)
        },
        methods: {
            //注册
            async setPw() {
                let pw = this.pw;
                let pw1 = this.pw1;
                if (pw != pw1) return Toast.info('密码不一致，请重新输入!');
                if (8 > pw.length || pw.length > 20) return Toast.info('密码长度应为8-20位');
                let res = await this.$api.post('/reg', {
                    code: this.$route.query.code,
                    phone: this.$route.query.phone,
                    password: pw
                });
                let {success} = res.data;
                if (!success) return Toast.info('设置失败！请再次设置');
                //返回登录页
                this.$router.go(-3)

            },
            //重置密码
            async changePw(){
              const phone = this.$route.query.phone
              const pwd = this.pw1
              if(!pwd) return Toast.info('请输入密码')
              const res = await this.$api.post('/user/resetPwd',{
                phone,pwd
              })
              const { success,info } = res.data
              if (!success) return Toast.info(info);
              //返回登录页
              this.$router.go(-3)
            }
        }
    }
</script>

<style lang="scss" scoped>
  .main {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .content {
    padding: 0 32px;
  }

  .title {
    margin-top: 80px;
    font-size: 60px;
    color: #333;
    letter-spacing: 2px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    line-height: 1;
  }

  .tips {
    font-size: 28px;
    color: #666;
    line-height: 1;
    margin-top: 40px;

    span {
      color: #34CCFF;
    }
  }

  .passInput {
    width: 550px;
    margin: 140px auto 0;

    .item {
      padding: 20px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      margin-bottom: 60px;

      input {
        width: 0;
        flex-grow: 1;
        font-size: 32px;
        color: #333;
        text-align: center;
        border: none;
        background: none;
      }

      input::placeholder {
        color: #999;
      }

      i {
        display: block;
        width: 36px;
        height: 25px;
      }

      .icon {
        background: url("../../assets/eyes.png") no-repeat center center;
        background-size: 36px 25px;
      }

      .closeIcon {
        background: url("../../assets/closeEyes.png") no-repeat center center;
        background-size: 36px 25px;
      }
    }

    .item:last-child {
      margin-bottom: 0;
    }
  }

  .btn {
    margin: 160px auto 0;
    width: 550px;
    height: 80px;
    border-radius: 60px;
    color: #fff;
    font-size: 28px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    background: #FF3434;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
