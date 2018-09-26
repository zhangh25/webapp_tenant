<template>
  <div class="list">
    <div class="bar">
      <div class="item">{{addr}}<icon-svg class="icon" icon-class="triangle"></icon-svg></div>
      <div class="item">{{sort}}<icon-svg class="icon" icon-class="triangle"></icon-svg></div>
      <div class="item">更多筛选<icon-svg class="icon" icon-class="triangle"></icon-svg></div>
    </div>
    <div class="item">
      <div class="left"><img src="" width="98"></div>
      <div class="right">
        <div class="title">南山区-心语雅园</div>
        <div class="dec">1室1厅1卫-30.0㎡</div>
        <div class="dec">1室1厅1卫-30.0㎡</div>
        <div class="price">2000元/月</div>
      </div>
    </div>
    <div class="item">
      <div class="left"><img src="" width="98"></div>
      <div class="right">
        <div class="title">南山区-心语雅园</div>
        <div class="dec">1室1厅1卫-30.0㎡</div>
        <div class="dec">1室1厅1卫-30.0㎡</div>
        <div class="price">2000元/月</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    condition: {
      type: Object
    }
  },
  data () {
    return {
      addr: '位置',
      sort: '排序'
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.list{
  .bar{
    display: flex;
    padding: 15px 0;
    background-color: #fff;
    >.item{
      flex: 1;
      text-align: center;
      &+.item{
        border-left: 1px solid #ccc;
      }
      .icon{
        margin-left: 4px;
      }
    }
  }
  >.item{
    display: flex;
    background-color: #fff;
    padding: 15px;
    // border-bottom: 1px solid #ccc;
    .border-1px(#f1f1f1);
    .left{
      flex: 0 0 117px;
    }
    .right{
      flex: 1;
      padding-left: 11px;
      .title{
        font-size: 14px;
      }
      .dec{
        color: @gray;
        font-size: 12px;
        line-height: 20px;
      }
      .price{
        color: @pink;
      }
    }
  }
}
</style>
