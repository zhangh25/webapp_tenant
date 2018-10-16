<template>
  <div class="swapper">
    <div class="box" v-for="i in 6" :key="i"><i class="dot" v-if="i<=len"></i></div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      len: 0
    }
  },
  watch: {
    value (val) {
      this.len = this.value.length
    }
  },
  created () {
    this.len = this.value.length
  }
}
</script>

<style lang="less" scoped>
@border: #ddd;
.swapper {
  display: flex;
  height: 40px;
  width: 240px;
  border-right: 1px solid @border;
  border-bottom: 1px solid @border;
  margin: 0 auto;
  .box {
    flex: 1;
    line-height: 40px;
    text-align: center;
    border-left: 1px solid @border;
    border-top: 1px solid @border;
    .dot {
      display: inline-block;
      vertical-align: middle;
      width: 10px;
      height: 10px;
      background-color: #000;
      border-radius: 50%;
      margin-top: -5px;
    }
  }
}
</style>
