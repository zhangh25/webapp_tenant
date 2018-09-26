<template>
  <div>
    <csheader></csheader>
    <div class="bar">
      <div class="item" v-for="(item, idx) in barTitile" :class="{active: idx===openType}" :key="idx" @click="open(idx)">{{item}}<icon-svg class="icon" icon-class="triangle"></icon-svg></div>
      <div class="model">
        <div class="address" v-if="openType===0">
          <ul class="one"><li v-for="(item, idx) in addrTypes" :key="idx" :class="{active: addrIdx=== idx}" @click="addrClick(idx)"><span class="txt">{{item}}</span></li></ul>
          <ul class="two">
            <li v-if="twoArr.length>0">不限</li>
            <li v-for="item in twoArr" :key="item.id" :class="{active: twoId===item.id}" @click="twoClick(item)">{{item.name}}</li>
          </ul>
          <ul class="three" :class="{active: threeArr.length>0}">
            <li v-if="threeArr.length>0">不限</li>
            <li v-for="item in threeArr" :key="item.id" :class="{active: threeId===item.id}" @click="threeClick(item)">{{item.name}}</li>
          </ul>
        </div>
        <ul class="sort" v-if="openType===1">
          <li v-for="item in sortType" :key="item.id">{{item.name}}</li>
        </ul>
        <div class="morefilter" v-if="openType===2">
          <!-- <div>帅选</div> -->
          <div class="list">
            <div class="title">房源户型</div>
            <div class="item"></div>
          </div>
          <div class="list">
            <div class="title">房源类型</div>
            <div class="item"></div>
          </div>
          <div class="list">
            <div class="title">朝向</div>
            <div class="item"></div>
          </div>
          <div class="list">
            <div class="title">房屋配置</div>
            <div class="item"></div>
          </div>
          <div class="list">
            <div class="title">房源特色</div>
            <div class="item"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="model-bg"></div>
    <!-- <Spinner></Spinner> -->
  </div>
</template>

<script>
import {queryRoomList, queryRegion, querySubwayLine, filterCondition} from '@/api/house'
import { InfiniteScroll, Spinner } from 'mint-ui'
import csheader from '@/components/header'
export default {
  data () {
    return {
      queryData: {},
      cityId: '440300',
      loading: false,
      list: [],
      addrTypes: ['区域', '地铁'],
      addrIdx: 0,
      barTitile: ['位置', '排序', '更多筛选'],
      openType: 0,
      twoArr: [],
      threeArr: [],
      sortType: [{id: 1, name: '最新发布'}, {id: 2, name: '默认排序'}, {id: 3, name: '价格从低到高'}, {id: 4, name: '价格从高到低'}],
      twoId: -11,
      threeId: -1,
      // addrType: []
      area: [], // 区
      subway: [], // 地铁
      configRespList: [], // 房间配置
      hotTagRespList: [], // 房间特色
      houseTypeList: [], // 户型
      menuRespList: [], // 房产类型
      orientationList: [] // 朝向
    }
  },
  created () {
    this._queryArea()
    this._querySubwayLine()
    this._filterCondition()
  },
  methods: {
    threeClick (data) {
      this.threeId = data.id
    },
    twoClick (data) {
      this.twoId = data.id
      if (this.addrIdx === 0) {
        // this.threeArr = data.
        this.queryStreet(data.id)
      } else if (this.addrIdx === 1) {
        this.threeArr = data.subwayStation
      }
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
    _getHouseList () {
      queryRoomList(this.queryData).then(res => {
        // console.log(res)
        if (res.code === 1) {
          this.list = res.data
        }
      })
    },
    loadMore () {},
    open (val) {
      this.openType = val
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
    csheader, InfiniteScroll, Spinner
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
    .title {
      font-size: 14px;
      text-align: center;
      line-height: 24px;
    }
  }
}
</style>
