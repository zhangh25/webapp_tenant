<template>
  <div class="msg">
    <div class="header">消息通知</div>
    <Cell class="cell" is-link @click.native="golist">
      <div class="icon-box"><img src="./icon/icon_xitongxiaoxi@2x.png" width="36" height="36"></div>
      <div class="content">
        <div class="title">系统消息</div>
        <div class="label">扥给更</div>
      </div>
    </Cell>
    <Cell class="cell">
      <div class="icon-box"><img src="./icon/icon_zhangdanxiaoxi.@2x.png" width="36" height="36"></div>
      <div class="content">
        <div class="title">账单消息</div>
        <div class="label">扥给更fh江防分发的的是飞个咋还嫩白的的森个扥光</div>
      </div>
    </Cell>
    <Cell class="cell">
      <div class="icon-box"><img src="./icon/icon_yuyuexiaoxi@2x.png" width="36" height="36"></div>
      <div class="content">
        <div class="title">预约消息</div>
        <div class="label">扥给更</div>
      </div>
    </Cell>
    <Cell class="cell">
      <div class="icon-box"><img src="./icon/icon_qianyuexiaoxi@2x.png" width="36" height="36"></div>
      <div class="content">
        <div class="title">签约消息</div>
        <div class="label">扥给更</div>
      </div>
    </Cell>
    <tabbar></tabbar>
  </div>
</template>

<script>
import {queryUsersMessage} from '@/api/message'
import tabbar from '@/components/tabbar/index'
import {Cell} from 'mint-ui'
export default {
  mounted () {
    this.getUsersMessage()
  },
  methods: {
    getUsersMessage () {
      queryUsersMessage().then(res => {
        console.log(res)
      })
    },
    golist () {
      this.$router.push({
        path: '/msglist'
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
</style>
