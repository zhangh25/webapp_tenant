<template>
  <div class="bill">
    <csheader>房租账单</csheader>
    <div class="nav border-1px">
      <div class="item" v-for="item in navTxt" :key="item.id" :class="{active: item.id===active}" @click="navClick(item.id)"><span class="txt">{{item.name}}</span></div>
    </div>
    <TabContainer v-model="active" swipeable>
      <TabContainerItem id="unfinished">
        <div class="load" v-if="loading">
          <Spinner class="spi" type="fading-circle" :size="20"></Spinner><span>加载中...</span>
        </div>
        <template v-if="house.id">
          <div class="hcontent">
            <div class="house">
              <div class="pic">
                <img :src="`${house.imageUrl}?imageMogr2/auto-orient`" alt="">
                <!-- <img v-if="house.imageList" :src="house.imageList[0].url" alt=""> -->
              </div>
              <div class="right">
                <div class="title">{{house.areaName}}-<template v-if="house.roomTitle">{{house.roomTitle}}</template><template v-else>{{house.buildName}}</template> </div>
                <div class="name">{{house.typeName}}-{{house.roomArea}}㎡ <div class="other" v-if="list.length>1" @click="changeHouse">其他租约<icon-svg icon-class="back" class="icon"></icon-svg></div></div>
                <div class="rent">{{house.rent}}元/月</div>
              </div>
            </div>
            <div class="" v-for="(it, i) in house.list" :key="i">
              <div class="date">{{it.name}}</div>
              <div class="cell border-1px" v-for="item in it.value" :key="item.rbsId">
                <label class="check">
                  <span class="mint-checkbox"><input type="checkbox" class="mint-checkbox-input" :value="item.rbsId" v-model="vals"><span class="mint-checkbox-core"></span></span>
                </label>
                <billitem :info="item" @click.native="detail(item, house.ownerPhone)"></billitem>
              </div>
            </div>
          </div>
          <!--  -->
        </template>
        <nodata v-else-if="active==='unfinished'" imgSrc="wurenhejilu" text="暂无任何记录哦"></nodata>
      </TabContainerItem>
      <TabContainerItem id="finished">
        <template v-if="unhouse.id">
          <!-- <div></div> -->
          <div class="house">
            <div class="pic">
              <img :src="unhouse.imageUrl" alt="">
              <!-- <img v-if="house.imageList" :src="house.imageList[0].url" alt=""> -->
            </div>
            <div class="right">
              <div class="title">{{house.areaName}}-<template v-if="house.roomTitle">{{house.roomTitle}}</template><template v-else>{{house.buildName}}</template></div>
              <div class="name">{{unhouse.typeName}}-{{unhouse.roomArea}}㎡ <div class="other" v-if="unlist.length>1" @click="changeunHouse">其他租约<icon-svg icon-class="back" class="icon"></icon-svg></div></div>
              <div class="rent">{{unhouse.rent}}元/月</div>
            </div>
          </div>
          <!-- {{house}} -->
          <div v-for="(it, i) in unhouse.list" :key="i">
            <div class="date">{{it.name}}</div>
            <billitem class="border-1px fishitem" v-for="item in it.value" :key="item.rbsId" :info="item"></billitem>
          </div>
        </template>
        <nodata v-if="unlist.length<1&&active==='finished'" imgSrc="wurenhejilu" text="暂无任何记录哦"></nodata>
      </TabContainerItem>
    </TabContainer>
    <div class="bottom" v-if="active=='unfinished'&&house.id">
      <label class="check"><span class="mint-checkbox"><input type="radio" class="mint-checkbox-input" :value="1" v-model="all"><span class="mint-checkbox-core"></span></span> 全选</label>
      <div class="info">
        <span>已选择{{total}}条账单</span><br>
        <div style="padding-top: 6px">合计<span class="price">￥{{totalPrice}}</span></div>
        <Button type="primary" @click="pay" :disabled="this.totalPrice===0" class="btn">支付</Button>
      </div>
    </div>
    <Popup v-model="popVisible" position="bottom" class="pop">
      <label class="radio border-1px" v-for="item in list" :key="item.id">
        <div class="left">
          <div>{{item.areaName}}-<template v-if="item.roomTitle">{{item.roomTitle}}</template><template v-else>{{item.buildName}}</template></div>
          <div style="padding-top: 10px">{{item.rent}}元/月</div>
        </div>
        <div class="right"><span class="mint-checkbox"><input type="radio" class="mint-checkbox-input" :value="item.id" v-model="selectid"><span class="mint-checkbox-core"></span></span></div>
      </label>
    </Popup>
    <Popup v-model="unpopVisible" position="bottom" class="pop">
      <label class="radio border-1px" v-for="item in unlist" :key="item.id">
        <div class="left">
          <div>{{item.areaName}}-<template v-if="item.roomTitle">{{item.roomTitle}}</template><template v-else>{{item.buildName}}</template></div>
          <div style="padding-top: 10px">{{item.rent}}元/月</div>
        </div>
        <div class="right"><span class="mint-checkbox"><input type="radio" class="mint-checkbox-input" :value="item.id" v-model="unselectid"><span class="mint-checkbox-core"></span></span></div>
      </label>
    </Popup>
  </div>
</template>

<script>
import csheader from '@/components/header'
import {queryUserBill} from '@/api/bill'
import billitem from './billitem'
import {TabContainer, TabContainerItem, Checklist, Cell, Button, Popup, Spinner} from 'mint-ui'
import nodata from 'components/nodata/index'
export default {
  data () {
    return {
      navTxt: [{id: 'unfinished', name: '未支付'}, {id: 'finished', name: '已支付'}],
      navIdx: 0,
      active: 'unfinished',
      vals: [],
      all: null,
      total: 0,
      totalPrice: 0,
      options3: ['选项A', '选项B', '选项C', '选项D'],
      list: [
        // {id: 0, name: '租金1', price: 900, pay: false, timeRang: '2013', endTime: '2244'},
        // {id: 1, name: '租金2', price: 200, pay: false, timeRang: '2013', endTime: '2244'},
        // {id: 2, name: '租金2', price: 23, pay: false, timeRang: '2013', endTime: '2244'},
        // {id: 3, name: '租金', price: 2, pay: false, timeRang: '2013', endTime: '2244'}
      ],
      unlist: [],
      house: {},
      unhouse: {},
      selectid: null,
      unselectid: null,
      popVisible: false,
      unpopVisible: false,
      loading: false
    }
  },
  watch: {
    vals (v) {
      console.log(v)
      this.total = v.length
      this.totalPrice = 0
      for (let id of v) {
        for (let it of this.house.list) {
          for (let item of it.value) {
            // console.log(item)
            if (id === item.rbsId) {
              // console.log(item.price.substring(1))
              this.totalPrice += +item.price
              // console.log(this.totalPrice)
              break
            }
          }
        }
      }
      let num = 0
      for (let item of this.house.list) {
        // for (let item)
        num += item.value.length
      }
      if (this.total === num) {
        this.all = 1
      } else {
        this.all = null
      }
    },
    all (val) {
      if (val) {
        this.vals = []
        console.log(this.house.list)
        for (let it of this.house.list) {
          for (let item of it.value) {
            this.vals.push(item.rbsId)
          }
        }
      }
    },
    selectid (val) {
      if (val) {
        for (let item of this.list) {
          if (item.id === this.selectid) {
            this.house = item
            this.popVisible = false
            this.vals = []
          }
        }
      }
    },
    unselectid (val) {
      if (val) {
        for (let item of this.unlist) {
          if (item.id === val) {
            this.unhouse = item
            this.unpopVisible = false
          }
        }
      }
    }
  },
  mounted () {
    this.loading = true
    queryUserBill(1).then(res => {
      this.loading = false
      if (res.code === 1 && res.data) {
        this.house = res.data[0]
        this.selectid = this.house.id
        this.list = res.data
      }
    }, _ => {
      // console.log(err)
      this.loading = false
    })
    queryUserBill(2).then(res => {
      if (res.code === 1 && res.data) {
        this.unhouse = res.data[0]
        this.unselectid = this.unhouse.id
        this.unlist = res.data
      }
    })
  },
  methods: {
    navClick (id) {
      this.active = id
    },
    pay () {
      this.$store.dispatch('setPay', {id: this.house.id, price: this.totalPrice, num: this.total, rbsId: this.vals, isPay: false})
      this.$router.push('/payway')
    },
    detail (item, phone) {
      console.log(item, phone)
      item.ownerPhone = phone
      this.$store.dispatch('setBill', item)
      this.$router.push('/billDetail')
    },
    changeHouse () {
      // console.log()
      this.popVisible = true
    },
    changeunHouse () {
      this.unpopVisible = true
    }
  },
  components: {
    csheader, TabContainer, TabContainerItem, Checklist, Cell, Button, billitem, nodata, Popup, Spinner
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.bill {
  .nav{
    display: flex;
    height: 41px;
    line-height: 38px;
    font-size: 15px;
    text-align: center;
    background-color: #fff;
    // border-bottom: 1px solid #f1f1f1;
    // border-top: 1px solid #f1f1f1;
    .border-1px;
    .item {
      flex: 1;
      .txt {
        padding: 0 10px;
        display: inline-block;
        border-bottom: 2px solid transparent;
      }
      &.active {
        color: @themeColor;
        .txt {
          border-color: @themeColor;
        }

      }
    }
  }
  .house{
    display: flex;
    padding: 15px 0 15px 15px;
    background-color: #fff;
    .pic{
      flex: 0 0 98px;
      overflow: hidden;
      img {
        width: 100%;
        height: 85px;
        // height: 100%;
        object-fit: cover;
      }
    }
    .right{
      flex: 1;
      padding-left: 15px;
      padding-top: 12px;
      padding-bottom: 12px;
      // background-color: #f1f1f1;
      height: 85px;
      .title{
        font-size: 14px;
        font-weight: bold;
      }
      .name{
        color: @gray;
        padding-top: 4px;
        .other {
          float: right;
          padding-right: 8px;
          color: @gray;
          font-weight: normal;
          .icon {
            transform: rotate(180deg);
          }
        }
      }
      .rent{
        color: @gray;
        padding-top: 4px
      }
    }
  }
  .date {
    height: 42px;
    padding: 0 15px;
    line-height: 42px;
  }
  .cell {
    display: flex;
    width: 100%;
    padding: 15px;
    background-color: #fff;
    margin-bottom: 10px;
    // border-bottom: 1px solid #f1f1f1;
    .border-1px;
    .check {
      flex: 0 0 35px;
      .mint-checkbox{
        display: inline-block;
        margin-top: 13px;
      }
    }
    .pay-info {
      flex: 1;
      // .title {
      //   font-size: 15px;
      // }
      // .date {
      //   font-size: 12px;
      //   color: @gray;
      //   padding-top: 14px;
      // }
    }
  }
  .bottom {
    position: fixed;
    display: flex;
    width: 100%;
    bottom: 0;
    padding: 10px 15px;
    background-color: #fff;
    z-index: 1;
    .check{
      padding-top: 10px;
      flex: 0 0 80px;
      line-height: 20px;
      .mint-checkbox {
        display: inline-block;
        margin-right: 10px;
        vertical-align: top;
      }
    }
    .info{
      position: relative;
      flex: 1;
      font-size: 14px;
      .btn{
        // float: right;
        position: absolute;
        width: 134px;
        right: 0;
        top: 3px;
      }
      .price{
        color: @pink;
      }
    }
  }
  .pop{
    width: 100%;
    max-height: 300px;
    overflow: scroll;
    .radio {
      display: flex;
      width: 100%;
      align-items: center;
      padding: 15px;
      font-size: 14px;
      &+.radio {
        .border-top-1px;
      }
      .left {
        flex: 1
      }
    }
  }
}
.hcontent {
  height: calc(100vh - 149px);
  overflow: scroll;
}
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
    .fishitem{
      background-color: #fff;
      padding: 15px;
      margin-bottom: 10px;
    }
</style>
