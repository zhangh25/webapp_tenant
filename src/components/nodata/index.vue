<template>
  <div class="wrapper" ref="wrapper" :style="{height: wrapperHeight + 'px'}">
    <div class="box">
      <img :src="src" width="100" class="img"><br>
      <span class="txt">{{text}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      default: '暂无数据',
      type: String
    },
    bottom: {
      type: [String, Number],
      default: 0
    },
    imgSrc: {
      type: String,
      default: 'caozuoshibai'
    }
  },
  data () {
    return {
      wrapperHeight: 0
      // src: null
    }
  },
  computed: {
    src () {
      return require(`./img/icon_${this.imgSrc}@2x.png`)
    }
  },
  mounted () {
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top - +this.bottom
    console.log('wind height: ', document.documentElement.clientHeight)
    console.log('warr hei: ', this.$refs.wrapper.getBoundingClientRect().top)
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
    color: @gray;
    .img{
      // padding: 40px 0 0 20px;
    }
    .txt{
      display: inline-block;
      width: 100%;
      text-align: center;
      padding-top: 30px;
    }
  }
}
</style>
