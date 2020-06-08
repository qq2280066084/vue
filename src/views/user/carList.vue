<template>
  <div class="main">
    <div class="tag">
      <md-icon
        name="arrow-left"
        size="lg"
        @click="$router.go(-1)"
      ></md-icon>
      <div class="title">车行车辆</div>
      <span class="share"></span>
    </div>
    <div class="content">
      <md-scroll-view
        class="scrollZone"
        ref="scrollView"
        :scrolling-x="false"
        :auto-reflow="true"
      >
         <div class="list">
          <div class="items">
            <vcCard class="item" v-for="(data,keys) in $route.query.carList" :key="keys" :car-data="data"></vcCard>
          </div>
        </div>
      </md-scroll-view>
    </div>
  </div>
</template>

<script>
    import vcCard from "../../components/vcCard";
    export default {
        name: 'carList',
        data() {
            return {
                carList: [],
            };
        },
        components:{
            vcCard
        },
        methods: {

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
      background: url("../../assets/share.png") no-repeat center center;
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

</style>
