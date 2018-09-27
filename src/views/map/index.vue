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
      <el-amap vid="amapDemo" class="" :zoom="zoom" :plugin="plugin" :amap-manager="amapManager">
        <!-- 定位点 -->
        <el-amap-marker v-if="localShow" vid="component-marker" :position="localMaker.position" :icon="localMaker.icon" :content="localMaker.content"></el-amap-marker>
        <!-- 定位圆 -->
        <el-amap-circle v-if="localShow"
        :center="localCircles.center"
        :radius="localCircles.radius"
        :stroke-opacity="localCircles.strokeOpacity"
        :fill-opacity="localCircles.fillOpacity"
        :fill-color="localCircles.fillColor"></el-amap-circle>
      </el-amap>
      <div class="btns">
        <div class="btn icon-filter" @click="showFilter=true"></div>
        <div class="btn icon-list"></div>
        <div class="btn icon-location" @click="location"></div>
      </div>
    </div>
    <div class="filter-model" v-if="showFilter">
      <div class="bg"></div>
      <csfilter v-model="filtersData"></csfilter>
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
import {patSubwayLineQueryRoom, patQueryRoom} from '@/api/house'
import mypop from '@/components/myPopup'
import tabbar from '@/components/tabbar/index'
import csfilter from '../houses/moreFilter'
import { AMapManager } from 'vue-amap'
let amapManager = new AMapManager()
export default {
  data () {
    let self = this
    return {
      zoom: 12,
      amapManager,
      // center: [121.5273285, 31.21515044],
      localVisible: false,
      city: '深圳',
      cityId: '440300',
      filterData: {
        cityId: '440300'
      },
      isArea: true,
      Geolocation: null,
      localShow: false,
      plugin: [
        {
          pName: 'Geolocation',
          events: {
            init (o) {
              console.log('center')
              self.Geolocation = o
              // o 是高德地图定位插件实例
              // o.getCurrentPosition((status, result) => {
              //   // console.log(status, result)
              //   if (result && result.position) {
              //     // console.log(result, '123244444444444')
              //     self.lng = result.position.lng
              //     self.lat = result.position.lat
              //     self.center = [self.lng, self.lat]
              //     self.loaded = true
              //     self.$nextTick()
              //   }
              // })
            }
          }
        }
      ],
      localCircles: {
        center: [],
        radius: 280,
        strokeOpacity: 0,
        fillOpacity: 0.2,
        fillColor: '#2175e3'
      },
      localMaker: {
        icon: require('./icon/icon_weizhi@2x.png'),
        position: [],
        offset: [0, 0],
        content: self.tipContent('xxxxx')
      },
      showFilter: false,
      filtersData: {
        rent: {},
        configResp: {},
        hotTagResp: {},
        houseType: {},
        menuResp: {},
        orientation: {}
      }
    }
  },
  mounted () {
    this._patQueryRoom()
  },
  methods: {
    tipContent (str) {
      /*
      position: relative;
      height: 27px;
      line-height: 27px;
      margin-left: -50%;
      white-space: nowrap; */
      return `<div class="markerTip">${str}<div class="buttom"></div></div>`
    },
    toggleWay (val) {
      this.isArea = val
      if (val) {
        this._patQueryRoom()
      } else {
        this._patSubwayLineQueryRoom()
      }
    },
    location () {
      console.log('333')
      if (this.Geolocation) {
        this.Geolocation.getCurrentPosition((status, result) => {
          console.log(status, result)
          if (result && result.position) {
            this.zoom = 16
            this.localShow = true
            this.localMaker.position = this.localCircles.center = [result.position.lng, result.position.lat]
          //   // console.log(result, '123244444444444')
          //   self.lng = result.position.lng
          //   self.lat = result.position.lat
          //   self.center = [self.lng, self.lat]
          //   self.loaded = true
          //   self.$nextTick()
          }
        })
      }
    },
    _patSubwayLineQueryRoom () {
      patSubwayLineQueryRoom(this.filterData).then(res => {
        console.log(res)
      })
    },
    _patQueryRoom () {
      patQueryRoom(this.filterData).then(res => {
        console.log(res)
      })
    }
  },
  components: {
    mypop,
    tabbar,
    csfilter
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
  .btns{
    position: absolute;
    right: 15px;
    bottom: 60px;
    .btn{
      width: 44px;
      height: 44px;
      background-size: contain;
      &+.btn{
        margin-top: 10px;
      }
      &.icon-filter {
        background-image: url(./icon/icon_quyuzhaofang@2x.png);
      }
      &.icon-list{
        background-image: url(./icon/icon_liebiaogongneng@2x.png);
      }
      &.icon-location {
        background-image: url(./icon/icon_ditudingwei@2x.png);
      }
    }
  }
}
.filter-model{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  .bg {
    position: absolute;
    top: 0;
  right: 0;
  bottom: 0;
  left: 0;
    background-color: #000;
    opacity: .2;

  }
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
.markerTip{
  position: relative;
  height: 27px;
  line-height: 27px;
  margin-left: -50%;
  white-space: nowrap;
}
</style>
