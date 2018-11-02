<template>
  <div class="keyword">
    <div class="row">
      <Button class="btn" @click="clickNum(1)">1</Button>
      <Button class="btn" @click="clickNum(2)">2</Button>
      <Button class="btn" @click="clickNum(3)">3</Button>
    </div>
    <div class="row">
      <Button class="btn" @click="clickNum(4)">4</Button>
      <Button class="btn" @click="clickNum(5)">5</Button>
      <Button class="btn" @click="clickNum(6)">6</Button>
    </div>
    <div class="row">
      <Button class="btn" @click="clickNum(7)">7</Button>
      <Button class="btn" @click="clickNum(8)">8</Button>
      <Button class="btn" @click="clickNum(9)">9</Button>
    </div>
    <div class="row">
      <Button class="btn" disabled></Button>
      <Button class="btn" @click="clickNum(0)">0</Button>
      <Button class="btn" @click="delNum">x</Button>
    </div>
  </div>
</template>

<script>
import {Button} from 'mint-ui'
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      nums: []
    }
  },
  created () {
    this.nums = this.value
  },
  methods: {
    clickNum (num) {
      if (this.nums.length > 5) return
      this.nums.push(num)
      this.$emit('input', this.nums)
    },
    delNum () {
      // console.log(this.nums)
      if (this.nums.length > 0) {
        this.nums.pop()
        this.$emit('input', this.nums)
      }
    }
  },
  components: {
    Button
  }
}
</script>

<style lang="less" scoped>
.row {
  display: flex;
  .btn{
    flex: 1;
    border-radius: 0;
    font-size: 26px;
    box-shadow: none;
    background-color: #fbfbfb;
    &+.btn{
      border-left: 1px solid #d3d3d3;
    }
  }
  &+.row{
    border-top: 1px solid #d3d3d3;
  }
}
</style>
