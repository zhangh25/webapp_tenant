<template>
  <Tabbar v-model="selected" fixed class="tabbar">
    <tab-item id="home">
      <i slot="icon" class="icon home-icon"></i>
      首页</tab-item>
    <tab-item id="wish" class="icon">
      <i slot="icon" class="icon wish-icon"></i>
      心愿单</tab-item>
    <tab-item id="map" class="map_icon">
      <i slot="icon" class="map-icon"></i>
      地图</tab-item>
    <tab-item id="message" class="icon">
      <i slot="icon" class="icon msg-icon"></i>
      消息</tab-item>
    <tab-item id="me" class="icon">
      <i slot="icon" class="icon me-icon"></i>
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
  },
  components: {
    Tabbar,
    TabItem
  }
}
</script>

<style lang="less">
.mint-tabbar.tabbar{
  // font-size: 20px;
  color: #929292;
  background-color: #fff;
  border-top: 1px solid #f1f1f1;
  .mint-tab-item-icon{
    width: auto;
    .map-icon{
      position: relative;
      top: -10px;
    }
  }
  > .mint-tab-item.is-selected{
    background-color: #fff;
    .home-icon{
      background-image: url(icon_shouyue.@2x.png);
    }
    .wish-icon {
      background-image: url(icon_xinyuandan.@2x.png);
    }
    .msg-icon{
      background-image: url(icon_xiaoxi.@2x.png);
    }
    .me-icon{
      background-image: url(icon_wode.@2x.png);
    }
  }
  .mint-tab-item-label{
    font-size: 10px;
  }
  .home-icon{
    background-image: url(icon_shouyue@2x.png);
  }
  .wish-icon {
    background-image: url(icon_xinyuandan@2x.png);
  }
  .msg-icon{
    background-image: url(icon_xiaoxi@2x.png);
  }
  .me-icon{
    background-image: url(icon_wode@2x.png);
  }
  .map-icon{
    display: inline-block;
    width: 35px;
    height: 35px;
    background: url(icon_ditu.@2x.png);
    background-size: cover;
  }
  .icon{
    display: inline-block;
    width: 23px;
    height: 23px;
    background-size: cover;
  }
}
</style>
