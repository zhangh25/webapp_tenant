<template>
  <div class="check-box">
    <div class="check" v-for="(item, idx) in valueData" :key="item.id" :class="{'is-selected': select[idx]}" @click="checkClick(item, idx)">
      {{item.name}}
      <!-- <input class="checkbox" type="checkbox" v-model="selected"> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: [Array],
    valueData: {
      default: _ => [],
      type: Array
    }
  },
  watch: {
    value (newVal) {
      // console.log(newVal, 'wweee')
      this.selected = newVal
      if (newVal.length === 0) {
        this.select.fill(false)
        this.select.push(this.select.pop()) // 更新视图变化
      }
    }
  },
  data () {
    return {
      arr: [], // 供选择的选项
      checkValue: null,
      idx: -1,
      selected: [], // 已经选择的
      select: [] // 选择标志
    }
  },
  created () {
    this.arr = this.valueData
    // console.log(this.value)
    this.select.length = this.arr.length
    this.select.fill(false)
    // console.log(this.select)
  },
  methods: {
    checkClick (item, idx) {
      // this.select[idx] = !this.select[idx]
      this.$set(this.select, idx, !this.select[idx])
      if (this.select[idx]) {
        this.selected.push(item)
      } else {
        let i = this.selected.indexOf(item)
        this.selected.splice(i, 1)
      }
      // console.log(this.selected)
      // this.selected = item
      this.$emit('input', this.selected)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.check-box {
  .check{
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
