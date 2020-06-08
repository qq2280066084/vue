<template>
    <div class="main">
        <div class="nav">
           <md-icon name="arrow-left" @click="$router.go(-1)"></md-icon>
            <div>浏览历史</div>
        </div>
        <div class="content">
          <md-scroll-view
            auto-reflow
            :scrolling-x="false"
            :scrolling-y="true"
          >
          <vcCard class="card" v-for="(car,index) in carList" :key="`${car.id}_${index}`" :carData="car"></vcCard>
          </md-scroll-view>
        </div>
    </div>
</template>

<script>
export default {
  name: 'history',
  data() {
    return {
      a: '<',
      carList:[]
    };
  },
  created() {
    this.getHistoey()
  },
  methods: {
    cilcks() {
      this.$router.push({ path: '/my' });
    },
    getHistoey(){
      const uid = this.$store.state.userInfo.uid
      const saveName = `${uid}history`
      const history = window.localStorage.getItem(saveName)
      this.carList = JSON.parse(history)
    }
  },
};
</script>

<style scoped lang="scss">
    .main{
      height: 100%;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
    }
    .nav{
      box-sizing: border-box;
      height: 96px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      border-bottom: 1px solid rgba(0,0,0,0.1);
      div{
        font-size: 36px;
        color: #333;
        font-weight: bold;
      }
      i{
        position: absolute;
        left: 32px;
        font-size: 30px;
        color: #333;
        top: 50%;
        transform: translate(0,-50%);
      }
    }
    .content{
      height: 0;
      flex-grow: 1;
    }
   .card{
     background: #fff;
     box-sizing: border-box;
     width: 100%;
     padding: 32px;
     margin: 0;
     height: auto;
     border-bottom: 1px solid #f0f0f0;
   }


</style>
