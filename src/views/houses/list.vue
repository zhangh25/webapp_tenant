<template>
  <div>
    <csheader class="top"></csheader>
    <div class="bar">
      <div class="item" v-for="(item, idx) in barTitile" :class="{active: idx===openType}" :key="idx" @click="open(idx)">{{item}}<icon-svg class="icon" icon-class="triangle"></icon-svg></div>
      <div class="model" v-if="showModel">
        <div class="address" v-if="openType===0">
          <ul class="one"><li v-for="(item, idx) in addrTypes" :key="idx" :class="{active: addrIdx=== idx}" @click="addrClick(idx)"><span class="txt">{{item}}</span></li></ul>
          <ul class="two">
            <li v-if="twoArr.length>0" @click="twoUnlimited">不限</li>
            <li v-for="item in twoArr" :key="item.id" :class="{active: twoId===item.id}" @click="twoClick(item)">{{item.name}}</li>
          </ul>
          <ul class="three" :class="{active: threeArr.length>0}">
            <li v-if="threeArr.length>0" @click="threeUnlimited">不限</li>
            <li v-for="item in threeArr" :key="item.id" :class="{active: threeId===item.id}" @click="threeClick(item)">{{item.name}}</li>
          </ul>
        </div>
        <ul class="sort" v-if="openType===1">
          <li v-for="item in sortType" :key="item.id" @click="orderClick(item)" :class="{active: item.id===order.id}">{{item.name}}</li>
        </ul>
        <csfilter v-if="openType===2" v-model="filterData"></csfilter>
        <!-- <div class="morefilter" v-if="openType===2">
          <div class="box">
            <div class="list">
              <div class="title">租金</div>
              <radio class="radio-list" v-model="rent" :valueData="rentList"></radio>
            </div>
            <div class="list">
              <div class="title">房源户型</div>
              <radio class="radio-list" v-model="houseType" :valueData="houseTypeList"></radio>
            </div>
            <div class="list">
              <div class="title">房源类型</div>
              <radio class="radio-list" v-model="menuResp" :valueData="menuRespList"></radio>
            </div>
            <div class="list">
              <div class="title">朝向</div>
              <radio class="radio-list" v-model="orientation" :valueData="orientationList"></radio>
            </div>
            <div class="list">
              <div class="title">房屋配置</div>
              <radio class="radio-list" v-model="configResp" :valueData="configRespList"></radio>
            </div>
            <div class="list">
              <div class="title">房源特色</div>
              <radio class="radio-list" v-model="hotTagResp" :valueData="hotTagRespList"></radio>
            </div>
          </div>
          <div class="bottom">
            <div class="reset" @click="resetClick">重置</div>
            <div class="confirm" @click="confirm">确定</div>
          </div>
        </div> -->
      </div>
    </div>
    <div class="con-list">
      <div class="item" v-for="item in list" :key="item.roomId">
        <div class="left"><img src="" width="98"></div>
        <div class="right">
          <div class="title">{{item.roomTitle}}</div>
          <div class="dec">{{item.typeName}}</div>
          <div class="dec"></div>
          <div class="price">{{item.rent}}元/月</div>
        </div>
      </div>
    </div>
    <div class="model-bg" @click="showModel=false" v-if="showModel" :confirmFilter="confirm"></div>
    <!-- <Spinner></Spinner> -->
  </div>
</template>

<script>
import {queryRoomList, queryRegion, querySubwayLine, filterCondition, patSubwayLineQueryRoom, patQueryRoom} from '@/api/house'
import { InfiniteScroll, Spinner } from 'mint-ui'
import radio from 'components/csradio/index'
import csheader from '@/components/header'
import csfilter from './moreFilter'
export default {
  data () {
    return {
      queryData: {},
      cityId: '440300',
      loading: false,
      showModel: false,
      list: [],
      addrTypes: ['区域', '地铁'],
      addrIdx: 0,
      barTitile: ['位置', '排序', '更多筛选'],
      openType: 0,
      twoArr: [],
      twoSelect: {},
      threeSelect: {},
      threeArr: [],
      sortType: [{id: 2, name: '最新发布'}, {id: 3, name: '默认排序'}, {id: 4, name: '价格从低到高'}, {id: 5, name: '价格从高到低'}, {id: 6, name: '面积从小到大'}, {id: 7, name: '面积从大到小'}],
      order: {},
      twoId: -11,
      threeId: -1,
      // addrType: []
      area: [], // 区
      subway: [], // 地铁
      rentList: [
        {id: 1, min: 0, max: 1000, name: '≤1000元'},
        {id: 2, min: 1000, max: 1500, name: '1000-1500元'},
        {id: 3, min: 1000, max: 1500, name: '1500-2000元'},
        {id: 4, min: 1000, max: 1500, name: '2000-3000元'},
        {id: 5, min: 1000, max: 1500, name: '3000-5000元'},
        {id: 6, min: 1000, max: 1500, name: '5000-8000元'},
        {id: 7, min: 1000, max: 1500, name: '≥8000元'}
      ],
      rent: {},
      filterData: {
        rent: {},
        configResp: {},
        hotTagResp: {},
        houseType: {},
        menuResp: {},
        orientation: {}
      },
      configRespList: [], // 房间配置
      configResp: {},
      hotTagRespList: [], // 房间特色
      hotTagResp: {},
      houseTypeList: [], // 户型
      houseType: {},
      menuRespList: [], // 房产类型
      menuResp: {},
      orientationList: [], // 朝向
      orientation: {}
    }
  },
  created () {
    this._queryArea()
    this._querySubwayLine()
    this._filterCondition()
  },
  mounted () {
    let content = this.$route.query.content
    let menuResp = this.$route.query.menuResp
    this._getHouseList({
      cityId: this.cityId,
      content,
      menuResp
    })
  },
  methods: {
    /* 筛选重置 */
    resetClick () {
      this.rent = {}
      this.configResp = {}
      this.hotTagResp = {}
      this.houseType = {}
      this.menuResp = {}
      this.orientation = {}
    },
    /* 筛选确定 */
    confirm (data) {
      console.log(this.filterData)
      console.log(data)
      // if ()
      this.showModel = false
      // this._getHouseList({
      //   configResp: this.configResp.id,
      //   houseType: this.houseType.id,
      //   hotTagResp: this.hotTagResp.id,
      //   menuResp: this.menuResp.id,
      //   orientation: this.orientation.id
      // })
    },
    threeClick (data) {
      this.threeId = data.id
      this.showModel = false
      this.barTitile[0] = data.name
      this.threeSelect = data
      if (this.addrIdx === 0) {} else if (this.addrIdx === 1) {
        this._patSubwayLineQueryRoom({lineId: this.twoSelect.id, stationId: data.id})
      }
    },
    twoClick (data) {
      this.twoId = data.id
      if (this.addrIdx === 0) {
        // this.threeArr = data.
        this.queryStreet(data.id)
      } else if (this.addrIdx === 1) {
        this.threeArr = data.subwayStation
      }
      this.twoSelect = data
    },
    addrClick (idx) {
      this.addrIdx = idx
      this.threeArr = []
      if (idx === 0) {
        this.twoArr = this.area
      } else if (idx === 1) {
        this.twoArr = this.subway
      }
    },
    /* 排序点击 */
    orderClick (order) {
      this.showModel = false
      this.order = order
      this.barTitile[1] = order.name
      // this.
    },
    /* 点击区或地铁线路不限 */
    twoUnlimited () {
      this.showModel = false
      if (this.addrIdx === 0) {
        this._patQueryRoom({})
      } else if (this.addrIdx === 1) {
        this._patSubwayLineQueryRoom({})
      }
    },
    /* 具体位置不限 */
    threeUnlimited () {
      this.showModel = false
      console.log(this.twoSelect)
      if (this.addrIdx === 0) {
        this._patQueryRoom({})
      } else if (this.addrIdx === 1) {
        this._patSubwayLineQueryRoom({lineId: this.twoSelect.id})
      }
    },
    /* 查找房源列表 */
    _getHouseList (data) {
      console.log(data)
      queryRoomList(data).then(res => {
        console.log(res)
        if (res.code === 1) {
          this.list = res.data
        }
      })
    },
    /* 地铁线路找房 */
    _patSubwayLineQueryRoom (data) {
      patSubwayLineQueryRoom(data).then(res => {
        console.log(res)
        if (res.code === 1) {
          this.list = res.data
        }
      })
    },
    /* 区域找房 */
    _patQueryRoom (data) {
      patQueryRoom(data).then(res => {
        console.log(res)
        if (res.code === 1) {
          this.list = res.data
        }
      })
    },
    loadMore () {},
    open (val) {
      this.openType = val
      this.showModel = true
    },
    /* 获取区 */
    _queryArea () {
      queryRegion({pid: this.cityId, level: 3}).then(res => {
        // console.log(res)
        if (res.code === 1) {
          this.area = res.data
          if (this.addrIdx === 0) {
            this.twoArr = this.area
          }
        }
      })
    },
    /* 获取街道数据 */
    queryStreet (pid) {
      queryRegion({pid, level: 4}).then(res => {
        if (res.code === 1) {
          this.threeArr = res.data
        }
      })
    },
    /* 获取地铁数据 */
    _querySubwayLine () {
      querySubwayLine(this.cityId).then(res => {
        console.log(res)
        if (res.code === 1) {
          this.subway = res.data
        }
      })
    },
    _filterCondition () {
      filterCondition().then(res => {
        console.log(res)
        if (res.code === 1) {
          this.configRespList = res.data.configRespList
          this.hotTagRespList = res.data.hotTagRespList
          this.houseTypeList = res.data.houseTypeList
          this.menuRespList = res.data.menuRespList
          this.orientationList = res.data.orientationList
        }
      })
    }
  },
  components: {
    csheader, InfiniteScroll, Spinner, radio, csfilter
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
ul {
  padding: 0;
  margin: 0;
  li {
    list-style-type: none;
  }
}
.bar{
  position: relative;
  display: flex;
  padding: 15px 0;
  background-color: #fff;

  z-index: 10;
  >.item{
    flex: 1;
    text-align: center;
    &+.item{
      border-left: 1px solid #ccc;
    }
    .icon{
      margin-left: 4px;
    }
    &.active{
      color: @themeColor;
    }
  }
}
.model{
  position: absolute;
  width: 100%;
  top: 47px;
  left: 0;
  max-height: 400px;
  background-color: #fff;
  // overflow-y: scroll;
  border-top: 1px solid #f1f1f1;
  .address {
    display: flex;
    text-align: center;
    color: @gray;
    >ul{
      flex: 1;

      max-height: 400px;
      overflow-y: scroll;
      >li {

        padding: 15px 4px;
        &.active{
          color: @themeColor;
        }
      }
    }
    .one{
      .active .txt{
        display: inline-block;
        padding: 0 20px;
        border-left: 3px solid @themeColor;
        border-right: 3px solid transparent;
      }
    }
    .two {
      background-color: #f8f7f7;
    }
    .three{
      background-color: #f8f7f7;
      &.active {
        background-color: #eee;
      }
    }
  }
  .sort{
    text-align: center;
    li{
      padding: 15px;
      border-bottom: 1px solid #f1f1f1;
      color: @gray;
      &.active {
        color: @themeColor;
      }
    }
  }
  .morefilter {
    padding-bottom: 40px;
    .box {
      height: 340px;
      overflow-y: scroll;
    }
    .radio-list{
      padding: 10px;
    }
    .title {
      font-size: 14px;
      text-align: center;
      line-height: 24px;
      // padding: 10px;
    }
    .bottom{
      position: absolute;
      bottom: 0;
      width: 100%;
      display: flex;
      text-align: center;
      font-size: 15px;
      height: 40px;
      line-height: 40px;
      .reset{
        flex: 1;
        background-color: #f8f8f8;
      }
      .confirm{
        flex: 1;
        background-color: @themeColor;
        color: #fff;
      }
    }
  }
}
.con-list{
  >.item{
    display: flex;
    background-color: #fff;
    padding: 15px;
    // border-bottom: 1px solid #ccc;
    .border-1px(#f1f1f1);
    .left{
      flex: 0 0 117px;
    }
    .right{
      flex: 1;
      padding-left: 11px;
      .title{
        font-size: 14px;
      }
      .dec{
        color: @gray;
        font-size: 12px;
        line-height: 20px;
      }
      .price{
        color: @pink;
      }
    }
  }
}
.model-bg {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #313131;
  opacity: .3;
}
.top {
  z-index: 10;
}
</style>
