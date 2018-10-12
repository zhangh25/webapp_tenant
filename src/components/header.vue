<template>
  <div class="header">
    <div class="left" @click="back"><icon-svg icon-class="back" class="icon"></icon-svg></div>
    <div class="center"><slot></slot></div>
    <div class="right"><slot name="right"></slot></div>
    <!-- <div class="back" @click="back"></div>
      <span class="title"><slot name="title"></slot></span>
      <div class="right"></div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
@import '../styles/mixin.less';
.header{
  display: flex;
  height: 44px;
  line-height: 44px;
  // padding: 0 15px;
  background-color: #fff;
  .border-1px(#f1f1f1);
  .left{
    flex: 0 0 35px;
    text-align: left;
    padding-left: 10px;
    .icon {
      color: @gray;
      font-size: 16px;
      // margin-left: 10px;
    }

  }
  .center {
    flex: 1;
    text-align: center;
    font-size: 17px;
  }
  .right{
    position: relative;
    flex: 0 0 35px;
    padding-right: 10px;
    text-align: right;
    font-size: 13px;
    white-space: nowrap;
  }
}
</style>
