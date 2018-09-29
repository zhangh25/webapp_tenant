<template>
    <div class="con-list" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <Loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
        <div class="item" v-for="(item, idx) in dataList" :key="idx" @click="houseDeatil(item.roomId)">
          <div class="left"><img :src="item.imageUrl" width="98"></div>
          <div class="right">
            <div class="title">{{item.roomTitle}}</div>
            <div class="dec">{{item.typeName}}</div>
            <div class="dec"></div>
            <div class="price">{{item.rent}}元/月</div>
          </div>
        </div>
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
    }
  },
  data () {
    return {
      fData: {
        startRow: 1
      },
      dataList: [],
      allLoaded: false,
      bottomStatus: '',
      wrapperHeight: 0,
      curpage: 1
    }
  },
  watch: {
    filterData: {
      handler (val) {
        console.log(val)
        Object.assign(this.fData, val)
        // this._getHouseList()
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
    this.fData = this.filterData
    Object.assign(this.fData, this.filterData)
  },
  mounted () {
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
    // this._getHouseList()
    // console.log(this.wrapperHeight)
  },
  methods: {
    handleBottomChange (status) {
      this.bottomStatus = status
    },
    loadBottom () {
      setTimeout(() => {
        // let lastValue = this.list[this.list.length - 1]
        // if (lastValue < 40) {
        //   for (let i = 1; i <= 10; i++) {
        //     this.list.push(lastValue + i)
        //   }
        // } else {
        //   this.allLoaded = true
        // }
        this.$refs.loadmore.onBottomLoaded()
      }, 1500)
    },
    houseDeatil (id) {
      this.$router.push(`/roomDetails/${id}`)
    },
    getHouseList () {
      // console.log(data)
      queryRoomList(this.fData).then(res => {
        console.log(res)
        if (res.code === 1) {
          this.dataList = res.data
        }
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
  border-top: 1px solid #f1f1f1;
  .item{
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
      .title {
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
