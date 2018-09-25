<template>
  <div class="pop" ref="pop" @touchstart.stop="touch" v-show="visiblepop">
    <div class="header">
      <div class="back" @click="back"><icon-svg icon-class="back" class="icon"></icon-svg></div>
      <span class="title"><slot name="title"></slot></span>
      <div class="right"></div>
    </div>
    <slot :visible.sync="visiblepop"></slot>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      visiblepop: false
    }
  },
  watch: {
    value (val) {
      this.visiblepop = val
      // console.log(val, 'eee')
    }
  },
  created () {
    // console.log(this.$refs.pop)
    this.visiblepop = this.value
  },
  mounted () {
    console.log(this.$refs.pop.parentNode)
    this.$refs.pop.parentNode.style.overflow = 'hidden'
  },
  methods: {
    touch () {
      // console.log('ddd')
    },
    back () {
      this.visiblepop = false
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/mixin.less';
.pop{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #f7f7f7;
  overflow-y:scroll;
  z-index: 100;
  padding-bottom: 56px;
  .header {
    height: 44px;
    line-height: 44px;
    // border-bottom: 1px solid #f1f1f1;
    text-align: center;
    background-color: #fff;
    .border-1px(#f1f1f1);
  }
  .icon{
    position: relative;
    top: 1px;
    display: inline-block;
    color: @gray;
    font-size: 16px;
    // margin-top: 4px;
    // padding-left: 10px;
  }
  .title {
    // width: 100%;
    // text-align: center;
    font-size: 17px;
  }
  .back{
    float: left;
    width: 40px;
    padding-left: 15px;
    text-align: left;
  }
  .right {
    float: right;
    width: 40px;
    height: 44px;
  }
}
</style>
