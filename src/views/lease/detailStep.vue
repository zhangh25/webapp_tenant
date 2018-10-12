<template>
  <div class="detail">
    <csheader>
      签约详情
    </csheader>
    <div class="top">
      <div class="title"><icon-svg icon-class="time" class="icon"></icon-svg>等待确认</div>
      <div class="dec">若您尚未看房，请及时联系房东看房</div>
    </div>
    <pro :idx="step"></pro>
    <div class="info">
      <div class="title">签约信息</div>
      <div class="item">
        <label class="lab">姓名</label>
        <div class="val">民</div>
      </div>
      <div class="item">
        <label class="lab">身份证号</label>
        <div class="val">1256325323523</div>
      </div>
      <div class="item">
        <label class="lab">性别</label>
        <div class="val">男</div>
      </div>
    </div>
    <div class="landlord">
      <img class="img"  width="27" height="27"> <span class="txt"> 房东 xxx</span>
    </div>
    <div class="house">
      <div class="pic">
        <img src="" alt="">
        <!-- <img v-if="house.imageList" :src="house.imageList[0].url" alt=""> -->
      </div>
      <div class="right">
        <div class="title">福田区-高达苑</div>
        <div class="name">1室1厅1卫-20.0㎡</div>
        <div class="rent">1234元/月</div>
      </div>
    </div>
    <div class="time">签约申请时间：2018-08-05  12 : 29 : 30</div>
  </div>
</template>

<script>
import csheader from '@/components/header'
import pro from './components/progress'
import {queryLeaseOrderDetail} from '@/api/appoint'
export default {
  data () {
    return {
      detail: {},
      step: 1,
      leaseId: null
    }
  },
  created () {
    this.leaseId = this.$route.params.id
  },
  mounted () {},
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
    csheader, pro
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
    padding: 15px;
    font-size: 12px;
  }
}
</style>
