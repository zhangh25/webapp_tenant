<template>
  <div class="map">
    <div class="header">
      <div class="bg"></div>
      <div class="left" @click="$router.push('/location')">深圳市 <icon-svg icon-class="back" class="icon"></icon-svg></div>
      <div class="center">
        <span :class="{active: isArea}" @click="toggleWay(true)">区域</span>
        <i class="line"></i>
        <span :class="{active: !isArea}" @click="toggleWay(false)">地铁</span>
      </div>
      <div class="right" @click="searchVisible=true">
        <icon-svg icon-class="search"></icon-svg>
      </div>
    </div>
    <div class="map">
      <el-amap vid="amap" class="" ref="map" :center="center" :zoom="zoom" :plugin="plugin" :zooms="zooms" :events="events">
        <el-amap-marker v-for="marker in topMarkers" :key="marker.id" :position="marker.position" :vid="marker.id" :events="marker.events" class="csmarker" v-if="level!==3||marker.countNum">
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
        <el-amap-marker :position="localCircles.center" v-if="localShow" class="csmarker">
          <i class="local-icon"></i>
        </el-amap-marker>
      </el-amap>
      <div class="btns">
        <div class="btn icon-filter" @click="showFilter=true"></div>
        <div class="btn icon-list" @click="showList"></div>
        <div class="btn icon-location" @click="location"></div>
      </div>
    </div>
    <div class="filter-model" v-show="showFilter">
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
      <div class="top border-1px">
        <div class="name">{{stationName}}  <span class="num">{{stationNum}}</span>套</div>
        <div class="addr">{{adres}}</div>
      </div>

      <houseslist :filterData="filterData" height="333" :firstaddr.sync="adres" ref="list"></houseslist>
    </Popup>
    <mypop v-model="searchVisible" :header="false">
      <searchPage @csearch="search"></searchPage>
    </mypop>
    <!-- <guide :tiyan="experience"></guide> -->
    <tabbar></tabbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {patSubwayLineQueryRoom, patQueryRoom, patSubwayStationQueryRoom} from '@/api/house'
// import {getAppVersion} from '@/api/user'
import {Popup, Indicator, Toast} from 'mint-ui'
import mypop from '@/components/myPopup'
import tabbar from '@/components/tabbar/index'
import csfilter from '../houses/moreFilter'
import houseslist from '../houses/houseslist'
import guide from './guide'
// import searchPage from './search'
import searchPage from 'components/search'
import { AMapManager } from 'vue-amap'
let amapManager = new AMapManager()
export default {
  computed: {
    ...mapGetters(['isfirst'])
  },
  data () {
    let self = this
    let startPosition = []
    return {
      zoom: 12,
      toast: null,
      zooms: [9, 20],
      amapManager,
      center: [114.02597366, 22.54605355],
      localVisible: false,
      searchVisible: false,
      stationName: '',
      stationNum: 0,
      adres: '',
      city: '深圳',
      cityId: '440300',
      isScale: false,
      events: {
        // zoomchange: (aa) => {
        //   // console.log(this.zoom)
        //   // // map.getZoom()
        //   // // console.log(this.$refs.map.$$getInstance().getZoom())
        //   // this.zoom = this.$refs.map.$$getInstance().getZoom()
        //   // console.log(aa, 'ddd')
        // },
        zoomend: () => {
          let zoom = this.$refs.map.$$getInstance().getZoom()
          this.setRegionLevel(zoom)
          // console.log(this.zoom)
          if (this.isScale) {
            this.isScale = false
          } else {
            let center = this.$refs.map.$$getCenter()
            console.log('zoomed')
            this.filterData.longitude = center[0]
            this.filterData.latitude = center[1]
            this.findHouses()
          }
        },
        touchstart: () => {
          // console.log('触摸开始')
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
        cityId: 440300,
        areaId: null,
        lineId: null,
        stationId: null,
        regionLevel: 'area',
        longitude: null, // 经度
        latitude: null, // 纬度
        content: null, // 搜索内容
        hotTagResp: null, // 房间特色,多选拼成id,如:12,343,454
        configResp: null, // 房间配置
        maxRent: null, // 最大租金
        minRent: null, // 最小租金
        menuResp: null, // 房产类型
        orderType: null, // 排序类型
        orientation: null // 朝向
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
    // getAppVersion().then(res => {
    //   console.log(res)
    // })
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
    experience () {
      console.log('qwdd')
    },
    search (val) {
      // this.initIds()
      this.filterData.content = val
      this.findHouses()
      // console.log(val, 'ubbbb')
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
          this._patQueryRoom()
          // this._patSubwayStationQueryRoom()
        }
      }
    },
    zoomchange (ss) {
      console.log(ss)
    },
    location () {
      console.log('333')
      if (this.Geolocation) {
        Indicator.open('正在定位...')
        this.Geolocation.getCurrentPosition((status, result) => {
          Indicator.close()
          // console.log(status, result)
          if (result && result.position) {
            this.localShow = true
            this.localMaker.position = this.localCircles.center = [result.position.lng, result.position.lat]
            this.filterData.longitude = result.position.lng
            this.filterData.latitude = result.position.lat
            this.setRegionLevel(16)
          } else {
            if (this.toast) this.toast.close()
            this.toast = Toast({message: '定位失败', position: 'top'})
          }
        })
      }
    },
    /* 筛选确定 */
    confirm (data) {
      // console.log(this.filterData)
      console.log(data)
      // if ()
      // this.showModel = false
      // this.hideModel()
      this.showFilter = false
      if (data.rent.id) {
        this.filterData.maxRent = data.rent.max
        this.filterData.minRent = data.rent.min
      }
      this.filterData.configResp = data.configResp.map(item => item.id).join(',')
      this.filterData.hotTagResp = data.hotTagResp.map(item => item.id).join(',')
      let houseType = data.houseType.map(item => item.id)
      this.filterData.houseType = houseType.length > 0 ? houseType : null
      this.filterData.menuResp = data.menuResp.map(item => item.id).join(',')
      this.filterData.orientation = data.orientation.map(item => item.id).join(',')
      // this.$refs.list.getHouseListFrist(this.queryData)
      // console.log(this.filterData)
      this.findHouses()
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
      // console.log(data, data.length, 'alert')
      let num = 0
      if (data.length > 0) {
        num = data.map(item => +item.countNum).reduce((temp, next) => temp + next)
      }
      if (this.toast) this.toast.close()
      this.toast = Toast({
        message: `找到${num}房源`,
        position: 'top'
      })
    },
    /* 显示列表 */
    showList () {
      // if (this.level === 3) {
      //   this.listShow = true
      //   this.$refs.list.getHouseListFrist(this.filterData)
      // } else {
      this.$store.dispatch('setCondition', this.filterData)
      this.$router.push('/list')
      // }
    },
    /* 区域，街道等id设为null */
    initIds () {
      this.filterData.areaId = null
      this.filterData.streetId = null
      this.filterData.lineId = null
      this.filterData.stationId = null
      this.filterData.towerId = null
    },
    /* 设置区域级别 */
    setRegionLevel (zoom) {
      if (zoom < 14) {
        this.localShow = false
        this.filterData.regionLevel = 'area'
        this.filterData.platLevel = 12
        this.level = 1
        // this.zoom = 12
      } else if (zoom < 16) {
        this.localShow = false
        this.level = 2
        this.filterData.platLevel = 14
        if (this.isArea) {
          this.filterData.regionLevel = 'street'
        } else {
          this.filterData.regionLevel = 'station'
        }
      } else {
        this.level = 3
        this.filterData.regionLevel = 'tower'
        this.filterData.platLevel = 16
      }
      this.zoom = zoom
      this.findHouses()
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
      console.log(this.level, 'level')
      if (this.level > 1 && data.length === 2) {
        if (this.level === 2 && distance < 200) {
          return
        }
        if (this.level === 3 && distance < 200) {
          return
        }
        // this.initIds()
        this.filterData.streetId = null
        this.filterData.lineId = null
        this.setLnglat(data[0], data[1])
        this.findHouses()
      }
    },
    areaClick (data) {
      // console.log(data)
      this.setLnglat(null, null)
      if (this.level === 1) {
        // this.level++ // level=2 根据区或地铁线路找街道或地铁站点
        this.isScale = true
        this.setRegionLevel(14)
        if (this.isArea) {
          this.filterData.areaId = data.id
        } else {
          this.filterData.lineId = data.id
        }
      } else if (this.level === 2) {
        // this.level++ //  level=3 根据街道或地铁站点找小区
        this.isScale = true
        this.setRegionLevel(16)
        if (this.isArea) {
          this.filterData.streetId = data.id
        } else {
          this.filtersData.stationId = data.id
          // this.filterData.regionLevel = 'station'
          console.log('333')
        }
      } else if (this.level === 3) { // 根据小区搜索列表
        // this.level++ // 4
        // if ()
        // console.log('sclick-----', data)
        this.stationName = data.name
        this.stationNum = data.countNum
        this.filterData.towerId = data.id
        // this.setLnglat(data.longitude, data.latitude)
        if (this.stationNum > 0) {
          this.showList()
        }
      }
    },
    /*  地铁找房 */
    _patSubwayLineQueryRoom () {
      patSubwayLineQueryRoom(this.filterData).then(res => {
        // console.log(res)
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
          if (res.data.length > 0) {
            // this.setCenterByData(res.data)
          }
        }
      })
    },
    /* 区域找房 */
    _patQueryRoom () {
      patQueryRoom(this.filterData).then(res => {
        // console.log(res)
        if (res.code === 1) {
          // this.topMarkers = res.data
          this.setTopMarker(res.data)
          this.csAlert(res.data)
          if (res.data.length > 0 && this.level !== 1 && this.filterData.longitude === null) {
            // console.log('center')
            // this.center = [res.data[0].longitude, res.data[0].latitude]
            // this.setCenterByData(res.data)
            // this.center
          }
        }
      })
    },
    setCenterByData (data) {
      if (this.localShow) return
      for (let item of data) {
        if (item.countNum > 0) {
          this.center = [item.longitude, item.latitude]
          break
        }
      }
    }
  },
  beforeDestroy () {
    if (this.toast) this.toast.close()
    console.log('beforeDestroy')
  },
  components: {
    mypop,
    tabbar,
    csfilter,
    Popup,
    houseslist,
    searchPage,
    guide
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.header{
  position: relative;
  display: flex;
  height: 44px;
  line-height: 44px;
  padding: 0 15px;
  font-size: 16px;
  // color: #fff;
  // background-color: #fff;
  .bg{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #fff;
    // opacity: 0.1;
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
    .line {
      display: inline-block;
      width: 1px;
      height: 8px;
      background-color: #a0a0a0;
      margin: 0 10px;
      vertical-align: middle;
      position: relative;
      top: -2px;
    }
  }
  .left, .right{

    flex: 0 0 60px;
    z-index: 11;
    font-size: 14px;
  }
  .left {
    position: relative;
    .icon {
      position: absolute;
    transform: rotate(-90deg);
    right: -4px;
    top: 15px;
    }
  }
  .right{
    text-align: right;
    font-size: 15px;
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
    bottom: 70px;
    .btn{
      width: 44px;
      height: 44px;
      background-size: contain;
      &+.btn{
        margin-top: 30px;
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
  .top {
    padding: 15px;
    .border-1px;
    .addr {
      color: @gray
    }
    .name {
      font-size: 15px;
      .num{
        color: @pink;
      }
    }
  }
}
.circle-marker{
  width: 52px;
  height: 52px;
  background-color: #2175e3;
  // box-shadow: 0px 4px 8px 0px rgba(33, 117, 227, 0.51);
  border-radius: 50%;
  color: #fff;
  text-align: center;
  padding-top: 15px;
  font-size: 11px;
  position: relative;
  z-index: 100;
}
.local-icon{
  display: inline-block;
  width: 21px;
  height: 41px;
  background-image: url(./icon/icon_weizhi@2x.png);
  background-size: contain;
}
</style>
