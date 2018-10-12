<template>
  <div class="pro">
    <!-- <icon-svg icon-class="gou" class="icon"></icon-svg> -->
    <div class="item" v-for="(item, index) in opts" :key="item.id" :class="{active: idx>index}">
      <div class="state">
        <i class="dot" v-if="idx-1<index"></i>
        <icon-svg v-else icon-class="gou" class="icon"></icon-svg>
        <div class="line" v-if="index+1 < opts.length"></div>
      </div>
      <div class="txt">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    idx: {
      default: 1,
      type: Number
    }
  },
  data () {
    return {
      opts: [
        {name: '租客申请', id: 1},
        {name: '房东签约', id: 2},
        {name: '租客签字', id: 3},
        {name: '签字成功', id: 4}
      ]
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../styles/mixin.less';
@cc: #d2d2d2;
.pro {
  display: flex;
  background-color: #fff;
  padding: 15px 30px;
  border-bottom: 1px solid #efefef;
  .item {
    flex: 1;
    text-align: center;
    color: @gray;
    .state {
      position: relative;
      height: 16px;
      .dot{
        position: relative;
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: @cc;
        z-index: 2;
        margin: 3px 0;
      }
      .icon {
        font-size: 16px;
        background-color: #fff;
        position: relative;
        z-index: 2;
      }
      .line{
        position: absolute;
        width: 100%;
        height: 1px;
        background-color: @cc;
        left: 50%;
        top: 50%;
        z-index: 1;
      }
    }
    .txt{
      padding-top: 15px;
    }
    &.active{
      color: @themeColor;
      .line{
        background-color: @themeColor;
      }
    }
  }
}
</style>
