<template>
  <a class="cell-item">
    <!-- <router-link  class="cell-item" to="/foo"> -->
    <i class="mask" v-if="isLink" @click="routerLink"></i>
    <div class="wrapper border-1px" :class="{br: topborder}">
      <div class="title">{{title}}<slot name="label"></slot></div>
      <div class="right" :class="{link: isLink}">{{value}}<slot></slot></div>
      <i class="allow" v-if="isLink"></i>
    </div>
    <!-- </router-link> -->
  </a>
</template>

<script>
export default {
  props: {
    'is-link': {
      default: false,
      type: Boolean
    },
    to: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    topborder: {
      type: Boolean,
      default: false
    }
    // blur:
  },
  methods: {
    routerLink () {
      if (this.isLink && this.to) {
        this.$router.push(this.to)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/mixin.less';

  .cell-item{
    display: flex;
    width: 100%;
    position: relative;
    background-color: #fff;
    // display: block;
    // padding: 0 15px;
    padding-left: 15px;
    line-height: 1px;
    min-height: 44px;
    align-items: center;
    &+.cell-item {
      // .border-top-1px;
      // background-color: #000;
      .wrapper{
        .border-top-1px;
      }
    }
    .mask {
      &::after {
        content: ' ';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #000;
        opacity: 0;
        transition: opacity .2s;
        z-index: 2
      }
      &:active{
        &::after{
          opacity: .2;
        }
      }
    }
    .wrapper {
      display: flex;
      padding-right: 15px;
      width: 100%;
      align-items: center;
      line-height: 22px;
      min-height: 44px;
      height: 100%;
      &.br {
        .border-top-1px;
      }
      .title{
        flex: 1;
      }
      img, i, span {
        vertical-align: top;
      }
      .right{
        &.link {
          margin-right: 24px;
        }
      }
      .allow::after {
        border: solid 1px #848484;
        border-bottom-width: 0;
        border-left-width: 0;
        content: " ";
        top: 50%;
        right: 20px;
        position: absolute;
        width: 10px;
        height: 10px;
        -webkit-transform: translateY(-50%) rotate(45deg);
        transform: translateY(-50%) rotate(45deg);
            //
      }
    }
    // &::after{
    //   content: ' ';
    //   position: absolute;
    //   left: 0;
    //   right: 0;
    //   top: 0;
    //   bottom: 0;
    //   background-color: #353535;
    // }
  }
</style>
