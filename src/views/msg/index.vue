<template>
  <div class="msg">
    <div class="header">消息通知</div>
    <Cell class="cell" is-link @click.native="golist(sys.type)" v-if="sys.fileTitle">
      <div class="icon-box"><img src="./icon/icon_xitongxiaoxi@2x.png" width="36" height="36"></div>
      <div class="content">
        <div class="title">系统消息</div>
        <div class="label">{{sys.content}}</div>
      </div>
    </Cell>
    <Cell class="cell" is-link @click.native="golist(bill.type)" v-if="bill.fileTitle">
      <div class="icon-box"><img src="./icon/icon_zhangdanxiaoxi.@2x.png" width="36" height="36"></div>
      <div class="content">
        <div class="title">账单消息</div>
        <div class="label">{{bill.content}}</div>
      </div>
    </Cell>
    <Cell class="cell" is-link @click.native="golist(appointment.type)" v-if="appointment.fileTitle">
      <div class="icon-box"><img src="./icon/icon_yuyuexiaoxi@2x.png" width="36" height="36"></div>
      <div class="content">
        <div class="title">预约消息</div>
        <div class="label">{{appointment.content}}</div>
      </div>
    </Cell>
    <Cell class="cell" is-link @click.native="golist(lease.type)" v-if="lease.fileTitle">
      <div class="icon-box"><img src="./icon/icon_qianyuexiaoxi@2x.png" width="36" height="36"></div>
      <div class="content">
        <div class="title">签约消息</div>
        <div class="label">{{lease.content}}</div>
      </div>
    </Cell>
    <div class="nomsg" v-if="!sys.fileTitle&&!bill.fileTitle&&!appointment.fileTitle&&!lease.fileTitle">
      <img src="./icon/notice.png" alt="" width="150">
    </div>
    <tabbar></tabbar>
  </div>
</template>

<script>
import {queryUsersMessage} from '@/api/message'
import tabbar from '@/components/tabbar/index'
import {Cell} from 'mint-ui'
export default {
  data () {
    return {
      appointment: [], // 预约消息
      bill: [], // 账单消息
      lease: [], // 租约消息
      sys: [] // 系统消息
    }
  },
  mounted () {
    this.getUsersMessage()
  },
  methods: {
    getUsersMessage () {
      queryUsersMessage().then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.appointment = res.data.appointmentList.length > 0 ? res.data.appointmentList[0] : {}
          this.bill = res.data.billList.length > 0 ? res.data.billList[0] : {}
          this.lease = res.data.leaseList.length > 0 ? res.data.leaseList[0] : {}
          this.sys = res.data.sysList.length > 0 ? res.data.sysList[0] : {}
        }
      })
    },
    golist (type) {
      this.$router.push({
        path: `/msglist/${type}`
        // query: {
        //   menuResp: item.id
        // }
      })
    }
  },
  components: {
    tabbar, Cell
  }
}
</script>

<style lang="less">
@import '../../styles/mixin.less';
.msg {
  .header {
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 17px;
    background-color: #ffffff;
    box-shadow: 0px 1px 0px 0px#f1f1f1;
  }
  .icon-box {
    // display: inline-block;
    flex: 0 0 36px;
    margin-right: 15px;
    margin-top: 16px;
  }
  .mint-cell-title{
    flex: none
  }
  .content {
    flex: 1;
    margin-top: 15px;
    .title{
      font-size: 15px;
      color: #353535;
    }
    .label {
      font-size: 12px;
      padding-top: 10px;
      white-space: nowrap;
    }
  }
  .cell {
    height: 70px;
    // background-color: #f0f;
  }
  .mint-cell-allow-right{
    display: none;
  }
}
.nomsg{
  padding-top: 60px;
  text-align: center;
  color: @gray;
}
</style>
