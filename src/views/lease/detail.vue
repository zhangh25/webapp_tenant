<template>
  <div class="detail">
    <csheader>
      租房详情
    </csheader>
    <div class="content">
    <div class="state" :class="{su: step==0, tui: step == 2 || step == 3}">{{status[step]}}</div>
    <div class="house">
      <div class="pic">
        <!-- <img src="" alt=""> -->
        <img :src="detail.imageUrl" alt="">
      </div>
      <div class="right">
        <div class="title">{{detail.areaName}}-<template v-if="detail.roomTitle">{{detail.roomTitle}}</template><template v-else>{{detail.name}}-{{detail.buildName}}</template>-{{detail.roomNumber}}</div>
        <div class="name">{{detail.typeName}}-{{detail.roomArea}}㎡</div>
        <div class="rent"><span class="num">{{detail.rent}}</span>元/月</div>
        <div class="pact"><img src="./icon/icon_hetong@2x.png" width="12"> 电子合同</div>
      </div>
    </div>
    <div class="wrapper" v-if="step===2">
      <div class="title">退房信息</div>
      <div class="item"><label class="name">提交时间</label><div class="value">{{detail.retireApplyTime}}</div></div>
      <div class="item"><label class="name">退房时间</label><div class="value">{{detail.retireTime}}</div></div>
      <div class="item"><label class="name">备注</label><div class="value"></div></div>
    </div>
    <div class="wrapper">
      <div class="title">租房信息</div>
      <div class="item"><label class="name">起止时间</label><div class="value">{{detail.startTime}} ~ {{detail.endTime}}</div></div>
      <div class="item"><label class="name">付款方式</label><div class="value"></div>押{{detail.depositNumber}}付{{detail.paymentNumber}}</div>
      <div class="item"><label class="name">房屋租金</label><div class="value">{{detail.rent}}元/月</div></div>
      <div class="item"><label class="name">房屋押金</label><div class="value">{{detail.rent*detail.depositNumber}}元</div></div>
      <!-- <div class="item"><label class="name">门卡押金</label><div class="value"></div></div>
      <div class="item"><label class="name">管理费</label><div class="value"></div></div> -->
      <div class="item"><label class="name">收租日</label><div class="value">每月{{detail.rentDay}}号</div></div>
      <!-- <div class="item"><label class="name">家具清单</label><div class="value"></div></div> -->
    </div>
    <div class="wrapper">
      <div class="title">租客信息</div>
      <div class="item"><label class="name">姓名</label><div class="value">{{detail.userName|name}}</div></div>
      <div class="item"><label class="name">姓别</label><div class="value">{{detail.userSex|getSex}}</div></div>
      <div class="item"><label class="name">手机号</label><div class="value">{{detail.userPhone|phone}}</div></div>
    </div>
    <div class="wrapper">
      <div class="title">房东信息</div>
      <div class="item"><label class="name">姓名</label><div class="value">{{detail.ownerName|name}}</div></div>
    </div>
    <div class="wrapper">
      <div class="title">订单信息</div>
      <div class="item"><label class="name">订单号</label><div class="value">{{detail.orderNum}}</div></div>
      <div class="item"><label class="name">创建时间</label><div class="value">{{detail.addTime}}</div></div>
    </div>

    <div class="btns">
      <Button class="btn" @click="$router.push('/bill')" v-if="step!==1" type="primary">账单</Button>
      <Button class="btn" @click="licences" type="primary" v-if="step!==1">合同</Button>
      <Button class="btn" @click="apply" type="primary" v-if="step==0">申请退房</Button>
      <Button class="btn" @click="cancelApply" type="primary" v-else-if="step==2">取消申请</Button>
    </div>
    </div>
  </div>
</template>

<script>
import csheader from '@/components/header'
import {queryLeaseOrderDetail, cancelApplyRetireRoom} from '@/api/appoint'
import {Button, MessageBox, Toast} from 'mint-ui'
export default {
  data () {
    return {
      detail: { // 缺少 门卡押金 管理费 退房时间 退房提交时间 退房备注
        orderStatus: 6, // 订单状态
        userIdNumber: '123334', // 租户身份证
        userName: 'jack', // 租户姓名
        userPhone: '123345', // 租户电话
        userSex: '1', // 租户性别
        usersId: 1, // id
        occupantNum: 2, // 入住人数
        startTime: '2018-3', // 租约起始日
        endTime: '2019-01', // 租约结束日
        remark: '', // 留言
        imageUrl: '', // 图片地址
        ownerImageUrl: '', // 房东头像
        ownerName: 'jon', // 房东姓名
        ownerPhone: '1356677', // 房东电话
        ownerIdNumber: '456484134132444', // 房东身份证
        roomTitle: 'sss', // 房间标题
        typeName: '一室一厅', // 户型名称
        roomArea: 20, // 房间面积
        rent: 1000, // 房屋租金
        addTime: '2017-22', // 下单时间
        address: '深圳市福田区上梅林卓越城1期3栋', // 房产地址
        depositNumber: 2, // 押金期数
        paymentNumber: 1, // 付款周期
        ownerAgreeTime: '23333', // 房东确认时间
        rentDay: 2, // 收租日
        orderNum: '24234', // 订单号
        retireApplyTime: '',
        retireTime: ''
      },
      status: ['签约成功', '已取消', '退房中', '已退房'],
      step: 0,
      leaseId: null
    }
  },
  mounted () {
    this.leaseId = this.$route.params.id
    this.getOrderDetail()
  },
  methods: {
    getOrderDetail () {
      queryLeaseOrderDetail(this.leaseId).then(res => {
        if (res.code === 1) {
          this.detail = res.data
          this.setStep()
          this.goDetailsStep()
        }
      })
    },
    setStep () {
      switch (this.detail.orderStatus) {
        case 6:
          this.step = 0
          break
        case 1:
        case 2:
          this.step = 1
          break
        case 7:
        case 8:
          this.step = 2
          break
        case 9:
          this.step = 3
          break
        default:
          break
      }
    },
    goDetailsStep () {
      let status = this.detail.orderStatus
      if (status === 4 || status === 5) {
        this.$router.replace(`/leaseDetailStep/${this.leaseId}`)
      }
    },
    cancelApply () {
      MessageBox({
        title: '提示',
        message: '你确定要取消退房吗',
        showCancelButton: true
        // confirmButtonText: '确认'
      }).then(s => {
        if (s === 'confirm') {
          cancelApplyRetireRoom(this.leaseId).then(res => {
            if (res.code === 1) {
              this.detail.orderStatus = 6
            } else {
              Toast(res.msg)
            }
          })
        }
      })
    },
    apply () {
      this.$store.dispatch('leaseHouse', this.detail)
      this.$router.push('/checkout')
    },
    licences () {
      if (this.detail.licenceType === 1) {
        window.location.href = this.detail.pactReviewUrl
      } else if (this.detail.licenceType === 2) {
        this.$store.dispatch('setlicence', this.detail.licences)
        this.$router.push('/contdetail')
      }
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
  // padding-bottom: 70px;
}
.state{
  height: 44px;
  line-height: 44px;
  font-size: 16px;
  text-align: center;
  &.su {
    color: @themeColor;
  }
  &.tui {
    color: @pink;
  }
}
.content {
  height: calc(100vh - 44px);
  overflow: scroll;
  padding-bottom: 70px;
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
          height: 75px;
          object-fit:cover;
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
        font-weight: bold;
      }
      .name{
        color: @gray;
        padding-top: 4px
      }
      .rent{
        color: @gray;
        padding-top: 4px;
        .num {
          color: @pink;
        }
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
