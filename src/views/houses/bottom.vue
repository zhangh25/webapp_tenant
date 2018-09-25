<template>
  <div class="bottom">
      <div class="store">
        <i class="icon"></i>
        <span>收藏</span>
      </div>
      <div class="bespoke">预约看房</div>
      <div class="sign">立即签约</div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.bottom{
  // height: 46px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 46px;
  display: flex;
  >div{
    height: 46px;
    text-align: center;
  }
  .store{
    flex: 0 0 105px;
  }
  .bespoke{
    flex: 1;
    line-height: 46px;
    background-color: @pink;
    color: #fff;
    font-size: 15px;
  }
  .sign{
    flex: 1;
    line-height: 46px;
    background-color: @themeColor;
    color: #fff;
    font-size: 15px;
  }
}
</style>
