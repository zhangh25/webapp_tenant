<template>
<div class="wrapper">
  <Swipe :auto="0" class="swipe" :continuous="false" :show-indicators="false" @change="handleChange">
    <SwipeItem class="swipe-item">
      <img src="./img/1.jpg">
    </SwipeItem>
    <SwipeItem class="swipe-item">
      <img src="./img/2.jpg">
    </SwipeItem>
    <SwipeItem class="swipe-item">
      <img src="./img/3.jpg">
    </SwipeItem>
    <SwipeItem class="swipe-item">
      <img src="./img/4.jpg">
      <!--  -->
    </SwipeItem>
    <!-- <SwipeItem style="background: #00ff00">2</SwipeItem>
    <SwipeItem style="background: #0000ff">3</SwipeItem> -->
  </Swipe>
  <div class="btn" @click="aa()"></div>
</div>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui'
export default {
  props: {
    tiyan: [Function]
  },
  data () {
    return {
      curImgidx: 1
    }
  },
  methods: {
    aa () {
      console.log('233')
      // this.$emit('tiyan', 'ss')
      // this.tiyan()
      // this.$parent.experience()
      if (this.curImgidx === 4) {
        this.$router.replace('/map')
      }
    },
    handleChange (idx) {
      this.curImgidx = idx + 1
    }
  },
  components: {
    Swipe, SwipeItem
  }
}
</script>

<style lang="less" scoped>
.swipe {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  // background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .swipe-item {
    // position: relative;

  }

}
.wrapper {
  // position: relative;
  .btn {
    position: absolute;
    width: 140px;
    height: 50px;
    background-color: #000;
    opacity: 0;
    z-index: 21;
    bottom: 45px;
    left: 50%;
    margin-left: -70px;
    }
}
</style>
