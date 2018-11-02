<template>
  <div>
    <csheader>账户信息</csheader>
    <field label="持卡人" v-model="name"></field>
    <field label="卡号" v-model="fData.bankCard"></field>
    <field label="银行类别" v-model="fData.bankName"></field>
    <field label="手机号" v-model="fData.bankMobile"></field>
    <div class="btn">
      <Button type="primary" size="large" @click="submit">解除绑定</Button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import field from 'components/field'
import csheader from 'components/header'
import {Button} from 'mint-ui'
export default {
  computed: {
    ...mapGetters(['userData'])
  },
  data () {
    return {
      name: '',
      fData: {
        // name: '',
        bankName: '',
        userId: null,
        bankCard: '', // 银行卡号
        bankMobile: '', // 手机号
        urlf: '',
        urlz: '',
        role: 1
      }
    }
  },
  created () {
    this.name = this.userData.realname
  },
  methods: {
    submit () {
      // this.$router.push('')
    }
  },
  components: {
    field, csheader, Button
  }
}
</script>

<style lang="less" scoped>
.btn{
  padding: 15px;
}
</style>
