<template>
    <div class="nav">
      <i @click="$router.go(-1)"></i>
      <p>{{title}}</p>
    </div>
</template>

<script>
    export default {
        name: "TopNav",
        props:['title']
    }
</script>

<style scoped lang="scss">
   .nav{
     height:96px;
     box-sizing: border-box;
     padding: 0 32px;
     position: relative;
     display: flex;
     align-items: center;
     justify-content: space-between;
     p{
       width: 60%;
       height: 96px;
       line-height: 96px;
       position: absolute;
       left: 50%;
       margin-left: -30%;
       font-size: 36px;
       font-weight: bold;
       text-align: center;
       color: #333;
     }
     i{
       display: block;
       width: 16px;
       height: 28px;
       background: url("../assets/left.png") no-repeat center center;
       background-size: 16px 28px;
     }
   }

</style>
