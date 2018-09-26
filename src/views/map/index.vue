<template>
  <div class="map">
    <div class="header">
      <div class="bg"></div>
      <div class="left"></div>
      <div class="center">
        <span :class="{active: isArea}" style="margin-right: 30px;" @click="toggleWay(true)">区域</span>
        <span :class="{active: !isArea}" @click="toggleWay(false)">地铁</span>
      </div>
      <div class="right">
        <icon-svg icon-class="search"></icon-svg>
      </div>
    </div>
    <div class="map">
      <el-amap vid="amapDemo" class="" :amap-manager="amapManager"></el-amap>
    </div>
    <mypop position="bottom" v-model="localVisible">
      <div class="city">
        <div style="color:#9a9a9a; font-size: 14px;">当前定位城市</div>
        <div>
          <span class="btn"><i class="icon"></i><span class="text">{{city}}</span></span>
        </div>
      </div>
    </mypop>
    <tabbar></tabbar>
  </div>
</template>

<script>
import mypop from '@/components/myPopup'
import tabbar from '@/components/tabbar/index'
import { AMapManager } from 'vue-amap'
let amapManager = new AMapManager()
export default {
  data () {
    return {
      zoom: 12,
      amapManager,
      // center: [121.5273285, 31.21515044],
      localVisible: false,
      city: '深圳',
      isArea: true
    }
  },
  methods: {
    toggleWay (val) {
      this.isArea = val
    }
  },
  components: {
    mypop,
    tabbar
  }
}
</script>

<style lang="less" scoped>
.header{
  position: relative;
  display: flex;
  height: 44px;
  line-height: 44px;
  padding: 0 15px;
  font-size: 16px;
  color: #fff;
  .bg{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #000;
    opacity: 0.5;
    // z-index: 5;
  }
  .center{
    flex: 1;
    text-align: center;
    z-index: 11;
    font-size: 14px;

    >span{
      display: inline-block;
      opacity: .7;
    }
    .active{
      font-size: 16px;
      opacity: 1;
    }
  }
  .left, .right{
    flex: 0 0 60px;
    z-index: 11;
  }
  .right{
    text-align: right;
  }
  z-index: 10;
}
.map{
  position: fixed;
  top:0;
  left:0;
  right: 0;
  bottom: 12px;
  background-color: #000;
}
.city{
  padding: 15px;
  .btn{
    display: inline-block;
    padding: 10px 25px;
    font-size: 15px;
    color: #222;
    background-color: #fff;
    border-radius: 5px;
    margin-top: 10px;
    margin-right: 10px;
    .icon{
      display: inline-block;
      width: 19px;
      height: 19px;
      background-image: url(./icon/icon_dingwei@2x.png);
      background-size: contain;
      margin-right: 10px;
    }
    .text{
      display: inline-block;
      height: 19px;
      line-height: 19px;
      vertical-align: top;
      position: relative;
      top:2px;
    }
  }
}
</style>
