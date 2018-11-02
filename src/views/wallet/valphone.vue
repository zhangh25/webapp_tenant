<template>
  <div>
    <csheader>验证手机号</csheader>
    <field v-model="fdata.code" placeholder="输入验证码"><div class="btn" @click="getCode">{{btnTxt}}</div></field>
    <div class="btns">
      <Button type="primary" size="large" @click="next">下一步</Button>
    </div>
  </div>
</template>

<script>
import csheader from 'components/header'
import {Button} from 'mint-ui'
import field from 'components/field'
export default {
  data () {
    return {
      btnTxt: ''
    }
  },
  methods: {
    next () {
      this.$router.go(-2)
    }
  },
  components: {
    csheader, Button, field
  }
}
</script>

<style lang="less" scoped>
@import '../../../styles/mixin.less';
.btn {
  width: 100px;
  height: 20px;
  line-height: 20px;
  color: @themeColor;
  font-size: 13px;
  text-align: center;
  border-left: 1px solid #ccc;
  margin-left: 10px;
}
.btns {
  padding: 15px;
}
</style>
