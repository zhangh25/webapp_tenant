<template>
  <div class="wish">
    <div class="top border-1px" :class="{border: list.length>0}">
      <div class="title"><span class="tt">心愿单</span>  <div class="record" @click="goRecord">预约记录 <icon-svg icon-class="back" class="icon"></icon-svg></div></div>
      <div class="label">已收藏{{list.length}}套房源</div>
    </div>
    <div class="content">
      <div ref="wrapper" class="wrapper">
      <Loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
        <div class="load" v-if="loading&&list.length===0&&curPage==1">
          <Spinner class="spi" type="fading-circle" :size="20"></Spinner><span>加载中...</span>
        </div>

        <template v-else>
          <div class="list-item border-1px" v-for="(item, idx) in list" :key="item.roomId" @click="goDetail(item)" >
            <icon-svg v-if="item.status != 1" @click.native.stop="storeRoom(item, idx)" icon-class="closeCircle" class="icon"></icon-svg>
            <div :class="{gray: item.status != 1}">
              <div class="img"><img :src="`${item.imageUrl}?imageMogr2/auto-orient`" alt="">
              <icon-svg v-if="item.status == 1" @click.native.stop="storeRoom(item, idx)" :icon-class="item.favorite ? 'heart0' : 'heart1'" :class="{empty: !item.favorite}" class="icon"></icon-svg>
              <!-- <icon-svg @click.native.stop="storeRoom(item, idx)" icon-class="closeCircle" :class="{empty: !item.favorite}" class="icon"></icon-svg> -->
              </div>
              <div class="addr">
                <span class="address">{{item.areaName}}-<template v-if="item.roomTitle">{{item.roomTitle}}</template><template v-else>{{item.name}}-{{item.buildName}}</template></span>
                <span class="price"><span class="num">{{parseInt(item.rent)}}</span>元/月</span>
              </div>
              <div class="describe">{{item.typeName}}</div>
              <div class="describe address-detail"><i class="icon-addr"></i><template v-if="item.metroIfo">{{item.metroIfo}}</template><template v-else>{{item.streetName}}</template><div class="invalid" v-if="item.status != 1">已失效</div></div>
            </div>
          </div>
          <div class="null" v-if="list.length>4&&allLoaded">已全部加载完毕</div>
        </template>
      </Loadmore>
      </div>
      <!-- <div v-if="!loading&&list.length===0" class="null">
        <img src="./img/shouchang.png" width="150">
      </div> -->
      <nodata v-if="!loading&&list.length===0" imgSrc="wuxinyuandan" text="暂无心愿单" bottom="88"></nodata>
    </div>
    <tabbar></tabbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {Loadmore, Spinner} from 'mint-ui'
import tabbar from '@/components/tabbar/index'
import {queryUsersFavorite, delUsersFavorite, saveUsersFavorite} from '@/api/house'
import nodata from 'components/nodata/index'
export default {
  computed: {
    ...mapGetters(['token'])
  },
  data () {
    return {
      num: 0,
      curPage: 1,
      pages: 10,
      list: [],
      bottomStatus: null,
      allLoaded: false,
      loading: false,
      wrapperHeight: 0,
      storing: false
    }
  },
  created () {},
  mounted () {
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
    // this.getList()
  },
  methods: {
    getList () {
      if (!this.token) return
      this.loading = true
      queryUsersFavorite(this.curPage, this.pages).then(res => {
        this.loading = false
        if (res.code === 1) {
          this.num = res.data.countNum ? res.data.countNum : 0
          // this.list = res.data.usersFavorite
          for (let item of res.data.usersFavorite) {
            item.favorite = true
            this.list.push(item)
          }
          // console.log(this.list)
          this.curPage++
          if (this.list.length < this.pages) {
            this.allLoaded = true
          }
        } else {
          this.allLoaded = true
        }
      }, err => {
        console.log(err, 'list timeoutt')
        this.loading = false
        this.allLoaded = true
      })
    },
    handleBottomChange (status) {
      this.bottomStatus = status
    },
    loadBottom () {
      this.getList()
    },
    goDetail (item) {
      if (item.status === 1) {
        this.$router.push(`/roomDetails/${item.roomId}`)
      }
    },
    goRecord () {
      if (this.token) {
        this.$router.push('/record')
      } else {
        this.$store.dispatch('setPath', '/record')
        this.$router.push('/login')
      }
    },
    storeRoom (item, idx) {
      if (this.storing) return
      console.log(item.favorite)
      this.storing = true
      if (item.favorite) {
        delUsersFavorite(item.roomId).then(res => {
          // console.log(res)
          if (res.code === 1) {
            console.log(res)
            this.$store.dispatch('delCollect', item.roomId)
            item.favorite = false
            // item.rent = 1
            // this.$set(this.list, idx, item)
            this.list.splice(idx, 1)
          }
          this.storing = false
        })
      } else {
        saveUsersFavorite(item.roomId).then(res => {
          if (res.code === 1) {
            console.log(res)
            this.$store.dispatch('addCollect', item.roomId)
            item.favorite = true
            this.$set(this.list, idx, item)
            // item.rent = 2
          }
          this.storing = false
        })
      }
      // item.no = !item.no
    }
  },
  components: {
    tabbar, Loadmore, Spinner, nodata
  }
}
</script>

<style lang="less">
@import '../../styles/mixin.less';
.wish {
  // background-color: #fff;
  .content{
    height: calc(100vh - 124px - 49px);
    overflow: scroll;
    background-color: #fff;
  }
  .top{
    padding: 44px 15px 15px 15px;
    background-color: #fff;

    &.border{
      .border-1px;
    }
    .title{

      line-height: 22px;
      .tt {
        font-size: 30px;
        // font-weight: bold;
      }
      .record {
        float: right;
        font-size: 16px;
        .icon{
          transform: rotate(180deg)
        }
      }
    }
    .label{
      font-size: 16px;
      color: @gray;
      padding-top: 15px;
    }
  }
  .wrapper {
    // min-height: 150px;
    // background-color: #fff;
    .load {
      display: block;
      width: 100%;
      text-align: center;
      margin-top: 20px;
      line-height: 20px;
      // color: @gray;
      .spi{
        display: inline-block;
        vertical-align: top;
        margin-right: 8px;
      }
    }

  }
  .list-item{
  background-color: #fff;
  padding: 15px;
  // border-top: 1px solid #f1f1f1;
  .border-1px;
  .gray {
    opacity: .5;
  }
  .icon{
      position: absolute;
      display: inline-block;
      top: 20px;
      right: 20px;
      font-size: 24px;
      color: @pink;
      z-index: 1;
      &.empty {
        color: #353535;
      }
    }
  .img{
    height: 175px;
    background-color: #f1f1f1;
    overflow: hidden;
    // position: relative;

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
    .invalid {
      float: right;
      border: 4px;
      background-color: #ccc;
      padding: 0 4px;
      border-radius: 3px;
    }
  }
}
}
.icon-addr{
  display: inline-block;
  width: 9px;
  height: 12px;
  background-image: url(../home/icon/icon_weizhi@2x.png);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 4px;
  position: relative;
  top: 1px;
}
.null{
      height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    }
</style>
