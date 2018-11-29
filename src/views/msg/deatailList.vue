<template>
  <div class="detail">
    <!-- <div class="header">
      <div class="left"></div>
      <div class="center">系统消息</div>
      <div class="right"></div>
    </div> -->
    <csheader>{{msg[+type-1]}}<span ref="edit" class="edit" slot="right" @click="edit">编辑</span></csheader>
    <div class="content">
    <div class="list" v-for="item in list" :key="item.id" :class="{read: item.status==1}">
      <div class="time">{{item.addTime}}</div>
      <div class="box">
        <div class="title">{{item.fileTitle}}</div>
        <div style="padding:15px"><div class="label">{{item.content}}</div></div>
        <div class="details border-1px" @click="goDetail(item)">查看详情 <icon-svg icon-class="back" class="icon"></icon-svg></div>
        <!-- <Cell title="查看详情" is-link @click.native="goDetail(item)"></Cell> -->
      </div>
    </div>
    <div style="height: 20px"></div>
    <nodata v-if="list.length===0" imgSrc="wuxiaoxitongzhi" text="暂无消息"></nodata>
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
import {queryUsersMessageDetails, usersReadMessage, usersDelMessage} from '@/api/message'
import csheader from '@/components/header'
import {Cell, Popup} from 'mint-ui'
import mypop from '@/components/myPopup'
import nodata from 'components/nodata/index'
export default {
  data () {
    return {
      buttonBottom: 0,
      pupvisible: false,
      list: [],
      detail: {},
      detailVisible: false,
      msg: ['系统消息', '账单信息', '预约消息', '签约消息'],
      type: 0
    }
  },
  created () {
    this.type = this.$route.params.type
  },
  methods: {
    getDetailiList () {
      queryUsersMessageDetails(this.$route.params.type).then(res => {
        // console.log(res)
        if (res.code === 1) {
          this.list = res.data
        }
      })
    },
    readMessage (item) {
      usersReadMessage(item.id).then(res => {
        if (res.code === 1) {
          // console.log(res, '读取成功')
          // let idx = this.list.indexOf(item)
          item.status = 1
        }
      })
    },
    goDetail (item) {
      // this.detail = item
      // this.readMessage(item)
      // this.detailVisible = true
      this.$store.dispatch('setMsg', item)
      this.$router.push(`/msgdetails/${item.id}`)
    },
    delMessage (id) {
      usersDelMessage(id).then(res => {
        if (res.code === 1) {
          this.list = []
        }
      })
    },
    edit () {
      console.log('edit')
      this.pupvisible = true
    },
    allRead () {
      console.log('read')
      this.pupvisible = false
      for (let item of this.list) {
        this.readMessage(item)
      }
    },
    empty () {
      console.log('ennn')
      this.pupvisible = false
      for (let item of this.list) {
        this.delMessage(item.id)
      }
    }
  },
  mounted () {
    if (this.$refs.edit) {
      this.buttonBottom = this.$refs.edit.getBoundingClientRect().bottom
    }
    this.getDetailiList()
  },
  components: {
    csheader, Cell, Popup, mypop, nodata
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
.content {
  height: calc(100vh - 44px);
  overflow: scroll;
}
.list {
  // background-color: #ffffff;
  padding: 0 15px;
  &.read{
    // color: @gray;
    opacity: .5;
  }
  .box {
    background-color: #fff;
    box-shadow: 0px 5px 10px 0px #f1ecec, inset 0px 1px 0px 0px #f1f1f1;
    .details {
      text-align: center;
      padding-bottom: 15px;
      padding-top: 15px;
      .border-top-1px;
      .icon {
        transform: rotate(180deg)
      }
    }
  }
  .time{
    padding: 15px;
    color: @gray;
    text-align: center;
  }
  .title{
    text-align: center;
    font-size: 14px;
    padding: 15px 15px 0 15px;
  }
  .label{
    line-height: 18px;
    // padding: 15px;
    color: @gray;
    // max-height: 90px;
    overflow: hidden;
    text-overflow: ellipsis;
    display:-webkit-box; //作为弹性伸缩盒子模型显示。
    -webkit-box-orient:vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
    -webkit-line-clamp:2;
  }
  .de {
    .label{
      max-height: none;
    }
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
.nomsg {
  text-align: center;
  padding-top: 60px;
  color: @gray;
}
</style>
