<template>
  <div class="crop" v-if="show">
      <div class="top">
        <div class="btn" @click="cancel">取消</div>
        <div class="btn" @click="finish">确定</div>
      </div>
      <vue-cropper class="v-crop"
        ref="cropper"
        :img="option.img"
        :outputSize="option.size"
        :outputType="option.outputType"
        :info="true"
        :canScale='true'
        :autoCrop="option.autoCrop"
        :full="option.full"
        :canMove="option.canMove"
        :canMoveBox="option.canMoveBox"
        :centerBox="option.centerBox"
        :fixedBox="option.fixedBox"
        :original="option.original"
        :fixed="true"
        :fixedNumber="fixedNumber"
        @realTime="realTime">
        </vue-cropper>
      </div>
</template>

<script>
import Vue from 'vue'
import vueCropper from 'vue-cropper'
Vue.use(vueCropper)
export default {
  props: {
    fixedNumber: {
      type: Array,
      default: _ => [4, 4]
    },
    visible: {
      type: Boolean,
      default: false
    },
    imgurl: {
      type: String,
      default: ''
    }
  },
  watch: {
    visible (val) {
      this.show = val
    },
    imgurl (val) {
      this.option.img = val
    }
  },
  data () {
    return {
      show: false,
      option: {
        img: '',
        size: 1,
        full: false,
        outputType: 'png',
        canMove: true,
        fixedBox: true,
        original: false,
        canMoveBox: true,
        centerBox: true,
        autoCrop: true
      },
      previews: {}
    }
  },
  created () {
    this.show = this.visible
    this.option.img = this.imgurl
  },
  methods: {
    cancel () {
      this.show = false
      // this.
      this.$emit('cancel', false)
      this.$emit('update:visible', false)
    },
    realTime (data) {
      this.previews = data
    },
    finish () {
      this.$refs.cropper.getCropBlob((data) => {
        this.show = false
        this.$emit('ok', data)
        this.$emit('update:visible', false)
        // this.testUrl = data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.crop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  background-color: #fff;
  z-index: 100;
  .top {
    display: flex;
    height: 44px;
    line-height: 44px;
    width: 100%;
    text-align: center;
    .btn{
      flex: 1;
    }
  }
  .v-corp {
    height: calc(100vh - 44px);
  }
}
</style>
