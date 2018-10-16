<template>
  <div class="bill">
    <csheader>租房账单</csheader>
    <div class="nav">
      <div class="item" v-for="item in navTxt" :key="item.id" :class="{active: item.id===active}" @click="navClick(item.id)"><span class="txt">{{item.name}}</span></div>
    </div>
    <TabContainer v-model="active" swipeable>
      <TabContainerItem id="unfinished">
        <div class="cell" v-for="item in list" :key="item.id">
          <label class="check">
            <span class="mint-checkbox"><input type="checkbox" class="mint-checkbox-input" :value="item.id" v-model="vals"><span class="mint-checkbox-core"></span></span>
          </label>
          <billitem :info="item"></billitem>
          <!-- <div class="pay-info">
            <div class="title">￥{{item.price}}  {{item.name}}</div>
            <div class="date">{{item.timeRang}}</div>
          </div> -->
        </div>
      </TabContainerItem>
      <TabContainerItem id="finished">
        <div class="cell" v-for="item in list" :key="item.id">
          <billitem  :info="item"></billitem>
          </div>
          <!-- <div class="pay-info">
            <div class="title">￥{{item.price}}  {{item.name}}</div>
            <div class="date">{{item.timeRang}}</div>
          </div> -->
      </TabContainerItem>
    </TabContainer>
    <div class="bottom" v-if="active=='unfinished'">
      <label class="check"><span class="mint-checkbox"><input type="radio" class="mint-checkbox-input" :value="1" v-model="all"><span class="mint-checkbox-core"></span></span> 全选</label>
      <div class="info">
        <span>已选择{{total}}条账单</span><br>
        <div style="padding-top: 6px">合计<span class="price">￥{{totalPrice}}</span></div>
        <Button type="primary" :disabled="this.totalPrice===0" class="btn">支付</Button>
      </div>
    </div>
  </div>
</template>

<script>
import csheader from '@/components/header'
import {queryUserBill} from '@/api/bill'
import billitem from './billitem'
import {TabContainer, TabContainerItem, Checklist, Cell, Button} from 'mint-ui'
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
        {id: 0, name: '租金1', price: 900, pay: false, timeRang: '2013', endTime: '2244'},
        {id: 1, name: '租金2', price: 200, pay: false, timeRang: '2013', endTime: '2244'},
        {id: 2, name: '租金2', price: 23, pay: false, timeRang: '2013', endTime: '2244'},
        {id: 3, name: '租金', price: 2, pay: false, timeRang: '2013', endTime: '2244'}
      ]
    }
  },
  watch: {
    vals (v) {
      // console.log(v)
      this.total = v.length
      this.totalPrice = 0
      for (let id of v) {
        for (let item of this.list) {
          if (id === item.id) {
            this.totalPrice += item.price
            break
          }
        }
      }
      if (this.total === this.list.length) {
        this.all = 1
      } else {
        this.all = null
      }
    },
    all (val) {
      if (val) {
        this.vals = []
        for (let item of this.list) {
          this.vals.push(item.id)
        }
      }
    }
  },
  mounted () {
    queryUserBill(1).then(res => {
      console.log(res)
    })
  },
  methods: {
    navClick (id) {
      this.active = id
    }
  },
  components: {
    csheader, TabContainer, TabContainerItem, Checklist, Cell, Button, billitem
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
    border-bottom: 1px solid #f1f1f1;
    border-top: 1px solid #f1f1f1;
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
  .cell {
    display: flex;
    width: 100%;
    padding: 15px;
    background-color: #fff;
    margin-bottom: 10px;
    border-bottom: 1px solid #f1f1f1;
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
}
</style>
