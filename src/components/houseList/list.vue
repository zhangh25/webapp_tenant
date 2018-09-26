<template>
  <div class="list">
    <div class="bar">
      <div class="item" v-for="(item, idx) in barTitile" :class="{active: idx===openType}" :key="idx" @click="open(idx)">{{item}}<icon-svg class="icon" icon-class="triangle"></icon-svg></div>
      <!-- <div class="item">{{sort}}<icon-svg class="icon" icon-class="triangle"></icon-svg></div>
      <div class="item">更多筛选<icon-svg class="icon" icon-class="triangle"></icon-svg></div> -->
    </div>
    <!-- <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50"> -->
      <div class="item" v-for="item in list" :key="item.roomId">
        <div class="left"><img src="" width="98"></div>
        <div class="right">
          <div class="title">{{item.roomTitle}}</div>
          <div class="dec">{{item.typeName}}</div>
          <div class="dec"></div>
          <div class="price">{{item.rent}}元/月</div>
        </div>
      </div>
    <!-- </div> -->
    <!-- <div class="item">
      <div class="left"><img src="" width="98"></div>
      <div class="right">
        <div class="title">南山区-心语雅园</div>
        <div class="dec">1室1厅1卫-30.0㎡</div>
        <div class="dec">1室1厅1卫-30.0㎡</div>
        <div class="price">2000元/月</div>
      </div>
    </div> -->
    <div class=""></div>
  </div>
</template>

<script>
import {queryRoomList} from '@/api/house'
import { InfiniteScroll } from 'mint-ui'
export default {
  props: {
    condition: {
      type: Object
    }
  },
  data () {
    return {
      addr: '位置',
      sort: '排序',
      queryData: {},
      loading: false,
      list: [],
      barTitile: ['位置', '排序', '更多筛选'],
      openType: 0,
      // addrType: []
      area: ['福田区', '龙华区', '宝安区'],
      metro: ['一号线', '二号线', '三号线']
    }
  },
  created () {
    this._getHouseList()
  },
  methods: {
    _getHouseList () {
      queryRoomList(this.queryData).then(res => {
        console.log(res)
        if (res.code === 1) {
          this.list = res.data
        }
      })
    },
    loadMore () {},
    open (idx) {
      this.openType = idx
    }
  },
  components: {
    InfiniteScroll
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.list{
  .bar{
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
</style>
