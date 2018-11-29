<template>
  <div class="home">
    <div class="top">
      <Swipe :auto="4000" class="swipe">
        <SwipeItem v-for="item in bannarList" :key="item.id" class="swipe-item">
          <img :src="`${item.imageurl}?imageMogr2/auto-orient`">
        </SwipeItem>
        <!-- <SwipeItem style="background: #00ff00">2</SwipeItem>
        <SwipeItem style="background: #0000ff">3</SwipeItem> -->
      </Swipe>
      <div class="header" :class="{sc: !istop}">
        <div class="city" @click="$router.replace('/location')"><span class="icon">{{city}}</span> <i class=""></i> </div>
        <span class="input" @click="showSearch"><icon-svg class="icon" icon-class="search"></icon-svg> 输入你想住的区域或小区</span>
      </div>
    </div>
    <div class="bar border-1px">
      <div class="bar-item" v-for="(item, i) in roomMenuRespList" :key="item.id" @click="menuRespClick(item)" v-if="i<4">
        <img :src="item.url" width="40" height="40"><br> <span class="title">{{item.name}}</span>
      </div>
    </div>
    {{code}}
    <div class="house-title border-1px">
      <span style="font-weight:bold">精选房源</span> <div class="more" @click="listMore">查看更多<i class="icon-more"></i></div>
    </div>
      <div class="list-item border-1px" v-for="item in roomList" :key="item.roomId" @click="houseDeatils(item.roomId)">
        <div class="img">
          <img :src="`${item.imageUrl}?imageMogr2/auto-orient`" alt="">
        </div>
        <div class="addr">
          <span class="address" v-if="item.roomTitle">{{item.areaName}}-{{item.roomTitle}}</span>
          <span class="address" v-else>{{item.areaName}}-{{item.name}}-{{item.buildName}}</span>
          <span class="price"><span class="num">{{parseInt(item.rent)}}</span>元/月</span>
        </div>
        <div class="describe">{{item.typeName}}-{{item.roomArea}}㎡</div>
        <div class="describe address-detail"><i class="icon-addr"></i><template v-if="item.metroIfo">{{item.metroIfo}}</template><template v-else>{{item.streetName}}</template></div>
      </div>
      <!-- {{isApp}} -->
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
    <mypop v-model="searchVisible" :header="false">
      <searchPage @csearch="search"></searchPage>
    </mypop>
    <!-- <mypop v-model="listVisible" class="list">
      <span slot="title" class="input">输入你想住的区域或小区</span>
      <list></list>
    </mypop> -->
    <tabbar></tabbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Swipe, SwipeItem, Cell, Popup } from 'mint-ui'
import houseDetails from '../houses/details.vue'
import {homeList} from '@/api/home'
import mypop from '@/components/myPopup'
import searchPage from 'components/search'
import list from '@/components/houseList/list'
import tabbar from '@/components/tabbar/index'
export default {
  computed: {
    ...mapGetters(['isApp'])
  },
  data () {
    return {
      detailsPopup: false,
      bannarList: [],
      roomList: [],
      roomMenuRespList: [],
      city: '深圳',
      searchVisible: false,
      istop: true,
      code: ''
      // listVisible: false
    }
  },

  created () {
    this._getHomeList()
    // alert(this.isWeiXin())
    // this._getCode()
  },
  mounted () {
    window.onscroll = (ev) => {
      // console.log('2123----------', window.pageYOffset)
      if (window.pageYOffset < 10) {
        this.istop = true
      } else {
        this.istop = false
      }
    }
    console.log(this.$route)
  },
  methods: {
    houseDeatils (id) {
      // this.detailsPopup = true
      this.$router.push(`/roomDetails/${id}`)
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
    search (val) {
      // console.log(val)
      // this.$router.push({
      //   path: '/list',
      //   query: {
      //     content: val
      //   }
      // })
    },
    showSearch () {
      // this.searchVisible = true
      this.$router.push('/search')
    },
    listMore () {
      this.$store.dispatch('setCondition', {})
      this.$router.push('/list')
    },
    menuRespClick (item) {
      this.$store.dispatch('setCondition', {menuResp: item.id})
      this.$router.push({
        path: '/list'
        // query: {
        //   menuResp: item.id
        // }
      })
    },
    isWeiXin () {
      var ua = window.navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) === 'micromessenger') {
        return true
      } else {
        return false
      }
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
      height: 100%;
    object-fit: cover;
    }
  }
}
.top{
  position: relative;
  .header {
    position: fixed;
    width: 100%;
    // margin-top: 6px;
    padding: 7px 0;
    text-align: center;
    top: 0;
    transition: all .3s;
    z-index: 2;
    border-bottom: 1px solid transparent;
    // .border-1px(transparent);
    &.sc {
      // .border-1px;
      border-color: #f1f1f1;
      background-color: #fff ;
      .city {
        color: #484848;
        .icon:after {
          border-top-color: #484848;
        }
      }
    }
    .input{
      display: inline-block;
      color: #484848;
      width: 283px;
      height: 30px;
      line-height: 30px;
      border-radius: 15px;
      background-color: #ececec;
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
  .border-1px;
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
  padding: 10px 15px 0 15px;
  font-size: 18px;
  color: #222222;
  // border-top: 1px solid #f1f1f1;
  // border-bottom: 1px solid #f1f1f1;
  // .border-1px;
  background-color: #fff;
  margin-top: 10px;
  .more {
    float: right;
    color: #848484;
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
  // border-bottom: 1px solid #f1f1f1;
  .border-1px;
  .img{
    height: 175px;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
    object-fit: cover;
    }
  }
  .addr {
    font-size: 14px;
    padding-top: 10px;
    .address{
      color: #353535;
      font-weight: bold;
    }
    .price{
      float: right;
      color: #f42574;
      font-size: 13px;
      .num {
        font-size: 15px;
        font-weight: bold;
      }
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
