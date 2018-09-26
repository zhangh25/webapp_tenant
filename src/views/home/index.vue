<template>
  <div class="home">
    <div class="top">
      <Swipe :auto="4000" class="swipe">
        <SwipeItem v-for="item in bannarList" :key="item.id" class="swipe-item">
          <img :src="item.imageurl">
        </SwipeItem>
        <!-- <SwipeItem style="background: #00ff00">2</SwipeItem>
        <SwipeItem style="background: #0000ff">3</SwipeItem> -->
      </Swipe>
      <div class="header">
        <div class="city"><span class="icon">{{city}}</span> <i class=""></i> </div>
        <span class="input" @click="showSearch"><i class="icon-search"></i> 输入你想住的区域或小区</span>
      </div>
    </div>
    <div class="bar">
      <div class="bar-item" v-for="item in roomMenuRespList" :key="item.id">
        <img :src="item.url" width="40" height="40"><br> <span class="title">{{item.name}}</span>
      </div>
    </div>
    <div class="house-title">
      精选房源 <div class="more" @click="listMore">查看更多<i class="icon-more"></i></div>
    </div>
      <div class="list-item" v-for="item in roomList" :key="item.roomId" @click="houseDeatils">
        <div class="img"></div>
        <div class="addr">
          <span class="address">{{item.roomTitle}}</span>
          <span class="price">{{parseInt(item.rent)}}元/月</span>
        </div>
        <div class="describe">{{item.typeName}}</div>
        <div class="describe address-detail"><i class="icon-addr"></i></div>
      </div>
      <!-- <div class="list-item">
        <div class="img"></div>
        <div class="addr">
          <span class="address">福田区-待定</span>
          <span class="price">2000元/月</span>
        </div>
        <div class="describe">1室0厅1卫-20.0㎡</div>
        <div class="describe address-detail"><i class="icon-addr"></i>距7号线（西丽线）沙尾584米，步行约6分钟</div>
      </div> -->
    <!-- <Cell><Cell> -->
    <!-- <Popup v-model="detailsPopup" position="right" class="left-pop" lockScroll="true">
      <house-details></house-details>
    </Popup> -->
    <mypop v-model="detailsPopup">
      <house-details></house-details>
    </mypop>
    <mypop v-model="searchVisible">
      <searchPage></searchPage>
    </mypop>
    <!-- <mypop v-model="listVisible" class="list">
      <span slot="title" class="input">输入你想住的区域或小区</span>
      <list></list>
    </mypop> -->
    <tabbar></tabbar>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Cell, Popup } from 'mint-ui'
import houseDetails from '../houses/details.vue'
import {homeList} from '@/api/home'
import mypop from '@/components/myPopup'
import searchPage from './search'
import list from '@/components/houseList/list'
import tabbar from '@/components/tabbar/index'
export default {
  data () {
    return {
      detailsPopup: false,
      bannarList: [],
      roomList: [],
      roomMenuRespList: [],
      city: '深圳',
      searchVisible: false
      // listVisible: false
    }
  },

  created () {
    this._getHomeList()
  },
  methods: {
    houseDeatils () {
      this.detailsPopup = true
    },
    _getHomeList () {
      homeList().then(res => {
        console.log(res)
        if (res.code === 1) {
          this.bannarList = res.data.bannerlist
          this.roomList = res.data.roomList
          this.roomMenuRespList = res.data.roomMenuRespList
        }
      })
    },
    showSearch () {
      this.searchVisible = true
    },
    listMore () {
      this.$router.push('./list')
    }
  },
  components: {
    Swipe, SwipeItem, Cell, Popup, houseDetails, mypop, searchPage, list, tabbar
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.home{
  padding-bottom: 60px;
}
.swipe{
  height: 200px;
  .swipe-item{
    overflow: hidden;
    img{
      width: 100%;
    }
  }
}
.top{
  position: relative;
  .header {
    position: absolute;
    width: 100%;
    margin-top: 6px;
    text-align: center;
    top: 0;
    .input{
      display: inline-block;
      color: #c3c3c3;
      width: 283px;
      height: 30px;
      line-height: 30px;
      border-radius: 15px;
      background-color: #fff;
      font-size: 12px;
      .icon-search{
        display: inline-block;
        width: 15px;
        height: 15px;
        background-image: url(./icon/nav_searchfor@2x.png);
        background-size: contain;
        vertical-align: middle;
        position: relative;
        top:-2px;
      }
    }
    .city {
      float: left;
      padding-left: 10px;
      font-size: 14px;
      color: #fff;
      line-height: 30px;
      .icon:after {
        content:" ";
        display:inline-block;
        width: 0;
        height: 0;
        margin-left: 6px;
        border-top: 6px solid #fff;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        margin-bottom: 1px;
      }
    }
  }
}
// .pop{}
.bar{
  display: flex;
  background-color: #fff;
  margin-top: 10px;
  padding: 32px 0;
  .bar-item{
    flex: 1;
    text-align: center;
    .title{
      display: inline-block;
      color: #353535;
      margin-top: 18px;

    }
  }
}
.house-title{
  padding: 10px 15px;
  font-size: 18px;
  color: #222222;
  border-top: 1px solid #f1f1f1;
  border-bottom: 1px solid #f1f1f1;
  .more {
    float: right;
    color: @themeColor;
    font-size: 12px;
    line-height: 22px;
  }
}
// .list{
//   border-top: 1px solid #f1f1f1;
// }
.list-item{
  background-color: #fff;
  padding: 15px;
  border-bottom: 1px solid #f1f1f1;
  .img{
    height: 175px;
    overflow: hidden;
    img{
      width: 100%;
    }
  }
  .addr {
    font-size: 14px;
    // padding-bottom: 10px;
    .address{
      color: #353535;
    }
    .price{
      float: right;
      color: #f42574;
    }
  }
  .describe{
    color: @gray;
    padding-top: 10px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .address-detail{
    font-size: 12px;
    // line-height: 12px;
    vertical-align: top;
  }
}
.icon-addr{
  display: inline-block;
  width: 9px;
  height: 12px;
  background-image: url(./icon/icon_weizhi@2x.png);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 4px;
  position: relative;
  top: 1px;
}
.icon-more{
  display: inline-block;
  width: 6px;
  height: 11px;
  background-image: url(./icon/icon_fanhui@2x.png);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-left: 4px;
  vertical-align: middle;
  position: relative;
  top: -1px;
}
.list {
  .input{
    display: inline-block;
    // border: 1px solid @gray;
    font-size: 12px;
    color: @gray;
  }
}
// .left-pop{
//   position: absolute;
//   top: 0;
//   // transform: none;
//   transform: translate3d(0, 0%, 0);
// }
</style>
