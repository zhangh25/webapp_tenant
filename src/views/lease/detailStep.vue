<template>
  <div class="detail">
    <csheader>
      签约详情
    </csheader>
    <div class="top">
      <div class="title"><icon-svg icon-class="time" class="icon"></icon-svg>{{status[step-1]}}</div>
      <div class="dec"><template v-if="countdown">{{countdown.minutes}}分{{countdown.seconds}}秒</template>  {{txts[step-1]}}</div>
    </div>
    <pro :idx="step"></pro>
    <div class="info">
      <div class="title">{{step==3?'费用信息':'签约信息'}}</div>
      <template v-if="step==1">
        <div class="item">
          <label class="lab">姓名</label>
          <div class="val">{{detail.userName}}</div>
        </div>
        <div class="item">
          <label class="lab">身份证号</label>
          <div class="val">{{detail.userIdNumber}}</div>
        </div>
        <div class="item">
          <label class="lab">性别</label>
          <div class="val">{{detail.userSex}}</div>
        </div>
      </template>
      <template v-else-if="step==2">
        <div class="item">
          <label class="lab">房东信息</label>
          <div class="val">{{detail.ownerName}}  {{detail.ownerIdNumber}}</div>
        </div>
        <div class="item">
          <label class="lab">房产地址</label>
          <div class="val">{{detail.address}}</div>
        </div>
        <div class="item">
          <label class="lab">房屋面积</label>
          <div class="val">{{detail.roomArea}}㎡</div>
        </div>
        <div class="item">
          <label class="lab">每月租金</label>
          <div class="val">{{detail.rent}}元</div>
        </div>
        <div class="item">
          <label class="lab">租约起始日</label>
          <div class="val">{{detail.startTime}}</div>
        </div>
        <div class="item">
          <label class="lab">租约截止日</label>
          <div class="val">{{detail.endTime}}</div>
        </div>
        <div class="item">
          <label class="lab">房屋押金</label>
          <div class="val">{{detail.rent*detail.depositNumber}}元</div>
        </div>
        <div class="item">
          <label class="lab">付款周期</label>
          <div class="val">{{detail.paymentNumber}}</div>
        </div>
        <div class="item">
          <label class="lab">家具清单</label>
          <div class="val"></div>
        </div>
        <div class="btns">
          <Button class="cancel-btn">取消签约</Button>
          <Button class="btn" type="primary">去签字</Button>
        </div>
      </template>
      <template v-if="step==3">
        <div class="item">
          <label class="lab">押金方式</label>
          <div class="val"></div>
        </div>
        <div class="item">
          <label class="lab">每月租金</label>
          <div class="val">{{detail.rent}}元</div>
        </div>
        <div class="item">
          <label class="lab">房屋押金</label>
          <div class="val">{{detail.rent*detail.depositNumber}}元</div>
        </div>
        <div class="item">
          <label class="lab">付款周期</label>
          <div class="val">{{detail.paymentNumber}}</div>
        </div>
        <div class="item">
          <label class="lab">起止时间</label>
          <div class="val">{{detail.startTime}}-{{detail.endTime}}</div>
        </div>
        <div class="btns">
          <Button type="primary" class="btn">去支付</Button>
        </div>
      </template>
    </div>
    <div class="landlord">
      <img class="img" :src="detail.ownerImageUrl" width="27" height="27"> <span class="txt"> 房东 {{detail.ownerName}}</span>
    </div>
    <div class="house">
      <div class="pic">
        <img :src="detail.imageUrl" alt="">
        <!-- <img v-if="house.imageList" :src="house.imageList[0].url" alt=""> -->
      </div>
      <div class="right">
        <div class="title">福田区-{{detail.roomTitle}}</div>
        <div class="name">{{detail.typeName}}-{{detail.roomArea}}㎡</div>
        <div class="rent">{{detail.rent}}元/月</div>
      </div>
    </div>
    <div class="time" v-if="step==2">合同编号：</div>
    <div class="time">签约申请时间：{{detail.addTime}}</div>
    <div class="time" v-if="step==2">房东确认时间：{{detail.ownerAgreeTime}}</div>
    <div class="time"></div>
  </div>
</template>

<script>
import csheader from '@/components/header'
import pro from './components/progress'
import {queryLeaseOrderDetail} from '@/api/appoint'
import {Button} from 'mint-ui'
// import {countDown} from '@/utils/tool'
export default {
  data () {
    return {
      detail: { // 缺少 家具清单 合同编号 押金方式
        orderStatus: 4, // 订单状态
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
        ownerAgreeTime: '23333' // 房东确认时间
      },
      status: ['等待确认', '待签字', '待支付', '签约成功'],
      txts: ['若您尚未看房，请及明联系房东看房', '请您在规定时间内完成签字，超时系统将自动取消', '请您在规定时间内完成支付，超时系统将自动取消'],
      step: 1,
      leaseId: null,
      time: '',
      countdown: null
    }
  },
  created () {
    this.leaseId = this.$route.params.id
  },
  mounted () {
    // setInterval(_ => {
    //   console.log(countDown('2018-10-16 11:10:11', 0.5))
    // }, 1000)
    // this.calcTime()
    this.setStep()
  },
  methods: {
    getOrderDetail () {
      queryLeaseOrderDetail(this.leaseId).then(res => {
        if (res.code === 1) {
          this.detail = res.data
        }
      })
    },
    setStep () {
      switch (this.detail.orderStatus) {
        case 0:
          this.step = 1
          break
        case 3:
          this.step = 2
          break
        case 4:
          this.step = 3
          break
        case 6:
          this.step = 4
          break
        default:
          break
      }
    },
    calcTime () {
      let lastTime = new Date('2018-10-16 11:10:11')
      let now = new Date()
      let t = lastTime.getTime() + 30 * 60 * 1000 - now.getTime()
      // let dayDiff = Math.floor(t / (24 * 3600 * 1000))// 计算出相差天数
      var leave1 = t % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
      var hours = Math.floor(leave1 / (3600 * 1000))// 计算出小时数
      // 计算相差分钟数
      var leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
      var minutes = Math.floor(leave2 / (60 * 1000))// 计算相差分钟数
      // 计算相差秒数
      var leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
      var seconds = Math.round(leave3 / 1000)
      console.log('小时：', hours, '  分：', minutes, '  秒： ', seconds)
    }
  },
  components: {
    csheader, pro, Button
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.detail {
  .top {
    text-align: center;
    background-color: @themeColor;
    color: #fff;
    padding: 10px 0;
    .icon{
      font-size: 25px;
      vertical-align: top;
      margin-right: 10px;
    }
    .title {
      line-height: 25px;
      font-size: 14px;
      padding-top: 5px;
    }
    .dec{
      padding: 10px 0;
    }
  }
  .info {
    margin-top: 10px;
    background-color: #fff;
    .title{
      font-size: 15px;
      padding: 15px;
    }
    .item {
      display: flex;
      padding: 14px 15px;
      font-family: 'PingFang-SC-Regular';
      .lab{
        flex: 0 0 100px;
      }
      .val{
        flex: 1;
      }
    }
  }
  .landlord{
    margin-top: 10px;
    padding: 15px;
    background-color: #fff;
    .img{
      border-radius: 50%;
    }
    .txt{
      font-size: 15px;
    line-height: 27px;
    vertical-align: top;
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
      }
    }
    .right{
      flex: 1;
      padding-left: 15px;
      padding-top: 12px;
      padding-bottom: 12px;
      background-color: #f1f1f1;
      height: 85px;
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
    }
  }
  >.time{
    padding: 15px 0 0 15px;
    font-size: 12px;
  }
  .btns {
    text-align: center;
    padding: 15px;
    .cancel-btn {
      opacity: .5;
      background-color: #fff;
      margin-right: 30px;
    }
    .btn{
      background-color: @pink;
      width: 84px;
    }
  }
}
</style>
