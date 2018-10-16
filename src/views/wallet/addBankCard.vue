<template>
  <div class="add">
    <csheader>添加银行卡</csheader>
    <div class="tip">请绑定持卡人本人的银行卡</div>
    <Field label="持卡人" v-model="fData.name" placeholder="请输入姓名"></Field>
    <Field label="卡号" v-model="fData.card" placeholder="此交易仅支持储蓄卡"></Field>
    <div class="btn">
      <Button type="primary" size="large">下一步</Button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import csheader from '@/components/header'
import {Field, Button} from 'mint-ui'
export default {
  computed: {
    ...mapGetters(['userData'])
  },
  data () {
    return {
      fData: {
        name: '',
        card: ''
      }
    }
  },
  created () {
    this.fData.name = this.userData.username
  },
  components: {
    csheader, Field, Button
  }
}
</script>

<style lang="less" scoped>
.tip{
  padding: 15px;
  line-height: 22px;
}
.btn {
  padding: 15px;
  padding-top: 40px;
}
</style>
