<template>
  <div class="setting">
    <csheader>设置</csheader>
    <div>
      <Cell title="手机号" is-link @click.native="bindPhone"></Cell>
      <Cell title="常见问题" is-link to="/problem"></Cell>
    </div>
    <div style="margin-top: 20px;">
      <Cell title="清除缓存" is-link></Cell>
    </div>
    <!-- <Button size="large">退出登录</Button> -->
    <div class="quit" @click="quit" v-if="token">退出登录</div>
    <!-- <mypop v-model="visiblePhone">
      <span slot="title">手机绑定</span>
      <phone></phone>
    </mypop> -->
    <!-- <mypop v-model="visibleProblem">
      <span slot="title">常见问题</span>
      <problem></problem>
    </mypop> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {Cell, Toast} from 'mint-ui'
import mypop from '@/components/myPopup'
import phone from './phoneBind'
import problem from './problem'
import csheader from '@/components/header'
export default {
  computed: {
    ...mapGetters(['token'])
  },
  data () {
    return {
      visiblePhone: false,
      visibleProblem: false
    }
  },
  methods: {
    quit () {
      console.log('退出')
      // console.log(this.$parent.visiblepop)
      // this.$parent.back()
      this.$store.dispatch('logout').then(res => {
        Toast('退出成功')
        // this.$parent.back()
        this.$router.go(-1)
      }).catch(erro => {
        Toast(erro.msg)
      })
    },
    bindPhone () {
      if (this.token) {
        // this.visiblePhone = true
        this.$router.push('/phone')
      } else {
        // Toast('您未登录')
        this.$router.push('/login')
      }
    }
  },
  components: {
    Cell,
    mypop,
    phone,
    problem,
    csheader
  }
}
</script>

<style lang="less" scoped>
@import '../../../styles/mixin.less';
.setting {
  padding-top: 44px;
}
.quit{
  margin: 15px;
  margin-top: 40px;
  font-size: 15px;
  background-color: #fff;
  border-radius: 4px;
  color: @themeColor;
  text-align: center;
  height: 40px;
  line-height: 40px;
}
</style>
