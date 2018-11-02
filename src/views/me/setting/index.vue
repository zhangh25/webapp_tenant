<template>
  <div class="setting">
    <csheader>设置</csheader>
    <div class="cell-wrapper border-1px">
      <cell title="手机号" is-link @click.native="bindPhone"></cell>
      <cell title="修改登录密码" is-link @click.native="updatePassword"></cell>
      <cell title="常见问题" is-link to="/problem"></cell>
    </div>
    <div style="margin-top: 20px;" class="cell-wrapper border-1px cl">
      <cell title="清除缓存" is-link></cell>
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
import {Toast} from 'mint-ui'
import cell from 'components/cell'
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
        this.$store.dispatch('setPath', '/phone')
        this.$router.push('/login')
      }
    },
    updatePassword () {
      if (this.token) {
        this.$router.push('/password')
      } else {
        this.$store.dispatch('setPath', '/password')
        this.$router.push('/login')
      }
    }
  },
  components: {
    cell,
    mypop,
    phone,
    problem,
    csheader
  }
}
</script>

<style lang="less" scoped>
@import '../../../styles/mixin.less';
// .setting {
// }
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
  // .border-top-1px;
}
.cl {
  .border-1px;
}
.cell-wrapper {
  .border-1px;
}
</style>
