<template>
  <div class="record">
    <csheader></csheader>
    <div class="title">租约记录</div>
    <div class="tab"><span class="tab-item" v-for="item in tabs" :key="item.id" :class="{active: item.id === active}" @click="active=item.id">{{item.name}}</span></div>
    <TabContainer v-model="active" swipeable>
      <TabContainerItem id="unfinished">
        <div class="list" @click="$router.push('/leaseDetailStep/1')">
          <div class="up">
            <div class="left"><img  alt=""></div>
            <div class="right">
              <div class="name">南山区-心语雅园 <div class="state">待确认</div></div>
              <div class="label">1室1厅1卫-30.0㎡</div>
              <div class="addr">1000元/月</div>
            </div>
          </div>
          <div class="bt">看房时间：2222</div>
          <div class="btns">
            <div class="item"><Button @click="call(item.phone)">联系房东</Button></div>
          </div>
        </div>
        <div class="list" >
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
        </div>
      </TabContainerItem>
      <TabContainerItem id="finished">
        <div class="list">
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
        </div>
      </TabContainerItem>
    </TabContainer>
  </div>
</template>

<script>
import csheader from '@/components/header'
import {TabContainer, TabContainerItem, Button, Toast} from 'mint-ui'
export default {
  data () {
    return {
      active: 'unfinished',
      tabs: [
        {id: 'unfinished', name: '未完成签约'},
        {id: 'finished', name: '已完成签约'}
      ],
      unfinishList: [],
      finishList: []
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
