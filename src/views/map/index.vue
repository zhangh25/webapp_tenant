<template>
  <div class="map">
    <div class="header">
      <div class="bg"></div>
      <div class="left"></div>
      <div class="center">
        <span :class="{active: isArea}" style="margin-right: 30px;" @click="toggleWay(true)">区域</span>
        <span :class="{active: !isArea}" @click="toggleWay(false)">地铁</span>
      </div>
      <div class="right" @click="areaClick('marker')">
        <icon-svg icon-class="search"></icon-svg>
      </div>
    </div>
    <div class="map">
      <el-amap vid="amap" class="" ref="map" :center="center" :zoom="zoom" :plugin="plugin" :zooms="zooms" :events="events">
        <el-amap-marker v-for="marker in topMarkers" :key="marker.id" :position="marker.position" :vid="marker.id" :events="marker.events">
          <div class="circle-marker" v-if="level<3" @click="areaClick(marker)"><div style="white-space:nowrap;">{{marker.name}}</div>{{marker.countNum?marker.countNum:0}}套</div>
          <div class="markerTip" v-else>{{marker.name}} {{marker.countNum?marker.countNum:0}}套<div class="buttom"></div></div>
        </el-amap-marker>
        <!-- 定位点 -->
        <!-- <el-amap-marker v-if="localShow" vid="component-marker" :position="localMaker.position" :icon="localMaker.icon" :content="localMaker.content"></el-amap-marker> -->
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
        <div class="btn icon-list" @click="listShow=true"></div>
        <div class="btn icon-location" @click="location"></div>
      </div>
    </div>
    <div class="filter-model" v-if="showFilter">
      <div class="bg" @click="showFilter=false"></div>
      <csfilter class="filter" v-model="filtersData"></csfilter>
    </div>
    <mypop position="bottom" v-model="localVisible">
      <div class="city">
        <div style="color:#9a9a9a; font-size: 14px;">当前定位城市</div>
        <div>
          <span class="btn"><i class="icon"></i><span class="text">{{city}}</span></span>
        </div>
      </div>
    </mypop>
    <Popup v-model="listShow" position="bottom" class="listpop">
      <div>2344分</div>
      <div>2344分</div>
      <houseslist :filterData="filterData" ref="list"></houseslist>
    </Popup>
    <tabbar></tabbar>
  </div>
</template>

<script>
import {patSubwayLineQueryRoom, patQueryRoom, patSubwayStationQueryRoom} from '@/api/house'
import {Popup, Indicator, Toast} from 'mint-ui'
import mypop from '@/components/myPopup'
import tabbar from '@/components/tabbar/index'
import csfilter from '../houses/moreFilter'
import houseslist from '../houses/houseslist'
import { AMapManager } from 'vue-amap'
let amapManager = new AMapManager()
export default {
  data () {
    let self = this
    let startPosition = []
    return {
      zoom: 12,
      zooms: [12, 16],
      amapManager,
      center: [114.02597366, 22.54605355],
      localVisible: false,
      city: '深圳',
      cityId: '440300',
      events: {
        // zoomchange: (aa) => {
        //   // console.log(this.zoom)
        //   // // map.getZoom()
        //   // // console.log(this.$refs.map.$$getInstance().getZoom())
        //   // this.zoom = this.$refs.map.$$getInstance().getZoom()
        //   // console.log(aa, 'ddd')
        // },
        zoomend: () => {
          this.zoom = this.$refs.map.$$getInstance().getZoom()
        },
        touchstart: () => {
          console.log('触摸开始')
          console.log(this.$refs.map.$$getCenter())
          startPosition = this.$refs.map.$$getCenter()
        },
        touchend: () => {
          console.log('触摸结束')
          let center = this.$refs.map.$$getCenter()
          this.findHousesByDistance(center, this.getDistance(startPosition, center))
          console.log(this.getDistance(startPosition, center))
        }
      },
      filterData: {
        cityId: '440300',
        areaId: null,
        lineId: null,
        stationId: null,
        regionLevel: 'area',
        longitude: null, // 经度
        latitude: null // 纬度
      },
      isArea: true, // true: 区域找房， false: 地铁找房
      level: 1, // 1-地区,2-街道,3-小区
      Geolocation: null,
      localShow: false,
      listShow: false,
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
        offset: [0, 0]
        // content: self.tipContent('xxxxx')
      },
      showFilter: false,
      filtersData: {
        rent: {},
        configResp: [],
        hotTagResp: [],
        houseType: [],
        menuResp: [],
        orientation: []
      },
      topMarkers: []
    }
  },
  watch: {
    zoom (val) {
      // console.log()
      // alert(val)
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
      this.zoom = 12
      this.level = 1
      this.filterData.regionLevel = 'area'
      this.findHouses()
    },
    findHouses () {
      console.log(this.level, 'levle')
      if (this.isArea) {
        this._patQueryRoom()
      } else {
        if (this.level === 1) {
          this._patSubwayLineQueryRoom()
        } else if (this.level === 2) {
          this._patSubwayStationQueryRoom()
        } else if (this.level === 3) {
          console.log('sss')
        }
      }
    },
    zoomchange (ss) {
      console.log(ss)
    },
    location () {
      console.log('333')
      if (this.Geolocation) {
        Indicator.open('获取当前位置...')
        this.Geolocation.getCurrentPosition((status, result) => {
          Indicator.close()
          console.log(status, result)
          if (result && result.position) {
            this.zoom = 16
            this.localShow = true
            this.localMaker.position = this.localCircles.center = [result.position.lng, result.position.lat]
          }
        })
      }
    },
    /* 根据经纬度获取两点距离 */
    getDistance (p1, p2) {
      return Math.round(window.AMap.GeometryUtil.distance(p1, p2))
    },
    setTopMarker (data) {
      // this
      this.topMarkers = []
      for (let item of data) {
        // item.events = {}
        this.topMarkers.push({
          position: [item.longitude, item.latitude],
          name: item.name,
          countNum: item.countNum,
          id: item.id,
          events: {
            click: () => {
              this.areaClick(item)
            }
          }
        })
      }
    },
    csAlert (data) {
      let num = data.map(item => +item.countNum).reduce((temp, next) => temp + next)
      Toast({
        message: `找到${num}房源`,
        position: 'top'
      })
    },
    /* 区域，街道等id设为null */
    initIds () {
      this.filterData.areaId = null
      this.filterData.streetId = null
      this.filterData.lineId = null
      this.filterData.stationId = null
    },
    /* 初始化经纬度 */
    setLnglat (lng, lat) {
      this.filterData.longitude = lng
      this.filterData.latitude = lat
    },
    /* 根据缩放查找房源 */
    findHousesByZoom () {

    },
    /* 根据距离查找房源 */
    findHousesByDistance (data, distance) {
      if (this.level > 1 && data.length === 2) {
        if (this.level === 2 && distance < 3000) {
          return
        }
        if (this.level === 3 && distance < 1000) {
          return
        }
        // this.initIds()
        this.setLnglat(data[0], data[1])
        this.findHouses()
      }
    },
    areaClick (data) {
      console.log(data)
      this.setLnglat(null, null)
      if (this.level === 1) {
        this.level++ // level=2 根据区或地铁线路找街道或地铁站点
        this.filterData.platLevel = 14
        if (this.isArea) {
          this.filterData.areaId = data.id
          this.filterData.regionLevel = 'street'
          this.findHouses()
        } else {
          this.filterData.regionLevel = 'station'
          this.filterData.lineId = data.id
          // console.log(data.id)
          this.findHouses()
        }
        this.zoom = 14
      } else if (this.level === 2) {
        this.level++ //  level=3 根据街道或地铁站点找小区
        this.zoom = 16
        this.filterData.platLevel = 14
        if (this.isArea) {
          this.filterData.regionLevel = 'tower'
          this.filterData.streetId = data.id
        }
        this.findHouses()
      } else if (this.level === 3) { // 根据小区搜索列表
        // this.level++ // 4
        // if ()
        this.setLnglat(data.longitude, data.latitude)
        this.$refs.list.getHouseList()
        this.listShow = true
      }
    },
    /*  地铁找房 */
    _patSubwayLineQueryRoom () {
      patSubwayLineQueryRoom(this.filterData).then(res => {
        console.log(res)
        if (res.code === 1) {
          // this.topMarkers = res.data
          this.setTopMarker(res.data)
          this.csAlert(res.data)
        }
      })
    },
    /* 根据地铁线路找房 */
    _patSubwayStationQueryRoom () {
      patSubwayStationQueryRoom(this.filterData).then(res => {
        if (res.code === 1) {
          // this.topMarkers = res.data
          this.setTopMarker(res.data)
          this.csAlert(res.data)
        }
      })
    },
    /* 区域找房 */
    _patQueryRoom () {
      patQueryRoom(this.filterData).then(res => {
        console.log(res)
        if (res.code === 1) {
          // this.topMarkers = res.data
          this.setTopMarker(res.data)
          this.csAlert(res.data)
          if (res.data.length > 0) {
            // console.log('center')
            this.center = [res.data[0].longitude, res.data[0].latitude]
            // this.center
          }
        }
      })
    }
  },
  components: {
    mypop,
    tabbar,
    csfilter,
    Popup,
    houseslist
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
    opacity: 0.1;
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
  overflow: scroll;
  z-index: 11;
  .bg {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #000;
    opacity: .5;

  }
  .filter{
    background-color: #fff;
    position: absolute;
    right: 0;
    top: 0;
    // left: 70px;
    width: 79%;
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
.listpop{
  width: 100%;
  height: 400px;
  overflow: scroll;
}
.circle-marker{
  width: 52px;
  height: 52px;
  background-color: #2175e3;
  box-shadow: 0px 4px 8px 0px rgba(33, 117, 227, 0.51);
  border-radius: 50%;
  color: #fff;
  text-align: center;
  padding-top: 15px;
  font-size: 11px;
      position: relative;
    z-index: 100;
}
</style>
