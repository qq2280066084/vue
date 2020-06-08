<template>
   <div class="main">
     <div class="nav">
       <md-icon
         name="arrow-left"
         size="lg"
         @click="$router.go(-1)"
       ></md-icon>
       <div class="title">收藏</div>
     </div>
<!--     <div class="name">猜你喜欢</div>-->
     <div class="content">
       <md-scroll-view
         :auto-reflow="true"
         :scrolling-x="false"
         :scrolling-y="true"
         ref="scrollView4"
         @refreshing="$_onRefresh"
         @end-reached="loadMore"
         :immediate-check-end-reaching="true"
       >
         <!--下拉刷新处理-->
         <md-scroll-view-refresh
           slot="refresh"
           slot-scope="{ scrollTop, isRefreshActive, isRefreshing }"
           :scroll-top="scrollTop"
           :is-refreshing="isRefreshing"
           :is-refresh-active="isRefreshActive"
           :end-reached-threshold="300"
         ></md-scroll-view-refresh>
           <vcCard class="list" v-for="(data,keys) in list" :key="keys" :car-data="data.vehicleInfo"></vcCard>


         <!--加载更多-->
         <md-scroll-view-more
           slot="more"
           :is-finished="isEnd"
         >
         </md-scroll-view-more>
       </md-scroll-view>
     </div>

   </div>
</template>

<script>
    import vcCard from "../../components/vcCard";
    export default {
        name: "collect",
        data(){
          return{
             page:1,
             allPage: 999,
             list:[],
             isRefreshing:false,
             isEnd: false, // 下载加载是否到了最后一页
          }
        },
      created() {
          // this.getCollect()
       // this.loadMore()
      },
      filters:{

      },
      components:{
        vcCard
      },
      methods:{
         async isReach(){
          // if(this.page < this.allPage){
          //   this.page++
          // }
          // const _list = await this.$api.get('/findUserCarList',{
          //   params:{ uid ,page: this.page }
          // })
          // const { success, data, allPage} = _list.data
          // if(!success) return this.page--
          // allPage == this.page?this.isEnd=false:this.isEnd=true
          // this.list.concat(data)
        },
         async getCollect(){
           this.$toast.loading('加载中...')
           const uid = this.$store.state.userInfo.uid
           if(this.page>this.allPage) return this.$toast.info('没有更多数据了',1000)
           const _list = await this.$api.get('/findUserCarList',{
             params:{ uid ,page: 1 }
           })
           this.$toast.hide()
           const { success, data, info, allPage} = _list.data
           if(!success) return this.$toast.info(info, 1000)
           allPage>this.page? this.isEnd=false:this.isEnd=true
           this.allPage = allPage
           this.list = data
         },
         async loadMore(){
           const uid = this.$store.state.userInfo.uid
           console.log('is num', this.allPage,this.page)
           if(this.allPage<this.page){
             return
           }
           const _list = await this.$api.get('/findUserCarList',{
             params:{ uid ,page: this.page }
           })
           const { success, data, allPage} = _list.data
           this.allPage = allPage
           allPage > this.page?this.isEnd=false:this.isEnd=true
           this.list = this.list.concat(data)
           this.page++

           this.$nextTick(() => {
           //  this.$refs.scrollView4.reflowScroller();
             this.$refs.scrollView4.finishLoadMore();
           });

         },
         async $_onRefresh(){
           // this.getCollect()
           this.page = 1
           this.list= []
           this.loadMore()
           this.$refs.scrollView4.finishRefresh()
         }
      },
      deactivated() {
        const st = this.$refs.scrollView4.getOffsets();
        sessionStorage.setItem('scrollTop', st.top);
      },
      activated() {
        console.log(1);
        const st = sessionStorage.getItem('scrollTop');
        const from = window.sessionStorage.getItem('from');
        const cancelId = window.sessionStorage.getItem('CancelId');
        if(cancelId){
          for(const index in this.list){
            if(cancelId == this.list[index].cid){
              this.list.splice(index,1)
            }
          }
          window.sessionStorage.removeItem('CancelId')
        }
        if(from === 'User'){
          this.page = 1
          this.list= []
          this.loadMore()
        }
        if (parseFloat(st) > 0) setTimeout(() => this.$refs.scrollView4.scrollTo(0, parseFloat(st)), 100);
      },
      beforeRouteEnter(to, from, next){
        window.sessionStorage.setItem('from',from.name)
        next()
      },
      beforeRouteLeave(to,from,next){
        next()
      }
    }
</script>

<style scoped lang="scss">
  .nav{
    box-sizing: border-box;
    height: 96px;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    position: relative;
    padding: 0 32px;
    text-align: center;
    i{
      font-size: 16px;
      color: #333;
      line-height: 96px;
      position: absolute;
      left: 32px;
    }
    .title{
      height: 96px;
      line-height: 96px;
      margin: 0 auto;
      font-size: 36px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
    }
  }
  .name{
    padding: 22px 24px;
    font-size: 36px;
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:600;
  }
  .content{
    height: 0;
    flex-grow: 1;
  }
  .list{
    margin: 0;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    height: 260px;
    padding: 40px 24px;
  }
  .list:first-child{
    padding-top: 18px;
  }
</style>
