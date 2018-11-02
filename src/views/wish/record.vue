<template>
  <div class="record">
    <csheader></csheader>
    <div class="content">
    <div class="title">预约记录</div>
    <div class="tab border-1px"><span class="tab-item" v-for="item in tabs" :key="item.id" :class="{active: item.id === active}" @click="active=item.id">{{item.name}}</span></div>

    <TabContainer v-model="active" swipeable>
      <TabContainerItem id="unfinished">
        <div class="list border-1px" v-for="item in unfinishList" :key="item.id">
          <div class="up">
            <div class="left">
              <img :src="`${item.imageUrl}?imageMogr2/auto-orient`" alt="">
            </div>
            <div class="right">
              <div class="name">
                <div class="txt"><template v-if="item.roomTitle">{{item.roomTitle}}</template><template v-else>{{item.name}}-{{item.buildName}}</template></div>
                <div class="state active">{{status[item.status]}}</div></div>
              <div class="label">{{item.typeName}}</div>
              <div class="addr"><i class="icon-addr"></i>{{item.address}}</div>
            </div>
          </div>
          <div class="bt">看房时间：{{item.addTime}}</div>
          <div class="bt leavemsg border-1px">留言内容：{{item.content}}</div>
          <div class="btns">
            <div class="item">
              <Button class="btn" @click="call(item.phone)">联系房东</Button>
            </div>
            <div class="item" v-if="item.status<4">
              <Button class="btn" @click="cancelAppoint(item)">取消约看</Button>
            </div>
          </div>
        </div>
        <!-- <div class="nodata" v-if="unfinishList.length < 1">
          <img src="./img/yuyue.png" width="150">
        </div> -->
        <nodata v-if="unfinishList.length < 1&& active==='unfinished'" imgSrc="wuyuyue" text="暂无预约记录"></nodata>
      </TabContainerItem>
      <TabContainerItem id="finished">
        <div class="list border-1px" v-for="item in finishList" :key="item.id">
          <div class="up">
            <div class="left">
              <img :src="item.imageUrl" alt="">
            </div>
            <div class="right">
              <div class="name">
                <div class="txt"><template v-if="item.roomTitle">{{item.roomTitle}}</template><template v-else>{{item.name}}-{{item.buildName}}</template></div>
                <div class="state">{{status[item.status]}}</div></div>
              <div class="label">{{item.typeName}}</div>
              <div class="addr"><i class="icon-addr"></i>{{item.address}}</div>
            </div>
          </div>
          <div class="bt">看房时间：{{item.addTime}}</div>
          <div class="bt leavemsg border-1px">留言内容：{{item.content}}</div>
          <div class="btns">
            <div class="item">
              <Button class="btn" @click="call(item.phone)">联系房东</Button>
            </div>
            <div class="item">
              <Button class="btn" @click="delAppoint(item)">删  除</Button>
            </div>
          </div>
        </div>
        <!-- <div class="nodata" v-if="finishList.length < 1">
          <img src="./img/yuyue.png" width="150">
        </div> -->
        <nodata v-if="finishList.length < 1&& active==='finished'" imgSrc="wuyuyue" text="暂无预约记录"></nodata>
      </TabContainerItem>
    </TabContainer>
    </div>
    <iframe style="display: none" ref="iframe" src="" frameborder="0"></iframe>
  </div>
</template>

<script>
import csheader from '@/components/header'
import {TabContainer, TabContainerItem, Button, Toast, MessageBox} from 'mint-ui'
import {queryUserOrderAppoint, cancelOrderAppoint, delOrderAppoint} from '@/api/appoint'
import nodata from 'components/nodata/index'
export default {
  data () {
    return {
      active: 'unfinished',
      tabs: [
        {id: 'unfinished', name: '未完成预约'},
        {id: 'finished', name: '已完成预约'}
      ],
      unfinishList: [],
      finishList: [],
      status: ['待确认', '已确认', '已看房', '失约', '已取消', '已取消'] // 状态;0:待确认,1:已确认,2:已看房,3:失约, 4:用户已取消,5:房东已取消
    }
  },
  mounted () {
    this.finishedAppoint()
    this.unfinishedAppoint()
  },
  methods: {
    // 未完成预约
    unfinishedAppoint () {
      queryUserOrderAppoint(1).then(res => {
        if (res.code === 1) {
          this.unfinishList = res.data
        }
      })
    },
    /* 已完成预约 */
    finishedAppoint () {
      queryUserOrderAppoint(2).then(res => {
        if (res.code === 1) {
          this.finishList = res.data
        }
      })
    },
    cancelAppoint (item) {
      MessageBox({
        title: '',
        message: '你确定要取消这套房源约看吗',
        showCancelButton: true,
        confirmButtonText: '确认'
      }).then(s => {
        if (s === 'confirm') {
          cancelOrderAppoint(item.id).then(res => {
            console.log(res)
            if (res.code === 1) {
              item.status = 4
              let idx = this.unfinishList.indexOf(item)
              this.unfinishList.splice(idx, 1)
              this.finishList.push(item)
            } else {
              Toast('取消失败')
            }
          })
        }
      })
    },
    delAppoint (item) {
      console.log(item)
      MessageBox({
        title: '',
        message: '确定要删除吗',
        showCancelButton: true,
        confirmButtonText: '确认'
      }).then(s => {
        if (s === 'confirm') {
          delOrderAppoint(item.id).then(res => {
            if (res.code === 1) {
              let idx = this.finishList.indexOf(item)
              this.finishList.splice(idx, 1)
              Toast('删除成功')
            } else {
              Toast(res.msg)
            }
          })
        }
      })
    },
    call (phone) {
      if (phone) {
        MessageBox({
          title: '',
          message: phone,
          showCancelButton: true,
          confirmButtonText: '呼叫'
        }).then(s => {
        // console.log('ddd', s)
          if (s === 'confirm') {
          // console.log('ssd1')
            this.$refs.iframe.src = `tel:${phone}`
          }
        })
      }
    }
  },
  components: {
    csheader, TabContainer, TabContainerItem, Button, nodata
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.record {
  // background-color: #fff;
  .title{
    padding: 15px;
    font-size: 17px;
    background-color: #fff;
  }
  .tab {
    font-size: 15px;
    line-height: 30px;
    padding: 0 15px;
    color: @gray;
    background-color: #fff;
    .border-1px;
    .tab-item{
      display: inline-block;
      margin-right: 50px;
      border-bottom: 2px solid transparent;
      padding: 8px 0;
      position: relative;
      z-index: 3;
      &.active{
        color: #353535;
        border-bottom: 2px solid @themeColor;
      }
    }
  }
  .content {
    height: calc(100vh - 44px);
    overflow: scroll;
  }
  .list{
    padding: 15px;
    overflow: hidden;
    background-color: #fff;
    margin-bottom: 10px;
    .border-1px;
    .up{
      display: flex;
      .left{
        flex: 0 0 98px;
        // background-color: #222;
        margin-right: 18px;
        img{
          // max-width: 100%;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .right{
        flex: 1;
        min-width: 0;
        .name {
          position: relative;
          font-size: 15px;
          font-weight: bold;
          .txt {
            padding-right: 50px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .state{
            // float: right;
            position: absolute;
            right: 0;
            top: 0;
            font-size: 14px;
            font-weight: normal;
            &.active{
              color: @themeColor;
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
        position: relative;
        padding-bottom: 15px;
        // border-bottom: 1px dashed #e5e5e5;
        line-height: 24px;
        &:after {
          display: block;
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          border-top: 1px dashed #e5e5e5;
          content: ' ';
          z-index: 1;
        }
      }
    }
    .btns {
      display: flex;
      padding-top: 15px;
      .item{
        flex: 1;
        text-align: center;
      }
      .btn {
        width: 80px;
      }
    }
  }
}
.icon-addr{
  display: inline-block;
  width: 9px;
  height: 12px;
  background-image: url(../home/icon/icon_weizhi@2x.png);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 4px;
  position: relative;
  top: 1px;
}
.nodata{
  display: flex;
  height: calc(100vh - 100px - 44px);
  justify-content: center;
  align-items: center;
}
</style>
