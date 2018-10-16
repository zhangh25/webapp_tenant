<template>
  <div class="wish">
    <div class="top">
      <div class="title">心愿单  <div class="record" @click="$router.push('/record')">预约记录 <icon-svg icon-class="back" class="icon"></icon-svg></div></div>
      <div class="label" v-if="num">已收藏{{num}}套房源</div>
    </div>
    <div ref="wrapper" class="wrapper">
    <Loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
      <div class="load" v-if="loading&&list.length===0">
        <Spinner class="spi" type="fading-circle" :size="20"></Spinner><span>加载中...</span>
      </div>
      <template v-else>
        <div class="list-item" v-for="(item, idx) in list" :key="item.roomId" @click="$router.push(`/roomDetails/${item.roomId}`)">
          <div class="img"><img :src="item.imageUrl" alt=""><icon-svg @click.native.stop="storeRoom(item, idx)" :icon-class="item.favorite ? 'heart0' : 'heart1'" :class="{empty: !item.favorite}" class="icon"></icon-svg></div>
          <div class="addr">
            <span class="address">{{item.areaName}}-{{item.roomTitle}}</span>
            <span class="price">{{parseInt(item.rent)}}元/月</span>
          </div>
          <div class="describe">{{item.typeName}}</div>
          <div class="describe address-detail"><i class="icon-addr"></i></div>
        </div>
        <div class="null" v-if="list.length>4&&allLoaded">无更多数据了</div>
      </template>
    </Loadmore>
    </div>
    <div v-if="!loading&&list.length===0" class="null">
        <img src="./img/shouchang.png" width="150" style="margin-top: 40px">
      </div>
    <tabbar></tabbar>
  </div>
</template>

<script>
import {Loadmore, Spinner} from 'mint-ui'
import tabbar from '@/components/tabbar/index'
import {queryUsersFavorite, delUsersFavorite, saveUsersFavorite} from '@/api/house'
export default {
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
    this.getList()
  },
  methods: {
    getList () {
      this.loading = true
      queryUsersFavorite(this.curPage, this.pages).then(res => {
        this.loading = false
        if (res.code === 1) {
          this.num = res.data.countNum ? res.data.countNum : 0
          this.list = res.data.usersFavorite
          for (let item of this.list) {
            item.favorite = true
          }
          console.log(this.list)
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
    tabbar, Loadmore, Spinner
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.wish {
  // background-color: #fff;
  .top{
    padding: 44px 15px 15px 15px;
    background-color: #fff;
    .title{
      font-size: 20px;
      line-height: 22px;
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
    background-color: #fff;
    .load {
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
  border-top: 1px solid #f1f1f1;
  .img{
    height: 175px;
    background-color: #f1f1f1;
    overflow: hidden;
    position: relative;
    .icon{
      position: absolute;
      display: inline-block;
      top: 15px;
      right: 15px;
      font-size: 24px;
      color: @pink;
      &.empty {
        color: #353535;
      }
    }
    img{
      width: 100%;
    }
  }
  .addr {
    font-size: 14px;
    padding-top: 10px;
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
}
.null{
      text-align: center;
    }
</style>
