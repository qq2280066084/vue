<template>
    <div class="fastLogin">

      <div class="carInfo" style="padding-top: 20px;">
        <div class="card">
          <div class="cardL">
            <img :src="data.cover|mobilePic"  @click="toCt(carData)">
          </div>
          <div class="cardR">
            <div class="price">
              <div class="amount">{{data.onlinePrice}}</div>

            </div>
            <div class="carinfo">
              <span>{{data.brandDate|getYear}}年上班</span>
              .
              <span>{{data.mileage}}万公里</span>
              .
              <span>{{data.brand ? data.brand.paifang:''}}</span>
            </div>

          </div>
        </div>
      </div>
      <div class="login">
        <md-field>
          <md-input-item
            ref="input0"
            title="手机号"
            type="phone"
            placeholder="填写手机号码"
            v-model="phone"
          >
            <div class="input-operator" slot="right" @click="getCode"> {{timer === 60?'获取验证码': `${timer}s`}}</div>
          </md-input-item>
          <md-input-item
            ref="input0"
            title="验证码"
            type="number"
            placeholder="填写收到的6位数验证码"
            :maxlength="6"
            v-model="code"
          >
          </md-input-item>
          <md-button class="loginBt"  :type="phone.length === 11? 'primary':'disabled'" @click="codeLogin">提交</md-button>
          <div class="tips">提交即代表同意 《个人信息保护声明》</div>
        </md-field>

      </div>

      <div class="others">
        <h1>同时咨询  </h1>
        <div class="tips">为您查找到以下相似车源,意见提交省时省力,您也可以取消勾选</div>
                <md-check-list :options="otherList" size="lg"  v-model="otherChecked" iconPosition="left">
          <template slot-scope="{ option }">
            <div class="card checkCard">
              <div class="cardL">
                <img :src="option.cover|mobilePic"  @click="toCt(carData)">
              </div>
              <div class="cardR">
                <div class="carname" @click="toCt(option.id)">{{option.title}}</div>
                <div class="carinfo">
                  <span>{{option.brandDate|getYear}}年上班</span>
                  .
                  <span>{{data.mileage}}万公里</span>
                  .
                  <span>{{data.brand ? data.brand.paifang:''}}</span>
                </div>
                <div class="price">
                  <div class="amount">{{option.onlinePrice}}</div>
                </div>
              </div>
            </div>
          </template>
        </md-check-list>
      </div>

    </div>
</template>

<script>
  export default {
    name: 'FastLogin',
    props:{
      carData:Object
    },
    created(){
     // this.data = this.carData;
      this.showPhone()
    },
    computed:{
      data(){
        // console.log('datadata',this.carData)
        return this.carData
      }
    },
    data(){
      return {
        timer:60,
        phone:'',
        code:'',
        otherList:[
          // {value: 'watermelon', label: '西瓜', brief: '选项摘要描述'},
          // {value: 'tomato', label: '西红柿', brief: '选项摘要描述'},
        ],
        sameCarList:[],
        otherChecked:[],
      }
    },
    watch:{
      otherChecked(nv){
        console.log(nv)
      },
      carData(){
        if(this.carData.title) this.getSameCar();
      }
    },
    methods:{
      async getSameCar(){
        let res = await this.$api.post('/vehicle/getSameCar',{carId:this.carData.id,title:this.carData.title,brandId:this.carData.brandId})
        const {data,success} = res.data;
         this.otherList = data.map(r=> ({value:r.id,...r})).slice(0,3)
         this.otherChecked = data.slice(0,3).map(r=>r.id)
      },
      codeLogin(){
         this.$emit('codeLogin',this.phone,this.code,this.otherChecked.join(','))
      },

      getCode(){
          if(this.timer !== 60) return this.$toast.info('获取中请耐心等等')
          this.Code()
          this.startTimer()

      },
      startTimer(){
        if(this.timer>0) {
          this.timer--
          setTimeout(()=>this.startTimer(),1000)
        }else{
          this.timer = 60
        }

      },
        //获取验证码
        async Code(){
            let res = await this.$api.get('/getCode',{
                params:{
                    phone:this.phone
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
      async toCt(id){
        this.$router.replace({name:'Content',query:{id:id}})
      },
      showPhone(){
        if(this.$store.state.userInfo.phoneNum) this.phone = this.$store.state.userInfo.phoneNum
      }
    }
  };
</script>


<style scoped lang="scss">
  .fastLogin{
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-top: constant(safe-area-inset-top)!important;
    padding-bottom: constant(safe-area-inset-bottom)!important;
    /* Status bar height on iOS 11+ */
    padding-top: env(safe-area-inset-top)!important;
    padding-bottom: env(safe-area-inset-bottom)!important;
    box-sizing: border-box;
    position: relative;
  }
  .card{
    width:684px ;
    margin:0 auto;
    display: flex;
    padding:20px;
    box-sizing: border-box;
    margin-bottom: 16px;

    .cardL{
      width: 135px;
      height: 90px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .cardR{
      padding-left: 20px;
      box-sizing: border-box;
      width: 0;
      flex-grow: 1;
      .carname{
        min-height: 96px;
        font-size: 32px;
        font-weight:500;
      }
      .carinfo{
        font-size:24px;
        line-height: 24px;
        color:#999;
      }
      .price{
        margin-bottom: 20px;
        display: flex;
        line-height: 40px;
        align-items: flex-end;
      }
      .amount{
        color:$mainColor;
        font-size: 30px;
        font-weight: 400;
      }
      .amount::before{
        content: '￥ ';
        display: inline-block;
        font-size: 24px;
      }
      .amount::after{
        content: ' 万';
        display: inline-block;
        font-size: 24px;
      }
      .shoufu{
        color:$mainColor;
        font-size: 24px;
        margin-left: 20px;
      }
    }
  }
  .loginBt{
    width: 90vw;
    margin:0 auto;
    background: $mainColor;
    border:none!important;
  }
  .loginBt::after{
    content:'';
    border:none
  }
  .tips{
    color:#888;
    margin-top: 20px;
  }
  .md-field{
    padding-top: 0;
  }
  .others{
      width:684px ;
      margin:0 auto;
    h1{
      font-weight: 500;
    }
  }
  .bs {
    .card{
      width:550px ;
      height: 222px;
      margin:0 auto;
      display: flex;
      padding:20px;
      box-sizing: border-box;
      margin-bottom: 16px;

      .cardL{
        width: 200px;
        height: 182px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .cardR{
        padding-left: 20px;
        box-sizing: border-box;
        width: 0;
        flex-grow: 1;
        .carname{
          min-height: 96px;
          font-size: 32px;
          font-weight:500;
        }
        .carinfo{
          font-size:24px;
          line-height: 24px;
          color:#999;
        }
        .price{
          margin-top: 20px;
          display: flex;
          line-height: 40px;
          align-items: flex-end;
        }
        .amount{
          color:$mainColor;
          font-size: 40px;
          font-weight: 500;
        }
        .amount::before{
          content: '￥ ';
          display: inline-block;
          font-size: 24px;
        }
        .amount::after{
          content: ' 万';
          display: inline-block;
          font-size: 24px;
        }
        .shoufu{
          color:$mainColor;
          font-size: 24px;
          margin-left: 20px;
        }
      }
    }

  }
  .checkCard{
    width: 600px;
    margin: 0;
    padding: 0;
    .cardR{
      .carname{
        font-size: 25px;
        min-height: 2vw;
        line-height: 1.2;
        margin-bottom: 10px;
      }
      .carinfo{
        line-height: 2;
      }
    }

    .cardL{
      width: 200px;
      height: 133.33px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>

