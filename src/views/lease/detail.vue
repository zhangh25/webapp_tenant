<template>
  <div class="detail">
    <csheader>
      租房详情
    </csheader>
    <div class="state">退房中</div>
    <div class="house">
      <div class="pic">
        <img src="" alt="">
        <!-- <img v-if="house.imageList" :src="house.imageList[0].url" alt=""> -->
      </div>
      <div class="right">
        <div class="title">福田区-高达苑</div>
        <div class="name">1室1厅1卫-20.0㎡</div>
        <div class="rent">1234元/月</div>
        <div class="pact"><img src="./icon/icon_hetong@2x.png" width="12"> 电子合同</div>
      </div>
    </div>
    <div class="wrapper">
      <div class="title">租房信息</div>
      <div class="item"><label class="name">起止时间</label><div class="value">2018.08.09-2019.08.08</div></div>
      <div class="item"><label class="name">付款方式</label><div class="value">押一付三</div></div>
      <div class="item"><label class="name">房屋租金</label><div class="value">1200元/月</div></div>
      <div class="item"><label class="name">房屋押金</label><div class="value">3000元</div></div>
      <div class="item"><label class="name">门卡押金</label><div class="value">20元</div></div>
      <div class="item"><label class="name">管理费</label><div class="value">20元</div></div>
      <div class="item"><label class="name">收租日</label><div class="value">每月30日</div></div>
      <div class="item"><label class="name">备注</label><div class="value">222</div></div>
    </div>
    <div class="wrapper">
      <div class="title">租客信息</div>
      <div class="item"><label class="name">姓名</label><div class="value">明明</div></div>
      <div class="item"><label class="name">姓别</label><div class="value">男</div></div>
      <div class="item"><label class="name">手机号</label><div class="value">123456789</div></div>
    </div>
    <div class="wrapper">
      <div class="title">房东信息</div>
      <div class="item"><label class="name">姓名</label><div class="value">明明</div></div>
    </div>
    <div class="wrapper">
      <div class="title">订单信息</div>
      <div class="item"><label class="name">订单号</label><div class="value">46135312321</div></div>
      <div class="item"><label class="name">创建时间</label><div class="value">20122</div></div>
    </div>
    <div class="btns">
      <Button class="btn" type="primary">账单</Button>
      <Button class="btn" type="primary">合同</Button>
      <Button class="btn" type="primary">申请退房</Button>
    </div>
  </div>
</template>

<script>
import csheader from '@/components/header'
import {queryLeaseOrderDetail} from '@/api/appoint'
import {Button} from 'mint-ui'
export default {
  data () {
    return {
      detail: {}
    }
  },
  methods: {
    getOrderDetail () {
      queryLeaseOrderDetail(this.leaseId).then(res => {
        if (res.code === 1) {
          this.detail = res.data
        }
      })
    }
  },
  components: {
    csheader, Button
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.detail {
  padding-bottom: 70px;
}
.state{
  height: 44px;
  line-height: 44px;
  font-size: 16px;
  text-align: center;
}
.house{
    display: flex;
    // padding: 15px 0 15px 15px;
    padding-left: 15px;
    background-color: #fff;
    .pic{
      flex: 0 0 98px;
      overflow: hidden;
      padding: 15px 0;
      img {
        width: 100%;
        height: 85px;
      }
    }
    .right{
      flex: 1;
      padding-left: 15px;
      padding-top: 12px;
      padding-bottom: 12px;
      // background-color: #f1f1f1;
      // height: 85px;
      .title{
        font-size: 14px;
      }
      .name{
        color: @gray;
        padding-top: 4px
      }
      .rent{
        color: @gray;
        padding-top: 4px
      }
      .pact {
        padding-top: 6px;
        font-size: 11px;
        color: @gray;
        line-height: 12px;
        vertical-align: top;
      }
    }
    border-bottom: 1px solid #f1f1f1;
  }
.wrapper {
  padding: 0 15px 15px 15px;
  background-color: #fff;
  margin-bottom: 10px;
  .title{
    height: 44px;
    line-height: 44px;
    font-size: 15px;
    border-bottom: 1px solid #f1f1f1;
  }
  .item{
    display: flex;
    padding-top: 15px;
    .name{
      flex: 0 0 100px;
    }
    .value{
      flex: 1;
      text-align: right;
    }
  }

}
.btns {
  position: fixed;
  width: 100%;
  bottom: 0;
  text-align: center;
  padding: 15px 0;
  background-color: #fff;
  .btn{
    width: 84px;
    &+.btn{
      margin-left: 10px;
    }
  }
}
</style>
