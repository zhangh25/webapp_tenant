<template>
  <div class="record">
    <csheader noborder></csheader>
    <div class="content">
    <div class="title">租约记录</div>
    <div class="tab border-1px"><span class="tab-item" v-for="item in tabs" :key="item.id" :class="{active: item.id === active}" @click="active=item.id">{{item.name}}</span></div>
    <TabContainer v-model="active" swipeable>
      <TabContainerItem id="unfinished">
        <div class="list border-1px" v-for="item in unfinishList" :key="item.id" @click="goDetailStep(item)">
          <div class="up">
            <div class="left"><img :src="item.imageUrl" alt=""></div>
            <div class="right">
              <div class="name">{{item.areaName}}-<template v-if="item.roomTitle">{{item.roomTitle}}</template><template v-else>{{item.name}}-{{item.buildName}}</template>-{{item.roomNumber}} <div class="state" :class="{active: item.orderStatus==0, pink: item.orderStatus==3||item.orderStatus==7 || item.orderStatus == 4}">{{status[item.orderStatus]}}</div></div>
              <div class="label">{{item.typeName}}-{{item.roomArea}}㎡</div>
              <div class="addr"><span class="num">{{item.rent}}</span>元/月</div>
            </div>
          </div>
          <div class="bt">申请签约时间：{{item.addTime}}</div>
          <div class="btns">
            <div class="item"><Button @click.stop="call(item.ownerPhone)">联系房东</Button></div>
            <div class="item"><Button @click.stop="cancel(item.id)">取消签约</Button></div>
          </div>
        </div>
        <nodata v-if="unfinishList.length<1&&active==='unfinished'" imgSrc="wuzuyuejilu" text="暂无租约记录"></nodata>
        <!-- <div class="list" >
          <div class="up">
            <div class="left"><img alt=""></div>
            <div class="right">
              <div class="name">南山区-心语雅园 <div class="state">待签字</div></div>
              <div class="label">1室1厅1卫-30.0㎡</div>
              <div class="addr">1000元/月</div>
            </div>
          </div>
          <div class="bt">看房时间：2222</div>
          <div class="btns">
            <div class="item"><Button @click="call(item.phone)">联系房东</Button></div>
          </div>
        </div> -->
      </TabContainerItem>
      <TabContainerItem id="finished">
        <div class="list border-1px" v-for="item in finishList" :key="item.id" @click="goDetail(item)">
          <div class="up">
            <div class="left"><img :src="item.imageUrl" alt=""></div>
            <div class="right">
              <div class="name">{{item.areaName}}-<template v-if="item.roomTitle">{{item.roomTitle}}</template><template v-else>{{item.name}}-{{item.buildName}}</template><template v-if="item.roomNumber">-{{item.roomNumber}}</template> <div class="state">{{status[item.orderStatus]}}</div></div>
              <div class="label">{{item.typeName}}-{{item.roomArea}}㎡</div>
              <div class="addr"><span class="num">{{item.rent}}</span>元/月</div>
            </div>
          </div>
          <div class="bt">申请签约时间：{{item.addTime}}</div>
          <div class="btns">
            <div class="item"><Button @click.stop="call(item.ownerPhone)">联系房东</Button></div>
            <!-- <div class="item"><Button @click.stop="cancel(item.id)">取消签约</Button></div> -->
          </div>
        </div>
        <nodata v-if="finishList.length<1&&active==='finished'" imgSrc="wuzuyuejilu" text="暂无租约记录"></nodata>
        <!-- <div class="list">
          <div class="up">
            <div class="left">
              <img  alt="">
            </div>
            <div class="right">
              <div class="name">南山区-心语雅园 <div class="state">已取消</div></div>
              <div class="label">1室1厅1卫-30.0㎡</div>
              <div class="addr">1000元/月</div>
            </div>
          </div>
          <div class="bt">看房时间：2222</div>
          <div class="btns">
            <div class="item">
              <Button @click="call(item.phone)">联系房东</Button>
            </div>
          </div>
        </div>
        <div class="list" >
          <div class="up">
            <div class="left"><img  alt=""></div>
            <div class="right">
              <div class="name">南山区-心语雅园 <div class="state">待签字</div></div>
              <div class="label">1室1厅1卫-30.0㎡</div>
              <div class="addr">1000元/月</div>
            </div>
          </div>
          <div class="bt">看房时间：2222</div>
          <div class="btns">
            <div class="item"><Button @click="call(item.phone)">联系房东</Button></div>
          </div>
        </div> -->
      </TabContainerItem>
    </TabContainer>
    </div>
    <iframe style="display: none" ref="iframe" src="" frameborder="0"></iframe>
  </div>
</template>

<script>
import csheader from '@/components/header'
import {TabContainer, TabContainerItem, Button, Toast, MessageBox} from 'mint-ui'
import {queryLeaseOrder} from '@/api/appoint'
import nodata from 'components/nodata/index'
export default {
  data () {
    return {
      active: 'unfinished',
      tabs: [
        {id: 'unfinished', name: '未完成租约'},
        {id: 'finished', name: '已完成租约'}
      ],
      unfinishList: [],
      finishList: [],
      status: ['待确认', '已取消', '已取消', '待签字', '待支付', '支付中', '签约成功', '退房中', '退房中', '已退房']
    }
  },
  mounted () {
    this.getunfinishList()
    this.getfinishList()
  },
  methods: {
    getunfinishList () {
      queryLeaseOrder(1, 1, 100).then(res => {
        if (res.code === 1) {
          this.unfinishList = res.data
        }
      })
    },
    getfinishList () {
      queryLeaseOrder(2, 1, 100).then(res => {
        if (res.code === 1) {
          this.finishList = res.data
        }
      })
    },
    cancel (id) {
      // MessageBox({
      //   title: '',
      //   message: '你确定要取消签约吗',
      //   showCancelButton: true,
      //   confirmButtonText: '确认'
      // }).then(type => {
      //   if (type === 'confirm') {
      this.$router.push(`/leaseCancel/${id}`)
      //   }
      // })
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
    },
    goDetail (item) {
      this.$router.push(`/leaseDetail/${item.id}`) // leaseDetail
    },
    goDetailStep (item) {
      this.$router.push(`/leaseDetailStep/${item.id}`) // leaseDetail
    }
  },
  components: {
    csheader, TabContainer, TabContainerItem, Button, Toast, nodata
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
  .content {
    height: calc(100vh - 44px);
    overflow: scroll;
  }
  .tab {
    font-size: 15px;
    line-height: 30px;
    padding: 0 15px;
    color: @gray;
    background-color: #fff;
    // border-bottom: 1px solid #f1f1f1;
    .border-1px;
    .tab-item{
      display: inline-block;
      margin-right: 50px;
      border-bottom: 2px solid transparent;
      padding: 8px 0;
      position: relative;
      z-index: 2;
      &.active{
        color: #353535;
        border-bottom: 2px solid @themeColor;
      }
    }
  }
  .list{
    padding: 15px;
    overflow: hidden;
    background-color: #fff;
    margin-bottom: 10px;
    // border-bottom: 1px solid #f1f1f1;
    .border-1px;
    .up{
      display: flex;
      .left{
        flex: 0 0 98px;
        // background-color: #222;
        margin-right: 18px;
        img{
          // height: 100%;
          width: 100%;
          height: 80px;
          object-fit: cover;
        }
      }
      .right{
        flex: 1;
        min-width: 0;
        .name {
          font-size: 15px;
          font-weight: bold;
          position: relative;
          padding-right: 50px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          .txt {

          }
          .state{
            position: absolute;
            right: 0;
            top: 0;
            float: right;
            font-size: 14px;
            font-weight: normal;
            &.active{
              color: @themeColor;
            }
            &.pink {
              color: @pink;
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
          padding-top: 8px;
          font-size: 12px;
          color: @pink;
          .num{
            font-size: 15px;
            font-weight: bold;
          }
          // overflow: hidden;
          // text-overflow: ellipsis;
          // white-space: nowrap;
        }
      }
    }
    .bt{
      padding: 15px 0;
      border-bottom: 1px dashed #e5e5e5;
      &.leavemsg{
        padding-bottom: 15px;
        border-bottom: 1px dashed #e5e5e5;
        line-height: 24px;
      }
    }
    .btns {
      display: flex;
      padding-top: 15px;
      .item{
        flex: 1;
        text-align: center;
      }

    }
  }
}
</style>
