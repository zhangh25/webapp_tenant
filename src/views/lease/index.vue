<template>
  <div>
    <csheader>
      <div class="t">租约管理</div>
      <div slot="right" class="record" @click="record">签约记录</div>
    </csheader>
    <div v-if="list.length<1" class="nodata"><img src="./icon/zufang.png" alt=""></div>
    <div class="list" v-for="item in list" :key="item.id" @click="goDetail(item)">
      <div class="up">
        <div class="left">
          <img :src="item.imageUrl" alt="">
        </div>
        <div class="right">
          <div class="name">{{item.roomTitle}} <div class="state" :class="{active: item.orderStatus==6, pink: item.orderStatus==5}">{{status[item.orderStatus]}}</div></div>
          <div class="label">{{item.typeName}}-{{item.roomArea}}㎡</div>
          <div class="addr">{{item.rent}}元/月</div>
        </div>
      </div>
      <div class="bt">看房时间：{{item.addTime}}</div> <!--暂时看房时间-->
      <div class="btns">
        <div class="item">
          <Button @click="call(item.phone)">联系房东</Button>
        </div>
        <div class="item">
          <Button>合 同</Button>
        </div>
        <div class="item">
          <Button>账 单</Button>
        </div>
        <div class="item" v-if="item.orderStatus==6">
          <Button @click="retireRoom(item)">申请退房</Button>
        </div>
        <div class="item" v-else-if="item.orderStatus==7||item.orderStatus==8">
          <Button @click="cancelApply(item)">取消申请</Button>
        </div>
      </div>
    </div>
    <!-- <div class="list" >
      <div class="up">
        <div class="left">
          <img  alt="">
        </div>
        <div class="right">
          <div class="name">南山区-心语雅园 <div class="state">sss</div></div>
          <div class="label">1室1厅1卫-30.0㎡</div>
          <div class="addr">1000元/月</div>
        </div>
      </div>
      <div class="bt">看房时间：2222</div>
      <div class="btns">
        <div class="item">
          <Button @click="call(item.phone)">联系房东</Button>
        </div>
        <div class="item">
          <Button>合 同</Button>
        </div>
        <div class="item">
          <Button>账 单</Button>
        </div>
        <div class="item">
          <Button>申请退房</Button>
        </div>
      </div>
    </div> -->
    <!-- <mypop v-model="caseVisible">
      <template slot="title">申请退房</template>

    </mypop> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import csheader from '@/components/header'
import {Button} from 'mint-ui'
import {queryLeaseOrder, cancelApplyRetireRoom} from '@/api/appoint'
import mypop from '@/components/myPopup'
import checkout from './checkout'
export default {
  computed: {
    ...mapGetters(['houselease'])
  },
  watch: {
    houselease (val) {
      if (val) {
        for (let item of this.list) {
          if (val.id === item.id) {
            item.orderStatus = val.orderStatus
            break
          }
        }
      }
    }
  },
  data () {
    return {
      curPage: 1,
      list: [],
      caseVisible: false,
      status: ['待确认', '已取消', '已取消', '待签字', '待支付', '支付中', '签约成功', '退房中', '退房中', '已退房'] // 0:签约申请,1用户取消,2房东取消,3房东签约,4用户签字,5支付中,6签约成功,7用户申请退房,8退房中，9已退房
    }
  },
  mounted () {
    queryLeaseOrder(0, this.curPage).then(res => {
      console.log(res)
      if (res.code === 1) {
        this.list = res.data
      }
    })
  },
  methods: {
    call (phone) {},
    record () {
      this.$router.push('/leaseRecord')
    },
    retireRoom (item) {
      this.$store.dispatch('leaseHouse', item)
      this.$router.push('/checkout')
    },
    goDetail (item) {
      this.$router.push(`/leaseDetail/${item.id}`) // leaseDetail
      // this.$router.push(`/leaseDetailStep/${item.id}`) // leaseDetail
    },
    cancelApply (item) {
      // MessageBox({

      // })
      cancelApplyRetireRoom(item.id).then(res => {
        if (res.code === 1) {
          // let idx = this.list.indexOf(item)
          item.orderStatus = 6
        }
      })
    }
  },
  components: {
    csheader, Button, mypop, checkout
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.t{
  text-align: center;
  font-size: 17px;
}
.record {
  position: absolute;
  color: @gray;
  right: 10px;
}
.list{
    padding: 15px;
    overflow: hidden;
    background-color: #fff;
    margin-bottom: 10px;
    .up{
      display: flex;
      .left{
        flex: 0 0 98px;
        background-color: #222;
        margin-right: 18px;
        img {
          max-width: 100%;
        }
      }
      .right{
        flex: 1;
        .name {
          font-size: 15px;
          .state{
            float: right;
            font-size: 14px;
            &.active{
              color: @themeColor;
            }
            &.pink {
              color: @pink
            }
          }
        }
        .label {
          width: 100%;
          color: #666;
          padding-top: 10px;
          // overflow: hidden;
          // text-overflow: ellipsis;
          // white-space: nowrap;
        }
        .addr{
          padding-top: 10px;
          font-size: 12px;
          color: @gray;
          // overflow: hidden;
          // text-overflow: ellipsis;
          // white-space: nowrap;
        }
      }
    }
    .bt{
      padding-top: 15px;
      &.leavemsg{
        padding-bottom: 15px;
        border-bottom: 1px dashed #e5e5e5;
        line-height: 24px;
      }
    }
    .btns {
      display: flex;
      padding-top: 15px;
      .item{
        flex: 1;
        text-align: center;
      }

    }
  }
  .nodata{
    text-align: center;
    padding-top: 60px;
    img{
      width: 150px;
    }
  }
</style>
