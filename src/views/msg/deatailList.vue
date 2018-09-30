<template>
  <div class="detail">
    <!-- <div class="header">
      <div class="left"></div>
      <div class="center">系统消息</div>
      <div class="right"></div>
    </div> -->
    <csheader>系统消息 <span ref="edit" class="edit" slot="right" @click="edit">编辑</span></csheader>
    <div class="list">
      <div class="time">2012-12-12</div>
      <div class="title">温馨提示：城宿免押金活动即将结束！</div>
      <div class="label">活动于2018年9月14日18：00截止，活动结束后权益将自动失效......</div>
      <Cell title="查看详情" is-link to="/msgdetails"></Cell>
    </div>
    <div class="list">
      <div class="time">2012-12-12</div>
      <div class="title">温馨提示：城宿免押金活动即将结束！</div>
      <div class="label">活动于2018年9月14日18：00截止，活动结束后权益将自动失效......</div>
      <Cell title="查看详情" is-link></Cell>
    </div>
    <Popup v-model="pupvisible" popup-transition="popup-fade" class="pop" :style="{ top: buttonBottom + 0 + 'px' }">
      <div class="item" @click="allRead">
        <img src="./icon/icon_yidu@2x.png" alt="" width="19" height="19"><span class="txt">全部已读</span>
      </div>
      <div class="item" style="border-top: 1px solid #f1f1f1;" @click="empty">
        <img src="./icon/icon_qingkong@2x.png" alt="" width="19" height="19"><span class="txt">清空</span>
      </div>
    </Popup>
  </div>
</template>

<script>
import csheader from '@/components/header'
import {Cell, Popup} from 'mint-ui'
export default {
  data () {
    return {
      buttonBottom: 0,
      pupvisible: false
    }
  },
  methods: {

    edit () {
      console.log('edit')
      this.pupvisible = true
    },
    allRead () {
      console.log('read')
      this.pupvisible = false
    },
    empty () {
      console.log('ennn')
      this.pupvisible = false
    }
  },
  mounted () {
    this.buttonBottom = this.$refs.edit.getBoundingClientRect().bottom
  },
  components: {
    csheader, Cell, Popup
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.header {
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-size: 17px;
  background-color: #ffffff;
  box-shadow: 0px 1px 0px 0px#f1f1f1;
  .edit {
    display: inline-block;
  }
}
.list {
  background-color: #ffffff;
  .time{
    padding: 15px;
    color: @gray;
    text-align: center;
  }
  .title{
    font-size: 14px;
    padding: 0 15px;
  }
  .label{
    line-height: 18px;
    padding: 15px;
    color: @gray;
    max-height: 90px;
  }
}
.pop{
  width: 100px;
  border-radius: 8px;
  // padding: 0 10px;
  right: -12%;
  left: inherit;
  transform: translate(-50%, 0);
  &::before {
    display: inline-block;
    width: 0;
    height: 0;
    border: solid transparent;
    border-width: 10px;
    border-bottom-color: #fff;
    content: "";
    position: absolute;
    top: -20px;
    right: 10px;
  }
  .item {
    padding: 10px;
    .txt{
      line-height: 19px;
      vertical-align: top;
      margin-left: 8px;
      &+.txt{
        border-top: 1px solid #f1f1f1;
      }
    }
  }
}
</style>
