<template>
  <div id="main">
    <div class="content">
      <router-view></router-view>
    </div>
    <div class="navigation">
      <van-tabbar route active-color="#ee0a24" inactive-color="#000">
        <van-tabbar-item icon="home-o" to="/main">首页</van-tabbar-item>
        <van-tabbar-item icon="apps-o" to="/classification">分类</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart-o" to="/shoppingCart">购物车</van-tabbar-item>
        <van-tabbar-item icon="contact-o" to="/mine">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainIndex'
}
</script>

<style scoped>

</style>
