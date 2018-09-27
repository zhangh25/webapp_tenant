<template>
  <div class="radio-box">
    <div class="radio" v-for="item in valueData" :key="item.id" @click="radioClick(item)" :class="{'is-selected': item.id == selected.id}">
      {{item.name}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: [Object],
    valueData: {
      default: _ => [],
      type: Array
    }
  },
  watch: {
    value (newVal) {
      this.selected = newVal
    }
  },
  data () {
    return {
      arr: [],
      checkValue: null,
      idx: -1,
      selected: {}
    }
  },
  created () {
    this.arr = this.valueData
  },
  methods: {
    radioClick (item) {
      this.selected = item
      this.$emit('input', item)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.radio-box {
  .radio{
    display: inline-block;
    width: 80px;
    padding: 10px 0;
    background-color: #f7f7f7;
    font-size: 11px;
    border-radius: 5px;
    margin: 4px;
    text-align: center;
    &.is-selected {
      background-color: @themeColor;
      color: #fff;
    }
  }
}
</style>
