<template>
  <div class="radio-box">
    <div>
      <!-- <input type="text"> -->
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
  data () {
    return {
      arr: [],
      checkValue: null,
      idx: -1
    }
  },
  created () {
    this.arr = this.valueData
  }
}
</script>

<style>

</style>
