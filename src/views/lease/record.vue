<template>
  <div class="record">
    <csheader></csheader>
    <div class="title">租约记录</div>
    <div class="tab"><span class="tab-item" v-for="item in tabs" :key="item.id" :class="{active: item.id === active}" @click="active=item.id">{{item.name}}</span></div>
    <TabContainer v-model="active" swipeable>
      <TabContainerItem id="unfinished">
        <div class="list" v-for="item in unfinishList" :key="item.id" @click="goDetailStep(item)">
          <div class="up">
            <div class="left"><img :src="item.imageUrl" alt=""></div>
            <div class="right">
              <div class="name">{{item.roomTitle}} <div class="state" :class="{active: item.orderStatus==6, pink: item.orderStatus==3||item.orderStatus==7}">{{status[item.orderStatus]}}</div></div>
              <div class="label">{{item.typeName}}-{{item.roomArea}}㎡</div>
              <div class="addr">{{item.rent}}元/月</div>
            </div>
          </div>
          <div class="bt">看房时间：</div>
          <div class="btns">
            <div class="item"><Button @click="call(item.ownerPhone)">联系房东</Button></div>
            <div class="item"><Button @click.stop="cancel(item.id)">取消签约</Button></div>
          </div>
        </div>
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
        <div class="list" v-for="item in finishList" :key="item.id" @click="goDetail(item)">
          <div class="up">
            <div class="left"><img :src="item.imageUrl" alt=""></div>
            <div class="right">
              <div class="name">{{item.roomTitle}} <div class="state">{{status[item.orderStatus]}}</div></div>
              <div class="label">{{item.typeName}}-{{item.roomArea}}㎡</div>
              <div class="addr">{{item.rent}}元/月</div>
            </div>
          </div>
          <div class="bt">看房时间：</div>
          <div class="btns">
            <div class="item"><Button @click="call(item.ownerPhone)">联系房东</Button></div>
            <!-- <div class="item"><Button @click.stop="cancel(item.id)">取消签约</Button></div> -->
          </div>
        </div>
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
</template>

<script>
import csheader from '@/components/header'
import {TabContainer, TabContainerItem, Button, Toast} from 'mint-ui'
import {queryLeaseOrder} from '@/api/appoint'
export default {
  data () {
    return {
      active: 'unfinished',
      tabs: [
        {id: 'unfinished', name: '未完成签约'},
        {id: 'finished', name: '已完成签约'}
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
      queryLeaseOrder(1).then(res => {
        if (res.code === 1) {
          this.unfinishList = res.data
        }
      })
    },
    getfinishList () {
      queryLeaseOrder(2).then(res => {
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
    goDetail (item) {
      this.$router.push(`/leaseDetail/${item.id}`) // leaseDetail
    },
    goDetailStep (item) {
      this.$router.push(`/leaseDetailStep/${item.id}`) // leaseDetail
    }
  },
  components: {
    csheader, TabContainer, TabContainerItem, Button, Toast
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.record {
  background-color: #fff;
  .title{
    padding: 15px;
    font-size: 17px;
  }
  .tab {
    font-size: 15px;
    line-height: 30px;
    padding: 0 15px;
    color: @gray;
    .tab-item{
      display: inline-block;
      margin-right: 50px;
      border-bottom: 2.5px solid transparent;
      padding: 8px 0;
      &.active{
        color: #353535;
        border-bottom: 2.5px solid @themeColor;
      }
    }
  }
  .list{
    padding: 15px;
    overflow: hidden;
    .up{
      display: flex;
      .left{
        flex: 0 0 98px;
        background-color: #222;
        margin-right: 18px;
        img{
          max-width: 100%;
        }
      }
      .right{
        flex: 1;
        .name {
          font-size: 15px;
          .state{
            float: right;
            font-size: 14px;
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
