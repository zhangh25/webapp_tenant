<template>
  <label class="radio">
    <div class="content border-1px" :class="{br: border}">
      <div class="icon">
        <img :src="iconSrc" width="29" alt="">
      </div>
      <div class="cont">
        <div class="txt">
          <div class="name">{{name}}</div>
          <div class="type">{{type}}</div>
        </div>
        <div class="rad">
        <span class="mint-checkbox"><input type="radio" class="mint-checkbox-input" v-model="val" :value="label"> <span class="mint-checkbox-core"></span></span>
        </div>
      </div>
    </div>
  </label>
</template>

<script>
export default {
  props: {
    value: {
      type: [Number, String, Boolean]
    },
    label: [Number, String, Boolean],
    name: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    iconSrc: {
      type: String,
      default: ''
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    val (v) {
      this.$emit('input', v)
    },
    value (val) {
      // this.$emit()
      this.val = val
    }
  },
  data () {
    return {
      val: null
    }
  },
  created () {
    this.val = this.value
  }
}
</script>
<style lang="less" scoped>
@import '../../styles/mixin.less';
.radio {
  display: block;
  // padding: 0 15px;
  padding-left: 15px;
  background-color: #fff;
  &+.radio {
    .content {
      .border-top-1px;
    }
  }
  .content {
    display: flex;
    width: 100%;
    align-items: center;
    padding: 15px 15px 15px 0;
    .icon {
      flex: 0 0 50px;
    }
    &.br{
      .border-1px;
    }
    .cont {
      display: flex;
      flex: 1;
      align-items: center;
      .txt {
        flex: 1;
        .name {
          font-size: 14px;
        }
        .type {
          font-size: 11px;
          color: @gray;
        }
      }
    }
  }
}
</style>
