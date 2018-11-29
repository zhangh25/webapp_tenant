<template>
  <div class="msg">
    <div class="header border-1px">消息通知</div>
    <div class="content-box">
      <!-- <cell class="cell" is-link @click.native="golist(sys.type)">
        <div slot="label" class="item">
          <div class="icon-box"><img src="./icon/icon_xitongxiaoxi@2x.png" width="36" height="36"><div class="spot" v-if="read[0]"></div></div>
          <div class="content">
            <div class="title">系统消息</div>
            <div class="label"><template v-if="sys.fileTitle">{{sys.content}}</template><template v-else>暂无新消息</template></div>
          </div>
        </div>
      </cell>
      <cell class="cell" is-link @click.native="golist(bill.type)">
        <div slot="label" class="item">
          <div class="icon-box"><img src="./icon/icon_zhangdanxiaoxi.@2x.png" width="36" height="36"><div class="spot" v-if="read[1]"></div></div>
          <div class="content">
            <div class="title">账单消息</div>
            <div class="label"><template v-if="bill.fileTitle">{{bill.content}}</template><template v-else>暂无新消息</template></div>
          </div>
        </div>
      </cell>
      <cell class="cell" is-link @click.native="golist(appointment.type)">
        <div slot="label" class="item">
        <div class="icon-box"><img src="./icon/icon_yuyuexiaoxi@2x.png" width="36" height="36"><div class="spot" v-if="read[2]"></div></div>
        <div class="content">
          <div class="title">预约消息</div>
          <div class="label"><template v-if="appointment.fileTitle">{{appointment.content}}</template><template v-else>暂无新消息</template></div>
        </div>
        </div>
      </cell>
      <cell class="cell" is-link @click.native="golist(lease.type)">
        <div slot="label" class="item">
        <div class="icon-box"><img src="./icon/icon_qianyuexiaoxi@2x.png" width="36" height="36"><div class="spot" v-if="read[3]"></div></div>
        <div class="content">
          <div class="title">签约消息</div>
          <div class="label"><template v-if="lease.fileTitle">{{lease.content}}</template><template v-else>暂无新消息</template></div>
        </div>
        </div>
      </cell> -->
      <div class="row" @click="golist(sys.type)">
        <div class="mask"></div>
        <div class="wrapper border-1px">
          <div class="icon"><img src="./icon/icon_xitongxiaoxi@2x.png" width="36" height="36"><div class="spot" v-if="read[0]"></div></div>
          <div class="content"><div class="name">系统消息 <div class="time">{{sys.addTime}}</div></div><div class="txt"><template v-if="sys.fileTitle">{{sys.content}}</template><template v-else>暂无新消息</template></div></div>
        </div>
      </div>
      <div class="row" @click="golist(bill.type)">
        <div class="mask"></div>
        <div class="wrapper border-1px">
          <div class="icon"><img src="./icon/icon_zhangdanxiaoxi.@2x.png" width="36" height="36"><div class="spot" v-if="read[1]"></div></div>
          <div class="content"><div class="name">账单消息<div class="time">{{bill.addTime}}</div></div><div class="txt"><template v-if="bill.fileTitle">{{bill.content}}</template><template v-else>暂无新消息</template></div></div>
        </div>
      </div>
      <div class="row" @click="golist(appointment.type)">
        <div class="mask"></div>
        <div class="wrapper border-1px">
          <div class="icon"><img src="./icon/icon_yuyuexiaoxi@2x.png" width="36" height="36"><div class="spot" v-if="read[2]"></div></div>
          <div class="content"><div class="name">预约消息<div class="time">{{appointment.addTime}}</div></div><div class="txt"><template v-if="appointment.fileTitle">{{appointment.content}}</template><template v-else>暂无新消息</template></div></div>
        </div>
      </div>
      <div class="row" @click="golist(lease.type)">
        <div class="mask"></div>
        <div class="wrapper border-1px">
          <div class="icon"><img src="./icon/icon_qianyuexiaoxi@2x.png" width="36" height="36"><div class="spot" v-if="read[3]"></div></div>
          <div class="content"><div class="name">签约消息<div class="time">{{lease.addTime}}</div></div><div class="txt"><template v-if="lease.fileTitle">{{lease.content}}</template><template v-else>暂无新消息</template></div></div>
        </div>
      </div>
      <!-- <mcell class="cell" is-link >
        <div slot="label" class="item">
          <div class="icon-box"><img src="./icon/icon_xitongxiaoxi@2x.png" width="36" height="36"><div class="spot"></div></div>
          <div class="content">
            <div class="title">系统消息</div>
            <div class="label">fdfg </div>
          </div>
        </div>
      </mcell> -->
      <!-- <div class="nomsg" v-if="!sys.fileTitle&&!bill.fileTitle&&!appointment.fileTitle&&!lease.fileTitle">
        <img src="./icon/notice.png" alt="" width="150">
      </div> -->
      <!-- <nodata v-if="!sys.fileTitle&&!bill.fileTitle&&!appointment.fileTitle&&!lease.fileTitle" imgSrc="wuxiaoxitongzhi" text="暂无消息" bottom="56"></nodata> -->
    </div>
    <tabbar></tabbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {queryUsersMessage} from '@/api/message'
import tabbar from '@/components/tabbar/index'
import {Cell} from 'mint-ui'
import cell from 'components/cell'
import nodata from 'components/nodata/index'
export default {
  computed: {
    ...mapGetters(['token'])
  },
  data () {
    return {
      appointment: {type: 3}, // 预约消息
      bill: {type: 2}, // 账单消息
      lease: {type: 4}, // 租约消息
      sys: {type: 1}, // 系统消息
      read: [false, false, false, false]
    }
  },
  mounted () {
    if (this.token) {
      this.getUsersMessage()
    }
  },
  methods: {
    getUsersMessage () {
      queryUsersMessage().then(res => {
        // console.log(res)
        if (res.code === 1) {
          this.appointment = res.data.appointmentList.length > 0 ? res.data.appointmentList[0] : {type: 3}
          this.bill = res.data.billList.length > 0 ? res.data.billList[0] : {type: 2}
          this.lease = res.data.leaseList.length > 0 ? res.data.leaseList[0] : {type: 4}
          this.sys = res.data.sysList.length > 0 ? res.data.sysList[0] : {type: 1}
          this.getRead(res.data.appointmentList, 2)
          this.getRead(res.data.billList, 1)
          this.getRead(res.data.leaseList, 3)
          this.getRead(res.data.sysList, 0)
        }
      })
    },
    golist (type) {
      if (this.token) {
        this.$router.push({
          path: `/msglist/${type}`
        })
      } else {
        this.$router.push('/login')
      }
    },
    getRead (data, idx) {
      for (let item of data) {
        if (item.status === 0) {
          this.read[idx] = true
          break
        }
      }
    }
  },
  components: {
    tabbar, Cell, nodata, cell
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
    // box-shadow: 0px 1px 0px 0px#f1f1f1;
    .border-1px;
  }
  .content-box {
    height: calc(100vh - 44px - 56px);
    overflow: scroll;
  }
  .icon-box {
    position: relative;
    // display: inline-block;
    flex: 0 0 36px;
    margin-right: 15px;
    // margin-top: 16px;
    display: flex;
    align-items: center;
    .spot{
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: red;
      top: 2px;
      right: 2px;
    }
  }
  .mint-cell-title{
    flex: none
  }
  .content {
    flex: 1;
    // margin-top: 15px;
    .title{
      font-size: 15px;
      color: #353535;
    }
    .label {
      // display: inline;
      font-size: 12px;
      color: #888;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .cell {
    height: 70px;
    .item {
      display: flex;
    }
    // background-color: #f0f;
  }
  .allow{
    display: none;
  }
}
.nomsg{
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  // color: @gray;
}
.row {
  position: relative;
  // padding: 15px 0 15px 15px;
  padding-left: 15px;
  background-color: #ffffff;
  &+.row {
    .wrapper {
      .border-top-1px;
    }
  }
  .mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    background-color: #000;
    transition: opacity 0.2s;
    z-index: 1;
    &:active {
      opacity: .2;
    }
  }
  .wrapper {
    padding-top: 15px;
    padding-bottom: 15px;
    .icon {
      float: left;
      height: 41px;
      width: 40px;
      padding-top: 4px;
      position: relative;
      .spot{
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: red;
      top: 5px;
      right: 5px;
    }
      // line-height: 41px;
      // vertical-align: middle;
      // img{
      //   vertical-align: middle;
      // }
    }
    .content {
      padding-left: 50px;
      padding-right: 15px;
      .name {
        font-size: 15px;
        padding-bottom: 5px;
        .time {
          float: right;
          font-size: 12px;
        }
      }
      .txt {
        font-size: 12px;
        color: #888;
        white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      }
    }
  }
}
</style>
