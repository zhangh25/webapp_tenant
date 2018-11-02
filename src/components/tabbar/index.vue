<template>
  <Tabbar v-model="selected" fixed class="tabbar">
    <tab-item id="home">
      <!-- <i slot="icon" class="icon home-icon"></i> -->
      <img slot="icon" height="22" v-if="selected == 'home'" src="./icon_shouye.@2x.png" alt="">
      <img slot="icon" height="22" v-else src="./icon_shouye@2x.png" alt="">
      首页</tab-item>
    <tab-item id="wish">
      <!-- <i slot="icon" class="icon wish-icon"></i> -->
      <img slot="icon" height="22" v-if="selected==='wish'" src="./icon_xinyuandan.@2x.png" alt="">
      <img slot="icon" height="22" v-else src="./icon_xinyuandan@2x.png" alt="">
      心愿单</tab-item>
    <tab-item id="map" class="map_icon">
      <i slot="icon" class="map-icon"></i>
      地图找房</tab-item>
    <tab-item id="message">
      <!-- <i slot="icon" class="icon msg-icon"></i> -->
      <img slot="icon" height="22" v-if="selected=='message'" src="./icon_xiaoxi.@2x.png" alt="">
      <img slot="icon" height="22" v-else src="./icon_xiaoxi@2x.png" alt="">
      消息</tab-item>
    <tab-item id="me">
      <img slot="icon" height="22" v-if="selected=='me'" src="./icon_wode.@2x.png" alt="">
      <img slot="icon" height="22" v-else src="./icon_wode@2x.png" alt="">
      <!-- <i slot="icon" class="icon me-icon"></i> -->
      我的</tab-item>
  </Tabbar>
</template>

<script>
import { Tabbar, TabItem } from 'mint-ui'
export default {
  data () {
    return {
      selected: 'home'
    }
  },
  watch: {
    selected (val) {
      console.log(val)
      if (val) {
        this.$router.push(`/${val}`)
      }
    }
  },
  created () {
    // console.log(this.$route.path.split('/'))
    let path = this.$route.path.split('/')
    console.log(path)
    if (path.length > 1) {
      this.selected = path[1]
    }
    console.log(this.selected)
  },
  components: {
    Tabbar,
    TabItem
  }
}
</script>

<style lang="less">
.mint-tabbar.tabbar.is-fixed{
  height: 49px;
  color: #505052;
  background-color: #fff;
  background-image: linear-gradient(180deg, #e8e8e8, #e8e8e8 50%, transparent 50%);
  z-index: 3;
  // border-top: 1px solid #e8e8e8;
  .mint-tab-item-icon{
    width: auto;
    height: 22px;
    text-align: center;
    margin-bottom: 4px;
    .map-icon{
      position: relative;
      top: -27px;
      // z-index: -1;
      z-index: 3
    }
    img{
      display: inline-block;
      width: auto;
      height: 22px;
    }
  }
  .mint-tab-item-label {
    position: relative;
    z-index: 4;
  }
  > .mint-tab-item.is-selected{
      // background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-image: linear-gradient(180deg, #e8e8e8, #e8e8e8 50%, transparent 50%);
    background-size: 100% 1px;
    background-repeat: no-repeat;
    background-position: top left;
    background-color: #fff;
    // .home-icon{
    //   background-image: url(icon_shouye.@2x.png);
    // }
    // .wish-icon {
    //   background-image: url(icon_xinyuandan.@2x.png);
    // }
    // .msg-icon{
    //   background-image: url(icon_xiaoxi.@2x.png);
    // }
    // .me-icon{
    //   background-image: url(icon_wode.@2x.png);
    // }
  }
  .mint-tab-item-label{
    font-size: 10px;
  }
  // .home-icon{
  //   background-image: url(icon_shouye@2x.png);
  // }
  // .wish-icon {
  //   background-image: url(icon_xinyuandan@2x.png);
  // }
  // .msg-icon{
  //   background-image: url(icon_xiaoxi@2x.png);
  // }
  // .me-icon{
  //   background-image: url(icon_wode@2x.png);
  // }
  .map-icon{
    display: inline-block;
    width: 54px;
    height: 54px;
    background: url(icon_ditiezhaofang@2x.png);
    background-size: cover;
  }
  // > * {
    // width: auto;
    // height: auto;
  // }
  .icon{
    display: inline-block;
    width: auto;
    height: auto;
    // background-size: cover;
  }
}
</style>
