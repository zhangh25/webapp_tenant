<template>
  <div class="field">
    <div class="content border-1px">
      <div class="label" v-if="label" :style="{'font-size': fontSize+'px'}">{{label}}</div>
      <input v-if="type!=='textarea'" :type="type" v-model="val" @blur="onBlur" :disabled="disabled" class="input" :class="{right}" :style="{'font-size': fontSize+'px'}" :placeholder="placeholder">
      <textarea v-else class="textarea" v-model="val" :placeholder="placeholder"></textarea>
      <div class="ri"><slot></slot></div>
      <i class="allow" v-if="allow"></i>
    </div>
    <slot name="extra"></slot>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    value: [String, Number],
    type: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    'font-size': {
      type: Number,
      default: 13
    },
    allow: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    },
    blur: {
      type: Function,
      default: null
    }
  },
  watch: {
    val (v) {
      this.$emit('input', v)
    },
    value (val) {
      this.val = val
    }
  },
  created () {
    this.val = this.value
  },
  data () {
    return {
      val: null
    }
  },
  methods: {
    onBlur () {
      if (this.blur) {
        this.blur(this.val)
      }
    }
  }
}
</script>

<style lang="less">
@import '../styles/mixin.less';
.field {
  padding-left: 15px;
  background-color: #fff;
  &+.field{
    .content {
      .border-top-1px;
    }
  }
  .content{
    display: flex;
    min-height: 44px;
    align-items: center;
    .label {
      flex: 0 0 100px;
    }
    .input {
      flex: 1;
      border: none;
      &::placeholder {
        color: #848484;
      }
      &.right {
        text-align: right;
      }
    }
    .textarea{
      flex: 1;
      border: none;
      outline: none;
      padding: 15px 0;
      height: 90px;
    }
    >.ri {
      margin-right: 15px;
    }
    .allow {
      position: relative;
      margin-left: 15px;
    }
    .allow::after {
        border: solid 1px #848484;
        border-bottom-width: 0;
        border-left-width: 0;
        content: " ";
        top: 50%;
        right: 15px;
        position: absolute;
        width: 10px;
        height: 10px;
        -webkit-transform: translateY(-50%) rotate(45deg);
        transform: translateY(-50%) rotate(45deg);
            //
      }
  }
}
</style>
