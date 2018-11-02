<template>
    <div class="con-list" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <Loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
        <div class="load" v-if="loading&&dataList.length===0">
          <Spinner class="spi" type="fading-circle" :size="20">ggg</Spinner><span>加载中...</span>
        </div>
        <template v-else>
          <div v-if="dataList.length>0" class="item border-1px" v-for="(item, idx) in dataList" :key="idx" @click="houseDeatil(item.roomId)">
            <div class="left"><img :src="`${item.imageUrl}?imageMogr2/auto-orient`" width="98" class='img'></div>
            <div class="right">
              <div class="title">{{item.areaName}}-{{item.roomTitle}}</div>
              <div class="dec">{{item.typeName}}-{{item.roomArea}}㎡</div>
              <div class="dec"><i class="icon-addr"></i><template v-if="item.metroIfo">{{item.metroIfo}}</template><template v-else>{{item.streetName}}</template></div>
              <div class="price"><span class="num">{{parseInt(item.rent)}}</span>元/月</div>
            </div>
          </div>
          <div class="null" v-if="dataList.length>1&&allLoaded">已经全部加载完毕</div>
        </template>
        <div v-if="!loading&&dataList.length===0" class="null">未搜到对应房源，以下是推荐房源</div>
      </Loadmore>
    </div>
    <!-- <div class="con-list">
      <div class="item" v-for="item in list" :key="item.roomId">
        <div class="left"><img src="" width="98"></div>
        <div class="right">
          <div class="title">{{item.roomTitle}}</div>
          <div class="dec">{{item.typeName}}</div>
          <div class="dec"></div>
          <div class="price">{{item.rent}}元/月</div>
        </div>
      </div>
    </div> -->
</template>

<script>
import {Loadmore, Spinner} from 'mint-ui'
import {queryRoomList} from '@/api/house'
export default {
  props: {
    filterData: {
      default: () => {},
      type: Object
    },
    firstaddr: {
      type: String,
      default: ''
    },
    height: {
      default: null,
      type: [String, Number]
    }
  },
  data () {
    return {
      fData: {
        startRow: 1,
        rows: 10
      },
      dataList: [],
      allLoaded: false,
      bottomStatus: '',
      wrapperHeight: 0,
      curpage: 1,
      loading: false,
      isFrist: true
    }
  },
  watch: {
    filterData: {
      handler (val) {
        // console.log(val)
        // Object.assign(this.fData, val)
        // console.log(this.fData)
        // this.
      },
      deep: true
    }
    // filterData (val) {
    //   console.log(val)
    //   this.fData = val
    //   this._getHouseList()
    // }
  },
  created () {
    console.log('sssas')
    // this.fData = this.filterData
    Object.assign(this.fData, this.filterData)
  },
  mounted () {
    console.log('sssas')
    if (this.height) {
      this.wrapperHeight = this.height
    } else {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
    }
    // this._getHouseList()
    this.isFrist = true
    // console.log(this.wrapperHeight)
  },
  methods: {
    handleBottomChange (status) {
      this.bottomStatus = status
    },
    loadBottom () {
      console.log('loadbottom', this.wrapperHeight)
      if (!this.loading && !this.allLoaded && !this.isFrist) {
        // console.log('ssss++++++++++', this.loading)
        this.getHouseList()
      }
      // setTimeout(() => {
      //   // let lastValue = this.list[this.list.length - 1]
      //   // if (lastValue < 40) {
      //   //   for (let i = 1; i <= 10; i++) {
      //   //     this.list.push(lastValue + i)
      //   //   }
      //   // } else {
      //   //   this.allLoaded = true 400-67px = 333
      //   // }
      //   if (this.$refs.loadmore) { this.$refs.loadmore.onBottomLoaded() }
      // }, 15000)
    },
    houseDeatil (id) {
      this.$router.push(`/roomDetails/${id}`)
    },
    getHouseListFrist (data) {
      this.dataList = []
      this.fData.startRow = 1
      this.allLoaded = false
      // console.log('ssssfit-------------')
      this.getHouseList(data)
    },
    getHouseList (data) {
      // console.log(data)
      this.loading = true
      // console.log(this.fData)
      Object.assign(this.fData, data)
      queryRoomList(this.fData).then(res => {
        if (this.$refs.loadmore) { this.$refs.loadmore.onBottomLoaded() }

        console.log(res)
        if (res.code === 1) {
          res.data.forEach(value => {
            this.dataList.push(value)
          })
          let addr = ''
          if (this.dataList.length > 0) {
            addr = this.dataList[0].metroIfo ? this.dataList[0].metroIfo : this.dataList[0].streetName
            this.$emit('update:firstaddr', addr)
          }
          if (res.data.length === this.fData.rows) {
            this.fData.startRow++
          } else {
            this.allLoaded = true
          }
          // this.dataList = [...this.dataList, ...res.data]
        } else {
          this.allLoaded = true
        }
        this.loading = false
        this.isFrist = false
      }, err => {
        console.log(err, 'list timeoutt')
        this.loading = false
        this.allLoaded = true
      })
    }
  },
  components: {
    Loadmore, Spinner
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.con-list{
  overflow: scroll;
  // border-top: 1px solid #f1f1f1;
  // .border-1px;
  .item{
    display: flex;
    background-color: #fff;
    padding: 15px;
    // border-bottom: 1px solid #ccc;
    // .border-top-1px;
    .border-1px;
    .left{
      flex: 0 0 117px;
      .img {
        height: 65px;
        object-fit: cover;
      }
    }
    .right{
      position: relative;
      flex: 1;
      padding-left: 11px;
      .title {
        font-size: 14px;
        font-weight: bold;
      }
      .dec{
        color: @gray;
        font-size: 12px;
        line-height: 20px;
      }
      .price{
        position: absolute;
        color: @pink;
        right: 0;
        top: 0;
        .num {
          font-size: 15px;
          font-weight: 600;
        }
      }
    }
  }
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
  .null {
    text-align: center;
    // color: @gray;
    margin: 20px 0;
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
</style>
